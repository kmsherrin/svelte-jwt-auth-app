<script context="module">
    export function preload (page, session) {
      if (!session.user) {
        return this.redirect(302, 'login')
      }
    }
  </script>
  
  <svelte:head>
    <title>Create a new story</title>
  </svelte:head>
  
  <script>
    import PostForm from './_PostForm.svelte'
    let story = { title: '', type: 'link', content: '' }
  </script>
  
  <PostForm {story}/>