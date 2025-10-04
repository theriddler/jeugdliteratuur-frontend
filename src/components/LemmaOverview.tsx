import { Link } from "react-router";
import { Card, CardBody } from "reactstrap";
import { LemmaEntity } from "../gql/graphql";

export const LemmaOverview = (props: {
  lemma: LemmaEntity | undefined
}) => {

  if (!props.lemma) return null;
  const { id, attributes } = props.lemma;

  return (
    <Card>
      <CardBody>
        <div className="fw-bold">
          {attributes?.titel} ({attributes?.jaar})
        </div>
        <div className="text-secondary">
          {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
        </div>
        <hr />
        <div>
          {attributes?.de_kern}
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