<script setup>
import Card from '~/components/ui/card/Card.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import CardDescription from '~/components/ui/card/CardDescription.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardTitle from '~/components/ui/card/CardTitle.vue'
import Label from '~/components/ui/label/Label.vue'
import { useAuth } from '~/composables/useAuth'

const { token, load } = useAuth()

load()

const { data: books } = await useFetch('/api/books', {
  server: false,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})
</script>

<template>
  <Label class="m-3">Mes livres</Label>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
    <Card v-for="book in books" :key="book.id" class="m-3">
      <CardHeader>
        <CardTitle
          ><NuxtLink :to="`/books/${book.id}`">{{
            book.title
          }}</NuxtLink></CardTitle
        >
        <CardDescription v-if="book.authors?.length">{{
          book.authors.join(', ')
        }}</CardDescription>
        <CardDescription v-else>Auteurice.s inconnu.e.s</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex">
            <div class="w-1/2 p-4 bg-gray-200"></div>
            <div class="w-1/2 p-4 space-y-1.5">
              <Label for="volume" v-if="book.volumevolume?.length"
                >Tome {{ book.volume }}</Label
              >
              <Label for="subtitle" v-if="book.subtitle?.length">{{
                book.subtitle
              }}</Label>
              <Label for="format">{{ book.format }}</Label>
            </div>
          </div>
        </form></CardContent
      >
    </Card>
  </div>
</template>
