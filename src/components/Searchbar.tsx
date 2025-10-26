import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "reactstrap";
import { LemmataQueryLemma } from "../queries";
import { LEMMATA } from "../queries";

export const Searchbar = (props: {
  closeMobileNav: () => void;
  placeholder?: string;
}) => {
  const { data: lemmas } = useQuery(LEMMATA);

  const [ search, setSearch ] = useState('');
  const suggestions = useMemo(() => {
    if (!search) return undefined;
    return lemmas?.lemmata?.data?.filter(l => (
      l.attributes?.titel?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
      || l.attributes?.auteur_voornaam?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
      || l.attributes?.auter_achternaam?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
      || l.attributes?.jaar?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
    ))
  }, [ lemmas?.lemmata?.data, search ])

  return (
    <div className="searchbar-container">
      <Input
        type="search"
        placeholder={props.placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() => setTimeout(() => setSearch(''), 100)}
      />
      {suggestions && suggestions.length > 0 && (
        <div className="searchbar-dropdown">
          {suggestions.map(l => (
            <SearchbarLemmaSuggestion
              l={l}
              search={search}
              closeMobileNav={props.closeMobileNav}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const SearchbarLemmaSuggestion = (props: {
  l: LemmataQueryLemma,
  search: string,
  closeMobileNav: () => void;
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/lemma/${props.l.id}`);
    props.closeMobileNav();
  }

  return (
    <div className="searchbar-lemma-suggestion" onClick={onClick}>
      <div className="image-wrapper fixed xs">
        <img src={props.l.attributes?.afbeelding?.data?.attributes?.url} />
      </div>
      <div>
        <div className="text-secondary">
          <span>
            <HighlightedText
              text={props.l.attributes?.auteur_voornaam}
              highlight={props.search}
            />
          </span>
          <span className="ms-1">
            <HighlightedText
              text={props.l.attributes?.auter_achternaam}
              highlight={props.search}
            />
          </span>
        </div>
        <div className="mt-1">
          <span>
            <HighlightedText
              text={props.l.attributes?.titel}
              highlight={props.search}
            />
          </span>
          <span className="ms-1">
            (<HighlightedText
              text={props.l.attributes?.jaar}
              highlight={props.search}
            />)
          </span>
        </div>
      </div>
    </div>
  )
}

const HighlightedText = (props: {
  text: string | undefined | null,
  highlight: string
}) => {
  if (!props.text) return null;
  const capturePattern = `(${props.highlight})`
  const regex = new RegExp(capturePattern, 'gi')
  const arraySplitOnHighlight = props.text?.split(regex);

  return (
    <span>
      {arraySplitOnHighlight?.map((section, i) => (
        // odd indexes were matches
        <span className={i % 2 === 1 ? 'fw-bold' : ''}>
          {section}
        </span>
      ))}
    </span>
  )
}