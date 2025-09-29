import { useQuery } from "@apollo/client";
import { Spinner } from "reactstrap";
import { LEMMAS_BY_LEVEL } from "../queries";

export const Lemmas = (props: {
  levelId: string | undefined
}) => {
  const { data, loading } = useQuery(LEMMAS_BY_LEVEL, {
    variables: {
      filters: {
        level: {
          documentId: {
            eq: props.levelId
          }
        }
      }
    }
  });

  console.log(props.levelId)

  return (
    <div>
      {loading && <Spinner />}
      {data?.lemmata?.map(l => (
        <div>
          <div>
            {l?.Title}
          </div>
          <div>
            {l?.Details}
          </div>
        </div>
      ))}
    </div>
  )
}