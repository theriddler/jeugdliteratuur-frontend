import { Card, CardBody, CardHeader } from "reactstrap";
import { Lemma } from "../gql/graphql";
import { Link } from "react-router";

export const LemmaOverview = (props: {
  lemma: Lemma | null
}) => {

  return (
    <Card>
      <CardHeader>
        {props.lemma?.Title}
      </CardHeader>
      <CardBody>
        <div>
          {props.lemma?.Description}
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