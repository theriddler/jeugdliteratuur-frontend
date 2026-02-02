//

import { useCallback } from "react";
import { NavigateFunction } from "react-router";

export const IGNORE_ANCHOR_LINK_SENTRY_CLASSNAME = 'ignore-open-in-new-page'

/**
 * changes all anchor links to open in a new tab
 * if the link is internal to the side "https://www.sterboeken.org" we use React navigate
 * @returns a cleanAnchorLinks hook
 */
export const useCleanAnchorLinks = (navigate: NavigateFunction) => {
  // change all <a> links in fetched lemma to have target = '_blank'
  // force open in a new tab
  const cleanAnchorLinks = useCallback(() => {
    const root = document.getElementById('root');
    const links = root?.querySelectorAll('a');
    for (const link of (links ?? [])) {

      // do not change target if we say not to
      if (link.className.includes(IGNORE_ANCHOR_LINK_SENTRY_CLASSNAME)) continue;

      // convert into a react navigatior if internal to our site
      const sterboekenUrlString = 'https://www.sterboeken.org'
      if (link.href.includes(sterboekenUrlString)) {
        link.onclick = (e) => {
          e.preventDefault(); // ignore opening with <a>
          navigate(link.href.replace(sterboekenUrlString, '')) // convert to a react navigate
        }
      }

      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  }, [ navigate ])

  return cleanAnchorLinks;
}