import { Card, CardBody, CardHeader } from "reactstrap";
import { Lemma } from "../gql/graphql";
import { Link } from "react-router";

export const LemmaOverview = (props: {
  lemma: Omit<Partial<Lemma>, 'afbeelding'> | null
}) => {

  return (
    <Card>
      <CardHeader>
        {props.lemma?.titel}
      </CardHeader>
      <CardBody>
        <div>
          {props.lemma?.beschrijving}
        </div>
        <div>
          <Link to={`/lemma/${props.lemma?.documentId}`}>
            View
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}