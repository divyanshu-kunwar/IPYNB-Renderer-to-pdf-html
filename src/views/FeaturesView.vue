
<template>
    <main>
        <div id="circle" v-bind:style="position_style">
        </div>

        <div id="text_container" class="left">
            <div>
                <h1>Professional-Grade PDF and Ebooks</h1>
            </div>
            <div>
                <h2>
                    Create polished and professional-grade ebooks from Jupyter Notebooks <br>
                    Generate printable PDFs and interactive HTMLs with ease <br>
                    Great for <span class="highlighted">documentation</span>, <span class="highlighted">tutorials</span>, and <span class="highlighted">EBooks</span>
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <iframe
                src="https://www.youtube.com/embed/qQk94CjRvIs" 
                title="Serverless was a big mistake... says Amazon" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
            </div>
        </div>


        <div id="text_container" class="right">
            <div>
                <h1>Code Highlighting & Theme</h1>
            </div>
            <div>
                <h2>
                    Choose from a variety of languages and <span class="highlighted">color schemes</span> so that your code pop and stand out<br>
                    Personalize your ebook with customizable <span class="highlighted">Theme</span> options<br>
                    Create a <span class="highlighted">unique</span> and <span class="highlighted">engaging</span> reading experience for your users
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <iframe
                src="https://www.youtube.com/embed/erEgovG9WBs" 
                title="Serverless was a big mistake... says Amazon" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
            </div>
        </div>


        <div id="text_container" class="left">
            <div>
                <h1>Beautifully Formatted Texts &  Images</h1>
            </div>
            <div>
                <h2>
                    Format <span class="highlighted">text</span>, <span class="highlighted">images</span>, and <span class="highlighted">equations</span> so that they look like they belong in a physical book<br>
                    Create a polished and engaging reading experience for your audience
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <iframe
                src="https://www.youtube.com/embed/bOCHTHkBoAs" 
                title="Serverless was a big mistake... says Amazon" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
            </div>

        </div>

        <div id="text_container" class="right">
            <div>
                <h1>Auto Table of Contents and Navigation Links</h1>
            </div>
            <div>
                <h2>
                    Generate  <span class="highlighted">table of contents</span> for your PDF ebooks for <span class="highlighted">easy navigation</span><br>
                    Include <span class="highlighted">navigational links</span> in your HTML ebooks for seamless user experience<br>
                    Help your readers easily find the content they need
                </h2>
            </div>
            <div class="video_box">
                <!--  -->
                <iframe
                src="https://www.youtube.com/embed/ZzI9JE0i6Lc" 
                title="Serverless was a big mistake... says Amazon" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
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
    display: block;
    height: 100vh;
    cursor: url('../assets/cursor.svg'), auto;
    overflow-y: auto;
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
    height: 90vh;
    margin-left: auto;
    margin-right: auto;
    animation:slidefromleft 1.5s ease-out 1;
    filter: grayscale(60%);
    transition: filter 2.5s ease-in-out;
}

#text_container:hover {
    filter: grayscale(0%);
}

.left {
    text-align: left;
    align-items: flex-start;
}

.right {
    text-align: right;
    align-items: flex-end;
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
    width: min(100% , 850px);
    max-height: 50%;
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
        transform: translateY(-200%);
        filter: grayscale(100%) opacity(0%);
    }
    to {
        transform: translateY(0px);
        filter: grayscale(50%) opacity(100%);
    }
}

@media screen and (min-width: 750px) {

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