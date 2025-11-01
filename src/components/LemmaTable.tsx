import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { LEMMATA, LemmataQueryLemma } from "../queries";
import { FullPageSpinner } from "./FullPageSpinner";
import { NavLink } from "react-router";
import { LemmaSortType } from "../types";

export const LemmaTable = (props: {
  sortType: LemmaSortType
}) => {
  const { data, loading } = useQuery(LEMMATA);

  const sortedLemmas = useMemo(() => {
    const output = [ ...(data?.lemmata?.data ?? []) ];
    output.sort((a, b) => props.sortType === LemmaSortType.BY_NAME
      ? (a.attributes?.auter_achternaam ?? '').localeCompare(b.attributes?.auter_achternaam ?? '')
      : (a.attributes?.niveau?.data?.attributes?.titel ?? '')?.localeCompare(b.attributes?.niveau?.data?.attributes?.titel ?? '')
    );
    return output;
  }, [ data?.lemmata?.data, props.sortType ])

  if (loading) return <FullPageSpinner />

  return (
    <table>
      <thead>
        <tr>
          {/* <th>Cover</th> */}
          <th>Groep</th>
          <th>Achternaam</th>
          <th>Voornaam</th>
          <th>Titel</th>
          {/* <th>Korte intro</th> */}
        </tr>
      </thead>
      <tbody>
        {sortedLemmas?.map(l => <LemmaTableRow l={l} />)}
      </tbody>
    </table>
  )
}

const LemmaTableRow = (props: {
  l: LemmataQueryLemma
}) => {
  const { id, attributes } = props.l;

  return (
    <tr>
      {/* <td>
        <div className="image-wrapper xs fixed">
          <img src={attributes?.afbeelding?.data?.attributes?.url} />
        </div>
      </td> */}
      <td>
        {attributes?.niveau?.data?.attributes?.titel}
      </td>
      <td>
        {attributes?.auter_achternaam}
      </td>
      <td>
        {attributes?.auteur_voornaam}
      </td>
      <td>
        <NavLink to={`/lemma/${id}`}>
          {attributes?.titel}
        </NavLink>
      </td>
      {/* <td>
        {attributes?.korte_intro && (
          <BlocksRenderer content={attributes?.korte_intro} />
        )}
      </td> */}
    </tr>
  )
}