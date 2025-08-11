<script setup>
import { useToaster } from '@/stores/useToaster'
import { navigateTo } from '#app'

const route = useRoute()
const { data: book } = await useFetch('/api/books/' + route.params.id, {
  server: false,
})

const toaster = useToaster()

async function saveBook() {
  if (!book.value) {
    toaster.showToast('Chargement du livre en cours...', 'error')
    return
  }

  try {
    const data = await $fetch(`/api/books/${book.value.id}`, {
      method: 'PUT',
      body: {
        title: book.value.title,
        subtitle: book.value.subtitle,
        volume: book.value.volume,
        isbn: book.value.isbn,
      },
    })
    toaster.showToast(`Livre modifié avec succès`, 'success')
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
      <CardTitle>Edition d'un livre</CardTitle>
    </CardHeader>
    <CardContent>
      <form v-if="book" @submit.prevent="saveBook">
        <div class="mb-3">
          <Label class="ml-3 mb-1">Titre</Label>
          <Input
            class="bg-white"
            id="title"
            type="text"
            v-model="book.title"
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
            v-model="book.volume"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Sous-titre</Label>
          <Input
            class="bg-white"
            id="subtitle"
            type="text"
            v-model="book.subtitle"
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
          <Input class="bg-white" id="isbn" type="text" v-model="book.isbn" />
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
          <Button>Sauvegarder</Button>
        </div>
        <div>
          <Toast />
        </div>
      </form>
      <div v-else>Chargement...</div>
    </CardContent>
  </Card>
</template>
