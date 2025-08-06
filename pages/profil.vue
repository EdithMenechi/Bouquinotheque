<script setup>
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
const { data: profil } = await useFetch('/api/profil/' + route.params.id, { lazy: true }, { server: false })

const toaster = useToaster()
const router = useRouter()

const isDialogOpen = ref(false)

async function deleteProfil() {
    try {
        const { error } = await useFetch(`/api/profil/${route.params.id}`, {
            method: 'DELETE'
        })
        if (error.value) {
            toaster.showToast("Erreur lors de la suppression", "error")
            console.error(error.value)
            return
        }
        toaster.showToast("Profil supprimé avec succès", "success")
        navigateTo('/')
    } catch (e) {
        toaster.showToast("Erreur réseau", "error")
    }    
}
</script>

<template>
    <Label class="m-3">Profil</Label>
    <form>
          <div class="m-3 space-y-1.5">
            <Label for="name">Nom</Label>
            <Label for="email">Email</Label>
          </div>
          
          <div class="space-x-3">
            <Button>Modifier</Button>
            <AlertDialog v-model:open="isDialogOpen">
                <AlertDialogTrigger as-child>
                    <Button @click="isDialogOpen = true">Supprimer</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                      Votre profil et toutes vos informations seront définitivement supprimés et ne pourront pas être récupérés
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel @click="isDialogOpen = false">Conserver le profil</AlertDialogCancel>
                    <AlertDialogAction @click="() => { deleteBook(); isDialogOpen = false }">Supprimer le profil</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
          <div>
            <Toast />
          </div>
      </form>
</template>