import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";
import { LEMMATA_FOR_ALLE_LEMMAS, LemmataForSearchbarQueryLemma } from "../queries";
import { LemmaSortType } from "../types";
import { FullPageSpinner } from "./FullPageSpinner";

export const LemmaTable = (props: {
  sortType: LemmaSortType
}) => {
  const { data, loading } = useQuery(LEMMATA_FOR_ALLE_LEMMAS);

  const sortedLemmas = useMemo(() => {
    const output = [ ...(data?.lemmata?.data ?? []) ];
    output.sort((a, b) => props.sortType === LemmaSortType.BY_NAME
      ? (a.attributes?.auter_achternaam ?? '').localeCompare(b.attributes?.auter_achternaam ?? '')
      : sortNievauWithKinderFirst(a.attributes?.niveau?.data, b.attributes?.niveau?.data)
    );
    return output;
  }, [ data?.lemmata?.data, props.sortType ])

  if (loading) return <FullPageSpinner />

  return (
    <table>
      <thead>
        <tr>
          {props.sortType === LemmaSortType.BY_GROUP && (
            <>
              <th>Groep</th>
              <th>Achternaam</th>
              <th>Voornaam</th>
            </>
          )}
          {props.sortType === LemmaSortType.BY_NAME && (
            <>
              <th>Achternaam</th>
              <th>Voornaam</th>
              <th>Groep</th>
            </>
          )}
          <th>Titel</th>
        </tr>
      </thead>
      <tbody>
        {sortedLemmas?.map(l => <LemmaTableRow l={l} sortType={props.sortType} />)}
      </tbody>
    </table>
  )
}

const LemmaTableRow = (props: {
  l: LemmataForSearchbarQueryLemma,
  sortType: LemmaSortType
}) => {
  const navigate = useNavigate();
  const { id, attributes } = props.l;

  return (
    <tr onClick={() => navigate(`/teksten/${id}`)}>
      {props.sortType === LemmaSortType.BY_GROUP && (
        <>
          <td>
            {attributes?.niveau?.data?.attributes?.titel}
          </td>
          <td>
            {attributes?.auter_achternaam}
          </td>
          <td>
            {attributes?.auteur_voornaam}
          </td>
        </>
      )}
      {props.sortType === LemmaSortType.BY_NAME && (
        <>
          <td>
            {attributes?.auter_achternaam}
          </td>
          <td>
            {attributes?.auteur_voornaam}
          </td>
          <td>
            {attributes?.niveau?.data?.attributes?.titel}
          </td>
        </>
      )}
      <td>
        <NavLink to={`/teksten/${id}`}>
          {attributes?.titel}
        </NavLink>
      </td>
    </tr>
  )
}