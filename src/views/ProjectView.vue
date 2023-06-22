<script setup>
import ProjectLeft from '../components/ProjectLeft.vue'
import ProjectRight from '../components/ProjectRight.vue'

function upload(content){
    
    let object = document.getElementById('content');
    // src is the content of the notebook
    object.data = content;
    // object.data = "https://raw.githubusercontent.com/ipython-books/minimal-gallery/master/notebooks/images.ipynb"
}

</script>

<template>
    <div id="ProjectMain">
        <ProjectLeft @upload="upload"/>
        <object id="content"> </object>
        <ProjectRight />
    </div>
</template>

<style scoped>
#ProjectMain{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    /* border: 1px solid red; */
}

#content{
    overflow-y: scroll;
    width: 100%;
}
/* hide scrollbar */
#content::-webkit-scrollbar {
    display: none;
}
</style>
