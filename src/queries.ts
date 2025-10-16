import { graphql } from "./gql";

export const LEMMATA = graphql(`
  query Lemmata {
    lemmata(pagination: {page: 1, pageSize: 500}) {
      data {
        id
        attributes{
          titel
          korte_intro
          de_kern
          auteur_voornaam
          auter_achternaam
          auteur_2_voornaam
          auter_2_achternaam
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
          voorlezen
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