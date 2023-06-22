<template>
    <main>
        <div id="circle" 
    v-bind:style="position_style" >
    </div>
    <h1>Getting Started With Nerlex Books</h1>
    <div class="video_box">
            <!--  -->
            <iframe
            src="https://www.youtube.com/embed/qQk94CjRvIs" 
            title="Serverless was a big mistake... says Amazon" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';

const x_val = ref(0);
const y_val = ref(0);

// style binding
const position_style = ref({
  top: y_val,
  left: x_val
});

const updateCoordinates = (event) => {
  x_val.value = event.clientX;
  y_val.value = event.clientY;
  position_style.value = {
    top: y_val.value + 'px',
    left: x_val.value + 'px'
  };
}
window.addEventListener('mousemove', updateCoordinates);

</script>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80% ;
        cursor: url('../assets/cursor.svg'), auto;
    }

    #circle {
    position: absolute;
    z-index: -5;
    opacity: 0.5;
    width: 0px;
    height: 0px;
    background: rgb(0, 72, 255);
    box-shadow: 0px 0px 233px 233px rgba(0, 255, 247, 0.2);
    }

.video_box {
    margin-left: auto;
    margin-right: auto;
    width: 100vmin;
    max-height: 100vmin ;
    height: auto;
    aspect-ratio: 16/9;
    margin-top: 50px;
    border-radius: 4px;
    background-color: var(--elevated2);
    cursor: default;
    overflow: hidden;
}

.video_box iframe {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border-radius: 8px;
    border: 4px solid var(--elevated2);
}

@media only screen and (min-width: 750px) {
    .video_box {
        width: min(100% , 850px);
        max-height: 100vmin;
    }
}

</style>