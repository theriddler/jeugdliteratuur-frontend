import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { SAMENWERKEN } from "../queries";

export const Samenwerken = () => {
  const { data, loading } = useQuery(SAMENWERKEN);
  const samenwerken = data?.samenwerken?.data;

  return (
    <InfoPage
      titel="Samenwerken"
      tekst={samenwerken?.attributes?.Tekst}
      fotoUrl={samenwerken?.attributes?.foto?.data?.attributes?.url}
      loading={loading}
    />
  )
}