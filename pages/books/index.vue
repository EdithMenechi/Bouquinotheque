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
  <Label data-cy="page_title" class="m-3">Mes livres</Label>
  <div data-cy="books" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
    <Card v-for="book in books" :key="book.id" class="m-3">
      <CardHeader>
        <CardTitle data-cy="book_title"
          ><NuxtLink :to="`/books/${book.id}`">{{
            book.title
          }}</NuxtLink></CardTitle
        >
        <CardDescription data-cy="book_authors" v-if="book.authors != null">{{
          book.authors.join(', ')
        }}</CardDescription>
        <CardDescription data-cy="book_authors2" v-else
          >Auteurice.s inconnu.e.s</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex">
            <div class="w-1/2 p-4 bg-gray-200"></div>
            <div class="w-1/2 p-4 space-y-1.5">
              <Label
                data-cy="book_volume"
                for="volume"
                v-if="book.volume != null"
                >Tome {{ book.volume }}</Label
              >
              <Label
                data-cy="book_subtitle"
                for="subtitle"
                v-if="book.subtitle != null"
                >{{ book.subtitle }}</Label
              >
              <Label
                data-cy="book_format"
                for="format"
                v-if="book.format != null"
                >{{ book.format }}</Label
              >
            </div>
          </div>
        </form></CardContent
      >
    </Card>
  </div>
</template>
