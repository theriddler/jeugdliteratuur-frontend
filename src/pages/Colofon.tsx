import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { COLOFON } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const Colofon = () => {
  const { data, loading } = useQuery(COLOFON);
  const colofon = data?.colofon?.data;

  return (
    <InfoPage
      titel="Colofon"
      tekst={colofon?.attributes?.tekst}
      fotoUrl={getOptimizedPhotoUrlFromPhotoEntry(colofon?.attributes?.foto?.data?.attributes, 'medium')}
      loading={loading}
    />
  )
}