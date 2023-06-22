<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['upload'])

    function dosomething(event){

        // open file dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.ipynb';
        input.multiple = false;
        input.click();

        input.onchange = e =>{
            if(e.target.files[0].name.split('.').pop() == 'ipynb'){
                // upload file
                let url = 'http://localhost:5000/upload';
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                fetch(url, {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log("loaded");
                    // pass content to parent 
                    let content = data["content"]
                    // emit event
                    emit('upload', content);


                }).catch(error => {
                    console.log(error);
                });
            }else{
                window.alert('Please upload a .ipynb file');
            }
        }

    }
</script>

<template>
    <div id="EmpChapPrev">
        <div id="background" @click="dosomething">
            <img src="../assets/upload.svg" alt="  logo"/>
        </div>
        <div id="text">
            <p>Upload Notebook</p>
        </div>
    </div>
</template>

<style scoped>
#EmpChapPrev{
    margin-bottom: 20px;
}
#background{
    width: 100px;
    height: 141px;
    background-color: var(--background);
    display: flex;
    justify-content: center;
    align-items: center;
}
#text{
    width: 100px;
    text-align: center;
}

</style>