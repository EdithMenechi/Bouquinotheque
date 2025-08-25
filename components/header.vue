<script setup lang="ts">
import NavigationMenu from './ui/navigation-menu/NavigationMenu.vue'
import NavigationMenuItem from './ui/navigation-menu/NavigationMenuItem.vue'
import NavigationMenuLink from './ui/navigation-menu/NavigationMenuLink.vue'
import NavigationMenuList from './ui/navigation-menu/NavigationMenuList.vue'
import { useAuth } from '@/composables/useAuth'

const { user, clear } = useAuth()

const disconnect = () => {
  clear()
  navigateTo('/')
}
</script>

<template>
  <div v-if="user" class="m-3 space-x-3">
    <strong>Bonjour {{ user.name }}</strong>
    <Button @click="disconnect">Déconnexion</Button>
  </div>
  <NavigationMenu v-if="user" class="m-3">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/profil"> Mon profil </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/books"> Mes livres </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/books/add">
          Ajout d'un livre
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
