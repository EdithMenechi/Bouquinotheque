<template>    
    <div class="bg-[#FFF8E7]">
      <Label class="m-3">Ajout d'un livre</Label>
  
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Titre</Label>
        <Input class="bg-white" id="title" type="text" placeholder="Titre du livre" />
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Auteur.ice(s)</Label>
        <Input class="bg-white" id="writer" type="text" placeholder="Auteur.ice1, Auteur.ice2 ..." />
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Rangement</Label>
        <Input class="bg-white" id="place" type="text" placeholder="TODO : select"/>
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Tome</Label>
        <Input class="bg-white" id="tome" type="text" />
      </div>
      <div class="m-3">
        <Label class= "ml-3 mb-0.5">Sous-titre</Label>
        <Input class="bg-white" id="subtitle" type="text"/>
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Format</Label>
        <Input class="bg-white" id="format" type="text" placeholder="TODO : select"/>
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Nombre de pages</Label>
        <Input class="bg-white" id="pagesnumber" type="text" />
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">ISBN</Label>
        <Input class="bg-white" id="isbn" type="text"0/>
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Résumé</Label>
        <Textarea class="bg-white" id="summary" type="text"></Textarea>
      </div>
      <div class="m-3">
        <Label class="ml-3 mb-0.5">Commentaire</Label>
        <Textarea class="bg-white" id="comment" type="text"></Textarea>
      </div>
    </div>         
</template>
 