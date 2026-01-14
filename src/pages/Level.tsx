/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaOverview } from "../components/LemmaOverview";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";
import { LEMMATA_PICTURES_BY_GROEP, LEVELS } from "../queries";
import { LemmaEntity } from "../gql/graphql";

export const Level = () => {
  const { levelId } = useParams();

  const { data: levelData, loading: loadingLevel } = useQuery(LEVELS);
  const { data: lemmataData, loading: loadingLemmas } = useQuery(LEMMATA_PICTURES_BY_GROEP, { variables: { niveauId: levelId ?? '' } });
  const loading = useMemo(() => loadingLevel || loadingLemmas, [ loadingLemmas, loadingLevel ])

  const sortedLevels = useMemo(() => {
    const output = [ ...(levelData?.niveaus?.data ?? []) ]
    output.sort(sortNievauWithKinderFirst)// put kindergarden first
    return output;
  }, [ levelData?.niveaus?.data ])

  const levelIndex = useMemo(() => sortedLevels?.findIndex(l => l.id === levelId), [ levelId, sortedLevels ]);
  const level = useMemo(() => sortedLevels?.[ levelIndex ], [ levelIndex, sortedLevels ]);

  const previousLevel = useMemo(() => {
    if (levelIndex === 0) return undefined;
    return sortedLevels[ levelIndex - 1 ]
  }, [ levelIndex, sortedLevels ])

  const nextLevel = useMemo(() => {
    if (levelIndex === sortedLevels.length - 1) return undefined;
    return sortedLevels[ levelIndex + 1 ]
  }, [ levelIndex, sortedLevels ])

  // plausible tracking
  useEffect(() => {
    if (!loadingLevel && level) {
      // make custom Groep event
      const groep_title = level?.attributes?.titel;
      (window as any).plausible('Groep', { props: { Groep: groep_title } })
    }
  }, [ level, loadingLevel ])

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
      <Row>
        <Col xs={12}>
          <div className="lemma-overview-container">
            {lemmataData?.lemmata?.data?.map(l => (
              <LemmaOverview lemma={l as Partial<LemmaEntity>} />
            ))}
          </div>
        </Col>
      </Row>
      {loading && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <FullPageSpinner />
        </div>
      )}
    </div>
  )
}