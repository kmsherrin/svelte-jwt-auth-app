<style>
	.text-wrapper {
		max-width: 700px;
		margin-left:auto;
		margin-right: auto;

		text-align: justify;
	}

</style>


<svelte:head>
	<title>About</title>
</svelte:head>

<div class="text-wrapper">

	<h1>About this site</h1>

	<p>This is a quick attempt at making a Svelte app that uses JWT authentication. I decided to build a simple 
		reddit type clone around the authentication as a proof of concept. 
	</p>
	<p>
		For the application there is an Express backend that handles all the API endpoints including generating and verifying 
		the JWT token. The posts, comments and user account CRUD operations are all handled through this, saving all data
		to a MongoDB database. Upon each privilaged request the users JWT token is passed along and verified by the backend
		server. If successful the operation will complete, if not an unauthorised (401) response will be sent. 
	</p>
	<p>
		On the frontend a Svelte3 and Sapper application is used, instead of implementing this as a full on SPA, I have opted
		for running Sapper as a SSR app. The frontend is extremely barebones, I have not done anything fancy at all.
	</p>

	<p>
		Not going to put any more work into this project as I have learnt what I wanted from it. Though, if I were to make
		some next steps, it'd be more data logging of events that are made (i.e. upvoting and also making 1 upvote per post), 
		then perhaps more features around post creation and editing (i.e. introduce markdown support), perhaps then even add in
		better filtering or categorisation of posts make it searchable by user etc. Though at that point I would also covering 
		tracks previously made with the Databook project. 
	</p>
</div>
