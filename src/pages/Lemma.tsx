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
            {data?.lemma?.hetVerhaal && (
              <BlocksRenderer content={data?.lemma?.hetVerhaal} />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}