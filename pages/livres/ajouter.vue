<script setup>
import { useToaster } from '@/stores/useToaster'

const new_book = reactive({
  titre: ''
})

const toaster = useToaster()

async function saveBook() {
  const { data, error } = await useFetch('/api/livres', {
    method: 'POST',
    body: {titre: new_book.titre}
  })

  if (error.value) {
    toaster.showToast("Erreur lors de la sauvegarde", "error")
    console.error(error.value)
  } else {
    toaster.showToast(`Livre ajouté avec succès (ID : ${data.value.id})`, "success")
    navigateTo(`/livres/${data.value.id}`)
  }
}
</script> 

<template>    
<Card class="m-3">
    <CardHeader>
        <CardTitle>Ajout d'un livre</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="saveBook">
          <div class="mb-3">
            <Label class="ml-3 mb-1">Titre</Label>
            <Input class="bg-white" id="title" type="text" v-model="new_book.titre" required placeholder="Titre du livre"/>
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">Auteur.ice(s)</Label>
            <Input class="bg-white" id="writer" type="text" placeholder="Auteur.ice1, Auteur.ice2 ..." />
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">Rangement</Label>
            <Input class="bg-white" id="place" type="text" placeholder="TODO : select"/>
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">Tome</Label>
            <Input class="bg-white" id="tome" type="text" v-model="new_book.tome"/>
          </div>
          <div class="mb-3">
            <Label class= "ml-3 mb-1">Sous-titre</Label>
            <Input class="bg-white" id="subtitle" type="text" v-model="new_book.sous_titre"/>
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">Format</Label>
            <Input class="bg-white" id="format" type="text" placeholder="TODO : select"/>
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">Nombre de pages</Label>
            <Input class="bg-white" id="pagesnumber" type="text" />
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">ISBN</Label>
            <Input class="bg-white" id="isbn" type="text" v-model="new_book.isbn"/>
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
      </form>
    </CardContent>
</Card>
</template>


  