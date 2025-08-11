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
  <main>
    <div v-if="book" class="m-3 space-y-1.5">
      <Label for="title">{{ book.title }}</Label>
      <Label for="volume">{{ book.volume }}</Label>
      <Label for="subtitle">{{ book.subtitle }}</Label>
      <div class="flex">
        <div class="w-1/2 p-4 bg-gray-200">COUVERTURE</div>
        <div class="w-1/2 p-4 space-y-1.5">
          <Label for="writer">{{ book.authors?.join(', ') }}</Label>
          <Label for="format">{{ book.format }}</Label>
          <Textarea
            v-model="summary"
            placeholder="Résumé"
            class="bg-[#FFF8E7]"
          ></Textarea>
        </div>
      </div>

      <Label for="place">Rangement</Label>
      <Label for="pagesnumber">Nb de pages</Label>
      <Label for="isbn">ISBN {{ book.isbn }}</Label>
      <Textarea
        v-model="comment"
        placeholder="Commentaire"
        class="bg-[#FFF8E7]"
      ></Textarea>
      <div class="space-x-3">
        <Button @click="navigateTo(`/books/${book.id}-edit`)">Modifier</Button>
        <AlertDialog v-model:open="isDialogOpen">
          <AlertDialogTrigger as-child>
            <Button @click="isDialogOpen = true">Supprimer</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Le livre sera définitivement supprimé et ne pourra pas être
                récupéré
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel @click="isDialogOpen = false"
                >Conserver le livre</AlertDialogCancel
              >
              <AlertDialogAction
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
    </div>
    <div v-else>Chargement</div>
  </main>
</template>
