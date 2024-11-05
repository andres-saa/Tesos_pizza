<template>
    <div class="carta" style="max-width: 900px;margin: auto;">
        <h2 style="">🍕 CARTA 🍕</h2>
        <img v-for="i in [1, 2]" :src="`/src/assets/images/carta/${i}.jpeg`" alt="" class="img">

    </div>
</template>


<style scoped>
img {
    width: 100%;
}


h2 {
    margin: 0;
    padding: 0;
    font-family: "Luckiest Guy", cursive;
    letter-spacing: .1cap;
    width: 100%;
    text-align: center;
    margin: 2rem 0;
    font-size: 3rem;
    /* color: var(--primary-color); */
    color: black;
    transition: all ease .3s;
    /* max-width: min-content; */
}



img {
    border-radius: 1rem;
    overflow: hidden;
    /* border: 2px solid var(--primary-color); */
    /* box-shadow: 0 0 1rem black; */
    /* padding: 2rem; */
}
</style>
