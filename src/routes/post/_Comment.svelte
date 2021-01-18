<script>
    import * as api from '../../utils/api/index.js'
    import Voter from '../../components/Voter.svelte'
    import ReplyInput from './_ReplyInput.svelte'
    import formatDistanceToNow from 'date-fns/formatDistanceToNow'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    export let comment
    export let postId
    let showReplyForm = false
    
    $: date = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    function addReply ({ detail }) {
      comment.replies = [...comment.replies, detail.comment]
      dispatch('createdReply', detail.comment)
      showReplyForm = false
    }
    function upvote () {
      comment.score++
      api.posts.upvoteComment({
        postId,
        commentId: comment._id
      })
    }
  </script>
  
  <div class="comment">
    <div class="details">
      <Voter
        score="{comment.score}"
        on:upvote="{upvote}"
      />
      <div class="main">
        <div class="byline">
          <span class="author">{comment.user.username}</span>
          <span class="date">{date}</span>
          <span
            class="show-reply-form-button"
            on:click="{() => showReplyForm = true}"
          >reply</span>
        </div>
        <p class="comment-content">{comment.content}</p>
      </div>
    </div>
    {#if showReplyForm}
      <ReplyInput
        parentCommentId="{comment._id}"
        {postId}
        on:created="{addReply}"
        on:cancel="{() => showReplyForm = false}"
      />
    {/if}
    {#if comment.replies && comment.replies.length}
      <div class="replies">
        {#each comment.replies as reply (reply._id)}
          <svelte:self
            comment="{reply}"
            {postId}
          />
        {/each}
      </div>
    {/if}
  </div>