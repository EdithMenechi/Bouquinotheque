import { ref, onMounted } from 'vue'

const token = ref<string | null>(null)
const utilisateur = ref<{ id: number; nom: string; email: string } | null>(null)

export function useAuth() {
  const setToken = (newToken: string) => {
    token.value = newToken
    if (process.client) {
      localStorage.setItem('token', newToken)
    }
  }

  const setUtilisateur = (data: typeof utilisateur.value) => {
    utilisateur.value = data
    if (process.client) {
      localStorage.setItem('utilisateur', JSON.stringify(data))
    }
  }

  const clear = () => {
    token.value = null
    utilisateur.value = null
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('utilisateur')
    }
  }

  const load = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('token')
      const savedUser = localStorage.getItem('utilisateur')
      if (savedToken) token.value = savedToken
      if (savedUser) utilisateur.value = JSON.parse(savedUser)
    }
  }

  onMounted(() => {
    load()
  })

  return {
    token,
    utilisateur,
    setToken,
    setUtilisateur,
    clear,
    load,
  }
}
