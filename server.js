import { serve } from 'https://deno.land/std@0.114.0/http/server.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql@1.1.0/mod.ts'
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools@0.0.2/mod.ts'
import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = { Query: { hello: () => `Hello World!` } }

const GQL_ROUTE = new URLPattern({ pathname: '/graphql' })
const INDEX_ROUTE = new URLPattern({ pathname: '/' })
const STYLE_ROUTE = new URLPattern({ pathname: '/style.css' })
const HELLO_ROUTE = new URLPattern({ pathname: '/hello.js' })

const INDEX_HTML = await Deno.readFile('public/index.html')
const STYLE_CSS = await Deno.readFile('public/style.css')
const HELLO_JS = await Deno.readFile('public/hello.js')

async function handler(req) {
  console.log(req.url, req.method)

  if (GQL_ROUTE.exec(req.url)) {
    return await GraphQLHTTP({
      schema: makeExecutableSchema({ resolvers, typeDefs }),
      graphiql: true
    })(req)
  }

  if (INDEX_ROUTE.exec(req.url)) {
    return new Response(INDEX_HTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    })
  }

  if (STYLE_ROUTE.exec(req.url)) {
    return new Response(STYLE_CSS, {
      status: 200,
      headers: {
        'Content-Type': 'text/css'
      }
    })
  }

  if (HELLO_ROUTE.exec(req.url)) {
    return new Response(HELLO_JS, {
      status: 200,
      headers: {
        'Content-Type': 'text/javascript'
      }
    })
  }

  return new Response('Not found!', {
    status: 404
  })
}

console.log('Listening on http://localhost:8000')
serve(handler)

