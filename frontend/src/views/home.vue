<template>
    <banner style="width: 100%;"></banner>
    <h2 style="">Explora nuestro maravilloso menu!</h2>
    <gridCategorias></gridCategorias>




</template>


<script setup>

import gridCategorias from '@/components/gridCategorias.vue';
import Banner from '@/components/Banner.vue';

</script>


<style scoped>
h2 {
    margin: 0;
    padding: 0;
    font-family: "Luckiest Guy", cursive;
    letter-spacing: .1cap;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    margin: 2rem 0;
    font-size: 2rem;
    color: var(--primary-color);
    transition: all ease .3s;
}


h2:hover {
    transform: scale(1.1);

}
</style>