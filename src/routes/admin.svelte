<script context="module">

  export let token;

  export async function preload(page, session) {
    const { token } = session;

    if (!token) {
      return this.redirect(302, ".");
    }

    return token;

    // const response = await this.fetch(`https://www.myapi.com/doggies`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: token,
    //   },
    // });

    // const parsed = await response.json();

    // if (parsed.error) {
    //   return this.error(response.status, parsed.error);
    // }

    // return { };
  }
</script>


<svelte:head>
	<title>Admin Page</title>
</svelte:head>

{#if token}
  <p>Logged in</p>
{/if}


<h1>This page is protected by authentication</h1>

<p>This is the 'about' page. There's not much here.</p>