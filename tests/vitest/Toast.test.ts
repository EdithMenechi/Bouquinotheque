import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Toast from '../../components/Toast.vue'
import { useToaster } from '../../stores/useToaster'

describe('Toast.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('affiche et fait disparaître le toast avec les bonnes classes', async () => {
    const toaster = useToaster()
    vi.useFakeTimers()

    const wrapper = mount(Toast)

    // Au départ, rien n'est affiché
    expect(wrapper.find('[data-cy^="toast_"]').exists()).toBe(false)

    // 🔹 Test du type success
    toaster.showToast('Message succès', 'success')
    await wrapper.vm.$nextTick()

    const successToast = wrapper.find('[data-cy="toast_success"]')
    expect(successToast.exists()).toBe(true)
    expect(successToast.classes()).toContain('bg-blue-900')
    expect(successToast.text()).toContain('Message succès')

    // On laisse passer 3 secondes
    vi.advanceTimersByTime(3000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-cy^="toast_"]').exists()).toBe(false)

    // 🔹 Test du type error
    toaster.showToast('Message erreur', 'error')
    await wrapper.vm.$nextTick()

    const errorToast = wrapper.find('[data-cy="toast_error"]')
    expect(errorToast.exists()).toBe(true)
    expect(errorToast.classes()).toContain('bg-orange-600')
    expect(errorToast.text()).toContain('Message erreur')

    vi.useRealTimers()
  })
})
