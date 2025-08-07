<script setup>
import { useAuth } from '~/composables/useAuth'

const { token, load } = useAuth()

load()

const { data: profil, error } = await useFetch('/api/profil', {
    server: false,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
})
</script>

<template>
    <Label class="m-3">Profil</Label>
    <form>
          <div v-if="profil" class="m-3 space-y-1.5">
            <Label for="name">{{ profil.nom }}</Label>
            <Label for="email">{{ profil.email }}</Label>
          </div>
          <div v-else>Chargement du profil...</div>
    
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
                    <!-- <AlertDialogCancel @click="isDialogOpen = false">Conserver le profil</AlertDialogCancel>
                    <AlertDialogAction @click="() => { deleteProfil(); isDialogOpen = false }">Supprimer le profil</AlertDialogAction> -->
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
          <div>
            <Toast />
          </div>
      </form>
</template>