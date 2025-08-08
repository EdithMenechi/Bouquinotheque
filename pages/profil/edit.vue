<script setup>
import { useAuth } from '~/composables/useAuth'
import { useToaster } from '@/stores/useToaster'

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

  const { data, error } = await useFetch(`/api/profil`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      nom: profil.value.nom,
      email: profil.value.email,
    },
  })

  if (error.value) {
    toaster.showToast('Erreur lors de la sauvegarde', 'error')
    console.error(error.value)
  } else {
    toaster.showToast(
      `Profil modifié avec succès (ID : ${data.value.id})`,
      'success'
    )
    navigateTo(`/profil`)
  }
}
</script>
<template>
  <Label class="m-3">Edition Profil</Label>
  <form @submit.prevent="saveProfil">
    <div class="mb-3">
      <Label class="ml-3 mb-1">Nom</Label>
      <Input
        class="bg-white"
        id="name"
        type="text"
        v-model="profil.nom"
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
    <div class="mb-3">
      <Button>Sauvegarder</Button>
    </div>
    <div>
      <Toast />
    </div>
  </form>
</template>
