import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardBody, Col, Row } from "reactstrap";
import { sortKinderFirst } from "../funcs/sortKinderFirst";
import { Niveau } from "../gql/graphql";
import { INTRODUCTION, LEMMAS_BY_LEVEL, LEVELS } from "../queries";

export const Homepage = () => {
  const { data } = useQuery(INTRODUCTION);

  if (!data?.inleiding?.data?.attributes) return null;
  const { tekst, foto } = data.inleiding.data.attributes;

  return (
    <>
      <Row className="app-hero">
        <Col xs={8}>
          {/* <Card>
            <CardBody> */}
          {tekst && (
            <BlocksRenderer content={tekst} />
          )}
          <div className="mt-3 d-flex gap-3 justify-content-end">
            <Link to='/over-het-project'>Over het project</Link>
          </div>
          {/* </CardBody>
          </Card> */}
        </Col>
        <Col xs={4}>
          <div className="image-wrapper w-100">
            <img src={foto?.data?.attributes?.url} />
          </div>
        </Col>
      </Row>
      <HomepageGroupList />
    </>
  )
}

const HomepageGroupList = () => {
  const { data } = useQuery(LEVELS);
  const levels = useMemo(() => {
    const output = [ ...(data?.niveaus?.data ?? []) ]
    output.sort(sortKinderFirst) // put kindergarden first
    return output;
  }, [ data?.niveaus?.data ])

  return (
    <Row>
      {levels?.map(l => (
        <Col xs={12} lg={4} className="my-3">
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
  const { data } = useQuery(LEMMAS_BY_LEVEL, {
    variables: {
      filters: {
        niveau: {
          id: {
            eq: props.id
          }
        }
      }
    }
  });

  if (!data?.lemmata?.data) return;
  const lemmas = data.lemmata.data;
  const firstTwoLemmas = lemmas?.slice(0, 2)

  return (
    <div>
      <Card>
        <CardBody className="mt-0">
          <div className="mb-3">
            <Link to={`/groep/${props.id}`}>
              {props.attributes?.titel}
            </Link>
          </div>
          <div className="d-flex align-items-start">
            {firstTwoLemmas.map(l => (
              <div className="w-50">
                <div className="image-wrapper xs clickable" onClick={() => navigate(`/lemma/${l.id}`)}>
                  <img src={l.attributes?.afbeelding?.data?.attributes?.url} />
                </div>
                {/* <div className="text-break">
                  {l.attributes?.titel}
                </div> */}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}