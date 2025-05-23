<script setup lang="ts">
import NavigationMenu from './ui/navigation-menu/NavigationMenu.vue';
import NavigationMenuItem from './ui/navigation-menu/NavigationMenuItem.vue';
import NavigationMenuLink from './ui/navigation-menu/NavigationMenuLink.vue';
import NavigationMenuList from './ui/navigation-menu/NavigationMenuList.vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

</script>

<template>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/">
                    Connexion
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