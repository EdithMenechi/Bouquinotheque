<script setup>
import { useAuth } from '~/composables/useAuth'
import { useToaster } from '@/stores/useToaster'
import { navigateTo } from '#app'

const { token, load, clear } = useAuth()
const toaster = useToaster()

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
    const error = await $fetch(`/api/profil`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    toaster.showToast('Profil supprimé avec succès', 'success')
    clear()
    navigateTo('/')
  } catch (e) {
    toaster.showToast('Erreur réseau', 'error')
  }
}
</script>

<template>
  <Card class="m-3 gap-0">
    <CardHeader class="p-1 sm:p-4">
      <CardTitle data-cy="page_title">Mon profil</CardTitle>
    </CardHeader>
    <CardContent class="p-1 sm:p-4">
      <div
        v-if="profil"
        class="m-3 grid [grid-template-columns:auto_1fr] gap-x-3 gap-y-2 items-center"
      >
        <Label for="name" class="text-right font-semibold">Nom :</Label>
        <span>{{ profil.name }}</span>

        <Label for="email" class="text-right font-semibold">Email :</Label>
        <span>{{ profil.email }}</span>
      </div>
      <div v-else>Chargement du profil...</div>
      <div class="mt-6 space-x-3">
        <Button @click="navigateTo(`/profil/edit`)">Modifier</Button>
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
    </CardContent>
  </Card>
</template>
