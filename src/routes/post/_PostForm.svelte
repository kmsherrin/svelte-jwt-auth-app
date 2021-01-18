<script>
    import { goto, stores } from '@sapper/app'
    import * as api from '../../utils/api/index.js'
    import ButtonGroup from '../../components/ButtonGroup.svelte'

    const { session } = stores()

    export let post = {title: ""}

    let inProgress = false
    async function submit () {
      inProgress = true
      const data = post._id
        ? await api.posts.updatePost({
          postId: post._id,
          post,
          token: $session.user.token
        })
        : await api.posts.createPost({
            post,
            token: $session.user.token
        })
      goto(`/post/${data._id}`)
    }
  </script>
  
  <form
    class="story-form"
    on:submit|preventDefault="{submit}"
  >
    <input
      class="text-input"
      bind:value="{post.title}"
      type="text"
      placeholder="Title"
      required
    >
    <ButtonGroup
      bind:value="{post.type}"
      disabled="{post._id}"
      buttons="{[
        {
          value: 'link',
          title: 'Link'
        },
        {
          value: 'text',
          title: 'Text'
        }
      ]}"
    />
    {#if post.type === 'link'}
      <input
        class="text-input link-input content-input"
        bind:value="{post.content}"
        type="url"
        placeholder="URL"
        required
      >
    {:else}
      <textarea
        class="content-text-input content-input"
        bind:value="{post.content}"
        placeholder="Text (optional)"
      ></textarea>
    {/if}
    <button
      class="primary-button submit-button"
      disabled="{inProgress}"
    >
      {#if post._id}
        SAVE
      {:else}
        POST
      {/if}
    </button>
  </form>