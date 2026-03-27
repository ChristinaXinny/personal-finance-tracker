// utils/api.js
const API_BASE_URL = 'http://localhost:3000'

// Generic fetch wrapper with error handling
const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get token from storage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const config = {
    ...options,
    headers
  }
  
  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    return {
      success: response.ok,
      status: response.status,
      data,
      ok: response.ok
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error: error.message,
      ok: false
    }
  }
}

// ==================== Auth APIs ====================

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