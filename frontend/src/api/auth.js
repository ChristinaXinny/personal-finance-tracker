import fetchApi from './base'

/**
 * User login
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise} Response with token and user info
 */
export const login = async (username, password) => {
  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

/**
 * User registration
 * @param {object} userData - { username, email, password }
 * @returns {Promise} Response with created user info
 */
export const register = async (username, password) => {
  return fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

export const getProfile = async () => {
  return fetchApi('/users/profile', { method: 'GET' })
}

export const updateProfile = async (data) => {
  return fetchApi('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export const changePassword = async (data) => {
  return fetchApi('/users/password', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export const deactivateAccount = async () => {
  return fetchApi('/users/account', { method: 'DELETE' })
}