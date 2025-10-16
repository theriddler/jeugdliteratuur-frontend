import { Document, Page, PDFDownloadLink, View } from "@react-pdf/renderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ReactDOMServer from 'react-dom/server';
import Html from "react-pdf-html";
import { Col, Row } from "reactstrap";
import { LemmaEntity } from "../gql/graphql";

export const LemmaDocumentReact = (props: {
  lemma: LemmaEntity | undefined
}) => {
  if (!props.lemma) return null;
  const { attributes } = props.lemma;

  return (
    <div>
      <Row>
        <Col xs={12} lg={8}>
          <div className="lemma-header">
            <div>
              <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex gap-3 align-items-end">
                  <div>
                    <h3>{attributes?.titel} ({attributes?.jaar})</h3>
                  </div>
                  <div className="text-secondary">
                    <span>{attributes?.auteur_voornaam} {attributes?.auter_achternaam}</span>
                    {attributes?.auteur_2_voornaam && (
                      <span> / {attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam}</span>
                    )}
                  </div>
                </div>
                <div>
                  <PDFDownloadLink className="hide-in-pdf pretty-button" document={<LemmaDocument lemma={props.lemma as LemmaEntity} />}>
                    Download PDF
                  </PDFDownloadLink>
                </div>
              </div>
              <div className="mt-3">
                {attributes?.de_kern && (
                  <BlocksRenderer content={attributes?.de_kern} />
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="mt-3 h-100 d-flex align-items-center justify-content-end">
            <div className="image-wrapper lemma-header">
              <img src={attributes?.afbeelding?.data?.attributes?.url} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={8}>
          {attributes?.doelgroep && (
            <section>
              <div className="lemma-main-section">
                <h5>Doelgroep</h5>
                <BlocksRenderer content={attributes?.doelgroep} />
              </div>
            </section>
          )}
          {attributes?.motieven && (
            <section>
              <div className="lemma-main-section">
                <h5>Motieven</h5>
                <BlocksRenderer content={attributes?.motieven} />
              </div>
            </section>
          )}
          {attributes?.het_verhaal && (
            <section>
              <div className="lemma-main-section">
                <h5>Het verhaal</h5>
                <BlocksRenderer content={attributes?.het_verhaal} />
              </div>
            </section>
          )}
          {attributes?.analyse && (
            <section>
              <div className="lemma-main-section">
                <h5>Analyse en interpretatie</h5>
                <BlocksRenderer content={attributes?.analyse} />
              </div>
            </section>
          )}
          {attributes?.lessuggesties && (
            <section>
              <div className="lemma-main-section">
                <h5>Didactische vragen en lessuggesties</h5>
                <BlocksRenderer content={attributes?.lessuggesties} />
              </div>
            </section>
          )}
          {attributes?.kerndoelen && (
            <section>
              <div className="lemma-main-section">
                <h5>Kerndoelen Nederlands</h5>
                <BlocksRenderer content={attributes?.kerndoelen} />
              </div>
            </section>
          )}
          <section>
            <div className="lemma-main-section">
              <h5>Vindplaatsen en bronnen</h5>
              {attributes?.bronnen && (
                <BlocksRenderer content={attributes?.bronnen} />
              )}
            </div>
          </section>
        </Col>
        <Col xs={12} lg={4}>
          {/* <div className="lemma-side-section">
            <h5>Thematische tags</h5>
          </div> */}
          {(attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern && (
            <div className="lemma-side-section">
              <h5>⁠Opstaptitels</h5>
              {attributes?.opstaptitels?.data.map(l => (
                <LemmaInternalLink l={l} />
              ))}
              {attributes?.opstaptitels_extern && (
                <BlocksRenderer content={attributes?.opstaptitels_extern} />
              )}
            </div>
          )}
          {(attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern && (
            <div className="lemma-side-section">
              <h5>Verder lezen</h5>
              {attributes?.verder_lezens?.data.map(l => (
                <LemmaInternalLink l={l} />
              ))}
              {attributes?.verder_lezen_extern && (
                <BlocksRenderer content={attributes?.verder_lezen_extern} />
              )}
            </div>
          )}
          {(attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern && (
            <div className="lemma-side-section">
              <h5>Parallel lezen</h5>
              {attributes?.parallel_lezens?.data.map(l => (
                <LemmaInternalLink l={l} />
              ))}
              {attributes?.parallel_lezen_extern && (
                <BlocksRenderer content={attributes?.parallel_lezen_extern} />
              )}
            </div>
          )}
        </Col>
      </Row >
    </div >
  )
}

const LemmaInternalLink = (props: { l: LemmaEntity }) => {
  const { attributes } = props.l;

  return (
    <div className="d-flex gap-3">
      <div>
        <div className="image-wrapper xs">
          <img src={attributes?.afbeelding?.data?.attributes?.url} />
        </div>
      </div>
    </div>
  )
}


// Create styles
const stylesheet = {
  body: {
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
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
  [ '.lemma-main-section' ]: {
    padding: 2
  },
  [ '.hide-in-pdf' ]: {
    color: 'transparent'
  }
};


const UnbreakableView = ({ children }: { children: React.ReactNode }) => (
  <View wrap={false}>
    {children}
  </View>
);

export const LemmaDocument = (props: {
  lemma: LemmaEntity | undefined
}) => {
  if (!props.lemma) return null;
  const html = ReactDOMServer.renderToStaticMarkup(<LemmaHTML lemma={props.lemma} />)

  return (
    <Document>
      <Page size='A4'>
        <Html
          stylesheet={stylesheet}
          renderers={{
            // Map the class name to your custom component
            'section': UnbreakableView
          }}
        >
          {html}
        </Html>
      </Page>
    </Document>
  )
}

const LemmaHTML = (props: {
  lemma: LemmaEntity
}) => (
  <html>
    <body>
      <LemmaDocumentReact lemma={props.lemma} />
    </body>
  </html>
)
