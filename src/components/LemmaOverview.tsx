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
          <span className="fw-bold">
            {attributes?.titel} ({attributes?.jaar})
          </span>
          <span className="ms-3 text-secondary">
            {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
          </span>
        </div>

        <div>
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