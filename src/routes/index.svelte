<script>

	import { stores } from "@sapper/app";
	const { session } = stores();

	import Main from '../components/Main.svelte';

	import successkid from 'images/successkid.jpg';
	
	console.log($session.user)

</script>

<style>

	h1, h2, h3, h4, h5, a, p {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}


</style>

<svelte:head>
	<title>Make Posts</title>
</svelte:head>

<Main></Main>