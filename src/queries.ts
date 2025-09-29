import { graphql } from "./gql";

export const LEMMA = graphql(`
  query Lemma($documentId: ID!) {
    lemma(documentId: $documentId) {
      documentId
      titel
      beschrijving
      auteurVoornaam
      auterAchternaam
      jaar
      afbeelding {
        name
        width
        height
        provider
        provider_metadata
        url
      }
      hetVerhaal
      motieven
      doelgroep
      analyse
      lessuggesties
      kerndoelen
      extra_data
      bronnen
      opstaptitels {
        opstaptitels {
          documentId
          titel
          beschrijving
          auteurVoornaam
          auterAchternaam
          jaar
        }
      }
      opstaptitels_extern
      verder_lezen {
        documentId
        titel
        beschrijving
        auteurVoornaam
        auterAchternaam
        jaar
      }
      verder_lezen_extern
      niveau {
        title
        documentId
        description
      }
      tags {
        documentId
        titel
        beschrijving
      }
    }
  }
`);

export const LEMMAS_BY_LEVEL = graphql(`
  query LemmasByLevel($filters: LemmaFiltersInput) {
    lemmata(filters: $filters) {
      documentId
      titel
      beschrijving
      auteurVoornaam
      auterAchternaam
      jaar
      afbeelding {
        name
        width
        height
        provider
        provider_metadata
        url
      }
    }
  }
`);

export const LEVELS = graphql(`
  query Levels {
    levels {
      documentId
      title
      description
    }
  }
`)

export const INTRODUCTION = graphql(`
  query Introduction {
    introduction {
      Data
    }
  }
`)