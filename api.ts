import { GraphQLHTTP, makeExecutableSchema, gql, connect, cuid, SortOptions } from './deps.ts'

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

interface InputId {
  id: string
}

interface PartialPost {
  title: string,
  body: string,
  published: boolean
}

export const core = (env : string) => {
  const hyper = connect(env)

  const resolvers = {
    Query: {
      hello: () => `Hello World!`,
      post(_parent : unknown, { id } : InputId) {
        return hyper.data.get(id)
      },
      async posts() {
        return (await hyper.data.query({
          type: 'post'
        }, { sort: [{_id: SortOptions.DESC}]})).docs
      }
    },
    Mutation: {
      createPost(_parent : unknown, args : PartialPost) {
        const post = { _id: `post-${cuid()}`, type: 'post', ...args }
        return hyper.data.add(post)
      }
    }
  }

  return async (req : Request) => await GraphQLHTTP({
    schema: makeExecutableSchema({ resolvers, typeDefs }),
    graphiql: true
  })(req)

} 