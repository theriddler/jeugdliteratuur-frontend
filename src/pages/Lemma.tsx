import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row, Spinner } from "reactstrap";
import { LEMMA } from "../queries";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Lemma = () => {
  const { lemmaId } = useParams();

  const { data, loading } = useQuery(LEMMA, {
    variables: {
      documentId: lemmaId ?? ''
    }
  });

  return (
    <div>
      {loading && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      )}
      <Row>
        <Col xs={12}>
          <div className="lemma-header">
            <div className="d-flex gap-3 align-items-end">
              <div>
                <h4>{data?.lemma?.titel} ({data?.lemma?.jaar})</h4>
              </div>
              <div className="text-secondary">
                {data?.lemma?.auteurVoornaam} {data?.lemma?.auterAchternaam}
              </div>
            </div>
            <div className="mt-3">
              {data?.lemma?.beschrijving}
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Motieven</h5>
            {data?.lemma?.motieven && (
              <BlocksRenderer content={data?.lemma?.motieven} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Doelgroep</h5>
            {data?.lemma?.doelgroep && (
              <BlocksRenderer content={data?.lemma?.doelgroep} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Het verhaal</h5>
            {data?.lemma?.hetVerhaal && (
              <BlocksRenderer content={data?.lemma?.hetVerhaal} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Analyse en interpretatie</h5>
            {data?.lemma?.analyse && (
              <BlocksRenderer content={data?.lemma?.analyse} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Didactische vragen en lessuggesties</h5>
            {data?.lemma?.lessuggesties && (
              <BlocksRenderer content={data?.lemma?.lessuggesties} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div className="lemma-section">
            <h5>Kerndoelen Nederlands</h5>
            {data?.lemma?.kerndoelen && (
              <BlocksRenderer content={data?.lemma?.kerndoelen} />
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