<template>

    <div style="position: sticky;top: 3rem; z-index: 999; background-color: white;" class="col-12 shadow-3 d-flex p lg:justify-content-center align-items-center mb-5 p-0 md:p-0">


        <div class="col-12  d-flex p  align-items-center  p-0 md:p-0"
        style="flex-wrap: wrap;">

        

        <div v-for="section in store.categories" :key="section.id" class="p-1">
            <button @click="navigateToCategory(section.category_name,section.category_id,section.products)"
                :class="checkSelected(section) ? 'selected menu-button' : 'menu-button'"
                class="p-1 text-lg titulo" style="font-weight: 400; text-transform: uppercase;min-width: max-content;">
                <span class="text-lg" style="min-width: max-content;">{{ section.category_name }}</span>
            </button>
        </div>

        
    </div>
    </div>
    

</template>





<script setup>
import { ref, onMounted, watch } from 'vue';
import router from '@/router/index.js';
import { useRoute } from 'vue-router';
import { categoriesService } from '../service/restaurant/categoriesService'

import { useSitesStore } from '../store/site';

const store = useSitesStore()

const categories = ref([]);
const route = useRoute()

const navigateToCategory = (categoryName,category_id,products = []) => {
    if(category_id == 1000){
        router.push('/tienda-menu/productos/adiciones')
    } else  if(category_id == 2000){
        router.push('/tienda-menu/productos/sabores')
    } else {
        store.currentProducts = products
        router.push({ name: 'sesion', params: { menu_name: categoryName, category_id:category_id } });
    }
};


onMounted(async () => {
    store.categories = await categoriesService.getCategories()
    
    
    if (route.params.category_id){
        const { products } = store.categories.find(c => c.category_id == route.params.category_id)
        store.currentProducts = products
        console.log(products)
    }


    store.categories.push({
        category_name:'Adiciones',
        category_id:1000,
        products:[]
    })

    store.categories.push({
        category_name:'Sabores',
        category_id:2000,
        products:[]
    })
    
}
   


);



watch(() => store.restaurant_id, async() => {
    categories.value = await categoriesService.getCategories()
} )

const checkSelected = (section) => {
    const route = useRoute(); // Asegúrate de que tienes acceso a useRoute aquí
    
    // Verifica si el path actual incluye alguna de las palabras clave
    const isAdiciones = route.path.includes('adiciones');
    const isSabores = route.path.includes('sabores');

    // Determina si la sección actual corresponde a 'adicionales' o 'Sabores'
    if ((section.category_name === 'Adiciones' && isAdiciones) ||
        (section.category_name === 'Sabores' && isSabores)) {
        return true;
    }

    // Compara el category_id del path actual con el de la sección
    return route.params.category_id == section.category_id;
};



</script>


<style scoped>
.boton-menu {
    margin: 0;
    border: none;
    background-color: transparent;
    font-size: 20px;
    padding: 0 20px;
}

* {
    text-transform: lowercase;
}

*::first-letter {
    text-transform: uppercase;
}

.menu-button {
    background-color: transparent;
    padding: 1rem;
    margin: 0 1rem;
    border: none;
    font-size: 20px;
    outline: none;

}

.menu-button:hover {

    cursor: pointer;


}

*:focus {
    outline: none;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.titulo {
    text-transform: lowercase;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.selected {
    box-shadow: 0 0.5rem var(--primary-color);

}
.col-12 {
    width: 100vw;
    /* position: absolute; */
    left: 0;
    padding: 1.5rem;
}
</style>