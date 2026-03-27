import fetchApi from './base'

/**
 * User login
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise} Response with token and user info
 */
export const login = async (username, password) => {
  return fetchApi('/users/login', {
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
  return fetchApi('/users/register', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}


/**
 * Change password
 * @param {object} passwordData - { currentPassword, newPassword }
 * @returns {Promise} Response
 */
export const changePassword = async (passwordData) => {
  return fetchApi('/users/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData)
  })
}

/**
 * Delete user account
 * @returns {Promise} Response
 */
export const deleteAccount = async () => {
  return fetchApi('/users/account', {
    method: 'DELETE'
  })
}