import { Link } from "react-router";
import { Card, CardBody } from "reactstrap";
import { Lemma } from "../gql/graphql";

export const LemmaOverview = (props: {
  lemma: Omit<Partial<Lemma>, 'afbeelding'> | null
}) => {

  return (
    <Card>
      <CardBody>
        <div className="fw-bold">
          {props.lemma?.titel} ({props.lemma?.jaar})
        </div>
        <div className="text-secondary">
          {props.lemma?.auteurVoornaam} {props.lemma?.auterAchternaam}
        </div>
        <hr />
        <div>
          {props.lemma?.beschrijving}
        </div>
        <div className="mt-3">
          <Link to={`/lemma/${props.lemma?.documentId}`}>
            View
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}