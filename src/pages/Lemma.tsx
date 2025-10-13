import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Spinner } from "reactstrap";
import { LemmaDocumentReact } from "../components/LemmaDocument";
import { LemmaEntity } from "../gql/graphql";
import { LEMMATA } from "../queries";

export const Lemma = () => {
  const { lemmaId } = useParams();

  const { data, loading } = useQuery(LEMMATA);
  const lemma = useMemo(() => data?.lemmata?.data?.find(l => l.id === lemmaId), [ data?.lemmata?.data, lemmaId ])

  return (
    <div>
      {loading && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      )}
      <LemmaDocumentReact lemma={lemma as LemmaEntity} />
    </div >
  )
}