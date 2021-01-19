<script>
  import { stores } from "@sapper/app";
  import * as api from "../../utils/api/index.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const { session } = stores();
  export let postId;

  let comment = {
    content: "",
    parent: null,
  };
  let inProgress = false;
  async function submit() {
    inProgress = true;
    const newComment = await api.posts.addComment({
      postId,
      comment,
      token: $session.user.token,
    });
    inProgress = false;
    comment = {
      content: "",
      parent: null,
    };
    dispatch("created", { comment: newComment });
  }
</script>

<style>
  .comment-form {
    display: flex;
    flex-direction: column;
  }

  textarea {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 1rem;
    min-height: 4rem;
    min-width: 20rem;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }

  button {
    display: inline;
    padding: 0.2rem 2.5rem 0.2rem 2.5rem;
    background-color: rgb(255, 62, 0);
    color: white;
    border: 0;
    border-radius: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    font-size: large;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
  }
</style>

<form class="comment-form" on:submit|preventDefault={submit}>
  <textarea
    class="comment-input"
    bind:value={comment.content}
    placeholder={$session.user ? 'Write your comment' : 'Log in to comment'}
    disabled={inProgress || !$session.user}
    required />

  {#if $session.user}
    <div style="margin-top: 1rem; ">
      <button class="add-comment-button primary-button" style="float: right;" disabled={inProgress}>
        Add Comment
      </button>
    </div>
  {/if}
</form>
