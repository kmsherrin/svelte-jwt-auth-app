<script>
    import { goto, stores } from '@sapper/app'
    import fetch from 'node-fetch'
    const { session } = stores()
    let user = { username: '', password: '' }
    let inProgress = false
    let error = null
    async function submit () {
      try {
        inProgress = true
        const response = await fetch('https://svelte-jwt-auth-backend.herokuapp.com/register', {
            method:'post', 
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        const response_data = response.json()
        $session.user = response_data.data
        inProgress = false
        error = null
        user = { username: '', password: '' }

        goto('/')
      } catch (err) {
        error = err.response.data.message
        inProgress = false
      }
    }
  </script>
  
  <svelte:head>
    <title>Sign up</title>
  </svelte:head>
  
  <form
    class="signup-form"
    on:submit|preventDefault="{submit}"
  >
    {#if error}
      <span class="error-message">
        {error}
      </span>
    {/if}
    <input
      class="text-input username-input"
      bind:value="{user.username}"
      type="text"
      placeholder="username"
      required
    >
    <input
      class="text-input password-input"
      bind:value="{user.password}"
      type="password"
      placeholder="password"
      required
    >
    <button
      class="signup-button primary-button"
      disabled="{inProgress}"
    >
      SIGN UP
    </button>
  </form>