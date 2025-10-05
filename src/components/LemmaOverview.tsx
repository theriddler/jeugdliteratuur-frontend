import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Link, useNavigate } from "react-router";
import { Card, CardBody } from "reactstrap";
import { LemmaEntity } from "../gql/graphql";

export const LemmaOverview = (props: {
  lemma: LemmaEntity | undefined
}) => {
  const navigate = useNavigate();

  if (!props.lemma) return null;
  const { id, attributes } = props.lemma;

  const imageUrl = attributes?.afbeelding?.data?.attributes?.url;
  console.log(imageUrl)

  return (
    <Card className="clickable" onClick={() => navigate(`/lemma/${id}`)}>
      <CardBody>
        <div>
          <div>
            <span className="fw-bold">{attributes?.titel}</span>
            <span className="ms-2">({attributes?.jaar})</span>
          </div>
          <div className="text-secondary">
            {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <div className="image-wrapper">
            <img src={imageUrl} />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            {attributes?.korte_intro && (
              <BlocksRenderer content={attributes?.korte_intro} />
            )}
          </div>
        </div>
        <div className="mt-3">
          <Link to={`/lemma/${id}`}>
            View
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}