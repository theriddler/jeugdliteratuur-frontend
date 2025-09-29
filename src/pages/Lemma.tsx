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

  console.log(data?.lemma?.Data)

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
            <h4>{data?.lemma?.Title}</h4>
          </div>
          <div>
            {data?.lemma?.Description}
          </div>
        </Col>
        <Col xs={12}>
          <div>
            {data?.lemma?.Data && (
              <BlocksRenderer content={data?.lemma?.Data} />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}