<script setup>
import { useAuth } from '~/composables/useAuth'
import { useToaster } from '@/stores/useToaster'
import { navigateTo } from '#app'

const { token, load } = useAuth()
const toaster = useToaster()

load()

const { data: profil } = await useFetch('/api/profil', {
  server: false,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

async function saveProfil() {
  if (!profil.value) {
    toaster.showToast('Chargement du profil ...', 'error')
    return
  }

  try {
    const data = await $fetch(`/api/profil`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        name: profil.value.name,
        email: profil.value.email,
      },
    })
    toaster.showToast(`Profil modifié avec succès`, 'success')
    navigateTo(`/profil`)
  } catch (error) {
    toaster.showToast('Erreur lors de la sauvegarde', 'error')
    console.error(error)
  }
}
</script>
<template>
  <Card class="m-3 gap-0">
    <CardHeader class="p-1 sm:p-4">
      <CardTitle data-cy="page_title">Modifier le profil</CardTitle>
    </CardHeader>
    <CardContent class="p-1 sm:p-4">
      <form @submit.prevent="saveProfil">
        <div class="mb-3">
          <Label class="ml-3 mb-1">Nom</Label>
          <Input
            class="bg-white"
            id="name"
            type="text"
            v-model="profil.name"
            required
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div class="mb-3">
          <Label class="ml-3 mb-1">Email</Label>
          <Input
            class="bg-white"
            id="email"
            type="email"
            v-model="profil.email"
            required
            placeholder="Email"
          />
        </div>
        <div class="mt-6 space-x-3">
          <Button type="submit" data-cy="save_profil">Sauvegarder</Button>
          <Button
            type="button"
            @click="navigateTo(`/profil`)"
            data-cy="back_button"
            >Retour</Button
          >
        </div>
      </form>
      <div>
        <Toast />
      </div>
    </CardContent>
  </Card>
</template>
