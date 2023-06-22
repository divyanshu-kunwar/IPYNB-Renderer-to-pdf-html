<script setup>
import { defineEmits } from 'vue';
import readFile from "../utility/fileOp"


function dosomething(event) {

    // open file dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ipynb';
    input.multiple = false;
    input.click();

    
    input.onchange = e => {
        readFile(e.target.files[0])
    }
}
</script>

<template>
    <div id="EmpChapPrev">
        <div id="background" @click="dosomething">
            <img src="../assets/upload.svg" alt="  logo" />
        </div>
        <div id="text">
            <p>Upload Notebook</p>
        </div>
    </div>
</template>

<style scoped>
#EmpChapPrev {
    margin-bottom: 20px;
}

#background {
    width: 100px;
    height: 141px;
    background-color: var(--background);
    display: flex;
    justify-content: center;
    align-items: center;
}

#text {
    width: 100px;
    text-align: center;
}
</style>