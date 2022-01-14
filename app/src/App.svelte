<script>
	import { Route } from "tinro";
	import Index from "./index.svelte";
	import Post from "./post.svelte";
</script>

<svelte:head>
	<title>TIL</title>
	<link rel="stylesheet" href="https://unpkg.com/mvp.css" />
</svelte:head>

<Route path="/"><Index /></Route>
<Route path="/new"><Post /></Route>
