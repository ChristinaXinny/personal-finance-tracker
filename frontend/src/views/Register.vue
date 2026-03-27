<template>
  <div class="register-container">
    <!-- Background with soft gradient -->
    <div class="background-gradient"></div>
    
    <!-- Decorative circles -->
    <div class="deco-circle circle-1"></div>
    <div class="deco-circle circle-2"></div>
    <div class="deco-circle circle-3"></div>
    
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <!-- Main Card -->
          <div class="register-card">
            <!-- Logo Image -->
            <div class="text-center mb-4">
              <img src="../assets/img/login.png" alt="Finance Tracker Logo" class="logo-image">
              <h1 class="app-title">Create Account</h1>
              <p class="app-subtitle">Join FinTrack to track your finances</p>
            </div>
            
            <!-- Success Alert -->
            <transition name="fade">
              <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i>
                {{ successMessage }}
                <button type="button" class="btn-close" @click="successMessage = ''"></button>
              </div>
            </transition>
            
            <!-- Error Alert -->
            <transition name="fade">
              <div v-if="errorMessage" class="alert alert-custom alert-dismissible fade show" role="alert">
                <i class="bi bi-exclamation-circle me-2"></i>
                {{ errorMessage }}
                <button type="button" class="btn-close" @click="errorMessage = ''"></button>
              </div>
            </transition>
            
            <!-- Register Form -->
            <form @submit.prevent="handleRegister">
              <!-- Username Field -->
              <div class="form-group mb-4">
                <label for="username" class="form-label">
                  <i class="bi bi-person-fill me-2"></i>Username
                </label>
                <div class="input-wrapper">
                  <input 
                    type="text" 
                    class="form-control-custom" 
                    id="username"
                    v-model="formData.username"
                    placeholder="Choose a username"
                    autocomplete="username"
                    required
                  >
                </div>
                <div class="form-hint" v-if="usernameHint">
                  <i class="bi bi-info-circle"></i>
                  {{ usernameHint }}
                </div>
              </div>
              
              <!-- Password Field -->
              <div class="form-group mb-4">
                <label for="password" class="form-label">
                  <i class="bi bi-lock-fill me-2"></i>Password
                </label>
                <div class="input-wrapper">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control-custom" 
                    id="password"
                    v-model="formData.password"
                    placeholder="Create a password"
                    autocomplete="new-password"
                    required
                  >
                  <button 
                    class="password-toggle" 
                    type="button"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                  </button>
                </div>
                <div class="form-hint" v-if="passwordHint">
                  <i class="bi bi-info-circle"></i>
                  {{ passwordHint }}
                </div>
              </div>
              
              <!-- Confirm Password Field -->
              <div class="form-group mb-4">
                <label for="confirmPassword" class="form-label">
                  <i class="bi bi-shield-lock-fill me-2"></i>Confirm Password
                </label>
                <div class="input-wrapper">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    class="form-control-custom" 
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    placeholder="Confirm your password"
                    autocomplete="off"
                    required
                  >
                  <button 
                    class="password-toggle" 
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i :class="showConfirmPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                  </button>
                </div>
              </div>
              
              <!-- Submit Button -->
              <button 
                type="submit" 
                class="btn-register"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-person-plus-fill me-2"></i>
                {{ isLoading ? 'Creating account...' : 'Create Account' }}
              </button>
              
              <!-- Login Link -->
              <div class="login-link">
                <i class="bi bi-box-arrow-in-left me-1"></i>
                <router-link to="/login">Already have an account? Sign in</router-link>
              </div>
            </form>
          </div>
          
          <!-- Footer -->
          <div class="footer-text">
            <p class="mb-0">
              <i class="bi bi-shield-check"></i> Your data is secure with us
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const usernameHint = ref('')
const passwordHint = ref('')

// Username validation hint
watch(() => formData.value.username, (newVal) => {
  if (newVal && newVal.length < 3) {
    usernameHint.value = 'Username must be at least 3 characters'
  } else if (newVal && newVal.length > 20) {
    usernameHint.value = 'Username must be less than 20 characters'
  } else {
    usernameHint.value = ''
  }
})

// Password validation hint
watch(() => formData.value.password, (newVal) => {
  if (newVal && newVal.length < 6) {
    passwordHint.value = 'Password must be at least 6 characters'
  } else if (newVal && newVal.length > 50) {
    passwordHint.value = 'Password must be less than 50 characters'
  } else {
    passwordHint.value = ''
  }
})

// Validate form
const validateForm = () => {
  if (formData.value.username.length < 3) {
    errorMessage.value = 'Username must be at least 3 characters'
    return false
  }
  
  if (formData.value.username.length > 20) {
    errorMessage.value = 'Username must be less than 20 characters'
    return false
  }
  
  if (formData.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return false
  }
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return false
  }
  
  return true
}

// Handle registration
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  const result = await register(formData.value.username, formData.value.password)
  
  if (!result.success) {
    errorMessage.value = result.data?.message || 'Registration failed'
    isLoading.value = false
    return
  }
  
  successMessage.value = 'Account created successfully! Redirecting to login...'
  
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
</script>

<style scoped>
/* ==================== Morandi Color Palette ==================== */
.register-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #F5F0E8 0%, #E8E2D9 50%, #DFD7CD 100%);
  z-index: -2;
}

/* Decorative Circles */
.deco-circle {
  position: fixed;
  border-radius: 50%;
  background: rgba(159, 175, 154, 0.15);
  backdrop-filter: blur(40px);
  z-index: -1;
  animation: float 20s ease-in-out infinite;
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  background: rgba(168, 191, 204, 0.2);
  animation-delay: 0s;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -80px;
  background: rgba(201, 169, 166, 0.2);
  animation-delay: -5s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  bottom: 30%;
  right: 20%;
  background: rgba(143, 188, 170, 0.15);
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Register Card */
.register-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 32px;
  padding: 40px 36px;
  box-shadow: 0 20px 40px rgba(92, 91, 90, 0.08), 
              0 8px 16px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.register-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 48px rgba(92, 91, 90, 0.12);
}

/* Logo Image */
.logo-image {
  width: 100px;
  height: auto;
  margin-bottom: 16px;
  filter: drop-shadow(0 8px 16px rgba(92, 91, 90, 0.1));
}

.app-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #5C5B5A 0%, #9CAF9A 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.app-subtitle {
  font-size: 14px;
  color: #9B9792;
  margin-bottom: 0;
}

/* Form Elements */
.form-group {
  position: relative;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #5C5B5A;
  margin-bottom: 8px;
  display: block;
}

.form-label i {
  color: #9CAF9A;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.form-control-custom {
  width: 100%;
  padding: 14px 40px 14px 18px;
  font-size: 15px;
  border: 2px solid rgba(180, 170, 160, 0.2);
  border-radius: 18px;
  background: white;
  transition: all 0.3s ease;
  color: #5C5B5A;
}

.form-control-custom:focus {
  outline: none;
  border-color: #9CAF9A;
  box-shadow: 0 0 0 4px rgba(159, 175, 154, 0.12);
}

.form-control-custom::placeholder {
  color: #CEC8C0;
}

.form-hint {
  font-size: 11px;
  color: #C0BAB2;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.form-hint i {
  font-size: 10px;
}

.password-toggle {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #C0BAB2;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #9CAF9A;
}

/* Register Button */
.btn-register {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7C9A7A 0%, #5B7A59 100%);
  border: none;
  border-radius: 18px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(92, 122, 89, 0.3);
  margin-top: 8px;
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(92, 122, 89, 0.4);
  background: linear-gradient(135deg, #6F8E6D 0%, #4E6D4C 100%);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Login Link */
.login-link {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
}

.login-link a {
  color: #9CAF9A;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-link a:hover {
  color: #7C9A7A;
  text-decoration: underline;
}

/* Custom Alert */
.alert-custom {
  background: linear-gradient(135deg, #FFF8F3 0%, #FFF2EA 100%);
  border: none;
  border-radius: 18px;
  color: #E68A5E;
  padding: 14px 18px;
  margin-bottom: 24px;
  border-left: 4px solid #E68A5E;
  font-size: 14px;
}

.alert-success {
  background: linear-gradient(135deg, #E8F5E9 0%, #E0F2E0 100%);
  border: none;
  border-radius: 18px;
  color: #5B7A59;
  padding: 14px 18px;
  margin-bottom: 24px;
  border-left: 4px solid #7C9A7A;
  font-size: 14px;
}

/* Footer */
.footer-text {
  text-align: center;
  margin-top: 24px;
  font-size: 12px;
  color: #C0BAB2;
}

.footer-text i {
  color: #9CAF9A;
  margin-right: 6px;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .register-card {
    padding: 32px 24px;
    margin: 20px;
  }
  
  .logo-image {
    width: 80px;
  }
  
  .app-title {
    font-size: 28px;
  }
  
  .deco-circle {
    display: none;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 28px 20px;
  }
  
  .logo-image {
    width: 70px;
  }
  
  .app-title {
    font-size: 26px;
  }
}
</style>