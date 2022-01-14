<script>
  import { router } from "tinro";
  import { query } from "./query.js";

  function build(title, body) {
    return `
mutation {
  createPost(title:"${title}", body:"${body}") {
    ok
  }
}`;
  }

  function handleSubmit(e) {
    const fd = new FormData(e.target);
    const [title, body] = fd.values();
    query(build(title, body))
      .then((res) => console.log(res))
      .then((_) => router.goto("/"));
  }
</script>

<header>
  <h1>New Post</h1>
</header>
<main>
  <section>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="title">Title</label>
        <input id="title" name="title" />
      </div>
      <div>
        <textarea placeholder="content" id="body" name="body" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </section>
</main>
