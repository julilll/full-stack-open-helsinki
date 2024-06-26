import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = newPost => {
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, newPost, config)
  return request.then((response) => response.data)
}

const update = (id, newPost) => {
  const config = { headers: { Authorization: token } }
  const request = axios.put(`${baseUrl}/${id}`, newPost, config)
  return request.then((response) => response.data)
}

const remove = id => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, setToken, create, update, remove }
