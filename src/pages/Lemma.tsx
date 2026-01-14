/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { LemmaDocumentReact } from "../components/LemmaDocumentReact";
import { LEMMA, VOORLEZEN } from "../queries";

export const Lemma = () => {
  const navigate = useNavigate();
  const { lemmaId } = useParams();

  const { data: lemma, loading: loadingLemmata } = useQuery(LEMMA, { variables: { id: lemmaId ?? '' } });
  const levelData = lemma?.lemma?.data?.attributes?.niveau?.data;

  const { data: voorlezenData, loading: loadingVoorlezen } = useQuery(VOORLEZEN);
  const voorlezen = useMemo(() => voorlezenData?.voorlezen?.data, [ voorlezenData?.voorlezen?.data ])

  // plausible tracking
  useEffect(() => {
    if (!loadingLemmata && lemma) {

      // make custom Lemma event
      const lemma_title = lemma.lemma?.data?.attributes?.titel;
      (window as any).plausible('Lemma', { props: { Lemma: lemma_title } })
    }
  }, [ lemma, loadingLemmata ])

  return (
    <div>
      {(loadingLemmata || loadingVoorlezen)
        ? (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <FullPageSpinner />
          </div>
        )
        : (
          <div>
            {levelData && (
              <Link to={`/groep/${levelData.id}`}>
                {levelData.attributes?.titel}
              </Link>
            )}
            <LemmaDocumentReact lemma={lemma?.lemma?.data} voorlezen={voorlezen} navigate={navigate} />
          </div>
        )
      }
    </div >
  )
}