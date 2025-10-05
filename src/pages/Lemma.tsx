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
        <Col xs={12}>
          <div className="lemma-header">
            <div className="d-flex justify-content-between gap-3">
              <div>
                <div className="d-flex gap-3 align-items-end">
                  <div>
                    <h4>{attributes?.titel} ({attributes?.jaar})</h4>
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
              <div>
                <div className="image-wrapper xl">
                  <img src={attributes?.afbeelding?.data?.attributes?.url} />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Motieven</h5>
            {attributes?.motieven && (
              <BlocksRenderer content={attributes?.motieven} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Doelgroep</h5>
            {attributes?.doelgroep && (
              <BlocksRenderer content={attributes?.doelgroep} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Het verhaal</h5>
            {attributes?.het_verhaal && (
              <BlocksRenderer content={attributes?.het_verhaal} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Analyse en interpretatie</h5>
            {attributes?.analyse && (
              <BlocksRenderer content={attributes?.analyse} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Didactische vragen en lessuggesties</h5>
            {attributes?.lessuggesties && (
              <BlocksRenderer content={attributes?.lessuggesties} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Kerndoelen Nederlands</h5>
            {attributes?.kerndoelen && (
              <BlocksRenderer content={attributes?.kerndoelen} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Thematische tags</h5>
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>⁠Opstaptitels</h5>
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Verder lezen</h5>
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Vindplaatsen en bronnen</h5>
          </div>
        </Col>
      </Row>
    </div>
  )
}