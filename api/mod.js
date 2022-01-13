import { GraphQLHTTP } from 'gql'
import { makeExecutableSchema } from 'graphql_tools'
import { gql } from 'graphql_tag'

const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    body: String
    published: Boolean
  }

  type Result {
    ok: Boolean
    id: String
  }

  type Query {
    hello: String
    post(id: ID!): Post
    posts: [Post]

  }

  type Mutation {
    createPost(title: String, body: String, publish: Boolean): Result!
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
    post(parent, args, context, info) {
      return Promise.resolve({ id: '1', title: 'Hello', body: 'World', published: false }) //hyper.data.get(args.id)
    }
  },
  Mutation: {
    createPost(parent, args, context, info) {
      return Promise.resolve({ ok: true, id: '1' })
    }
  }
}

export const api = async (req) => await GraphQLHTTP({
  schema: makeExecutableSchema({ resolvers, typeDefs }),
  graphiql: true
})(req)