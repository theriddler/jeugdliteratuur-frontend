import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { Searchbar } from "../components/Searchbar";
import { sortKinderFirst } from "../funcs/sortKinderFirst";
import { Niveau } from "../gql/graphql";
import { INTRODUCTION, LEMMATA, LEVELS } from "../queries";

export const Homepage = () => {
  const { data, loading } = useQuery(INTRODUCTION);

  const inleiding = data?.inleiding?.data;
  const { tekst, foto } = inleiding?.attributes ?? {};

  return loading ? <FullPageSpinner /> : (
    <>
      <Row>
        <Col xs={8}>
          <h3>Welkom</h3>
        </Col>
        <Col xs={4}>
          <Searchbar placeholder="Zoeken" />
        </Col>
      </Row>
      <Row className="app-hero">
        {loading && <Spinner />}
        <Col xs={8}>
          {/* <Card>
            <CardBody> */}
          {tekst && (
            <BlocksRenderer content={tekst} />
          )}
          <div className="mt-3 d-flex gap-3 justify-content-end">
            <Link className="pretty-button" to='/over-het-project'>Over het project</Link>
          </div>
          {/* </CardBody>
          </Card> */}
        </Col>
        <Col xs={4}>
          <div className="image-wrapper hero-img">
            <img src={foto?.data?.attributes?.url} />
          </div>
        </Col>
      </Row>
      <div className="mt-4" />
      <HomepageGroupList />
    </>
  )
}

const HomepageGroupList = () => {
  const { data, loading } = useQuery(LEVELS);
  const levels = useMemo(() => {
    const output = [ ...(data?.niveaus?.data ?? []) ]
    output.sort(sortKinderFirst) // put kindergarden first
    return output;
  }, [ data?.niveaus?.data ])

  return (
    <Row>
      {loading && <Spinner />}
      {levels?.map(l => (
        <Col xs={12} lg={4} key={'homepage_group_list' + l.id}>
          <HomepageGroup id={l.id} attributes={l.attributes} />
        </Col>
      ))}
    </Row>
  )
}

const HomepageGroup = (props: {
  id: string | undefined | null;
  attributes: Niveau | undefined | null;
}) => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(LEMMATA);

  const lemmata = data?.lemmata?.data;
  const levelLemmas = useMemo(() => lemmata?.filter(l => l.attributes?.niveau?.data?.id === props.id), [ lemmata, props.id ])
  const firstThreeLemmas = levelLemmas?.slice(0, 3);

  return (
    <div>
      <Card>
        <CardBody className="mt-0">
          <div className="mb-3">
            <Link to={`/groep/${props.id}`}>
              {props.attributes?.titel}
            </Link>
          </div>
          {loading && <FullPageSpinner />}
          <div className="d-flex gap-2">
            {firstThreeLemmas?.map(l => (
              <div>
                <div className="image-wrapper level-group clickable card-hover-item" onClick={() => navigate(`/lemma/${l.id}`)}>
                  <img src={l.attributes?.afbeelding?.data?.attributes?.url} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}