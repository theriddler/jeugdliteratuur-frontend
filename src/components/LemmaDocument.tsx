import { Document, Image, Page, StyleSheet, View } from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";
import Html from "react-pdf-html";
import { MemoryRouter } from "react-router";
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

// intercepts every <img> tag found in  HTML
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageWithCors = ({ element }: any) => {
  // get src
  const src = element?.attrs?.src;
  if (!src) return null;

  // clean src with new cache hit (to prevent CORS error)
  const separator = src.includes('?') ? '&' : '?';
  const corsSrc = `${src}${separator}cors_fix=true`;

  return (
    <Image src={corsSrc} />
  );
};

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

  // display:none nodes keep layout top 0, which makes react-pdf treat the parent as unsplittable
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  parsed.querySelectorAll('.hide-in-pdf').forEach(el => el.remove());
  html = parsed.documentElement.outerHTML;

  // clean svg's from here
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
            'section': UnbreakableView,
            'img': ImageWithCors
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
      <MemoryRouter>
        <LemmaDocumentReact lemma={props.lemma} voorlezen={props.voorlezen} />
      </MemoryRouter>
    </body>
  </html>
)