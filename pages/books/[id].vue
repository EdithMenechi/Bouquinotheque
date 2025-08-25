<script setup>
import { Textarea } from '@/components/ui/textarea'
import { useToaster } from '@/stores/useToaster'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { navigateTo } from '#app'
import { useAuth } from '~/composables/useAuth'

const { token, load } = useAuth()

load()

const route = useRoute()
const { data: book } = await useFetch('/api/books/' + route.params.id, {
  server: false,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

const toaster = useToaster()

const isDialogOpen = ref(false)

async function deleteBook() {
  try {
    const error = await $fetch(`/api/books/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    toaster.showToast('Livre supprimé avec succès', 'success')
    navigateTo('/books')
  } catch (e) {
    toaster.showToast('Erreur réseau', 'error')
  }
}
</script>

<template>
  <Card v-if="book" class="m-3 gap-0">
    <CardHeader class="p-1 sm:p-4">
      <CardTitle data-cy="book_title">{{ book.title }}</CardTitle>
      <CardDescription data-cy="book_authors" v-if="book.authors != null">{{
        book.authors.join(', ')
      }}</CardDescription>
      <CardDescription data-cy="book_authors2" v-else
        >Auteurice.s inconnu.e.s</CardDescription
      >
    </CardHeader>
    <CardContent class="p-1 sm:p-4">
      <div class="mb-3 flex">
        <div class="w-1/2 p-4 bg-gray-200">COUVERTURE</div>
        <div class="w-1/2 p-4 space-y-1.5">
          <Label v-if="book.volume" data-cy="book_volume" for="volume"
            >Tome {{ book.volume }}</Label
          >
          <Label v-if="book.subtitle" data-cy="book_subtitle" for="subtitle">{{
            book.subtitle
          }}</Label>
          <Label v-if="book.format" data-cy="book_format" for="format">{{
            book.format
          }}</Label>
        </div>
      </div>
      <Textarea
        data-cy="book_summary"
        v-model="summary"
        placeholder="Résumé"
        class="w-full mb-3 bg-[#FFF8E7]"
      ></Textarea>
      <div
        class="mb-3 grid [grid-template-columns:auto_1fr] gap-x-3 gap-y-2 items-center"
      >
        <Label for="name" class="text-right">Rangement :</Label>
        <span></span>

        <Label for="email" class="text-right">Nb de pages :</Label>
        <span></span>

        <Label for="name" class="text-right">ISBN :</Label>
        <span>{{ book.isbn }}</span>
      </div>
      <Textarea
        data-cy="book_comment"
        v-model="comment"
        placeholder="Commentaire"
        class="w-full mb-3 bg-[#FFF8E7]"
      ></Textarea>
      <div class="mt-6 space-x-3">
        <Button
          data-cy="change_book_button"
          @click="navigateTo(`/books/${book.id}-edit`)"
          >Modifier</Button
        >
        <AlertDialog v-model:open="isDialogOpen">
          <AlertDialogTrigger as-child>
            <Button data-cy="delete_book_button" @click="isDialogOpen = true"
              >Supprimer</Button
            >
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle data-cy="delete_card"
                >Confirmer la suppression</AlertDialogTitle
              >
              <AlertDialogDescription>
                Le livre sera définitivement supprimé et ne pourra pas être
                récupéré
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                data-cy="abort_delete_button"
                @click="isDialogOpen = false"
                >Conserver le livre</AlertDialogCancel
              >
              <AlertDialogAction
                data-cy="confirm_delete_button"
                @click="
                  () => {
                    deleteBook()
                    isDialogOpen = false
                  }
                "
                >Supprimer le livre</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </CardContent>
  </Card>
  <div v-else>Chargement</div>
</template>
