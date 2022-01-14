<script>
  import { query } from "./query.js";

  const posts = `
query {
  posts {
    _id
    title
    body
  }
}
  `;
</script>

<header>
  <h1>TIL</h1>
</header>
<main>
  <section>
    <h2>Posts</h2>
    <a href="/new"><b>New Post</b></a>
  </section>
  {#await query(posts) then data}
    {#each data.posts as post}
      <section>
        <aside>
          <h3>{post.title}</h3>
          {post.body}
        </aside>
      </section>
    {/each}
  {/await}
</main>
