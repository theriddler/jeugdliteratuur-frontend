import { View, Page, Document, StyleSheet } from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";
import Html from "react-pdf-html";
import { VoorlezenEntityResponse } from "../gql/graphql";
import { LemmaQueryLemma } from "../queries";
import { LemmaDocumentReact } from "./LemmaDocumentReact";


// Create styles
const stylesheet = {
  body: {
    fontSize: 12,
    paddingTop: '0', // 16px is done for top by .header
    paddingRight: '8px',
    paddingBottom: '16px',
    paddingLeft: '8px',
  },
  p: {
    fontSize: 12,
    marginBottom: 0
  },
  h3: {
    fontSize: 18,
    marginBottom: 2,
    marginTop: 1
  },
  h5: {
    fontSize: 16,
    marginBottom: 0
  },
  ul: {
    width: '100%',
    marginBottom: 0
  },
  img: {
    width: '100%',
    height: '200px'
  },
  [ '.hide-in-pdf' ]: {
    position: 'fixed',
    top: 0,
    display: 'none',
    color: 'transparent',
    opacity: 0
  },
  [ '.pdf-header' ]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '8px',
    color: '#E2A93A'
  },
  [ 'ul ul' ]: { // for indented lists
    paddingLeft: 20,
    margin: 0,
  },
};


const UnbreakableView = ({ children }: { children: React.ReactNode }) => (
  <View>
    {children}
  </View>
);
const styles = StyleSheet.create({
  header: {
    height: 16 // for fixed header
  }
})

export const LemmaDocument = (props: {
  lemma: LemmaQueryLemma,
  voorlezen: VoorlezenEntityResponse[ 'data' ]
}) => {
  if (!props.lemma) return null;
  let html = ReactDOMServer.renderToStaticMarkup(<LemmaHTML lemma={props.lemma} voorlezen={props.voorlezen} />)

  // clean svgs from here
  html = html.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '');

  return (
    <Document>
      <Page size='A4'>
        {/* Fixed header for padding at the top of each page */}
        <View fixed style={styles.header}>

        </View>
        <Html
          stylesheet={stylesheet}
          renderers={{
            // Map the class name to your custom component
            'section': UnbreakableView
          }}
        >
          {html}
        </Html>
        <View fixed style={styles.header}>
        </View>
      </Page>
    </Document>
  )
}

const LemmaHTML = (props: {
  lemma: LemmaQueryLemma,
  voorlezen: VoorlezenEntityResponse[ 'data' ]
}) => (
  <html>
    <body>
      <LemmaDocumentReact lemma={props.lemma} voorlezen={props.voorlezen} navigate={() => { }} />
    </body>
  </html>
)