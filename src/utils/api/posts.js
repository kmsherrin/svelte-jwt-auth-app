import * as api from './api'

export function getPosts (params) {
  return api.get('/posts', params)
}

export function createPost ({ post, token }) {
  return api.post('/posts', post, token)
}

export function updatePost ({ postId, post, token }) {
  return api.put(`/posts/${postId}`, post, token)
}

export function getPost ({ postId }) {
  return api.get(`/posts/${postId}`)
}

export function deletePost ({ postId, token }) {
  return api.del(`/posts/${postId}`, token)
}

export function getPostComments ({ postId }) {
  return api.get(`/posts/${postId}/comments`)
}

export function addComment ({ postId, comment, token }) {
  return api.post(`/posts/${postId}/comments`, comment, token)
}

export function upvotePost ({ postId }) {
  return api.post(`/posts/${postId}/upvote`)
}

export function upvoteComment ({ postId, commentId }) {
  return api.post(`/posts/${postId}/comments/${commentId}/upvote`)
}