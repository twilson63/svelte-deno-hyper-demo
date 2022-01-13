import { GraphQLHTTP } from 'gql'
import "https://deno.land/x/dotenv@v3.1.0/load.ts"
import { makeExecutableSchema } from 'graphql_tools'
import { gql } from 'graphql_tag'
import { connect } from 'hyper-connect'
import { cuid } from 'cuid'


const hyper = connect(Deno.env.get('HYPER'))

const typeDefs = gql`
  type Post {
    _id: ID!
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
      return hyper.data.get(args.id)
    },
    async posts(parent, args, context, info) {
      return (await hyper.data.query({
        type: 'post'
      })).docs
    }
  },
  Mutation: {
    createPost(parent, args, context, info) {
      const post = { _id: `post-${cuid()}`, type: 'post', ...args }
      return hyper.data.add(post)
    }
  }
}

export const api = async (req) => await GraphQLHTTP({
  schema: makeExecutableSchema({ resolvers, typeDefs }),
  graphiql: true
})(req)