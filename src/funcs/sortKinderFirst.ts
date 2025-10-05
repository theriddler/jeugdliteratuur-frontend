import { NiveauEntity } from "../gql/graphql";

export const sortKinderFirst = (a: NiveauEntity, b: NiveauEntity) => (
  a.attributes?.titel?.includes('Kind') ? -1 : b.attributes?.titel?.includes('Kind') ? 1
    : a.attributes?.titel?.localeCompare(b?.attributes?.titel ?? '') ?? 0
)