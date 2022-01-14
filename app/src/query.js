export function query(query) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(x => x.data)
}