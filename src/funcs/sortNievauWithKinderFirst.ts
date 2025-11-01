import { NiveauEntity } from "../gql/graphql";

export const sortNievauWithKinderFirst = (a: NiveauEntity | undefined | null, b: NiveauEntity | undefined | null) => (
  a?.attributes?.titel?.includes('Kind') ? -1 : b?.attributes?.titel?.includes('Kind') ? 1
    : a?.attributes?.titel?.localeCompare(b?.attributes?.titel ?? '') ?? 0
)