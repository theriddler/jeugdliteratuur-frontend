import { graphql } from "./gql";

export const LEMMAS_BY_LEVEL = graphql(`
  query LemmasByLevel($filters: LemmaFiltersInput) {
    lemmata(filters: $filters) {
      Title
      Description
      Data
      documentId
    }
  }
`);

export const LEVELS = graphql(`
  query Levels {
    levels {
      documentId
      Title
      Description
    }
  }
`)

export const INTRODUCTION = graphql(`
  query Introduction {
    introduction {
      Text
    }
  }
`)