import { Document, Page, PDFDownloadLink, StyleSheet, View } from "@react-pdf/renderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ReactDOMServer from 'react-dom/server';
import Html from "react-pdf-html";
import { NavigateFunction } from "react-router";
import { Col, Row } from "reactstrap";
import arrow from '../assets/arrow.png';
import { VoorlezenEntityResponse } from "../gql/graphql";
import { LemmataQueryLemma } from "../queries";

export const LemmaDocumentReact = (props: {
  lemma: LemmataQueryLemma | undefined,
  voorlezen: VoorlezenEntityResponse[ 'data' ],
  navigate: NavigateFunction
}) => {

  if (!props.lemma || !props.voorlezen) return null;
  const { attributes } = props.lemma;
  const { attributes: voorlezen } = props.voorlezen

  return (
    <div className="lemma-container">
      <Row className="align-items-center">
        <Col xs={12} xl={8} className="mb-0">
          <div className="only-show-in-pdf pdf-header">
            <h3>STERBOEKEN</h3>
            <div>sterboeken.org</div>
          </div>
          <hr className="only-show-in-pdf my-4" />
          <div className="lemma-header-section">
            <div>
              <div className="d-flex gap-3 align-items-center flex-wrap">
                <div>
                  <h3>{attributes?.titel} ({attributes?.jaar})</h3>
                </div>
                <div className="text-secondary text-nowrap">
                  <div>{attributes?.auteur_voornaam} {attributes?.auter_achternaam}</div>
                  {attributes?.auteur_2_voornaam && (
                    <div>{attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam}</div>
                  )}
                </div>
                <div className="ms-3">
                  <div className=" hide-in-pdf">
                    <PDFDownloadLink
                      className="pretty-button text-nowrap"
                      fileName={`sterboeken_${props.lemma.attributes?.titel}_${props.lemma.attributes?.jaar}`}
                      document={<LemmaDocument lemma={props.lemma} voorlezen={props.voorlezen} />}
                    >
                      Download PDF
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} xl={4} className="mb-0 pt-4 pt-xl-0">
          <div className="lemma-header-section hide-in-pdf">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div className="align-self-start text-nowrap hide-in-pdf" style={{ fontSize: '11px' }}>
                <div>Aan de slag met dit boek?</div>
                <div className="d-flex justify-content-end hide-in-pdf" style={{ transform: 'rotateX(180deg)' }}>
                  <img src={arrow} width={42} height={42} className="hide-in-pdf" />
                </div>
              </div>
              <a className="text-nowrap mt-2 align-self-end pretty-button library-orange hide-in-pdf" href="https://www.jeugdbibliotheek.nl/" target="_blank">
                Naar de Jeugdbibliotheek
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <hr className="my-4 hide-in-pdf" />
      <Row>
        <Col xs={12} lg={8}>
          <div>
            {attributes?.de_kern && (
              <BlocksRenderer content={attributes?.de_kern} />
            )}
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="d-flex justify-content-center">
            <div className="image-wrapper lemma-header">
              <img src={attributes?.afbeelding?.data?.attributes?.url} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
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
        </Col>
        {/* Only show in Desktop */}
        <Col xs={12} lg={4} className="hide-in-pdf d-none d-lg-block">
          {/* <div className="lemma-side-section">
            <h5>Thematische tags</h5>
          </div> */}
          {((attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern) && (
            <section>
              <div className="lemma-side-section">
                <h5>⁠Opstaptitels</h5>
                {attributes?.opstaptitels?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} />
                ))}
                {attributes?.opstaptitels_extern && (
                  <BlocksRenderer content={attributes?.opstaptitels_extern} />
                )}
              </div>
            </section>
          )}
          {((attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern) && (
            <section>
              <div className="lemma-side-section">
                <h5>Parallel lezen</h5>
                {attributes?.parallel_lezens?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} />
                ))}
                {attributes?.parallel_lezen_extern && (
                  <BlocksRenderer content={attributes?.parallel_lezen_extern} />
                )}
              </div>
            </section>
          )}
          {((attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern) && (
            <section>
              <div className="lemma-side-section">
                <h5>Verder lezen</h5>
                {attributes?.verder_lezens?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} />
                ))}
                {attributes?.verder_lezen_extern && (
                  <BlocksRenderer content={attributes?.verder_lezen_extern} />
                )}
              </div>
            </section>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={8}>
          {/* Only show in Mobile + PDF */}
          <div className="d-block d-lg-none">
            {voorlezen && (
              <section>
                <div className="lemma-side-section">
                  <h5>Voorlezen</h5>
                  <BlocksRenderer content={voorlezen?.tekst} />
                </div>
              </section>
            )}
          </div>
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
          {/* Only show in Mobile + PDF */}
          <div className="d-block d-lg-none">
            {((attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern) && (
              <section>
                <div className="lemma-side-section">
                  <h5>⁠Opstaptitels</h5>
                  {attributes?.opstaptitels?.data.map(l => (
                    <LemmaInternalLink l={l} navigate={props.navigate} />
                  ))}
                  {attributes?.opstaptitels_extern && (
                    <BlocksRenderer content={attributes?.opstaptitels_extern} />
                  )}
                </div>
              </section>
            )}
            {((attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern) && (
              <section>
                <div className="lemma-side-section">
                  <h5>Parallel lezen</h5>
                  {attributes?.parallel_lezens?.data.map(l => (
                    <LemmaInternalLink l={l} navigate={props.navigate} />
                  ))}
                  {attributes?.parallel_lezen_extern && (
                    <BlocksRenderer content={attributes?.parallel_lezen_extern} />
                  )}
                </div>
              </section>
            )}
            {((attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern) && (
              <section>
                <div className="lemma-side-section">
                  <h5>Verder lezen</h5>
                  {attributes?.verder_lezens?.data.map(l => (
                    <LemmaInternalLink l={l} navigate={props.navigate} />
                  ))}
                  {attributes?.verder_lezen_extern && (
                    <BlocksRenderer content={attributes?.verder_lezen_extern} />
                  )}
                </div>
              </section>
            )}
          </div>
          {attributes?.bronnen && (
            <section>
              <div className="lemma-main-section">
                <h5>Vindplaatsen en bronnen</h5>
                {attributes?.bronnen && (
                  <BlocksRenderer content={attributes?.bronnen} />
                )}
              </div>
            </section>
          )}
        </Col>
        {/* Only show in Desktop */}
        <Col xs={12} lg={4} className="d-none d-lg-block">
          {voorlezen && (
            <section>
              <div className="lemma-side-section">
                <h5>Voorlezen</h5>
                <BlocksRenderer content={voorlezen?.tekst} />
              </div>
            </section>
          )}
        </Col>
      </Row>
    </div >
  )
}

const LemmaInternalLink = (props: {
  l: LemmataQueryLemma,
  navigate: NavigateFunction
}) => {
  const { id, attributes } = props.l;

  return (
    <div className="lemma-internal-link d-flex gap-3 mx-3 my-2" onClick={() => props.navigate(`/lemma/${id}`)}>
      <div>
        <div className="image-wrapper xs">
          <img src={attributes?.afbeelding?.data?.attributes?.url} />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center gap-1">
        <div className="text-secondary">{attributes?.auteur_voornaam} {attributes?.auter_achternaam} </div>
        {attributes?.auteur_2_voornaam && (
          <div className="text-secondary">{attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam} </div>
        )}
        <div>{attributes?.titel}</div>
      </div>
    </div>
  )
}


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
  [ '.lemma-main-section' ]: {
    // padding: '4px 0'
  },
  [ '.hide-in-pdf' ]: {
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
  }
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
  lemma: LemmataQueryLemma,
  voorlezen: VoorlezenEntityResponse[ 'data' ]
}) => {
  if (!props.lemma) return null;
  const html = ReactDOMServer.renderToStaticMarkup(<LemmaHTML lemma={props.lemma} voorlezen={props.voorlezen} />)

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
  lemma: LemmataQueryLemma,
  voorlezen: VoorlezenEntityResponse[ 'data' ]
}) => (
  <html>
    <body>
      <LemmaDocumentReact lemma={props.lemma} voorlezen={props.voorlezen} navigate={() => { }} />
    </body>
  </html>
)
