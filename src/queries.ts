import { graphql } from "./gql";

export const LIST_LEMMAS = graphql(`
  query ListLemmas {
    lemmata {
      Title
      Details
      documentId
    }
  }
`);