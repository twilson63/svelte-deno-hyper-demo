import { GraphQLHTTP } from 'gql'
import { makeExecutableSchema } from 'graphql_tools'
import { gql } from 'graphql_tag'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = { Query: { hello: () => `Hello World!` } }

export const gql = async (req) => await GraphQLHTTP({
  schema: makeExecutableSchema({ resolvers, typeDefs }),
  graphiql: true
})(req)