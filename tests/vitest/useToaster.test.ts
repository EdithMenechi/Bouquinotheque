// tests/vitest/useToaster.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useToaster } from '@/stores/useToaster'

describe('useToaster store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // Réinitialise le store avant chaque test
  })

  it('showToast met à jour le store correctement', () => {
    const toaster = useToaster()
    toaster.showToast('Test success', 'success')

    expect(toaster.message).toBe('Test success')
    expect(toaster.type).toBe('success')
    expect(toaster.visible).toBe(true)
  })

  it('rend le toast invisible après 3000ms', () => {
    const toaster = useToaster()
    vi.useFakeTimers()
    toaster.showToast('Message temporaire', 'success')

    expect(toaster.visible).toBe(true)
    vi.advanceTimersByTime(3000)
    expect(toaster.visible).toBe(false)

    vi.useRealTimers()
  })
})
