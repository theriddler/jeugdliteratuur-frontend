import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaDocumentReact } from "../components/LemmaDocument";
import { LEMMATA, VOORLEZEN } from "../queries";

export const Lemma = () => {
  const { lemmaId } = useParams();

  const { data: lemmataData, loading: loadingLemmata } = useQuery(LEMMATA);
  const lemma = useMemo(() => lemmataData?.lemmata?.data?.find(l => l.id === lemmaId), [ lemmataData?.lemmata?.data, lemmaId ])

  const { data: voorlezenData, loading: loadingVoorlezen } = useQuery(VOORLEZEN);
  const voorlezen = useMemo(() => voorlezenData?.voorlezen?.data, [ voorlezenData?.voorlezen?.data ])

  return (
    <div>
      {loadingLemmata || loadingVoorlezen && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <FullPageSpinner />
        </div>
      )}
      <LemmaDocumentReact lemma={lemma} voorlezen={voorlezen} />
    </div >
  )
}