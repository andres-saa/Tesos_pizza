<script setup>
import AppLayout from './AppLayout/AppLayout.vue';
import Button from 'primevue/button';
import VistaProducto from './views/VistaProducto.vue';
import siteDialog from './views/siteDialog.vue';
import router from './router';
import Toast from 'primevue/toast';




</script>

<template>

  <Toast></Toast>
  <router-view></router-view>


  <div class="menu-button2 " style="position: fixed; left: 0rem;top: 50%;background-color: white; z-index: 900; ">
    <div class="social-media2 "
      style="background-color: #fff;box-shadow: 0 0 .4rem #00000050; padding: .1rem; border-radius: 10rem ;overflow: hidden;">


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

  <Button @click="router.push('/cart')" class="cart-button" style="">

    <i class="pi pi-shopping-cart"></i>

  </Button>
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
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  width: 4rem;
  background-color: var(--primary-color);
  border: none;
  display: none;

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
