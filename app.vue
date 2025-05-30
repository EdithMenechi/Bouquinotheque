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
const config = useAppConfig()
useSeoMeta({
  title: config.title
})
</script>