<script>
  import { goto, stores } from "@sapper/app";
  import * as api from "../../utils/api/index.js";

  import Voter from "../Voter.svelte";
  import formatDistanceToNow from "date-fns/formatDistanceToNow";
  const { session } = stores();

  export let post;
  export let inList = false;

  // Computed variables to use in the component
  $: domain = post.type === "link" ? new URL(post.content).hostname : "self";

  $: postLink = `/post/${post._id}`;

  $: link = post.type === "link" ? post.content : postLink;
  $: commentsCountTitle =
    post.commentsCount === 0
      ? "no comments"
      : `${post.commentsCount} comment${post.commentsCount > 1 ? "s" : ""}`;

  $: date = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  $: ispostOwner = post.user._id === ($session.user && $session.user._id);

  function upvote() {
    post.score++;
    api.posts.upvotePost({ postId: post._id });
  }

  async function deletepost() {
    await api.posts.deletePost({
      postId: post._id,
      token: $session.token,
    });
    goto("/");
  }
</script>

<style>
  .post-item {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    margin: 0.7rem 0 0.7rem 0;
    background-color: rgb(255, 255, 255);
    border-radius: 0.3rem;

    font-size: large;
  }
  .domain {
    border: 1px solid grey;
    padding: 1px 8px 1px 8px;
    border-radius: 1rem;
    font-size: small;
  }

  .layout-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .main {
    padding-left: 1rem;
  }
  .title {
    font-size: x-large;
    text-decoration: none;
  }
</style>

<li class="post-item">
  <div class="layout-wrapper">
    <Voter score={post.score} on:upvote={upvote} />
    
    <div class="main">
      <div class="details">
        <a class="title" href={link} rel="prefetch"> {post.title} </a>
        <span class="domain"> {domain} </span>
        {#if !inList && ispostOwner}
          <div class="post-actions">
            <a class="post-action-button" href={`post/${post._id}/edit`}>
              edit
            </a>
            <span class="post-action-button" on:click={deletepost}>
              delete
            </span>
          </div>
        {/if}
      </div>
      <div class="byline">
        by
        {post.user.username}
        {date}
        |
        <a class="comments-link" href={postLink} rel="prefetch">
          {commentsCountTitle}
        </a>
      </div>
    </div>
  </div>
</li>
