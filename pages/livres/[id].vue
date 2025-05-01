<template>
    <main>
        <div v-if="post" class="m-3">
        <Label for="title">Titre</Label>
        <Label for="subtitle">Tome/Sous-titre</Label>
        <div class="flex">
            <div class="w-1/2 p-4 bg-gray-200">COUVERTURE
            </div>
            <div class="w-1/2 p-4">
                <Label for="writer">Auteurice(s)</Label>
                <Label for="format">Format</Label>
                <Textarea v-model="summary" placeholder="Résumé" class="bg-red-100"></Textarea>
            </div>
        </div>
        
        
        <Label for="place">Rangement</Label>
        <Label for="pagesnumber">Nb de pages</Label>
        <Label for="isbn">ISBN</Label>
        <Textarea v-model="comment" placeholder="Commentaire" class="bg-red-100"></Textarea>
        
        </div>
        <div v-else>Chargement</div>
    </main>
</template>

<script setup>
import { Textarea } from '@/components/ui/textarea'

const route = useRoute()
const { data: post } = await useFetch(() => "https://jsonplaceholder.typicode.com/posts/" + route.params.id, { lazy: true })

const summary = ref('')
const comment = ref('')

useSeoMeta({
    title: () => post.value?.title
})

watch(post, (newPost) => {
    if (newPost) {
        summary.value = newPost.title
        comment.value = newPost.body
    }
})
</script>