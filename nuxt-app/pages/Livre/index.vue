<template>
    <h1>Mes livres</h1>
    <CarteLivre v-for="post in posts" :key="post.id">
        <h2><NuxtLink :to="`/livre/${post.id}`">{{ post.title }}</NuxtLink></h2>
        <p>{{ post.body.slice(0, 50) }}</p>
    </CarteLivre>
</template>

<script setup>
const { data: posts } = await useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
</script>