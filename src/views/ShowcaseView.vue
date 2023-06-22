
<template>
    <main>
        <div id="circle" v-bind:style="position_style">
        </div>

        <div id="text_container" class="middle">
            <div>
                <h1>Learn Machine Learning From Scratch</h1>
            </div>
            <div>
                <h2>
                    <span class="highlighted">By Nerlex</span>
                </h2>
                <h2>
                    Learn the fundamental concepts of Machine Learning and build your own machine 
                    learning algorithms from scratch using Python
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"/>
            </div>
        </div>

        <div id="text_container" class="middle">
            <div>
                <h1>Learn Machine Learning From Scratch</h1>
            </div>
            <div>
                <h2>
                    <span class="highlighted">By Nerlex</span>
                </h2>
                <h2>
                    Learn the fundamental concepts of Machine Learning and build your own machine 
                    learning algorithms from scratch using Python
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <img src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="/>
            </div>
        </div>

        <div id="text_container" class="middle">
            <div>
                <h1>Learn Machine Learning From Scratch</h1>
            </div>
            <div>
                <h2>
                    <span class="highlighted">By Nerlex</span>
                </h2>
                <h2>
                    Learn the fundamental concepts of Machine Learning and build your own machine 
                    learning algorithms from scratch using Python
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"/>
            </div>
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
    display: grid;
    height: 100vh;
    cursor: url('../assets/cursor.svg'), auto;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fit, minmax(300, 1fr));
    column-gap: 20px;
    row-gap: 20px;
    padding: 40px;
}

main::-webkit-scrollbar {
    width: 8px;
    background-color: var(--elevated-2);
    cursor: pointer;
}

main::-webkit-scrollbar-thumb {
    background-color: var(--elevated1);
    border-radius: 2px;
}

main::-webkit-scrollbar-thumb:hover {
    background-color: var(--primary);
}

#text_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: 80vh;
    animation:slidefromleft 1.0s ease-out 1;
    filter: grayscale(90%);
    transition: filter 2.5s ease-in-out;
}

#text_container:hover {
    filter: grayscale(0%);
}

.middle{
    text-align: left;
    align-items: flex-start;
}


h1 {
    font-size: 2.0rem;
    margin-top: 20px;
    color: var(--text1);
    transition: all 1s ease-in-out;
}

h2 {
    margin-top: 5px;
    margin-bottom: 20px;
    color: var(--text3);
    font-size: medium;
    transition: all 1s ease-in-out;
    font-weight: normal;
}

#text_container:hover h2 {
    color: var(--text1);
}

#circle {
    position: absolute;
    z-index: -5;
    opacity: 0.5;
    width: 0px;
    height: 0px;
    background: rgb(72, 255, 0);
    box-shadow: 0px 0px 233px 233px rgba(0, 247, 0, 0.2);
}

.video_box {
    width: auto;
    height: 50%;
    aspect-ratio: 1;
    margin-top: 50px;
    border-radius: 4px;
    background-color: var(--elevated2);
    cursor: default;
    overflow: hidden;
}

.video_box img {
    width: calc(100% - 8px);
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
    border: 4px solid var(--elevated2);
}

.highlighted{
    background-color: var(--elevated-2);
    padding-left: 4px;
    padding-right: 4px;
    margin-left: -4px;
    margin-right: -4px;
    border-bottom: 1px double var(--text3);
}

#text_container:hover h1 {
    color: var(--primary);
}
#text_container:hover .highlighted {
    border-color: var(--primary);
}

@keyframes slidefromleft {
    from {
        transform: translateY(-100%);
        filter: grayscale(0%) opacity(0%);
    }
    to {
        transform: translateY(0px);
        filter: grayscale(90%) opacity(100%);
    }
}

@media only screen and (min-width: 750px) {

    main{
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        column-gap: 30px;
        row-gap: 30px;
    }

    #text_container {
        width: max(80%, 280px);
    }

    h1 {
        font-size: 2.0rem;
    }

    h2 {
        font-size: large;
    }
}
</style>