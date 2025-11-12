import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaDocumentReact } from "../components/LemmaDocument";
import { LEMMA, VOORLEZEN } from "../queries";

export const Lemma = () => {
  const navigate = useNavigate();
  const { lemmaId } = useParams();

  const { data: lemma, loading: loadingLemmata } = useQuery(LEMMA, { variables: { id: lemmaId ?? '' } });

  const { data: voorlezenData, loading: loadingVoorlezen } = useQuery(VOORLEZEN);
  const voorlezen = useMemo(() => voorlezenData?.voorlezen?.data, [ voorlezenData?.voorlezen?.data ])

  return (
    <div>
      {loadingLemmata || loadingVoorlezen && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <FullPageSpinner />
        </div>
      )}
      <LemmaDocumentReact lemma={lemma?.lemma?.data} voorlezen={voorlezen} navigate={navigate} />
    </div >
  )
}