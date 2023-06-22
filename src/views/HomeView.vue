
<template>
  <main>
    <div id="circle" 
    v-bind:style="position_style" >
    </div>
    <div id="text_container">
      <div><span id="Alpha">Alpha</span></div>
      <div>
        <h1>Introducing Nerlex Books</h1>
      </div>
      <div>
        <h2>Generate responsive books for online and offline publication using MD Files or Jupyter Notebook</h2>
      </div>
      <div class="button_container">
      <CButton href="/Features" class="_Btn" text="Know More" type="filled" />
      <CButton href="/Create" class="_Btn" text="Create New Project" type="filled" />
      </div>
    </div>
  </main>
</template>

<script setup>
import CButton from '../components/CButton.vue';
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
  height: fit-content;
  cursor:url('../assets/cursor.svg'), auto;
}

#text_container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 90%;
  text-align: right;
}

h1 {
  font-size: 2.5rem;
  margin-top: 0px;
  color: var(--text2);
  transition: all 0.8s ease-in-out;
  animation:typing 5.0s steps(24, end) 1;
}

h2 {
  color: var(--text3);
  font-size: medium;
  transition: all 0.8s ease-in-out;
}

#text_container:hover h1{
  color: var(--text1);
  text-shadow: 2px 0px 10px #ffffff66;
}
#text_container:hover h2 {
  color: var(--text1);
  text-shadow: 2px 0px 10px #ffffff66;
}

._Btn {
  margin-top: 20px;
  margin-left: 50px;
  width: fit-content;
}
.button_container{
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#Alpha {
  color: var(--primary);
  opacity: 0.9;
  overflow: hidden;
  white-space: nowrap;
}

#Alpha:hover {
  opacity: 1;
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
@keyframes typing {
  0% { width: 0%; letter-spacing: normal; }
  50% { width: 100%; letter-spacing: 2px; }
  100% { width: 100%; letter-spacing: normal; }
}

@media screen and (min-width: 750px) {
  
  #text_container{
    width: max(60%, 280px);
  }

  h1{
    font-size: 2.8rem;
    overflow: hidden;
    white-space: nowrap;
  }

  h2{
    font-size: x-large;
    letter-spacing: 2px;
  }

  .button_container{
    flex-direction: row;
  }
}

</style>