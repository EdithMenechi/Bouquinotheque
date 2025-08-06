import { ref, onMounted } from 'vue'

const token = ref<string | null>(null)

export function useAuth() {
  const setToken = (newToken: string) => {
    token.value = newToken
    if (process.client) {
      localStorage.setItem('token', newToken)
    }
  }

  const clearToken = () => {
    token.value = null
    if (process.client) {
      localStorage.removeItem('token')
    }
  }

  const loadToken = () => {
    if (process.client) {
      const saved = localStorage.getItem('token')
      if (saved) token.value = saved
    }
  }

  onMounted(() => {
    loadToken()
  })

  return {
    token,
    setToken,
    clearToken,
    loadToken
  }
}