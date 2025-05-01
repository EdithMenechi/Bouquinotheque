<template>
    <Label class="m-3">Mes livres</Label>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
    <Card v-for="book in books" :key="book.id" class="m-3 bg-red-100">
        <CardTitle><NuxtLink :to="`/livres/${book.id}`">{{ book.titre }} {{ book.id }}</NuxtLink></CardTitle>
        <CardTitle>Auteurice(s)</CardTitle>
        <CardContent>
            <form>
                <div class="flex">
            <div class="w-1/2 p-4 bg-gray-200">COUVERTURE
            </div>
            <div class="w-1/2 p-4">
                <Label for="subtitle">Tome/Sous-titre</Label>
                    <Label for="format">Format</Label>
            </div>
        </div>
            </form></CardContent>
    </Card>
    </div>
</template>

<script setup>
import Card from '~/components/ui/card/Card.vue';
import CardContent from '~/components/ui/card/CardContent.vue';
import CardTitle from '~/components/ui/card/CardTitle.vue';
import Label from '~/components/ui/label/Label.vue';

const { data: books } = await useFetch('/api/livres')

</script>