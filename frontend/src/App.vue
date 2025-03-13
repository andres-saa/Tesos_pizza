<script setup>
import AppLayout from './AppLayout/AppLayout.vue';
import Button from 'primevue/button';
import VistaProducto from './views/VistaProducto.vue';
import siteDialog from './views/siteDialog.vue';
import router from './router';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import { useSitesStore } from './stores/site';
import { onMounted, watch, onBeforeUnmount, ref } from 'vue';
import { usecartStore } from './stores/shoping_cart';
import { URI } from './service/conection';
import { fetchService } from './service/utils/fetchService';
import Banner from './components/Banner.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const store  = useSitesStore()
const cartStore = usecartStore()


const obtenerstatus = async () => {
  const siteStore = useSitesStore()

  try {
    const response = await fetch(`${URI}/site/${31}/status`)
    const data = await response.json()

    siteStore.status = data
  } catch (error) {
    console.error('Error al obtener el status:', error)
    siteStore.status = 'cerrado'
  }
}

// Guardamos el ID del intervalo para poder limpiarlo
let intervalId

onMounted(async() => {
  // Ejecutamos inicialmente la función
  obtenerstatus()

  cartStore.categories = await fetchService.get(`${URI}/categories/31/5`)

  if (route.params?.category_id) {
    cartStore.currentCategorie = cartStore.categories.filter(c => c.category_id == route.params.category_id)

  }
  cartStore.versionMenu++
  // alert(cartStore.versionMenu)
  // Repetimos cada 5 segundos
  intervalId = setInterval(() => {
    obtenerstatus()
  }, 60000)
})

onBeforeUnmount(() => {
  // Limpiamos el intervalo al desmontar el componente
  clearInterval(intervalId)
})

const loadingClass = ref({
  true:'entrar',
  false:'salir'
})

</script>

<template>


  <div  style="width: 100vw;pointer-events: none; height: 100vh;position: fixed;display: flex;align-items: center;justify-content: center; left: 0;right: 0;z-index: 99999999;">
    
    <div :class="loadingClass[store.visibles.loading]">
      <img class="imagen"  src="/public/images/logo.png" style="width:20vw ;max-width: 200px; " alt="">

    </div>
  </div>

  <Toast></Toast>
  <router-view></router-view>


  <div class="menu-button2 " style="position: fixed; box-shadow: 0 -.3rem 1rem #00000040; left: 0rem;bottom: 0;background-color: var(--p-badge-primary-background); z-index: 900;width: 100%;justify-content: center;">
    <div class="social-media2 "
      style="padding: .1rem;;overflow: hidden;width:min-content;padding: .5rem;">

<RouterLink to="/rastrear"> 
  <Button label="Rastrear mi pedido" style="min-width: max-content;font-weight: bold;font-size: auto; height: 100%; background-color:  var(--p-button-primary-hover-background);"  ></Button>

</RouterLink>

      <a href="https://www.facebook.com/tezospizza/?locale=es_LA" style="background-color: var(--p-button-primary-hover-background);">
        <Button style="padding: 0;border-radius: .5rem;overflow: hidden;"   size="large" text class="menu-bars text-facebook p-2">

          <i style="color: #fff !important;" class="pi pi-facebook text-icon p-0 m-0"></i>
        </Button>
      </a>


      <a href="https://www.instagram.com/tezos_pizza/?igsh=MTN0bnhueHE5M3l0dw%3D%3D" style="background-color: var(--p-button-primary-hover-background);">
        <Button style="padding: 0;" size="large" text class="menu-bars text-instagram p-2">
          <i class="pi pi-instagram "></i>
        </Button>
      </a>

      
      <a href="https://wa.me/573135839879" style="background-color: var(--p-button-primary-hover-background);">
        <Button style="padding: 0;" size="large" text class="menu-bars text-whatsapp p-2">
          <i class="pi pi-whatsapp"></i>
        </Button>
      </a>
    </div>

  </div>




  <vista-producto />
  <siteDialog></siteDialog>

  <div class="cart-button" style="">
    
    <Button class="botomcar" @click="router.push('/cart')"  style="">
 
    <i class="pi pi-shopping-cart"></i>

    </Button>
  
    <Badge v-if="cartStore.cart.products.length > 0" style="position: absolute;left: 70% ; bottom:60%;aspect-ratio: 1  / 1;border-radius: 50%;">{{ cartStore.cart.products.length }}</Badge>

  </div>

</template>

<style scoped>
.layout {
  /* max-width: 1024px; */
  margin: auto;
  position: relative;
}



.cart-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: none;


}


.botomcar{
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  width: 4rem;
  background-color: var(--primary-color);
  border: none;
  /* display: none; */
}


@media (width > 900px) {
  .cart-button {
    right: 3rem;
    bottom: 5rem;
    display: flex;
  }
}

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


.menu-button2{
  display: flex;
  padding: 0rem 0;
  border-radius: 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: .5rem;
}


* {
  border-radius: .5rem;
}
.text-facebook {
  background: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-instagram {
  background: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-whatsapp {
  background: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.social-media2 {
  display: flex;
  /* flex-direction: column;   */
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
  height: 2.5rem;

  justify-content: end;
}

.search {
  width: 100%;
  height: 100%;
  max-width: 400px;
  background-color: white;
  border: none;
}


.entrar {
  animation: entrarcorto 0.3s forwards;
}

.salir {
  animation: salircorto 0.3s forwards;
}

@media (width < 600px) {

  .salir {
  animation: salir 0.3s forwards;
  }

  .entrar {
    animation: entrar 0.3s forwards;
  }

  
}

@keyframes entrar {

  0% {
        transform: translateX(-50vw) scale(0.5);
        opacity: 0;
    }

    100% {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
  
}

@keyframes salir {

0% 

  {
      transform: translateX(0) scale(1);
      opacity: 1;
  }

  100% {
      transform: translateX(50vw) scale(0.5);
      opacity: 0;
  }

}



@keyframes entrarcorto {

0% {
      transform: translateX(-10vw) scale(0.5);
      opacity: 0;
  }

  100% {
      transform: translateX(0) scale(1);
      opacity: 1;
  }

}

@keyframes salircorto {

0% 

{
    transform: translateX(0) scale(1);
    opacity: 1;
}

100% {
    transform: translateX(10vw) scale(0.5);
    opacity: 0;
}

}



.header {

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: .5rem;

}


.imagen {
  animation: saltitos .5s linear infinite;
  /* opacity: 0; */

}

@keyframes saltitos {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-30px); /* Salto hacia arriba */
  }
  50% {
    transform: translateY(0); /* Vuelve a la posición original */
  }
  65% {
    transform: translateY(-15px); /* Rebote pequeño */
  }
  100% {
    transform: translateY(0); /* Termina en reposo */
  }
}

h1 {
  font-family: "Luckiest Guy", cursive;
  letter-spacing: .1cap;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;




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
