<template>
    <div class="contour">
        <slot></slot>
    </div>
</template>

<style scoped>
.contour {
    border: 2px solid #000;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
}
</style>