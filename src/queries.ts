import { graphql } from "./gql";

export const LEMMA = graphql(`
  query Lemma($id: ID!) {
    lemma(id: $id) {
      data {
        id
        attributes{
          titel
          de_kern
          auteur_voornaam
          auter_achternaam
          jaar
          afbeelding {
            data{
              id
              attributes{
                name
                width
                height
                provider
                provider_metadata
                url
              }
            }
          }
          het_verhaal
          motieven
          doelgroep
          analyse
          lessuggesties
          kerndoelen
          bronnen
          opstaptitels {
            data{
              id
              attributes{
                titel
                de_kern
                auteur_voornaam
                auter_achternaam
                jaar
              }
            }
          }
          opstaptitels_extern
          verder_lezens {
            data{
              id
              attributes{
                titel
                de_kern
                auteur_voornaam
                auter_achternaam
                jaar
              }
            }
          }
          verder_lezen_extern
          niveau {
            data{
              id
              attributes{
                titel
                beschrijving
              }
            }
          }
          tags {
            data{
              id
              attributes{
                titel
                beschrijving
              }
            }
          }
        }
      }
    }
  }
`);

export const LEMMAS_BY_LEVEL = graphql(`
  query LemmasByLevel($filters: LemmaFiltersInput) {
    lemmata(filters: $filters) {
      data{
        id
        attributes{
          titel
          de_kern
          auteur_voornaam
          auter_achternaam
          jaar
          afbeelding {
            data{
              id
              attributes{
                name
                width
                height
                provider
                provider_metadata
                url
              }
            }
          }
        }
      }
    }
  }
`);

export const LEVELS = graphql(`
  query Levels {
    niveaus {
      data{
        id
        attributes{
          titel
          beschrijving
        }
      }
    }
  }
`)

export const INTRODUCTION = graphql(`
  query Introduction {
    inleiding {
      data{
        id
        attributes{
          tekst
        }
      }
    }
  }
`)