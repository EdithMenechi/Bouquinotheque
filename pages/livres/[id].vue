<script setup>
import { Textarea } from '@/components/ui/textarea'

const route = useRoute()
const { data: book } = await useFetch('/api/livres/' + route.params.id, { lazy: true }, { server: false })

</script>

<template>
    <main>
        <div v-if="book" class="m-3 space-y-1.5">
        <Label for="title">{{ book.titre }}</Label>
        <Label for="tome">{{ book.tome }}</Label>
        <Label for="subtitle">{{ book.sous_titre }}</Label>
        <div class="flex">
            <div class="w-1/2 p-4 bg-gray-200">COUVERTURE
            </div>
            <div class="w-1/2 p-4 space-y-1.5">
                <Label for="writer">{{ book.auteurs?.join(', ') }}</Label>
                <Label for="format">{{ book.format }}</Label>
                <Textarea v-model="summary" placeholder="Résumé" class="bg-[#FFF8E7]"></Textarea>
            </div>
        </div>
        
        
        <Label for="place">Rangement</Label>
        <Label for="pagesnumber">Nb de pages</Label>
        <Label for="isbn">ISBN {{ book.isbn }}</Label>
        <Textarea v-model="comment" placeholder="Commentaire" class="bg-[#FFF8E7]"></Textarea>
        <div class="space-x-3">
            <Button><NuxtLink :to="`/livres/${book.id}-edit`">Modifier</NuxtLink></Button>
            <Button>Supprimer
            </Button>
        </div>
        </div>
        <div v-else>Chargement</div>
    </main>
</template>

