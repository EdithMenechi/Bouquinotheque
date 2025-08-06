<template>
  <div>
    <NuxtLoadingIndicator/>
    <NuxtRouteAnnouncer/>
    <Header/>
   <NuxtPage />
   <Toast />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { loadToken } = useAuth()

onMounted(() => {
  loadToken()
})

const config = useAppConfig()
useSeoMeta({
  title: config.title
})
</script>