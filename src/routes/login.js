import fetch from "node-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { username, password } = req.body;

    const result = await fetch(`https://svelte-jwt-auth-backend.herokuapp.com/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password }),
    });

    const parsed = await result.json();
    console.log(parsed);

    if (typeof parsed.message !== "undefined") {
      throw new Error(parsed.message);
    }

    console.log(parsed.token)

    req.session.token = parsed.token;
    req.session.user = parsed;

    res.end(JSON.stringify({ token: parsed.token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}