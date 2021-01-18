<script context="module">
    import * as api from '../../../utils/api/index.js'
    export async function preload ({ params }, session) {
      if (!session.user) {
        return this.redirect(302, '/login')
      }
      let post = await api.posts.getPost({ postId: params.id })
      if (session.user._id !== post.user._id) {
        return this.error(404, 'Not found')
      }
      return { post }
    }
  </script>
  
  <script>
    import PostForm from '../_PostForm.svelte'
    export let post
  </script>
  
  <svelte:head>
    <title>Edit your post</title>
  </svelte:head>
  
  <PostForm {post}/>