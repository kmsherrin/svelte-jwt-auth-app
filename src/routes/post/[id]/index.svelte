<script context="module">
    import CommentContainer from '../_CommentContainer.svelte'
    import * as api from '../../../utils/api/index.js'

    export async function preload ({ params }) {
      let post = await api.posts.getPost({ postId: params.id })
      return { post }
    }
  </script>
  
  <script>
    import Post from '../../../components/Posts/Post.svelte'
    //import CommentContainer from '../_CommentContainer.svelte'
    export let post
  </script>
  
  <style>
    .story-content {
      padding: 0.5rem 0.5rem 2rem 0.5rem;
      word-spacing: unset;
    }

  </style>

  <svelte:head>
    <title>{post.title}</title>
  </svelte:head>
  
  <div class="item-page page">
    <Post {post}/>
    {#if post.type === 'text'}
      <div class="story-content">
        {post.content}
      </div>
    {/if}

    <CommentContainer postId="{post._id}"/>

  </div>