import { useLazyQuery } from "@apollo/client";
import { IconTag } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Input, Spinner } from "reactstrap";
import { STERBOEKEN_SECONDARY } from "../App";
import { LEMMATA_FOR_SEARCHBAR, LemmataForSearchbarQueryLemma, TAGS_FOR_SEARCHBAR, TagsForSearchbarQueryTag } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const Searchbar = (props: {
  closeMobileNav: () => void;
  placeholder?: string;
}) => {
  // lazy load search options
  const [ loadLemmata, { data: lemmata, called: lemmataCalled, loading: lemmataLoading } ] = useLazyQuery(LEMMATA_FOR_SEARCHBAR);
  const [ loadTags, { data: tags, called: tagsCalled, loading: tagsLoading } ] = useLazyQuery(TAGS_FOR_SEARCHBAR);

  const called = useMemo(() => lemmataCalled && tagsCalled, [ lemmataCalled, tagsCalled ]);
  const loading = useMemo(() => lemmataLoading || tagsLoading, [ lemmataLoading, tagsLoading ]);

  // guard to prevent re-running loadLemmata / loadTags
  const runQuery = useCallback(async () => {
    if (called) return;
    loadLemmata();
    loadTags();
  }, [ called, loadLemmata, loadTags ])

  // runQuery after 5000ms
  // we also run at the search onFocus if user goes straight to search bar
  useEffect(() => {
    const timer = setTimeout(runQuery, 5000);
    return () => clearTimeout(timer);
  }, [ runQuery ])

  const [ search, setSearch ] = useState('');
  const normalizedSearch = useMemo(() => search.toLowerCase(), [ search ]);
  const searchIncludesData = useCallback((data: (string | undefined | null)[]) => (data?.some(s => s?.toLocaleLowerCase().includes(normalizedSearch))), [ normalizedSearch ])

  const lemmaSuggestions = useMemo(() => {
    if (!search) return undefined;
    return lemmata?.lemmata?.data?.filter(l => (
      searchIncludesData([
        l.attributes?.titel,
        l.attributes?.auteur_voornaam,
        l.attributes?.auter_achternaam,
        l.attributes?.auteur_2_voornaam,
        l.attributes?.auter_2_achternaam,
        l.attributes?.jaar
      ])
    ))

  }, [ lemmata?.lemmata?.data, search, searchIncludesData ])

  const tagSuggestions = useMemo(() => {
    if (!search) return undefined;
    return tags?.tags?.data?.filter(t => (
      searchIncludesData([
        t.attributes?.titel
      ])
    ))
  }, [ search, searchIncludesData, tags?.tags?.data ])

  const hasSuggestions = useMemo(() => (
    (lemmaSuggestions && lemmaSuggestions.length > 0)
    || (tagSuggestions && tagSuggestions.length > 0)
  ), [ lemmaSuggestions, tagSuggestions ])

  return (
    <div className="searchbar-container">
      <Input
        type="search"
        placeholder={props.placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() => setTimeout(() => setSearch(''), 200)}
        onFocus={runQuery}
      />
      {search && loading && (
        <div className="searchbar-dropdown bg-white d-flex justify-content-center align-items-center p-3">
          <Spinner />
        </div>
      )}
      {hasSuggestions && (
        <div className="searchbar-dropdown">
          {tagSuggestions?.map(t => (
            <SearchbarTagSuggestion
              key={t.id}
              t={t}
              search={search}
              closeMobileNav={props.closeMobileNav}
            />
          ))}
          {lemmaSuggestions?.map(l => (
            <SearchbarLemmaSuggestion
              key={l.id}
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
  l: LemmataForSearchbarQueryLemma,
  search: string,
  closeMobileNav: () => void;
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/teksten/${props.l.id}`);
    props.closeMobileNav();
  }

  return (
    <div className="searchbar-lemma-suggestion" onClick={onClick}>
      <div className="image-wrapper fixed xs">
        <img src={getOptimizedPhotoUrlFromPhotoEntry(props.l.attributes?.afbeelding?.data?.attributes)} />
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
        {props.l.attributes?.auteur_2_voornaam && (
          <div className="text-secondary">
            <span>
              <HighlightedText
                text={props.l.attributes?.auteur_2_voornaam}
                highlight={props.search}
              />
            </span>
            <span className="ms-1">
              <HighlightedText
                text={props.l.attributes?.auter_2_achternaam}
                highlight={props.search}
              />
            </span>
          </div>
        )}
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

const SearchbarTagSuggestion = (props: {
  t: TagsForSearchbarQueryTag,
  search: string,
  closeMobileNav: () => void;
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/tag/${props.t.id}`);
    props.closeMobileNav();
  }

  return (
    <div className="searchbar-lemma-suggestion" onClick={onClick}>
      <div className="d-flex align-items-center justify-content-center">
        <IconTag color={STERBOEKEN_SECONDARY} />
      </div>
      <div>
        {props.t.attributes?.titel}
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