import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Link, NavLink } from "react-router";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";
import { LEMMATA_FOR_ALLE_LEMMAS, LemmataForAlleLemmasQueryLemma } from "../queries";
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
  l: LemmataForAlleLemmasQueryLemma,
  sortType: LemmaSortType
}) => {
  const { id, attributes } = props.l;

  return (
    <Link className="link-unstyled" to={`/teksten/${id}`}>
      <tr>
        {props.sortType === LemmaSortType.BY_GROUP && (
          <>
            <td>
              {attributes?.niveau?.data?.attributes?.titel}
            </td>
            <td>
              <div>
                {attributes?.auter_achternaam}
              </div>
              {attributes?.auter_2_achternaam && (
                <div>
                  {attributes?.auter_2_achternaam}
                </div>
              )}
            </td>
            <td>
              <div>
                {attributes?.auteur_voornaam}
              </div>
              {attributes?.auteur_2_voornaam && (
                <div>
                  {attributes?.auteur_2_voornaam}
                </div>
              )}
            </td>
          </>
        )}
        {props.sortType === LemmaSortType.BY_NAME && (
          <>
            <td>
              <div>
                {attributes?.auter_achternaam}
              </div>
              {attributes?.auter_2_achternaam && (
                <div>
                  {attributes?.auter_2_achternaam}
                </div>
              )}
            </td>
            <td>
              <div>
                {attributes?.auteur_voornaam}
              </div>
              {attributes?.auteur_2_voornaam && (
                <div>
                  {attributes?.auteur_2_voornaam}
                </div>
              )}
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
    </Link >
  )
}