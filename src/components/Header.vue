
<template>
    <div id="Header">
        <div id="bar">
            <div id="HamMenu" v-on:click=toggle_navbar >
                <img src="../assets/HamMenu.svg" alt="Logo">
            </div>
            <div id="Logo">
                <RouterLink to="/">
                <img src="../assets/icon.svg" alt="Logo">
                </RouterLink>
            </div>
            <CNav :hidden=hidden />
            <CButton id="StartButton" text="Create" type="filled" href="/create"/>
        </div>

    </div>
</template>


<script setup>
    import CButton from './CButton.vue';
    import CNav from './CNav.vue';
    import { useRoute } from 'vue-router'
    import { watch , ref } from 'vue'

    // toggle hidden state on HamMenu click
    const hidden = ref(true)
    const toggle_navbar = () => {
        hidden.value = !hidden.value
    }

    // also toggle on route change
    const route = useRoute()
    watch(() => route.path, () => {
        hidden.value = true
    })

</script>

<style scoped>
    #Header{
        display: flex;
        flex-direction: column;
    }
    #bar{
        background-color: var(--elevated-2);
        display: grid;
        grid-template-columns: 2fr 3fr 3fr;
        align-items: center;
        height: 70px;
        padding:auto 20px;
    }
    #HamMenu{
        margin-right: auto;
        margin-left: 2vw;
    }
    #Logo{
        margin-left: auto;
        margin-right: auto;
    }
    #HamMenu img{
        height: 30px;
    } 
    #Logo img{
        opacity: 0.9;
        width: auto;
        height: 35px;
    }
    #Logo img:hover{
        opacity: 1;
        cursor: pointer;
    }
    #StartButton{
        margin-left: auto;
        margin-right: 2vw;
    }

    @media screen and (min-width: 750px){
        #bar{
            grid-template-columns: 1fr 1fr 1fr;
        }
        #HamMenu{
            display: none;
        }
        #Logo{
            margin-left: 20%;
            margin-right: auto;
        }
    }
</style>