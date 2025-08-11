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
  <div>
    <h1 class="text-2xl font-bold mb-4">Bienvenue sur mon application</h1>
    <p class="mb-6">Gérez facilement vos livres et suivez vos lectures.</p>
    <Button v-if="!showConnexion" @click="showConnexion = true"
      >Se connecter</Button
    >
    <Button v-if="!showCreation" @click="showCreation = true"
      >Créer un compte</Button
    >

    <div v-if="showConnexion" class="grid grid-cols-2">
      <Card class="m-3">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="connect">
            <div class="mb-3">
              <Label class="ml-3 mb-1">Email</Label>
              <Input class="bg-white" id="email" type="email" v-model="email" />
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Mot de passe</Label>
              <Input
                class="bg-white"
                id="passwordConfirm"
                type="password"
                v-model="password"
              />
            </div>
            <div v-if="error" class="text-red-500 text-sm mb-2">
              {{ error }}
            </div>
            <div class="mb-3 space-x-3">
              <Button>Connexion</Button>
              <Button @click="showConnexion = false">Retour</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    <div v-if="showCreation" class="grid grid-cols-2">
      <Card class="m-3">
        <CardHeader>
          <CardTitle>Création de compte</CardTitle>
        </CardHeader>
        <CardContent>
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
            <div class="mb-3 space-x-3">
              <Button>Création</Button>
              <Button @click="showCreation = false">Retour</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
