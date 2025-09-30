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
          <div>
            <h4>{data?.lemma?.titel}</h4>
          </div>
          {data?.lemma?.beschrijving && (
            <div>
              {data?.lemma?.beschrijving}
            </div>
          )}
        </Col>
        <Col xs={12}>
          <div>
            <h5>Motieven</h5>
            {data?.lemma?.motieven && (
              <BlocksRenderer content={data?.lemma?.motieven} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Doelgroep</h5>
            {data?.lemma?.doelgroep && (
              <BlocksRenderer content={data?.lemma?.doelgroep} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Doelgroep</h5>
            {data?.lemma?.doelgroep && (
              <BlocksRenderer content={data?.lemma?.doelgroep} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Het verhaal</h5>
            {data?.lemma?.hetVerhaal && (
              <BlocksRenderer content={data?.lemma?.hetVerhaal} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Analyse en interpretatie</h5>
            {data?.lemma?.analyse && (
              <BlocksRenderer content={data?.lemma?.analyse} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Didactische vragen en lessuggesties</h5>
            {data?.lemma?.lessuggesties && (
              <BlocksRenderer content={data?.lemma?.lessuggesties} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Kerndoelen Nederlands</h5>
            {data?.lemma?.kerndoelen && (
              <BlocksRenderer content={data?.lemma?.kerndoelen} />
            )}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Thematische tags</h5>
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>⁠Opstaptitels</h5>
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Verder lezen</h5>
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <h5>Vindplaatsen en bronnen</h5>
          </div>
        </Col>
      </Row>
    </div>
  )
}