import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row, Spinner } from "reactstrap";
import { LEMMAS_BY_LEVEL, LEVEL } from "../queries";
import { LemmaOverview } from "../components/LemmaOverview";
import { LemmaEntity } from "../gql/graphql";
import { useMemo } from "react";

export const Level = () => {
  const { levelId } = useParams();

  const { data: levelData, loading: loadingLevel } = useQuery(LEVEL, {
    variables: {
      id: levelId ?? ''
    }
  })

  const { data: lemmaData, loading: loadingLemmas } = useQuery(LEMMAS_BY_LEVEL, {
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

  const loading = useMemo(() => loadingLevel || loadingLemmas, [ loadingLemmas, loadingLevel ])

  return (
    <div>
      {loading && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      )}
      <Row>
        <Col xs={12}>
          <h4>{levelData?.niveau?.data?.attributes?.titel}</h4>
          <div>
            {levelData?.niveau?.data?.attributes?.beschrijving}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        {lemmaData?.lemmata?.data?.map(l => (
          <Col xs={12} md={4}>
            <LemmaOverview lemma={l as LemmaEntity} />
          </Col>
        ))}
      </Row>
    </div>
  )
}