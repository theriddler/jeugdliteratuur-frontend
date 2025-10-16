import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Spinner } from "reactstrap";
import { LemmaDocumentReact } from "../components/LemmaDocument";
import { LEMMATA } from "../queries";

export const Lemma = () => {
  const { lemmaId } = useParams();

  const { data, loading } = useQuery(LEMMATA);
  const lemma = useMemo(() => data?.lemmata?.data?.find(l => l.id === lemmaId), [ data?.lemmata?.data, lemmaId ])
  if (!lemma) return null;

  return (
    <div>
      {loading && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      )}
      <LemmaDocumentReact lemma={lemma} />
    </div >
  )
}