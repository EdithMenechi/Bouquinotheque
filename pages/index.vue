<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')
const erreur = ref('')
const { setToken } = useAuth()
const router = useRouter()

const connecter = async () => {
  erreur.value = ''
  try {
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        mot_de_passe: password.value,
      }
    })

    console.log('Réponse API login:', data)

    if (data.error) {
      erreur.value = data.error
    } else {
      setToken(data.token)
      router.push('/livres') 
    }
  } catch (e) {
    erreur.value = 'Erreur de connexion au serveur'
    console.error(e)
  }
}
</script>

<template>
  <div class="grid grid-cols-2">
  <Card class="m-3">
    <CardHeader>
        <CardTitle>Connexion</CardTitle>
    </CardHeader>
    <CardContent>
        <form @submit.prevent="connecter">
          <div class="mb-3">
            <Label class="ml-3 mb-1">Email</Label>
            <Input class="bg-white" id="email" type="email" v-model="email"/>
          </div>
          <div class="mb-3">
            <Label class="ml-3 mb-1">Mot de passe</Label>
            <Input class="bg-white" id="passwordConfirm" type="password" v-model="password"/>
          </div>
          <div v-if="erreur" class="text-red-500 text-sm mb-2">
            {{ erreur }}
          </div>
          <div class="mb-3">
            <Button>Connexion</Button>
          </div>
        </form>
    </CardContent>
  </Card>
  <Card class="m-3">
    <CardHeader>
        <CardTitle>Création de compte</CardTitle>
    </CardHeader>
    <CardContent>
        <form>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Utilisateur</Label>
              <Input class="bg-white" id="user" type="text"/>
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Mot de passe</Label>
              <Input class="bg-white" id="passwordCreate" type="text"/>
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Confirmation du mot de passe</Label>
              <Input class="bg-white" id="password" type="text"/>
            </div>
            <div class="mb-3">
              <Button>Création</Button>
            </div>
        </form>
      </CardContent>
  </Card>
</div>
</template>