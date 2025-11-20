import { graphql } from "./gql";
import { LemmaQuery, LemmataPicturesByGroepQuery, LemmataQuery } from "./gql/graphql";


export type LemmataByGroepQueryLemma = NonNullable<LemmataPicturesByGroepQuery[ 'lemmata' ]>[ 'data' ][ 0 ];
export const LEMMATA_BY_GROEP = graphql(`
  query LemmataPicturesByGroep($niveauId: ID!) {
    lemmata(filters: {niveau: {id: {eq: $niveauId}}}){
      data{
        id
        attributes{
          titel
          korte_intro
          auteur_voornaam
          auter_achternaam
          auteur_2_voornaam
          auter_2_achternaam
          jaar
          afbeelding {
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

export type LemmataQueryLemma = NonNullable<LemmataQuery[ 'lemmata' ]>[ 'data' ][ 0 ];
export const LEMMATA = graphql(`
  query Lemmata {
    lemmata(pagination: {page: 1, pageSize: 500}) {
      data {
        id
        attributes{
          titel
          korte_intro
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

export type LemmaQueryLemma = NonNullable<LemmaQuery[ 'lemma' ]>[ 'data' ];

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
          auteur_2_voornaam
          auter_2_achternaam
          vertaald_door_voornaam
          vertaald_door_achternaam
          jaar
          link_naar_jeugdbibliotheek
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
          verder_lezen_extern
          parallel_lezens {
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
          parallel_lezen_extern
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
`)

export const TAG = graphql(`
  query Tag($id: ID!) {
    tag(id: $id) {
      data{
        id
        attributes{
          titel
          beschrijving
          lemmas{
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
      }
    }
  }
`)

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

export const COLOFON = graphql(`
  query Colofon {
    colofon {
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


export const GEBRUIK_VAN_DE_LIJST = graphql(`
  query GebruikVanDeLijst {
    gebruikVanDeLijst {
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

export const VOORLEZEN = graphql(`
  query Voorlezen {
    voorlezen {
      data{
        id
        attributes{
          tekst
        }
      }
    }
  }
`)