<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// get the current route
import { useRoute } from 'vue-router'
import { watch , ref } from 'vue'

// get the current url
const route = useRoute()
const currentPath = ref('home')

watch(() => route.path, () => {
    currentPath.value = route.path.split("/")[1]
})

</script>

<template>
    <!--create -->
    <!-- a header here -->
    <Header v-if="currentPath!='create'" ></Header>
    <!-- else we will render a new header -->
    <RouterView />
    <!-- a footer here -->
    <Footer></Footer>
</template>

<style src="../src/styles/main.css"></style>