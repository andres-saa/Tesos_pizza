<template>
    <div class="container" @click="navigate_to_category(category.category_name, category.category_id)"
        style="padding: 1rem;">
        <img class="imagen" :src="`${URI}/read-photo-product/${category.image_identifier}/600`">

        <h4 class="name" style="text-transform: capitalize;">{{ category.category_name?.toLowerCase() }} </h4>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import router from '@/router';
import { URI } from '@/service/conection';





const navigate_to_category = (categor_name, category_id) => {
    router.push(`/categoria/${categor_name}/${category_id}`)
}

// Definir las props
const props = defineProps({
    category: {
        type: Object,
        required: true
    },

});
</script>

<style scoped>
.container {
    width: 100%;
    /* height: 100%; */
    /* aspect-ratio: 1 / 1;/ */
    height: 100%;
    transition: all ease 0.2s;
    overflow: hidden;
    padding: 2rem;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 .5rem #00000020; border: 1px solid #00000030;
    border-radius: .5rem;
    background-color: white;
    cursor: pointer;
    /* Para que el efecto de escala no salga del contenedor */

}

h2 {
    color: var(--cl-secondary-text);
}

p {
    width: min-content;
}

.imagen {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    /* padding: 1rem; */
    transition: all ease 0.2s;
}

.container:hover {
    background-color: var(--primary-color);

}


.container:hover>* {
    color: white;
}

.imagen:hover {
    /* transform: scale(1.05); */
    filter: brightness(1.3);
}




@media (width < 740px) {
    .container {

        grid-template-columns: repeat(2, 1fr);
        gap: .5rem;
        padding: 1rem;
    }

    .name {
        font-size: 1.2rem;
        padding: .8rem;
    }
}


@media (width < 600px) {
    .container {

        grid-template-columns: repeat(2, 1fr);
        gap: .5rem;
        padding: 1rem;
    }

    .name {
        font-size: 1.3rem;
        padding: 1rem;
    }
}
</style>
