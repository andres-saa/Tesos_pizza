<template>
    <div class="side-bar-container">
        <div class="sidebar-content" style="position: relative;">
            <!-- <Button icon="pi pi-bars" @click="store.toggle_visible_categories" label="CATEGORIAS"







                class="category-toggle"></Button> -->


            <div class="selector"
                style="background-color: var(--primary-color);width: 100%; border-radius: .3rem;justify-content: space-between; gap:.5rem;padding: .5rem 1rem;position: sticky;top: 0;left: 0;right: 0;z-index: 99;"
                :style="!store.visible_categoires ? 'max-height:15rem' : 'max-height:0'">

                <router-link to="/">
                    <Button @click="() => store.side_bar_visible ? store.side_bar_visible = false : ''"
                        :style="is_active_router('/') ? 'box-shadow:0 .3rem white' : ''"
                        style="color:white;border-radius: 0;padding: 0 0 .3rem 0;" text label="Domilicios"></Button>
                </router-link>

                <router-link to="/carta">
                    <Button @click="() => store.side_bar_visible ? store.side_bar_visible = false : ''"
                        :style="is_active_router('/carta') ? 'box-shadow:0 .3rem white' : ''"
                        style="color:white;border-radius: 0;padding: 0 0 .3rem 0;" text label="Carta"></Button>
                </router-link>

                <router-link to="/rastrear">
                    <Button @click="() => store.side_bar_visible ? store.side_bar_visible = false : ''"
                        :style="is_active_router('/rastrear') ? 'box-shadow:0 .3rem white' : ''"
                        style="color:white;border-radius: 0;padding: 0 0 .3rem 0;" text label="Rastrear"></Button>
                </router-link>


                <!-- <Button style="color:white" text label="Nosotros"></Button>
                    <Button style="color:white" text label="PQRS"></Button> -->
            </div>

            <div class="banner-container" style="margin: auto; position: relative; margin: auto;min-width: 100%;">
                <div class="title" style="max-width: 100%; margin: auto;">
                    <div class="categories">
                        <h2 @click="navigate_to_category(i.category_name, i.category_id)"
                            :style="route.params.category_id == i.category_id ? 'background-color: var(--primary-color); color: #fff;' : ''"
                            class="categorie" v-for="i in categories" :key="i.category_id">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmV9w5hL6O_z_2mm_aYvcpBZQIqhiVcb606ZchvYetf3cXw2STy0lzsDXYhRpOH1vuOM&usqp=CAU"
                                style="height: 2rem; object-fit: cover;aspect-ratio: 1 / 1;border-radius: 50%; text-align: center; filter: brightness(1.2); margin-right:
                    0.5rem;" />
                            <h5 class="m-0 p-0" style="text-transform: capitalize;font-weight: 400;">{{
                                i.category_name?.toLowerCase() }}
                            </h5>
                        </h2>
                    </div>
                </div>
            </div>





            <!-- 
            <div class="menu menu-carousel" style="padding: 0;">

                <div
                    style="background-color: #0d8342;padding:0 0rem  0rem .8rem; width: 100%; display: flex; align-items: center; justify-content: space-between;">

                    <p> <b>LO MAS NUEVO</b>
                    </p>


                    <div style="display: flex; gap: .5rem;">
                        <Button icon="pi pi-angle-left" class="arrow" />
                        <Button icon="pi pi-angle-right" class="arrow" />
                    </div>

                </div>



                <div class="news">

                </div>


            </div> -->

            <div class="menu menu-carousel" style="padding: 0; position: sticky;top:1rem;">

                <div
                    style="background: var(--instagram-gradient);padding: .8rem; width: 100%; display: flex;gap: 1rem; align-items: center; justify-content:start;color: #fff;">

                    <i style="height: 100%;" class="pi pi-instagram"></i>
                    <p class="p-0 m-0"> <b> NUEVO POST</b>
                    </p>




                </div>



                <div class="">




                    <iframe src="https://www.instagram.com/p/C5WwaZPPxoK/embed" width="100%" style="height: 600px;"
                        frameborder="0" scrolling="no" allowtransparency="true">
                    </iframe>




                </div>


            </div>

        </div>


    </div>
</template>

<style scoped>
.side-bar-container {
    min-width: 18rem;
    max-width: 80vw;
    height: 100%;
    min-height: 100%;
    /* background-color: black; */
    /* min-height: max-content; */
    /* position: f; */
    /* top: 0rem; */
    padding: 1rem;
    /* z-index: 9999999999; */
}

.category-toggle {
    width: 100%;
    border-radius: .2rem;
    background-color: #fff;
    border: none;
    /* color: white; */

}

.news {
    padding: 1rem;
}

h3 {
    background-color: #0d8342;
}

.card-carousel-new {
    /* background-color: rgba(255, 0, 0, 0.342); */
    /* box-shadow: 0 0 1rem; */
    /* padding: 1rem; */
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.category-toggle:hover {

    filter: brightness(1.1);
    background-color: var(--primary-color) !important;
    border: none !important;
    color: white !important;
    outline: 1px solid;
}

.arrow {
    background-color: rgba(0, 0, 0, 0.399);
    border-radius: .3rem;
    border: none;
    aspect-ratio: 1 / 1;
    color: white;
}

.arrow:hover {
    border: none !important;
    background-color: rgba(0, 0, 0, 0.399) !important;
    filter: brightness(1.1);
}


.carrito {

    width: 100%;
    border-radius: .3rem;
    display: flex;
    justify-content: start;
    color: #999;
    border: none;

}


.price {
    font-size: 1.5rem;
    text-align: end;

}

.carrito:hover {
    background: var(--primary-color) !important;
    border: none !important;
    filter: brightness(1.1);
}

.product_image {
    width: 100%;
    width: 100%;
    border-radius: 0;
    display: flex;
    justify-content: start;
    color: #999;

}

.category {}

.sidebar-content {

    /* height: 100%; */
    min-height: max-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.menu {
    background-color: #fff;
    border-radius: .3rem;
    overflow: hidden;
    /* box-shadow: 0 0 1rem rgba(0, 0, 0, 0.113); */
    transition: all ease .3s;
    padding: 0rem;
}

.menu-carousel {
    padding: 1rem;
}

.selector {
    display: flex;
}

@media (width > 900px) {

    .selector {
        display: none;
    }

    .categories {
        display: none;
    }

}


.categorie {
    display: flex;
    align-items: center;
    background-color: #00000020;
    border-radius: .5rem;
    padding: .2rem .5rem;

    transition: all 0.2s ease;
    cursor: pointer;
    white-space: nowrap;
}

.categorie:hover {
    background-color: var(--primary-color);
    color: #fff;
}
</style>

<script setup>
import Button from 'primevue/button';
import { useSidebarStore } from '@/stores/sidebar';
import { onMounted, ref } from 'vue';
import { URI } from '@/service/conection';
const store = useSidebarStore()

import { useRoute, useRouter } from 'vue-router';

const route = useRoute()



const is_active_router = (r) => {
    return route.path === r
}


import router from '@/router';
import { fetchService } from '@/service/utils/fetchService';



const navigate_to_category = (categor_name, category_id) => {
    router.push(`/categoria/${categor_name}/${category_id}`)
    store.side_bar_visible ? store.side_bar_visible = false : ''
}


const categories = ref([]);

onMounted(async () => {
    categories.value = await fetchService.get(`${URI}/categories/31/5`);
});


</script>