import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Link } from "react-router";
import { Card, CardBody } from "reactstrap";
import { LemmaEntity } from "../gql/graphql";

export const LemmaOverview = (props: {
  lemma: LemmaEntity | undefined
}) => {

  if (!props.lemma) return null;
  const { id, attributes } = props.lemma;

  const imageUrl = attributes?.afbeelding?.data?.attributes?.url;
  console.log(imageUrl)

  return (
    <Card>
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
            {attributes?.de_kern && (
              <BlocksRenderer content={attributes?.de_kern} />
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