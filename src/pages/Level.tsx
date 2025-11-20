import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaOverview } from "../components/LemmaOverview";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";
import { LEMMATA, LEVELS } from "../queries";

export const Level = () => {
  const { levelId } = useParams();

  const { data: levelData, loading: loadingLevel } = useQuery(LEVELS);
  const { data: lemmataData, loading: loadingLemmas } = useQuery(LEMMATA);

  const sortedLevels = useMemo(() => {
    const output = [ ...(levelData?.niveaus?.data ?? []) ]
    output.sort(sortNievauWithKinderFirst)// put kindergarden first
    return output;
  }, [ levelData?.niveaus?.data ])

  const levelIndex = useMemo(() => sortedLevels?.findIndex(l => l.id === levelId), [ levelId, sortedLevels ]);
  const level = useMemo(() => sortedLevels?.[ levelIndex ], [ levelIndex, sortedLevels ]);
  const lemmas = useMemo(() => lemmataData?.lemmata?.data?.filter(l => l.attributes?.niveau?.data?.id === level?.id), [ lemmataData?.lemmata?.data, level?.id ])
  const loading = useMemo(() => loadingLevel || loadingLemmas, [ loadingLemmas, loadingLevel ])

  const previousLevel = useMemo(() => {
    if (levelIndex === 0) return undefined;
    return sortedLevels[ levelIndex - 1 ]
  }, [ levelIndex, sortedLevels ])

  const nextLevel = useMemo(() => {
    if (levelIndex === sortedLevels.length - 1) return undefined;
    return sortedLevels[ levelIndex + 1 ]
  }, [ levelIndex, sortedLevels ])

  return (
    <div>
      <Row className="align-items-center">
        <Col xs={3}>
          <div className="text-start">
            <Link to={`/groep/${previousLevel?.id}`}>
              {previousLevel?.attributes?.titel}
            </Link>
          </div>
        </Col>
        <Col xs={6}>
          <div className="w-100 d-flex justify-content-center">
            <h4>{level?.attributes?.titel}</h4>
            <div>
              {level?.attributes?.beschrijving}
            </div>
          </div>
        </Col>
        <Col xs={3}>
          <div className="text-end">
            <Link to={`/groep/${nextLevel?.id}`}>
              {nextLevel?.attributes?.titel}
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 align-items-stretch">
        {lemmas?.map(l => (
          <Col xs={12} lg={4}>
            <LemmaOverview lemma={l} />
          </Col>
        ))}
      </Row>
      {loading && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <FullPageSpinner />
        </div>
      )}
    </div>
  )
}