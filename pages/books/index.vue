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
  <div data-cy="books" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
    <Card v-for="book in books" :key="book.id" class="m-3 gap-0">
      <CardHeader class="p-1 sm:p-4">
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
      <CardContent class="p-1 sm:p-4">
        <form>
          <div class="flex flex-col sm:flex-row">
            <div class="w-full sm:w-1/2 p-1 sm:p-4 bg-gray-200">COUV</div>
            <div class="w-full sm:w-1/2 p-1 sm:p-4 space-y-1.5">
              <Label v-if="book.volume" data-cy="book_volume" for="volume"
                >Tome {{ book.volume }}</Label
              >
              <Label
                v-if="book.subtitle"
                data-cy="book_subtitle"
                for="subtitle"
                >{{ book.subtitle }}</Label
              >
              <Label
                v-if="book.format"
                data-cy="book_format"
                for="format"
                class="break-words"
                >{{ book.format }}</Label
              >
            </div>
          </div>
        </form></CardContent
      >
    </Card>
  </div>
</template>
