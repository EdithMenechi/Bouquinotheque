<script setup lang="ts">
import NavigationMenu from './ui/navigation-menu/NavigationMenu.vue';
import NavigationMenuItem from './ui/navigation-menu/NavigationMenuItem.vue';
import NavigationMenuLink from './ui/navigation-menu/NavigationMenuLink.vue';
import NavigationMenuList from './ui/navigation-menu/NavigationMenuList.vue';
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const { utilisateur, clear } = useAuth()
const router = useRouter()

const deconnecter = () => {
    clear()
    router.push('/')
}

</script>

<template>
    <div v-if="utilisateur">
      Connecté en tant que : <strong>{{ utilisateur.nom }}</strong> ({{ utilisateur.email }})
      <Button @click="deconnecter">Déconnexion</Button>
    </div>
    <NavigationMenu v-if="utilisateur">
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/profil">
                    Profil
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/livres">
                    Mes livres
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/livres/ajouter">
                    Ajout d'un livre
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>