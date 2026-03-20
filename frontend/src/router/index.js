import { createRouter, createWebHistory } from 'vue-router'
// 引入登录组件（路径根据你的实际位置调整，比如views/Login.vue）
import Login from '../views/Login.vue'

// 路由规则数组
const routes = [
  // 核心配置：根路径 "/" 重定向到登录页 "/login"
  {
    path: '/',
    redirect: '/login' // 访问 http://localhost:5173/ 自动跳转到 /login
  },
  // 登录页路由
  {
    path: '/login',
    name: 'Login',
    component: Login // 挂载登录组件
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 用HTML5 History模式（无#号）
  routes // 注入路由规则
})

// 导出路由实例，供main.js使用
export default router