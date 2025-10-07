import { graphql } from "./gql";

export const LEMMA = graphql(`
  query Lemma($id: ID!) {
    lemma(id: $id) {
      data {
        id
        attributes{
          titel
          korte_intro
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
                korte_intro
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
                korte_intro
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

export const LEVEL = graphql(`
  query Level($id: ID!){
    niveau(id: $id){
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

export const LEMMAS_BY_LEVEL = graphql(`
  query LemmasByLevel($filters: LemmaFiltersInput) {
    lemmata(filters: $filters) {
      data{
        id
        attributes{
          titel
          korte_intro
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
          foto {
            data{
              id
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
`)

export const OVER_HET_PROJECT = graphql(`
  query OverHetProject {
    overHetProject {
      data{
        id
        attributes{
          Tekst
          foto {
            data{
              id
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
`)

export const SAMENWERKEN = graphql(`
  query Samenwerken {
    samenwerken {
      data{
        id
        attributes{
          Tekst
        }
      }
    }
  }
`)

export const COLOFON = graphql(`
  query Colofon {
    colofon {
      data{
        id
        attributes{
          tekst
        }
      }
    }
  }
`)


export const GEBRUIK_VAN_DE_LIJST = graphql(`
  query GebruikVanDeLijst {
    gebruikVanDeLijst {
      data{
        id
        attributes{
          Tekst
        }
      }
    }
  }
`)