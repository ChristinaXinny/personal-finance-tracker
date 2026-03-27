const API_BASE_URL = 'http://localhost:3000/api'

const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
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

export default fetchApi