<script setup lang="ts">
import { useToaster } from '@/stores/useToaster'

const toaster = useToaster()
</script>

<template>
  <transition name="fade">
    <div
      v-if="toaster.visible"
      :data-cy="`toast_${toaster.type}`"
      class="fixed bottom-6 right-6 z-50 max-w-xs p-4 rounded-lg shadow-lg flex items-center space-x-3"
      :class="
        toaster.type === 'success'
          ? 'bg-blue-900 text-white'
          : 'bg-orange-600 text-white'
      "
    >
      <p class="flex-1 text-sm font-medium">{{ toaster.message }}</p>
      <svg
        v-if="toaster.type === 'success'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
