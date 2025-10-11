import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row, Spinner } from "reactstrap";
import { LEMMA } from "../queries";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Lemma = () => {
  const { lemmaId } = useParams();

  const { data, loading } = useQuery(LEMMA, {
    variables: {
      id: lemmaId ?? ''
    }
  });

  if (!data?.lemma?.data) return null;

  const { attributes } = data.lemma.data;

  return (
    <div>
      {loading && (
        <Spinner />
      )}
      <Row>
        <Col xs={12} lg={9} style={{ borderRight: '1px dashed lightgray' }}>
          <div className="lemma-header">
            <div>
              <div className="d-flex gap-3 align-items-end">
                <div>
                  <h3>{attributes?.titel} ({attributes?.jaar})</h3>
                </div>
                <div className="text-secondary">
                  {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
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
        <Col xs={12} lg={3}>
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="image-wrapper xl">
              <img src={attributes?.afbeelding?.data?.attributes?.url} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={9} style={{ borderRight: '1px dashed lightgray' }}>
          {attributes?.doelgroep && (
            <div className="lemma-main-section">
              <h5>Doelgroep</h5>
              <BlocksRenderer content={attributes?.doelgroep} />
            </div>
          )}
          {attributes?.motieven && (
            <div className="lemma-main-section">
              <h5>Motieven</h5>
              <BlocksRenderer content={attributes?.motieven} />
            </div>
          )}
          {attributes?.het_verhaal && (
            <div className="lemma-main-section">
              <h5>Het verhaal</h5>
              <BlocksRenderer content={attributes?.het_verhaal} />
            </div>
          )}
          {attributes?.analyse && (
            <div className="lemma-main-section">
              <h5>Analyse en interpretatie</h5>
              <BlocksRenderer content={attributes?.analyse} />
            </div>
          )}
          {attributes?.lessuggesties && (
            <div className="lemma-main-section">
              <h5>Didactische vragen en lessuggesties</h5>
              <BlocksRenderer content={attributes?.lessuggesties} />
            </div>
          )}
          {attributes?.kerndoelen && (
            <div className="lemma-main-section">
              <h5>Kerndoelen Nederlands</h5>
              <BlocksRenderer content={attributes?.kerndoelen} />
            </div>
          )}
          <div className="lemma-main-section">
            <h5>Vindplaatsen en bronnen</h5>
            {attributes?.bronnen && (
              <BlocksRenderer content={attributes?.bronnen} />
            )}
          </div>
        </Col>
        <Col xs={12} lg={3}>
          {/* <div className="lemma-side-section">
            <h5>Thematische tags</h5>
          </div> */}
          <div className="lemma-side-section">
            <h5>⁠Opstaptitels</h5>
            {attributes?.opstaptitels_extern && (
              <BlocksRenderer content={attributes?.opstaptitels_extern} />
            )}
          </div>
          <div className="lemma-side-section">
            <h5>Verder lezen</h5>
            {attributes?.verder_lezen_extern && (
              <BlocksRenderer content={attributes?.verder_lezen_extern} />
            )}
          </div>
        </Col>
      </Row >
    </div >
  )
}