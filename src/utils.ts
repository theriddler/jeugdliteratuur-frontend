import { UploadFile } from "./gql/graphql";

export const getOptimizedPhotoUrlFromPhotoEntry = (f: Partial<UploadFile> | undefined | null, size: 'thumbnail' | 'small' | 'medium' | 'large' = 'small') => {
  return f?.formats?.[ size ]?.url || f?.url
}