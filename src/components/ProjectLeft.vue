<script setup>
import ChapterPreview from '../components/chapterPreview.vue'
import EmptyChapterPreview from '../components/EmptyChapterPreview.vue'
const emit = defineEmits(['upload'])

// on upload event from child component
function upload(content){
    // emit event to parent
    emit('upload', content);
}

</script>

<template>
    <div id="ProjectLeft">
        <!-- here goes logo -->
        <div id="Logo">
            <img src="../assets/icon.svg" alt="Logo">
        </div>
        <!-- here goes all the chapters -->
        <div id="chapterPrevContainer">
            <!-- empty chapter preview emits an event named upload -->
            <!-- get the event and emit an event sending the content to parent view -->
            <EmptyChapterPreview @upload="upload"/>
            <ChapterPreview />
            <ChapterPreview />
        </div>
    </div>
</template>

<style scoped>
#ProjectLeft{
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    background-color: var(--elevated-2);
}
#Logo {
    margin-left: auto;
    margin-right: auto;
    padding: 0px 20px;
}
#Logo img {
    opacity: 0.9;
    width: auto;
    height: 35px;
}

#Logo img:hover {
    opacity: 1;
    cursor: pointer;
}
#chapterPrevContainer{
    display: flex;
    flex-direction:column;
    align-items: center;
    height: 100%;
    margin-top: 10px;
    padding: 10px 20px;
    overflow-y: auto;
}
#chapterPrevContainer::-webkit-scrollbar{
    width: 8px;
}

#chapterPrevContainer::-webkit-scrollbar-thumb{
    background-color: var(--elevated2);
    border-radius: 10px;
}

#chapterPrevContainer::-webkit-scrollbar-track{
    background-color: var(--elevated-1);
}

</style>