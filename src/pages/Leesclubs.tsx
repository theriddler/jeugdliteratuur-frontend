import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { AGENDA } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const Leesclubs = () => {
  const { data, loading } = useQuery(AGENDA);
  const tekst = data?.agenda?.data?.attributes?.tekstVoorDePagina;
  const fotoAttributes = data?.agenda?.data?.attributes?.fotoVoorDePagina?.data?.attributes;

  return (
    <InfoPage
      titel="Leesclubs"
      tekst={tekst}
      fotoUrl={getOptimizedPhotoUrlFromPhotoEntry(fotoAttributes, 'default')}
      loading={loading}
    />
  )
}
