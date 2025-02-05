<script setup>
import AppLayout from './AppLayout/AppLayout.vue';
import Button from 'primevue/button';
import VistaProducto from './views/VistaProducto.vue';
import siteDialog from './views/siteDialog.vue';
import router from './router';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import { useSitesStore } from './stores/site';
import { onMounted, watch } from 'vue';
import { usecartStore } from './stores/shoping_cart';
import Banner from './components/Banner.vue';
const store  = useSitesStore()
const cartStore = usecartStore()




</script>

<template>


  <div class="" v-if="store.visibles.loading" style="width: 100vw; height: 100vh;position: fixed;display: flex;align-items: center;justify-content: center; left: 0;right: 0;z-index: 99999999;">
    <img class="imagen" src="/public/images/logo.png" style="width:20vw ;max-width: 200px;" alt="">
  </div>

  <Toast></Toast>
  <router-view></router-view>


  <div class="menu-button2 " style="position: fixed; box-shadow: 0 -.3rem 1rem #00000040; left: 0rem;bottom: 0;background-color: white; z-index: 900;width: 100%;justify-content: center;">
    <div class="social-media2 "
      style="background-color: #fff; padding: .1rem;;overflow: hidden;width:min-content;">

<RouterLink to="/rastrear"> 
  <Button label="Rastrear mi pedido" style="min-width: max-content;padding: 0 1rem; height: 2rem;" rounded ></Button>

</RouterLink>

      <a href="https://www.facebook.com/tezospizza/?locale=es_LA">
        <Button style="padding: 0;color: #4267B2;" size="large" text class="menu-bars text-facebook">

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
  padding: .2rem 0;
  align-items: center;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: .5rem;
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


.social-media2 {
  display: flex;
  /* flex-direction: column;   */
  gap: .5rem;
  align-items: center;
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


.header {

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: .5rem;

}


.imagen {
  animation: hithere 1s ease infinite;

}

@keyframes hithere {
  30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
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
