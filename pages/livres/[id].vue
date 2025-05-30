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

const route = useRoute()
const { data: book } = await useFetch('/api/livres/' + route.params.id, { lazy: true }, { server: false })

const toaster = useToaster()
const router = useRouter()

const isDialogOpen = ref(false)

async function deleteBook() {
    try {
        const { error } = await useFetch(`/api/livres/${route.params.id}`, {
            method: 'DELETE'
        })
        if (error.value) {
            toaster.showToast("Erreur lors de la suppression", "error")
            console.error(error.value)
            return
        }
        toaster.showToast("Livre supprimé avec succès", "success")
        navigateTo('/livres')
    } catch (e) {
        toaster.showToast("Erreur réseau", "error")
    }    
}
</script>

<template>
    <main>
        <div v-if="book" class="m-3 space-y-1.5">
        <Label for="title">{{ book.titre }}</Label>
        <Label for="tome">{{ book.tome }}</Label>
        <Label for="subtitle">{{ book.sous_titre }}</Label>
        <div class="flex">
            <div class="w-1/2 p-4 bg-gray-200">COUVERTURE
            </div>
            <div class="w-1/2 p-4 space-y-1.5">
                <Label for="writer">{{ book.auteurs?.join(', ') }}</Label>
                <Label for="format">{{ book.format }}</Label>
                <Textarea v-model="summary" placeholder="Résumé" class="bg-[#FFF8E7]"></Textarea>
            </div>
        </div>
        
        
        <Label for="place">Rangement</Label>
        <Label for="pagesnumber">Nb de pages</Label>
        <Label for="isbn">ISBN {{ book.isbn }}</Label>
        <Textarea v-model="comment" placeholder="Commentaire" class="bg-[#FFF8E7]"></Textarea>
        <div class="space-x-3">
            <Button @click="`/livres/${book.id}-edit`">Modifier</Button>
            <AlertDialog v-model:open="isDialogOpen">
                <AlertDialogTrigger as-child>
                    <Button @click="isDialogOpen = true">Supprimer</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                      Le livre sera définitivement supprimé et ne pourra pas être récupéré
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel @click="isDialogOpen = false">Conserver le livre</AlertDialogCancel>
                    <AlertDialogAction @click="() => { deleteBook(); isDialogOpen = false }">Supprimer le livre</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        </div>
        <div v-else>Chargement</div>
    </main>
</template>

