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
    "\n  query Lemma($documentId: ID!) {\n    lemma(documentId: $documentId) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n      hetVerhaal\n      motieven\n      doelgroep\n      analyse\n      lessuggesties\n      kerndoelen\n      extra_data\n      bronnen\n      opstaptitels {\n        opstaptitels {\n          documentId\n          titel\n          beschrijving\n          auteurVoornaam\n          auterAchternaam\n          jaar\n        }\n      }\n      opstaptitels_extern\n      verder_lezen {\n        documentId\n        titel\n        beschrijving\n        auteurVoornaam\n        auterAchternaam\n        jaar\n      }\n      verder_lezen_extern\n      niveau {\n        title\n        documentId\n        description\n      }\n      tags {\n        documentId\n        titel\n        beschrijving\n      }\n    }\n  }\n": typeof types.LemmaDocument,
    "\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n    }\n  }\n": typeof types.LemmasByLevelDocument,
    "\n  query Levels {\n    levels {\n      documentId\n      title\n      description\n    }\n  }\n": typeof types.LevelsDocument,
    "\n  query Introduction {\n    introduction {\n      Data\n    }\n  }\n": typeof types.IntroductionDocument,
};
const documents: Documents = {
    "\n  query Lemma($documentId: ID!) {\n    lemma(documentId: $documentId) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n      hetVerhaal\n      motieven\n      doelgroep\n      analyse\n      lessuggesties\n      kerndoelen\n      extra_data\n      bronnen\n      opstaptitels {\n        opstaptitels {\n          documentId\n          titel\n          beschrijving\n          auteurVoornaam\n          auterAchternaam\n          jaar\n        }\n      }\n      opstaptitels_extern\n      verder_lezen {\n        documentId\n        titel\n        beschrijving\n        auteurVoornaam\n        auterAchternaam\n        jaar\n      }\n      verder_lezen_extern\n      niveau {\n        title\n        documentId\n        description\n      }\n      tags {\n        documentId\n        titel\n        beschrijving\n      }\n    }\n  }\n": types.LemmaDocument,
    "\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n    }\n  }\n": types.LemmasByLevelDocument,
    "\n  query Levels {\n    levels {\n      documentId\n      title\n      description\n    }\n  }\n": types.LevelsDocument,
    "\n  query Introduction {\n    introduction {\n      Data\n    }\n  }\n": types.IntroductionDocument,
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
export function graphql(source: "\n  query Lemma($documentId: ID!) {\n    lemma(documentId: $documentId) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n      hetVerhaal\n      motieven\n      doelgroep\n      analyse\n      lessuggesties\n      kerndoelen\n      extra_data\n      bronnen\n      opstaptitels {\n        opstaptitels {\n          documentId\n          titel\n          beschrijving\n          auteurVoornaam\n          auterAchternaam\n          jaar\n        }\n      }\n      opstaptitels_extern\n      verder_lezen {\n        documentId\n        titel\n        beschrijving\n        auteurVoornaam\n        auterAchternaam\n        jaar\n      }\n      verder_lezen_extern\n      niveau {\n        title\n        documentId\n        description\n      }\n      tags {\n        documentId\n        titel\n        beschrijving\n      }\n    }\n  }\n"): (typeof documents)["\n  query Lemma($documentId: ID!) {\n    lemma(documentId: $documentId) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n      hetVerhaal\n      motieven\n      doelgroep\n      analyse\n      lessuggesties\n      kerndoelen\n      extra_data\n      bronnen\n      opstaptitels {\n        opstaptitels {\n          documentId\n          titel\n          beschrijving\n          auteurVoornaam\n          auterAchternaam\n          jaar\n        }\n      }\n      opstaptitels_extern\n      verder_lezen {\n        documentId\n        titel\n        beschrijving\n        auteurVoornaam\n        auterAchternaam\n        jaar\n      }\n      verder_lezen_extern\n      niveau {\n        title\n        documentId\n        description\n      }\n      tags {\n        documentId\n        titel\n        beschrijving\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query LemmasByLevel($filters: LemmaFiltersInput) {\n    lemmata(filters: $filters) {\n      documentId\n      titel\n      beschrijving\n      auteurVoornaam\n      auterAchternaam\n      jaar\n      afbeelding {\n        name\n        width\n        height\n        provider\n        provider_metadata\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Levels {\n    levels {\n      documentId\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query Levels {\n    levels {\n      documentId\n      title\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Introduction {\n    introduction {\n      Data\n    }\n  }\n"): (typeof documents)["\n  query Introduction {\n    introduction {\n      Data\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;