<script>
    import CommentInput from './_CommentInput.svelte'
    import Comment from './_Comment.svelte'
    import * as api from '../../utils/api/index.js'
    export let postId
    let comments
    $: postId && loadData()
    async function loadData () {
      comments = await api.posts.getPostComments({ postId })
    }
  </script>
  
  <style>
    .comment-list {
      margin-top: 1rem;
    }

  </style>

  <CommentInput
    {postId}
    on:created="{({ detail }) => comments = [...comments, detail.comment]}"
  />
  
  <div class="comment-list">
    {#if !comments}
      <span class="loading-comments">
        Loading comments...
      </span>
    {:else if comments.length === 0}
      <span class="no-comments">
        No comments!
      </span>
    {:else}
      {#each comments as comment (comment._id)}
        <Comment
          {comment}
          {postId}
        />
      {/each}
    {/if}
  </div>