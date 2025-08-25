<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { load } = useAuth()

onMounted(() => {
  load()
})

const config = useAppConfig()
useSeoMeta({
  title: config.title,
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <Header />
    <NuxtPage />
    <Toast />
  </div>
</template>
