import { useQuery } from "@apollo/client"
import { LIST_LEMMAS } from "../queries";
import { Spinner } from "reactstrap";

export const Lemmas = () => {
  const { loading } = useQuery(LIST_LEMMAS);

  return (
    <div>
      {loading && <Spinner />}
    </div>
  )
}