<template>
    <nav id="NavList" :class="hidden ? 'hidden' : 'visible'">
        <RouterLink to="/" :class="routeName=='Home'?'selected':'normal'">Home</RouterLink>
        <RouterLink to="/Features" :class="routeName=='Features'?'selected':'normal'" >Features</RouterLink>
        <RouterLink to="/Showcase" :class="routeName=='Showcase'?'selected':'normal'" >Showcase</RouterLink>
        <RouterLink to="/Tutorials" :class="routeName=='Tutorials'?'selected':'normal'" >Watch</RouterLink>
        <a href="https://github.com/">Github </a>
    </nav>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import { ref, watch } from 'vue'
    import { useRoute } from 'vue-router'


const props = defineProps({
    routeName: String,
    hidden : Boolean
})
// get the current route
const route = useRoute()
// get the current route name
const routeName = ref(route.name)
// watch the route name and update the ref
watch(() => route.name, (value) => {
    routeName.value = value
    props.routeName = value
})

</script>

<style scoped>
nav {
    background-color: var(--elevated-1);
    display: inline-flex;
    flex-direction: column;
    top: 70px;
    position: absolute;
    height: fit-content;
    left: 0%;
    width: 80%;
    height: calc(100% - 110px);
    padding: 20px 0px 20px 20px;
    z-index: 5;
    transition: left 0.5s ease-in-out;
}

nav a {
    width: fit-content;
    font-size: larger;
    margin-bottom: 20px;
    padding-bottom: 2px;
    color: var(--text2);
}


nav a:hover {
    color: var(--primary);
}

nav .selected{
    color: var(--primary);
    border-bottom: 1px dashed var(--primary);
}

nav .normal:hover{
    color: var(--text1);
}
nav .selected:hover{
    color: var(--primary);
}

@media only screen and (min-width: 750px){
    nav{
        flex-direction: row;
        position: relative;
        top: 0%;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;

    }
    nav a{
        margin-bottom: 0px;
        margin-right: 40px;
    }
}

@media only screen and (max-width: 750px) {
    .hidden{
        left: -110%;
        overflow: hidden;
    }
    .visible{
        left: 0%;
        overflow: auto;
    }
}
</style>