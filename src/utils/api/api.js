import fetch from 'node-fetch';
import fetchAbsolute from 'fetch-absolute';

const fetchApi = fetchAbsolute(fetch)('https://svelte-jwt-auth-backend.herokuapp.com')

async function send ({ method, path, data, token }) {
  try {
    console.log(data)
    const response = await fetchApi(
      path, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ... (token ? { Authorization: `Bearer ${token}`} : {})
      }
    })

    const response_data = await response.json()

    return new Promise(resolve => resolve(response_data))
  } catch (error) {
    throw error.response.data
  }
}

export function post (path, data, token = null) {
  return send({ method: 'POST', path, data, token })
}

export function put (path, data, token = null) {
  return send({ method: 'PUT', path, data, token })
}

export function del (path, token = null) {
  return send({ method: 'DELETE', path, token })
}

export function get (path, data = {}, token = null) {
  const params = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
  return send({
    method: 'get',
    path: `${path}${params ? '?' + params : ''}`,
    token
  })
}
