import { useQuery } from "@apollo/client";
import { Spinner } from "reactstrap";
import { LIST_LEMMAS } from "../queries";

export const Lemmas = () => {
  const { data, loading } = useQuery(LIST_LEMMAS);

  return (
    <div>
      {loading && <Spinner />}
      {data?.lemmata?.map(l => (
        <div>
          {l?.Title}
        </div>
      ))}
    </div>
  )
}