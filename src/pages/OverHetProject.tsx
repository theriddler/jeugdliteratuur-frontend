import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { OVER_HET_PROJECT } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const OverHetProject = () => {
  const { data, loading } = useQuery(OVER_HET_PROJECT);
  const overHetProject = data?.overHetProject?.data;

  return (
    <InfoPage
      titel="Over het project"
      tekst={overHetProject?.attributes?.Tekst}
      fotoUrl={getOptimizedPhotoUrlFromPhotoEntry(overHetProject?.attributes?.foto?.data?.attributes, 'default')}
      loading={loading}
    />
  )
}