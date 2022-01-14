# TIL

A microblogging site

## Stack

- Deno
- Typescript
- Svelte
- GraphQL
- hyper (https://hyper.io)

## Features

Secure by protocol, each user, can connect to the app using their phantom
wallet, this gives them the ability to create micro posts, they can only create
1 per day. Hince `today I learned`! The post can only be 500 words, and in
plain-text(markdown).

## Current Status

- [x] http server
- [x] graphql types
- [x] hyper connect
- [x] list posts
- [x] create post
- [ ] add web3 security
- [ ] modify type to support user identifier
- [ ] secure create post endpoint
- [ ] secure create post graphql resolver

## Running development env

### Setup

- create .env file with HYPER connection string
- create index for descending sort
  `deno run -A --unstable --import-map=import_map.json createIndexes.ts`
- `cd app` && `yarn` or `npm install`
- open two terminal windows
  - terminal one - `./scripts/start`
  - terminal two - `cd app && yarn dev`

Dang UUID!
