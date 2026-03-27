import fetchApi from './base'

export const getTransactions = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`
  return fetchApi(endpoint, { method: 'GET' })
}

export const getTransactionById = async (id) => {
  return fetchApi(`/transactions/${id}`, { method: 'GET' })
}

export const createTransaction = async (data) => {
  return fetchApi('/transactions', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export const updateTransaction = async (id, data) => {
  return fetchApi(`/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export const deleteTransaction = async (id) => {
  return fetchApi(`/transactions/${id}`, {
    method: 'DELETE'
  })
}