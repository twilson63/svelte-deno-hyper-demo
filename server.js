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
const STYLE_ROUTE = new URLPattern({ pathname: '/build/bundle.css' })
const JS_ROUTE = new URLPattern({ pathname: '/build/bundle.js' })
const FAVICON_ROUTE = new URLPattern({ pathname: '/favicon.png' })

const INDEX_HTML = await Deno.readFile('public/index.html')
const CSS = await Deno.readFile('public/build/bundle.css')
const JS = await Deno.readFile('public/build/bundle.js')
const FAVICON = await Deno.readFile('public/favicon.png')


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
    return new Response(CSS, {
      status: 200,
      headers: {
        'Content-Type': 'text/css'
      }
    })
  }

  if (FAVICON_ROUTE.exec(req.url)) {
    return new Response(FAVICON, {
      status: 200,
      headers: {
        'Content-Type': 'image/png'
      }
    })
  }

  if (JS_ROUTE.exec(req.url)) {
    return new Response(JS, {
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

