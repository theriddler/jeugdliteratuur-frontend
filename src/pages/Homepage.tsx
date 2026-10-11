import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { IconStar } from "@tabler/icons-react";
import { useMemo } from "react";
import { Link } from "react-router";
import { Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { STERBOEKEN_PRIMARY, STERBOEKEN_SECONDARY } from "../App";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";
import { Niveau } from "../gql/graphql";
import { INTRODUCTION, LEMMATA_PICTURES_BY_GROEP, LEVELS } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const Homepage = () => {
  const { data, loading } = useQuery(INTRODUCTION);

  const inleiding = data?.inleiding?.data;
  const { tekst, foto } = inleiding?.attributes ?? {};

  return loading ? <FullPageSpinner /> : (
    <>
      <Row>
        <Col xs={12}>
          <h3>Welkom</h3>
        </Col>
      </Row>
      <Row className="app-hero">
        {loading && <Spinner />}
        <Col xs={12} lg={8}>
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
        <Col xs={12} lg={4} className="py-3 py-lg-0">
          <div className="image-wrapper hero-img">
            <img src={getOptimizedPhotoUrlFromPhotoEntry(foto?.data?.attributes, 'medium')} />
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
    output.sort(sortNievauWithKinderFirst) // put kindergarden first
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

// Visible count: xl = 3, lg = 2, below lg = 6
const getResponsiveVisibilityClass = (index: number) => {
  if (index < 2) return '';
  if (index === 2) return 'd-lg-none d-xl-block';
  return 'd-lg-none';
}

const HomepageGroup = (props: {
  id: string | undefined | null;
  attributes: Niveau | undefined | null;
}) => {
  const { data, loading } = useQuery(LEMMATA_PICTURES_BY_GROEP, { variables: { niveauId: props.id ?? '' } });

  const firstLemmas = [ ...(data?.lemmata?.data ?? []) ]
    ?.sort(() => Math.random() > 0.5 ? 1 : -1)
    ?.slice(0, 6);

  return (
    <Link className="link-unstyled" to={`/groep/${props.id}`}>
      <Card className="card-hover">
        <CardBody className="mt-0">
          <div className="d-flex align-items-center gap-2 mb-3">
            <IconStar color={STERBOEKEN_PRIMARY} size={16} />
            <div>
              {props.attributes?.titel}
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center">
            {loading && [ 0, 1, 2, 3, 4, 5 ].map(i => (
              <div key={i} className={getResponsiveVisibilityClass(i)}>
              <div className="image-wrapper level-group d-flex flex-1 h-100 w-100 align-items-center justify-content-center border-1">
                <IconStar color={STERBOEKEN_SECONDARY} />
                </div>
              </div>
            ))}
            {firstLemmas?.map((l, i) => (
              <div key={l.id} className={getResponsiveVisibilityClass(i)}>
                <div className="image-wrapper level-group">
                  <img src={getOptimizedPhotoUrlFromPhotoEntry(l.attributes?.afbeelding?.data?.attributes)} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}