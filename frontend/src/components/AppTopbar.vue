<template>
    <div class="app-topbar-container p-2" style="background-color: var(--primary-color);">
        <div class="header" style="max-width: 1280px;margin: auto;">


            <div class="header-container">

                <router-link to="/" style="text-decoration: none;">
                    <div class="logo-sesion">
                        <img src="/src/assets/images/logo.webp" alt="">
                        <h1 class="title roboto-thin m-0 p-0">
                            <b>
                                TEZO'S PIZZA
                            </b>
                        </h1>
                    </div>
                </router-link>



                <div class="menus" v-if="true" style="">



                    <router-link to="/">
                        <Button :style="is_active_router('/') ? 'box-shadow:0 .3rem white' : ''"
                            style="color:white;border-radius: 0;" text label="Domilicios"></Button>
                    </router-link>

                    <router-link to="/carta">
                        <div>
                            <Button :style="is_active_router('/carta') ? 'box-shadow:0 .3rem white' : ''"
                            style="color:white;border-radius: 0;" text label="Carta"></Button>

                       
                        </div>
                     

                    </router-link>

                    <router-link to="/rastrear">
                        <Button :style="is_active_router('/rastrear') ? 'box-shadow:0 .3rem white' : ''"
                            style="color:white;border-radius: 0;" text label="Rastrear"></Button>
                    </router-link>


                    <!-- <Button style="color:white" text label="Nosotros"></Button>
                    <Button style="color:white" text label="PQRS"></Button> -->
                </div>



                <div class="menu-button">
                    <div class="social-media"
                        style="background-color: #fff; padding: .1rem; border-radius: 10rem;overflow: hidden;">


                        <a href="https://www.facebook.com/tezospizza/?locale=es_LA">
                            <Button style="padding: 0;color: #4267B2;" size="large" text
                                class="menu-bars text-facebook">

                                <i class="pi pi-facebook text-icon"></i>
                            </Button>
                        </a>


                        <a href="https://www.instagram.com/tezos_pizza/?igsh=MTN0bnhueHE5M3l0dw%3D%3D">
                            <Button style="padding: 0;" size="large" text class="menu-bars text-instagram">
                                <i class="pi pi-instagram "></i>
                            </Button>
                        </a>

                        <a href="https://wa.link/7pde2f">
                            <Button style="padding: 0;" size="large" text class="menu-bars text-whatsapp">
                                <i class="pi pi-whatsapp"></i>
                            </Button>
                        </a>
                    </div>

                </div>




                <RouterLink to="/cart" class="button-barrras">
                    <div style="padding: 0;color: #fff;margin: 0;position: relative;">
                        <Button size="large" style="color: white;padding: 1rem" text="" class="menu-bars p-0">
                            <i class="pi pi-shopping-cart"></i>
                        
                        </Button>
                        <Badge style="position: absolute;left: 70% ; bottom:60%;aspect-ratio: 1  / 1;border-radius: 50%;">{{ cart.cart.products?.length }}</Badge>
                    </div>
                </RouterLink>

                <Button @click="toggleSidebar" size="large" style="padding: 0;color: #fff;margin: 0;" text
                    class="menu-bars button-barrras">
                    <i class="pi pi-bars"></i>
                </Button>
            </div>






        </div>











    </div>





</template>

<script setup>


import { useSidebarStore } from '@/stores/sidebar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { useRoute, useRouter } from 'vue-router';
import Tag from 'primevue/tag';
import Badge from 'primevue/badge';
import { usecartStore } from '@/stores/shoping_cart';


const cart = usecartStore()
const route = useRoute()


const toggleSidebar = (event) => {
  event.stopPropagation(); // Evita que el clic se propague
  store.toggle(); // Alterna el estado del sidebar
};

const is_active_router = (r) => {
    return route.path === r
}

is_active_router()

const store = useSidebarStore()
</script>

<style scoped>
.app-topbar-container {}

.logo-sesion {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;

}

.menu-bars {
    font-weight: bold;
    aspect-ratio: 1 / 1;
    padding: 9;
    color: var(--primary-color);
    min-width: max-content;
}

i {

    font-size: 1.8rem;
    padding: .1rem;
}


.menus{
    display: flex;
    padding: .5rem;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding-top: .5rem; */
}

.text-facebook {
    background: var(--facebook-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.text-instagram {
    background: var(--instagram-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.text-whatsapp {
    background: var(--whatsapp-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}


*:focus{
    background-color: rgba(0, 0, 0, 0.24) !important;
}


.social-media2 {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}


.social-media {
    display: flex;
    gap: .5rem;
}


.nav-bar {
    display: flex;
    /* grid-template-columns: 1fr 5fr 2fr; */
    width: 100%;
    gap: 1rem;
    align-items: center;
    height: 2rem;

    justify-content: end;
}

.search {
    width: 100%;
    height: 100%;
    max-width: 400px;
    background-color: white;
    border: none;
}


.header {

    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* padding-bottom: .5rem; */

}

h1 {
    font-family: "Luckiest Guy", cursive;
    letter-spacing: .1cap;
    font-size: 1.5rem;
    color: white;
    text-decoration: none;




}

img {
    width: 30%;
    max-width: 3rem;
    border-radius: 50%;
    overflow: hidden;
}

.menu-button {
    display: flex;
    justify-content: end;
    padding: 0;
    margin: 0;
}


@media (width < 1400px) {
    .app-topbar-container {
        padding: 0 1rem;



    }




}


@media (width < 900px) {
    .app-topbar-container {
        padding: 0 1rem;



    }


    .menus {
        display: none
    }


}



@media (width > 900px) {
    .button-barrras {
        display: none;
    }
}


* {
    text-decoration: none;
}

.menu {
    display: flex;
}


@media (width < 900px) {
    .menu-button {
        display: none;
    }
}


@media (width > 900px) {
    .menu-button2 {
        display: none;
    }
}
</style>