<template>
  <Card class="m-3 gap-0">
    <CardHeader class="p-1 sm:p-4">
      <CardTitle data-cy="page_title"
        >Protection des données personnelles (RGPD)</CardTitle
      >
    </CardHeader>
    <CardContent class="p-1 sm:p-4">
      <div class="space-y-1.5">
        <Label class="font-semibold"
          >Nous collectons uniquement les données nécessaires au fonctionnement
          de l'application :</Label
        >
        <Label
          >- Email et mot de passe (pour créer et sécuriser votre compte)</Label
        >
        <Label
          >- Informations sur vos livres (pour votre bibliothèque
          personnelle)</Label
        >
      </div>
      <div class="mt-6 space-y-1.5">
        <Label
          >Les mots de passe sont sécurisés par hachage (bcrypt) et ne sont
          jamais stockés en clair.</Label
        >
        <Label
          >Vos données ne sont ni revendues ni partagées à des tiers.</Label
        >
      </div>
      <div class="mt-6 space-y-1.5">
        <Label class="font-semibold"
          >Lorsque vous supprimez votre profil, toutes les données qui y sont
          liées (adresse e-mail, informations de connexion et bibliothèque
          personnelle) sont définitivement effacées de nos systèmes. Cette
          suppression est totale et irréversible : aucune donnée ne sera
          conservée.</Label
        >
        <Label
          >Vous pouvez à tout moment demander la suppression ou la modification
          de vos données en nous contactant :
        </Label>
        <a href="mailto:contact@bouquinotheque.com" class="underline break-all"
          >contact@bouquinotheque.com</a
        >
      </div>
    </CardContent>
  </Card>
</template>
