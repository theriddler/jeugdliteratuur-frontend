import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { SELECTIECRITERIA } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const Selectiecriteria = () => {
  const { data, loading } = useQuery(SELECTIECRITERIA);
  const selectiecriteria = data?.selectiecriteria?.data;

  return (
    <InfoPage
      titel="Selectiecriteria"
      tekst={selectiecriteria?.attributes?.tekst}
      fotoUrl={getOptimizedPhotoUrlFromPhotoEntry(selectiecriteria?.attributes?.foto?.data?.attributes, 'default')}
      loading={loading}
    />
  )
}