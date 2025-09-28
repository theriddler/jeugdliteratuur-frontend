import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://renowned-chocolate-b2365884fe.strapiapp.com/graphql/',
  documents: [ 'src/**/*.ts', 'src/**/*.tsx' ],
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
export default config