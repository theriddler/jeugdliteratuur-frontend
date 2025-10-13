import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row, Spinner } from "reactstrap";
import { LemmaOverview } from "../components/LemmaOverview";
import { LemmaEntity } from "../gql/graphql";
import { useMemo } from "react";
import { LEMMATA, LEVELS } from "../queries";

export const Level = () => {
  const { levelId } = useParams();

  const { data: levels, loading: loadingLevel } = useQuery(LEVELS);
  const { data: lemmata, loading: loadingLemmas } = useQuery(LEMMATA);

  const level = useMemo(() => levels?.niveaus?.data?.find(l => l.id === levelId), [ levelId, levels?.niveaus?.data ]);
  const lemmas = useMemo(() => lemmata?.lemmata?.data?.filter(l => l.attributes?.niveau?.data?.id === level?.id), [ lemmata?.lemmata?.data, level?.id ])

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
          <h4>{level?.attributes?.titel}</h4>
          <div>
            {level?.attributes?.beschrijving}
          </div>
        </Col>
      </Row>
      <Row className="mt-3 align-items-stretch">
        {lemmas?.map(l => (
          <Col xs={12} lg={4}>
            <LemmaOverview lemma={l as LemmaEntity} />
          </Col>
        ))}
      </Row>
    </div>
  )
}