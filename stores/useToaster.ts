import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToaster = defineStore('toaster', () => {
  const message = ref('')
  const type = ref<'success' | 'error'>('success')
  const visible = ref(false)

  function showToast(msg: string, variant: 'success' | 'error' = 'success') {
    message.value = msg
    type.value = variant
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return { showToast, message, type, visible }
})