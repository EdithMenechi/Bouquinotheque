<script setup>
import { useAuth } from '~/composables/useAuth'
import { useToaster } from '@/stores/useToaster'
import { useRouter } from 'vue-router'

const { token, load, clear } = useAuth()
const toaster = useToaster()
const router = useRouter()

load()

const { data: profil } = await useFetch('/api/profil', {
  server: false,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

const isDialogOpen = ref(false)

async function deleteProfil() {
  try {
    const { error } = await useFetch(`/api/profil`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    if (error.value) {
      toaster.showToast('Erreur lors de la suppression', 'error')
      console.error(error.value)
      return
    }

    toaster.showToast('Profil supprimé avec succès', 'success')
    clear()
    navigateTo('/')
  } catch (e) {
    toaster.showToast('Erreur réseau', 'error')
  }
}
</script>

<template>
  <Label class="m-3">Profil</Label>
  <main>
    <div v-if="profil" class="m-3 space-y-1.5">
      <Label for="name">{{ profil.nom }}</Label>
      <Label for="email">{{ profil.email }}</Label>
    </div>
    <div v-else>Chargement du profil...</div>

    <div class="space-x-3">
      <Button @click="router.push(`/profil/edit`)">Modifier</Button>
      <AlertDialog v-model:open="isDialogOpen">
        <AlertDialogTrigger as-child>
          <Button @click="isDialogOpen = true">Supprimer</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Votre profil et toutes vos informations seront définitivement
              supprimés et ne pourront pas être récupérés
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="isDialogOpen = false"
              >Conserver le profil</AlertDialogCancel
            >
            <AlertDialogAction
              @click="
                () => {
                  deleteProfil()
                  isDialogOpen = false
                }
              "
              >Supprimer le profil</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    <div>
      <Toast />
    </div>
  </main>
</template>
