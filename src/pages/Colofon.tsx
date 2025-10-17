import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { COLOFON } from "../queries";

export const Colofon = () => {
  const { data, loading } = useQuery(COLOFON);
  const colofon = data?.colofon?.data;

  return (
    <InfoPage
      titel="Colofon"
      tekst={colofon?.attributes?.tekst}
      fotoUrl={colofon?.attributes?.foto?.data?.attributes?.url}
      loading={loading}
    />
  )
}