<script setup>
</script>

<template>
    <div id="EmpChapPrev">
        <div id="background">
            <img src="" alt="logo" />
        </div>
        <div id="text">
            <p>Chapter Name</p>
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
#background img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
#text{
    width: 100px;
    text-align: center;
}

</style>