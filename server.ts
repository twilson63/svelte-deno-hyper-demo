import "https://deno.land/x/dotenv@v3.1.0/load.ts"

import { serve, serveStatic } from './deps.ts'
import { core } from './api.ts'

const api = core(Deno.env.get('HYPER') as string)

serve({
  '/': serveStatic('public/index.html', { baseUrl: import.meta.url }),
  '/build/bundle.css': serveStatic('public/build/bundle.css', { baseUrl: import.meta.url }),
  '/build/bundle.js': serveStatic('public/build/bundle.js', { baseUrl: import.meta.url }),
  '/graphql': api
})

