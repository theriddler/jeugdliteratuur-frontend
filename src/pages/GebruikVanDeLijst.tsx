import { useQuery } from "@apollo/client";
import { GEBRUIK_VAN_DE_LIJST } from "../queries";
import { InfoPage } from "../components/InfoPage";

export const GebruikVanDeLijst = () => {
  const { data, loading } = useQuery(GEBRUIK_VAN_DE_LIJST);
  const gebruikVanDeLijst = data?.gebruikVanDeLijst?.data;

  return (
    <InfoPage
      titel="Gebruik van de lijst"
      tekst={gebruikVanDeLijst?.attributes?.Tekst}
      fotoUrl={gebruikVanDeLijst?.attributes?.foto?.data?.attributes?.url}
      loading={loading}
    />
  )
}