<template>
    <div class="container" @click="navigate_to_category(category)"
        style="padding: 0rem;">
        <img class="imagen" :src="`${URI}/read-photo-product/${category.image_identifier}/600`">

        <div style="text-transform: capitalize;display: flex;padding-bottom: 0rem; justify-content: center;align-items: end; position: absolute;bottom: 0;background:linear-gradient(to top, black, transparent);width: 100%;height: 30%; text-align: center;">
            <h3 class="name" > {{ category.category_name?.toLowerCase() }}  </h3>

        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import router from '@/router';
import { URI } from '@/service/conection';



import { usecartStore } from '@/stores/shoping_cart';

const store = usecartStore()

const navigate_to_category = (categorie) => {
    store.currentCategorie = categorie
    router.push(`/categoria/${categorie.category_name}/${categorie.category_id}`);

};

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
    position: relative;
    /* height: 100%; */
    /* aspect-ratio: 1 / 1;/ */
    height: 100%;
    transition: all ease 0.2s;
    overflow: hidden;
    /* padding: 1rem; */
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 .5rem #00000030; 
    border-radius: .5rem;
    background-color: white;
    cursor: pointer;

    transition: all .2s ease;
    animation: startd ease .5s   ;
    /* Para que el efecto de escala no salga del contenedor */

}


@keyframes startd {
    0% {
        transform: translateY(-3rem) scale(0.9);
        opacity: 0;
    }
    50% {
        opacity: 0.5;
        transform: translateY(0.5rem) scale(1.02);
    }
    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
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
    aspect-ratio: 4/ 3;
    /* padding: 1rem; */
    transition: all ease 0.2s;
}



.container:hover>* {
    color: white;
}

.imagen:hover {
    /* transform: scale(1.05); */
    filter: brightness(1.3);
}


.name{
    padding:0 2rem;
    color: white;
    /* text-shadow: 0 .3rem 1rem rgb(255, 0, 0); */
}


@media (width < 740px) {
    .container {

        grid-template-columns: repeat(2, 1fr);
        gap: .5rem;
        padding: 1rem;
    }

    .name { 
        font-size: 2rem;
        padding: 1rem;
    }
}


@media (width < 600px) {
    .container {

        grid-template-columns: repeat(2, 1fr);
        gap: .5rem;
        padding: 1rem;
    }

    .name {
        font-size:2rem;
        padding: 1rem;
    }
}
</style>
