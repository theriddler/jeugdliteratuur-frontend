import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { DIDACTISCHE_TIPS } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const VerdiependLezen = () => {
  const { data, loading } = useQuery(DIDACTISCHE_TIPS);
  const didachiteTips = data?.didachiteTips?.data;

  return (
    <InfoPage
      titel="Verdiepend lezen"
      tekst={didachiteTips?.attributes?.tekst}
      fotoUrl={getOptimizedPhotoUrlFromPhotoEntry(didachiteTips?.attributes?.foto?.data?.attributes, 'default')}
      loading={loading}
    />
  )
}