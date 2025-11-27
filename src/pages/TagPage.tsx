import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaOverview } from "../components/LemmaOverview";
import { TAG } from "../queries";
import { LemmaEntity } from "../gql/graphql";
import { useMemo } from "react";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";

export const TagPage = () => {
  const { tagId } = useParams();
  const { data } = useQuery(TAG, { variables: { id: tagId ?? '' } })


  const sortedLemmas = useMemo(() => {
    const output = [ ...(data?.tag?.data?.attributes?.lemmas?.data ?? []) ];
    output.sort((a, b) => sortNievauWithKinderFirst(a.attributes?.niveau?.data, b.attributes?.niveau?.data));
    return output;
  }, [ data?.tag?.data?.attributes?.lemmas?.data ])

  if (!data?.tag?.data?.attributes) return <FullPageSpinner />;
  const { attributes } = data.tag.data;

  return (
    <div>
      <div>{attributes.beschrijving}</div>
      <Row className="align-items-center">
        <Col xs={12}>
          <div className="w-100 d-flex justify-content-center">
            <h4>{attributes?.titel}</h4>
            <div>
              {attributes?.beschrijving}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 align-items-stretch">
        <Col xs={12}>
          <div className="lemma-overview-container">
            {sortedLemmas?.map(l => (
              <LemmaOverview lemma={l as Partial<LemmaEntity>} showGroupBadge />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}