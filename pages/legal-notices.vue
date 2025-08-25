<template>
  <Card class="m-3 gap-0">
    <CardHeader class="p-1 sm:p-4">
      <CardTitle data-cy="page_title">Mentions légales</CardTitle>
    </CardHeader>
    <CardContent class="p-1 sm:p-4">
      <div
        class="mb-3 grid gap-x-3 gap-y-2 items-center grid-cols-1 sm:grid-cols-[auto_1fr]"
      >
        <Label for="editor" class="text-right">Éditeur :</Label>
        <span>Edith MP</span>

        <Label for="adress" class="text-right">Adresse :</Label>
        <span>Deuxième étoile à droite et tout droit jusqu'au matin</span>

        <Label for="host" class="text-right">Hébergeur :</Label>
        <span>Aucun pour l'instant</span>

        <Label for="contact" class="text-right">Contact :</Label>
        <span
          ><a href="mailto:contact@bouquinotheque.com"
            >contact@bouquinotheque.com</a
          ></span
        >
      </div>

      <p>
        Les données collectées via l'application sont traitées conformément au
        <NuxtLink to="/rgpd" class="underline font-semibold">RGPD</NuxtLink>.
      </p>
    </CardContent>
  </Card>
</template>
