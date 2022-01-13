import { serve, serveStatic } from 'sift'
import { api } from './api/mod.js'

serve({
  '/': serveStatic('public/index.html', { baseUrl: import.meta.url }),
  '/build/bundle.css': serveStatic('public/build/bundle.css', { baseUrl: import.meta.url }),
  '/build/bundle.js': serveStatic('public/build/bundle.js', { baseUrl: import.meta.url }),
  '/favicon.png': serveStatic('public/favicon.png', { baseUrl: import.meta.url }),
  '/graphql': api
})

/*
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

*/
