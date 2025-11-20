import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaOverview } from "../components/LemmaOverview";
import { TAG } from "../queries";

export const TagPage = () => {
  const { tagId } = useParams();
  const { data } = useQuery(TAG, { variables: { id: tagId ?? '' } })
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
        {attributes.lemmas?.data?.map(l => (
          <Col xs={12} lg={4}>
            <LemmaOverview lemma={l} />
          </Col>
        ))}
      </Row>
    </div>
  )
}