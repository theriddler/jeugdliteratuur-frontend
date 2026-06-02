import partner_logo_1 from '../assets/partner_logo_1.jpg';
import partner_logo_2 from '../assets/partner_logo_2.png';
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
      titleRightElement={
        <div className="d-flex gap-3 align-items-center">
          <a target="_blank" href="https://www.kb.nl/">
            <div className="image-wrapper partner-logo">
              <img src={partner_logo_2} />
            </div>
          </a>
          <a target="_blank" href="https://www.lezen.nl/">
            <div className="image-wrapper partner-logo">
              <img src={partner_logo_1} />
            </div>
          </a>
        </div>
      }
      tekst={colofon?.attributes?.tekst}
      fotoUrl={getOptimizedPhotoUrlFromPhotoEntry(colofon?.attributes?.foto?.data?.attributes, 'default')}
      loading={loading}
    />
  )
}