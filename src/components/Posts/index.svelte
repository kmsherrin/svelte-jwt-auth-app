<script>
  import { stores } from "@sapper/app";
  import * as api from "../../utils/api/index.js";

  import Post from "./Post.svelte";
  const { page } = stores();
  export let currentPage;

  let limit = 10;
  let posts;
  let postsCount;
  let error = null;
  let loaded = false;

  $: sort = $page.query.sort || "recent";
  $: offset = (currentPage - 1) * limit;
  $: lastPage = postsCount && Math.ceil(postsCount / limit);
  $: nextPageLink = `/page/${currentPage + 1}?sort=${sort}`;
  $: prevPageLink = `/page/${currentPage - 1}?sort=${sort}`;
  $: currentPage && sort && loadData();
  async function loadData() {
    try {
      posts = null;
      const response = await api.posts.getPosts({
        offset,
        limit,
        sort,
      });

      posts = response.data;
      postsCount = response.totalCount;
    } catch (e) {
      error = e;
    }
  }
</script>

<style>
  ol,
  ul {
    list-style: none;
    padding-left: 0;
  }

  .sort-option {
    display: inline;
    padding: 0.2rem 2.5rem 0.2rem 2.5rem;
    background-color: rgb(240, 240, 250);
    border: 0;
    border-radius: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    font-size: large;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
  }
  .sort-option a {
    text-decoration: none;
  }

  .active {
    background-color: rgb(255,62,0);
    color: white;
  }
</style>

<ul class="sort-options">
  <a href={`/page/${currentPage}?sort=recent`} style="text-decoration: none;">
    <button class="sort-option active" class:active={sort === 'recent'}>
      Recent </button>
  </a>

  <a href={`/page/${currentPage}?sort=top`} style="text-decoration: none;"> 
    <button class="sort-option active" class:active={sort === 'top'}>
      Top
    </button>  
  </a>
</ul>

{#if error}
  {error.stack}
{:else if !posts}
  Loading posts...
{:else if posts.length === 0}
  No posts yet!
{:else}
  <ol class="story-list">
    {#each posts as post (post._id)}
      <Post {post} inList={true} />
    {/each}
  </ol>
{/if}

{#if postsCount && postsCount > limit}
  <div class="pagination-links">
    {#if currentPage > 1}<a href={prevPageLink}> &lt; Back </a>{/if}
    {#if currentPage < lastPage}<a href={nextPageLink}> Next &gt; </a>{/if}
  </div>
{/if}
