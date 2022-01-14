
const toJSON = res => res.json()
const prop = k => o => o[k]
const options = query => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  },
  body: JSON.stringify({ query })
})

export function query(query) {
  return fetch('/graphql', options(query))
    .then(toJSON)
    .then(prop('data'))
}