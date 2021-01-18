<script>
    import { goto, stores } from "@sapper/app";

    const { session } = stores();
    let password = "";
    let username = "";
    let error;

    const handleLogin = async () => {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const parsed = await response.json();

        if (parsed.error) {
            error = parsed.error;
            goto("/login");
        } else {
            $session.logged_in = true;
            $session.token = parsed.token;
            $session.user = parsed.user;
            goto("/");
        }
    };
</script>

<style>
    label {
        font-size: x-large;
        font-weight: 300;
    }
    .form-wrapper {
        display: grid;
        grid-template-columns: 1fr;
    }

    .text-input {
        font-size: large;
        border-radius: 1rem;
        border: 1px solid gray;
        padding: 0.5rem 1rem 0.5rem 1rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    }
    .row { 
        margin: 0.5rem 0 0.5rem 0;
    }

    .submit {
        display: inline;
        padding: 0.2rem 2.5rem 0.2rem 2.5rem;
        background-color: rgb(255,62,0);
        color: white;
        border: 0;
        border-radius: 1rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        font-size: large;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
    }

</style>

{#if $session.token}
    <p>You are already logged in</p>
{:else}

<h1>Log in </h1>

<form on:submit|preventDefault={handleLogin} method="post">

    <div class="form-wrapper">
        <div class="row">
            <label for="username">Username:</label>
            <input class="text-input" id="username" type="text" bind:value={username} size=20 />
        </div>
        <div class="row">
            <label for="password">Password:</label>
            <input class="text-input" id="password" type="password" bind:value={password} size=20/>
        </div>

        <div class="row">
            <button class="submit" type="submit">Login</button>
        </div>
    </div>

</form>
{/if}
{#if error}
    <p>{error}</p>
{/if}
