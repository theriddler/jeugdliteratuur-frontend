import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:1337/graphql/',
  documents: [ 'src/**/*.ts', 'src/**/*.tsx' ],
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
export default config