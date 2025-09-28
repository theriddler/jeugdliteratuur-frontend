import { gql } from "@apollo/client";

export const LIST_LEMMAS = gql`
  query ListLemmas {
    lemmata {
      Title
      Details
      documentId
    }
  }
`;