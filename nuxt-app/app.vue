<template>
  <div>
    <NuxtLoadingIndicator/>
    <NuxtRouteAnnouncer/>
    <Header/>
   <NuxtPage />
  </div>
</template>

<script setup>
const config = useAppConfig()
useSeoMeta({
  title: config.title
})
</script>