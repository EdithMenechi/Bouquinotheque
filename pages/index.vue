<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const showConnexion = ref(false)
const showCreation = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')
const { setToken, setUser } = useAuth()

const connect = async () => {
  error.value = ''
  try {
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (data.error) {
      error.value = data.error
    } else {
      setToken(data.token)
      setUser(data.user)
      navigateTo('/books')
    }
  } catch (e) {
    error.value = 'Erreur de connexion au serveur'
    console.error(e)
  }
}
</script>

<template>
  <div class="m-3">
    <h1 data-cy="appli_title" class="text-2xl font-bold mb-3">
      Bienvenue dans la bouquinothèque
    </h1>
    <p data-cy="appli_summary" class="mb-6">
      Gérez facilement les livres de votre bibliothèque.
    </p>

    <!-- Accueil -->
    <div v-if="!showConnexion && !showCreation" class="flex space-x-3">
      <Button
        v-if="!showConnexion && !showCreation"
        @click="showConnexion = true"
        data-cy="connection_button"
        >Se connecter</Button
      >
      <Button
        v-if="!showConnexion && !showCreation"
        @click="showCreation = true"
        data-cy="creation_button"
        >Créer un compte</Button
      >
    </div>

    <!-- Connexion -->
    <div v-if="showConnexion" class="flex justify-center">
      <Card data-cy="connection_card" class="m-3 w-full max-w-md gap-0">
        <CardHeader class="p-1 sm:p-4">
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent class="p-1 sm:p-4">
          <form @submit.prevent="connect">
            <div class="mb-3">
              <Label class="ml-3 mb-1">Email</Label>
              <Input
                data-cy="connection_email"
                class="bg-white"
                id="email"
                type="email"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Mot de passe</Label>
              <Input
                data-cy="connection_password"
                class="bg-white"
                id="passwordConfirm"
                type="password"
                v-model="password"
              />
            </div>
            <div v-if="error" class="text-red-500 text-sm mb-2">
              {{ error }}
            </div>
            <div class="mt-6 space-x-3">
              <Button data-cy="connection_button">Connexion</Button>
              <Button @click="showConnexion = false" data-cy="back_button"
                >Retour</Button
              >
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

    <!-- Création de compte -->
    <div v-if="showCreation" class="flex justify-center">
      <Card class="m-3 w-full max-w-md gap-0">
        <CardHeader class="p-1 sm:p-4">
          <CardTitle>Création de compte</CardTitle>
        </CardHeader>
        <CardContent class="p-1 sm:p-4">
          <form>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Utilisateur</Label>
              <Input class="bg-white" id="user" type="text" />
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Mot de passe</Label>
              <Input class="bg-white" id="passwordCreate" type="text" />
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Confirmation du mot de passe</Label>
              <Input class="bg-white" id="passwordConfirm" type="text" />
            </div>
            <div class="space-x-3">
              <Button>Création</Button>
              <Button @click="showCreation = false">Retour</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
