<template>
  <Card class="m-3">
    <CardHeader>
        <CardTitle>Connexion</CardTitle>
    </CardHeader>
    <CardContent>
        <form>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Utilisateur</Label>
              <Input class="bg-white" id="user" type="text"/>
            </div>
            <div class="mb-3">
              <Label class="ml-3 mb-1">Mot de passe</Label>
              <Input class="bg-white" id="password" type="text"/>
            </div>
            <div class="mb-3">
              <Button>Connexion</Button>
            </div>
        </form>
      </CardContent>
  </Card>
</template>