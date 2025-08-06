export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') return

  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token) {
      return navigateTo('/')
    }
  }
})