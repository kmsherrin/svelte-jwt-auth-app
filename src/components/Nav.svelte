<script>
	import { goto, stores } from "@sapper/app";
	const { session } = stores();
	
	export let segment;
	export let isLoggedIn;

	export function del_token() {
		$session.token = null;
		$session.user = null;
		$session.logged_in = false;
		goto("/");
	}

</script>

<style>
	nav {
		background-color: white;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		margin-bottom: 0.5rem;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul style="display: flex;">
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">Home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">About</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		
		{#if $session.user}
			<li><a rel=prefetch aria-current="{segment === 'create' ? 'create' : undefined}" href="post/create">New Post</a></li>

			<li style="margin-left: auto;">
				<a href=".">{$session.user.username}</a>
			</li>

			<li><a rel=prefetch on:click={del_token} href=".">Logout</a></li>

		{:else}
			<li style="margin-left: auto;"><a rel=prefetch aria-current="{segment === 'signup' ? 'signup' : undefined}" href="signup">Sign Up</a></li>
			<li><a rel=prefetch aria-current="{segment === 'login' ? 'login' : undefined}" href="login">Login</a></li>
		{/if}
	</ul>



</nav>
