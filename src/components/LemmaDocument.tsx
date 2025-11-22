import { Document, Page, PDFDownloadLink, StyleSheet, View } from "@react-pdf/renderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { IconStar } from "@tabler/icons-react";
import { useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import Html from "react-pdf-html";
import { NavigateFunction } from "react-router";
import { Col, Row } from "reactstrap";
import { STERBOEKEN_SECONDARY } from "../App";
import arrow from '../assets/arrow.png';
import { VoorlezenEntityResponse } from "../gql/graphql";
import { LemmaQueryLemma } from "../queries";

const IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME = 'ignore-open-in-new-page'

export const LemmaDocumentReact = (props: {
  lemma: LemmaQueryLemma | undefined,
  voorlezen: VoorlezenEntityResponse[ 'data' ],
  navigate: NavigateFunction
}) => {

  // change all <a> links in fetched lemma to have target = '_blank'
  useEffect(() => {
    if (!props.lemma) return;

    const targetDivs = document.getElementsByClassName('lemma-section-container');
    for (const element of targetDivs) {
      const links = element.querySelectorAll('a');
      for (const link of links) {
        if (link.className.includes(IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME)) return; // do not change target if we say not to
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }
  }, [ props.lemma ])

  // null check
  if (!props.lemma || !props.voorlezen) return null;

  // transform data
  const { attributes } = props.lemma;
  const { attributes: voorlezen } = props.voorlezen

  return (
    <div className="lemma-container">
      <Row className="align-items-center lemma-section-container">
        <Col xs={12} lg={8} className="mb-0">
          <div className="only-show-in-pdf pdf-header">
            <h3>STERBOEKEN</h3>
            <div>sterboeken.org</div>
          </div>
          <hr className="only-show-in-pdf my-3" />
          <div className="d-flex gap-2">
            <IconStar className="align-self-start" color={STERBOEKEN_SECONDARY} />
            <div>
              <h3 className="d-inline">{attributes?.titel} ({attributes?.jaar})</h3>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <IconStar className="align-self-start" color='transparent' />
            <div className="text-secondary text-nowrap">
              <div className="fs-6">{attributes?.auteur_voornaam} {attributes?.auter_achternaam}</div>
              {attributes?.auteur_2_voornaam && (
                <div className="fs-6">{attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam}</div>
              )}
              {attributes?.vertaald_door_voornaam && (
                <div className="fw-lightest">
                  <em>
                    Vertaald door {attributes.vertaald_door_voornaam} {attributes.vertaald_door_achternaam}
                  </em>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Only show on Mobile + PDF */}
        <Col xs={12} lg={4} className="d-block d-lg-none pt-4 py-lg-0">
          <div className="d-flex justify-content-center">
            <div className="image-wrapper lemma-header">
              <img
                className="hide-in-pdf ignore-default-lemma-section-container-format"
                src={attributes?.afbeelding?.data?.attributes?.url}
              />
            </div>
          </div>
        </Col>
        <Col xs={12} lg={4} className="mb-0">
          <div className="hide-in-pdf">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div className="align-self-start text-nowrap hide-in-pdf" style={{ fontSize: '11px' }}>
                <div>Dit boek lenen?</div>
                <div className="d-flex justify-content-end hide-in-pdf" style={{ transform: 'rotateX(180deg)' }}>
                  <img src={arrow} width={42} height={42} className="hide-in-pdf ignore-default-lemma-section-container-format" />
                </div>
              </div>
              <a
                className="text-nowrap mt-2 align-self-end pretty-button library-orange hide-in-pdf"
                href={attributes?.link_naar_jeugdbibliotheek ?? "https://www.jeugdbibliotheek.nl/"}
                target="_blank"
              >
                Naar de Jeugdbibliotheek
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="lemma-section-container mt-3">
        <Col xs={12} lg={8}>
          <section>
            <div className="d-flex justify-content-between">
              <div>
                <h5>In het kort</h5>
              </div>
              <div>
                <div className=" hide-in-pdf">
                  <PDFDownloadLink
                    className="pretty-button text-nowrap"
                    fileName={`Sterboeken_${props.lemma.attributes?.titel}_${props.lemma.attributes?.jaar}`}
                    document={<LemmaDocument lemma={props.lemma} voorlezen={props.voorlezen} />}
                  >
                    Download PDF
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
            {attributes?.de_kern && (
              <BlocksRenderer content={attributes?.de_kern} />
            )}
            <div className="mt-3 gap-3 d-flex justify-content-start align-items-center">
              <a className={`hide-in-pdf pretty-button text-nowrap ${IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME}`} href="#het-verhaal">
                Het verhaal
              </a>
              <a className={`hide-in-pdf pretty-button text-nowrap ${IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME}`} href="#analyse">
                Analyse en interpretatie
              </a>
              <a className={`hide-in-pdf pretty-button text-nowrap ${IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME}`} href="#didactische">
                Didactische vragen en lessuggesties
              </a>
            </div>
          </section>
        </Col>
        {/* Only show on Desktop */}
        <Col xs={12} lg={4} className="d-none d-lg-block">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="image-wrapper lemma-header">
              <img
                className="hide-in-pdf ignore-default-lemma-section-container-format"
                src={attributes?.afbeelding?.data?.attributes?.url}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} lg={8}>
          {attributes?.doelgroep && (
            <section className="lemma-section-container">
              <h5>Doelgroep</h5>
              <BlocksRenderer content={attributes?.doelgroep} />
            </section>
          )}
          {attributes?.motieven && (
            <section className="lemma-section-container">
              <h5>Motieven</h5>
              <BlocksRenderer content={attributes?.motieven} />
            </section>
          )}
          {attributes?.het_verhaal && (
            <section id="het-verhaal" className="lemma-section-container">
              <h5>Het verhaal</h5>
              <BlocksRenderer content={attributes?.het_verhaal} />
            </section>
          )}
          {attributes?.analyse && (
            <section id="analyse" className="lemma-section-container">
              <h5>Analyse en interpretatie</h5>
              <BlocksRenderer content={attributes?.analyse} />
            </section>
          )}
        </Col>
        {/* Only show in Desktop */}
        <Col xs={12} lg={4} className="hide-in-pdf d-none d-lg-block">
          {(attributes?.tags?.data?.length ?? 0) > 0 && (
            <section className="lemma-section-container green">
              <h5>Tags</h5>
              <ul>
                {attributes?.tags?.data.map(t => (
                  <li>
                    {/* Cannot do href here */}
                    <span className="link" onClick={() => props.navigate(`/tag/${t.id}`)}>
                      {t.attributes?.titel}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {((attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern) && (
            <section className="lemma-section-container green">
              <h5>⁠Opstaptitels</h5>
              {attributes?.opstaptitels?.data.map(l => (
                <LemmaInternalLink l={l} navigate={props.navigate} />
              ))}
              {attributes?.opstaptitels_extern && (
                <BlocksRenderer content={attributes?.opstaptitels_extern} />
              )}
            </section>
          )}
          {((attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern) && (
            <section className="lemma-section-container green">
              <h5>Parallel lezen</h5>
              {attributes?.parallel_lezens?.data.map(l => (
                <LemmaInternalLink l={l} navigate={props.navigate} />
              ))}
              {attributes?.parallel_lezen_extern && (
                <BlocksRenderer content={attributes?.parallel_lezen_extern} />
              )}
            </section>
          )}
          {((attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern) && (
            <section className="lemma-section-container green">
              <h5>Verder lezen</h5>
              {attributes?.verder_lezens?.data.map(l => (
                <LemmaInternalLink l={l} navigate={props.navigate} />
              ))}
              {attributes?.verder_lezen_extern && (
                <BlocksRenderer content={attributes?.verder_lezen_extern} />
              )}
            </section>
          )}
        </Col>
      </Row>
      <Row className="mt-0">
        <Col xs={12} lg={8}>
          {/* Only show in Mobile + PDF */}
          <div className="d-block d-lg-none">
            {voorlezen && (
              <section className="lemma-section-container green">
                <h5>Voorlezen</h5>
                <BlocksRenderer content={voorlezen?.tekst} />
              </section>
            )}
          </div>
          {attributes?.lessuggesties && (
            <section id="didactische" className="lemma-section-container">
              <h5>Didactische vragen en lessuggesties</h5>
              <BlocksRenderer content={attributes?.lessuggesties} />
            </section>
          )}
          {attributes?.kerndoelen && (
            <section className="lemma-section-container gray">
              <h5>Kerndoelen Nederlands</h5>
              <BlocksRenderer content={attributes?.kerndoelen} />
            </section>
          )}
          {/* Only show in Mobile + PDF */}
          <div className="d-block d-lg-none">
            {((attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern) && (
              <section className="lemma-section-container">
                <h5>⁠Opstaptitels</h5>
                {attributes?.opstaptitels?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} />
                ))}
                {attributes?.opstaptitels_extern && (
                  <BlocksRenderer content={attributes?.opstaptitels_extern} />
                )}
              </section>
            )}
            {((attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern) && (
              <section className="lemma-section-container">
                <h5>Parallel lezen</h5>
                {attributes?.parallel_lezens?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} />
                ))}
                {attributes?.parallel_lezen_extern && (
                  <BlocksRenderer content={attributes?.parallel_lezen_extern} />
                )}
              </section>
            )}
            {((attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern) && (
              <section className="lemma-section-container">
                <h5>Verder lezen</h5>
                {attributes?.verder_lezens?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} />
                ))}
                {attributes?.verder_lezen_extern && (
                  <BlocksRenderer content={attributes?.verder_lezen_extern} />
                )}
              </section>
            )}
          </div>
          {attributes?.bronnen && (
            <section className="lemma-section-container gray">
              <h5>Vindplaatsen en bronnen</h5>
              {attributes?.bronnen && (
                <BlocksRenderer content={attributes?.bronnen} />
              )}
            </section>
          )}
        </Col>
        {/* Only show in Desktop */}
        <Col xs={12} lg={4} className="hide-in-pdf d-none d-lg-block">
          {voorlezen && (
            <section className="lemma-section-container green">
              <h5>Voorlezen</h5>
              <BlocksRenderer content={voorlezen?.tekst} />
            </section>
          )}
        </Col>
      </Row>
    </div >
  )
}

const LemmaInternalLink = (props: {
  l: LemmaQueryLemma,
  navigate: NavigateFunction
}) => {
  if (!props.l) return;
  const { id, attributes } = props.l;

  return (
    <div className={"lemma-internal-link d-flex gap-3 m-3"} onClick={() => props.navigate(`/teksten/${id}`)}>
      <div>
        <div className="image-wrapper xs">
          <img
            className="hide-in-pdf"
            src={attributes?.afbeelding?.data?.attributes?.url}
          />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center gap-1">
        <div className="text-secondary">{attributes?.auteur_voornaam} {attributes?.auter_achternaam} </div>
        {attributes?.auteur_2_voornaam && (
          <div className="text-secondary">{attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam} </div>
        )}
        <div>
          {attributes?.titel}
        </div>
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
  lemma: LemmaQueryLemma,
  voorlezen: VoorlezenEntityResponse[ 'data' ]
}) => (
  <html>
    <body>
      <LemmaDocumentReact lemma={props.lemma} voorlezen={props.voorlezen} navigate={() => { }} />
    </body>
  </html>
)
