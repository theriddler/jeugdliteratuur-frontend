/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Lemma($id: ID!) {\n    lemma(id: $id) {\n      data {\n        id\n        attributes{\n          titel\n          korte_intro\n          de_kern\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n          het_verhaal\n          motieven\n          doelgroep\n          analyse\n          lessuggesties\n          kerndoelen\n          bronnen\n          opstaptitels {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          opstaptitels_extern\n          verder_lezens {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          verder_lezen_extern\n          niveau {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n          tags {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.LemmaDocument,
    "\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      data{\n        id\n        attributes{\n          titel\n          korte_intro\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.LemmasByLevelDocument,
    "\n  query Levels {\n    niveaus {\n      data{\n        id\n        attributes{\n          titel\n          beschrijving\n        }\n      }\n    }\n  }\n": typeof types.LevelsDocument,
    "\n  query Introduction {\n    inleiding {\n      data{\n        id\n        attributes{\n          tekst\n          foto {\n            data{\n              id\n              attributes{\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.IntroductionDocument,
    "\n  query OverHetProject {\n    overHetProject {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n": typeof types.OverHetProjectDocument,
    "\n  query Samenwerken {\n    samenwerken {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n": typeof types.SamenwerkenDocument,
    "\n  query Colofon {\n    colofon {\n      data{\n        id\n        attributes{\n          tekst\n        }\n      }\n    }\n  }\n": typeof types.ColofonDocument,
    "\n  query GebruikVanDeLijst {\n    gebruikVanDeLijst {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n": typeof types.GebruikVanDeLijstDocument,
};
const documents: Documents = {
    "\n  query Lemma($id: ID!) {\n    lemma(id: $id) {\n      data {\n        id\n        attributes{\n          titel\n          korte_intro\n          de_kern\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n          het_verhaal\n          motieven\n          doelgroep\n          analyse\n          lessuggesties\n          kerndoelen\n          bronnen\n          opstaptitels {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          opstaptitels_extern\n          verder_lezens {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          verder_lezen_extern\n          niveau {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n          tags {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.LemmaDocument,
    "\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      data{\n        id\n        attributes{\n          titel\n          korte_intro\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.LemmasByLevelDocument,
    "\n  query Levels {\n    niveaus {\n      data{\n        id\n        attributes{\n          titel\n          beschrijving\n        }\n      }\n    }\n  }\n": types.LevelsDocument,
    "\n  query Introduction {\n    inleiding {\n      data{\n        id\n        attributes{\n          tekst\n          foto {\n            data{\n              id\n              attributes{\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.IntroductionDocument,
    "\n  query OverHetProject {\n    overHetProject {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n": types.OverHetProjectDocument,
    "\n  query Samenwerken {\n    samenwerken {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n": types.SamenwerkenDocument,
    "\n  query Colofon {\n    colofon {\n      data{\n        id\n        attributes{\n          tekst\n        }\n      }\n    }\n  }\n": types.ColofonDocument,
    "\n  query GebruikVanDeLijst {\n    gebruikVanDeLijst {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n": types.GebruikVanDeLijstDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Lemma($id: ID!) {\n    lemma(id: $id) {\n      data {\n        id\n        attributes{\n          titel\n          korte_intro\n          de_kern\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n          het_verhaal\n          motieven\n          doelgroep\n          analyse\n          lessuggesties\n          kerndoelen\n          bronnen\n          opstaptitels {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          opstaptitels_extern\n          verder_lezens {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          verder_lezen_extern\n          niveau {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n          tags {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Lemma($id: ID!) {\n    lemma(id: $id) {\n      data {\n        id\n        attributes{\n          titel\n          korte_intro\n          de_kern\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n          het_verhaal\n          motieven\n          doelgroep\n          analyse\n          lessuggesties\n          kerndoelen\n          bronnen\n          opstaptitels {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          opstaptitels_extern\n          verder_lezens {\n            data{\n              id\n              attributes{\n                titel\n                korte_intro\n                auteur_voornaam\n                auter_achternaam\n                jaar\n              }\n            }\n          }\n          verder_lezen_extern\n          niveau {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n          tags {\n            data{\n              id\n              attributes{\n                titel\n                beschrijving\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      data{\n        id\n        attributes{\n          titel\n          korte_intro\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      data{\n        id\n        attributes{\n          titel\n          korte_intro\n          auteur_voornaam\n          auter_achternaam\n          jaar\n          afbeelding {\n            data{\n              id\n              attributes{\n                name\n                width\n                height\n                provider\n                provider_metadata\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Levels {\n    niveaus {\n      data{\n        id\n        attributes{\n          titel\n          beschrijving\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Levels {\n    niveaus {\n      data{\n        id\n        attributes{\n          titel\n          beschrijving\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Introduction {\n    inleiding {\n      data{\n        id\n        attributes{\n          tekst\n          foto {\n            data{\n              id\n              attributes{\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Introduction {\n    inleiding {\n      data{\n        id\n        attributes{\n          tekst\n          foto {\n            data{\n              id\n              attributes{\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OverHetProject {\n    overHetProject {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query OverHetProject {\n    overHetProject {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Samenwerken {\n    samenwerken {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Samenwerken {\n    samenwerken {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Colofon {\n    colofon {\n      data{\n        id\n        attributes{\n          tekst\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Colofon {\n    colofon {\n      data{\n        id\n        attributes{\n          tekst\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GebruikVanDeLijst {\n    gebruikVanDeLijst {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GebruikVanDeLijst {\n    gebruikVanDeLijst {\n      data{\n        id\n        attributes{\n          Tekst\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;