import { serve } from 'https://deno.land/std@0.114.0/http/server.ts'

const GQL_ROUTE = new URLPattern({ pathname: '/graphql' })
const INDEX_ROUTE = new URLPattern({ pathname: '/' })
const STYLE_ROUTE = new URLPattern({ pathname: '/style.css' })
const HELLO_ROUTE = new URLPattern({ pathname: '/hello.js' })

const INDEX_HTML = await Deno.readFile('public/index.html')
const STYLE_CSS = await Deno.readFile('public/style.css')
const HELLO_JS = await Deno.readFile('public/hello.js')

function handler(req) {
  if (GQL_ROUTE.exec(req.url)) {
    return new Response(`graphql route`)
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

