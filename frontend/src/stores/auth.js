// stores/auth.js
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    user: null,
    token: null,
    isAuthenticated: false
  })
  
  const init = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const user = localStorage.getItem('user') || sessionStorage.getItem('user')
    
    if (token && user) {
      state.token = token
      state.user = JSON.parse(user)
      state.isAuthenticated = true
    }
  }
  
  const setUser = (user) => {
    state.user = user
    state.isAuthenticated = true
  }
  
  const setToken = (token) => {
    state.token = token
  }
  
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    state.user = null
    state.token = null
    state.isAuthenticated = false
  }
  
  const getToken = computed(() => state.token)
  const getUser = computed(() => state.user)
  const isLoggedIn = computed(() => state.isAuthenticated)
  
  return {
    state,
    init,
    setUser,
    setToken,
    logout,
    getToken,
    getUser,
    isLoggedIn
  }
})