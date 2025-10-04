import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row, Spinner } from "reactstrap";
import { LEMMAS_BY_LEVEL } from "../queries";
import { LemmaOverview } from "../components/LemmaOverview";
import { LemmaEntity } from "../gql/graphql";

export const Level = () => {
  const { levelId } = useParams();

  const { data, loading } = useQuery(LEMMAS_BY_LEVEL, {
    variables: {
      filters: {
        niveau: {
          id: {
            eq: levelId
          }
        }
      }
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
        {data?.lemmata?.data?.map(l => (
          <Col xs={12} md={4}>
            <LemmaOverview lemma={l as LemmaEntity} />
          </Col>
        ))}
      </Row>
    </div>
  )
}