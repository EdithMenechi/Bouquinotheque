<script setup>
import { useAuth } from '~/composables/useAuth'
import { useToaster } from '@/stores/useToaster'
import { navigateTo } from '#app'

const { token, load } = useAuth()
const toaster = useToaster()

load()

const new_book = reactive({
  title: '',
})

async function saveBook() {
  try {
    const data = await $fetch('/api/books', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: { title: new_book.title },
    })
    toaster.showToast(`Livre ajouté avec succès`, 'success')
    navigateTo(`/books/${data.id}`)
  } catch (error) {
    toaster.showToast('Erreur lors de la sauvegarde', 'error')
    console.error(error)
  }
}
</script>

<template>
  <Card class="m-3">
    <CardHeader>
      <CardTitle data-cy="page_title">Ajout d'un livre</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="saveBook">
        <div class="mb-3">
          <Label class="ml-3 mb-1">Titre</Label>
          <Input
            data-cy="new_book_title"
            class="bg-white"
            id="title"
            type="text"
            v-model="new_book.title"
            required
            placeholder="Titre du livre"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Auteur.ice(s)</Label>
          <Input
            class="bg-white"
            id="writer"
            type="text"
            placeholder="Auteur.ice1, Auteur.ice2 ..."
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Rangement</Label>
          <Input
            class="bg-white"
            id="place"
            type="text"
            placeholder="TODO : select"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Tome</Label>
          <Input
            class="bg-white"
            id="volume"
            type="text"
            v-model="new_book.volume"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Sous-titre</Label>
          <Input
            class="bg-white"
            id="subtitle"
            type="text"
            v-model="new_book.subtitle"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Format</Label>
          <Input
            class="bg-white"
            id="format"
            type="text"
            placeholder="TODO : select"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Nombre de pages</Label>
          <Input class="bg-white" id="pagesnumber" type="text" />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">ISBN</Label>
          <Input
            class="bg-white"
            id="isbn"
            type="text"
            v-model="new_book.isbn"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Résumé</Label>
          <Textarea class="bg-white" id="summary" type="text"></Textarea>
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Commentaire</Label>
          <Textarea class="bg-white" id="comment" type="text"></Textarea>
        </div>
        <div class="mb-3">
          <Button data-cy="save_new_book">Sauvegarder</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
