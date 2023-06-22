<template>
    <a class="button" :class="type" :href="href">
    {{ text }}</a>
</template>

<style scoped>
    .filled{
        background-color: var(--primary);
        color: var(--background);
    }
    .bordered{
        border: 1px solid var(--primary);
        color: var(--primary);
    }
    .button{
        font-size: large;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.4s ease-in-out;
        font-weight: bold;
        white-space: nowrap;
    }
    .button:hover{
        opacity: 1;
        transform: scale(1.1);
    }
</style>

<script setup>
    defineProps(['text', 'type' , 'href'])
</script>