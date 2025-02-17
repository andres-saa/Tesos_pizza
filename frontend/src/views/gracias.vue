<template>
  <div class="p-2 col-12 my-3"
    style="height: auto;min-height: 90vh; display: flex; justify-content: center; align-items: center;">
    <div class="shadow-3 p-2" style="border-radius: 0.5rem; max-width: 500px;">
      <p class="text-4xl text-center mt-5" style="font-weight: bold;"> 🤩{{ user.user.name.toUpperCase() }}🤩</p>
      <p class="text-2xl text-center mb-5" style="font-weight: bold;">🔥MUCHAS GRACIAS POR TU COMPRA!🔥</p>

      <p class="text-4xl text-center my-5" style="font-weight: bold; text-transform: uppercase;"> <span
          class="text-2xl">ID DEL PEDIDO</span> <br> #{{ store.last_order }}</p>

      <!-- {{ store.cart }} -->
      <!-- <pre>{{ text }}</pre> -->


      <p class="text-2xl text-center my-3 p-3"
        style=" border-radius: .3rem; background-color: var(--primary-color); color: white;">Hemos recibido tu pedido y
        en breve será despachado</p>



        <resumenGracias></resumenGracias>



      <div style="display: flex;flex-direction: column;gap: 1rem;">


        <router-link to="/rastrear">
          <Button class="mt-3" icon="pi " iconPos="right" severity="warning" style="font-weight: bold; width: 100%;"
            label="PUEDES RASTREARLO AQUI"></Button>
        </router-link>

        <h6>Realiza 7 compras y reclama un obsequio</h6>

        <a v-if="user.user.payment_method_option.id == 6" :href="whatsappUrl" target="_blank"> <Button
            icon="pi pi-whatsapp" severity="danger" class="wsp"
            style="font-weight: bold;background-color: #00b66c; border: none; width: 100%;"
            label="REALIZAR TRANSFERENCIA"></Button>
        </a>
        

        <a @click="router.push('/')" v-else :href="whatsappUrl2" target="_blank"> <Button
            icon="pi pi-whatsapp" severity="danger" class="wsp"
            style="font-weight: bold;background-color: #00b66c; border: none; width: 100%;"
            label="ACUMULAR PUNTOS"></Button>
        </a>

        <router-link to="/">
          <Button icon="pi pi-arrow-left" severity="danger" outlined
            style="font-weight: bold; border: none; width: 100%;" label="VOLVER AL MENU"></Button>
        </router-link>




      </div>

    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, onBeforeMount, computed } from 'vue';
import { usecartStore } from '@/stores/shoping_cart';
import resumenGracias from './resumenGracias.vue';
import { useUserStore } from '@/stores/user';
import { useSitesStore } from '@/stores/site';
import Tag from 'primevue/tag';
import router from '@/router';
import Button from 'primevue/button';
const site = useSitesStore();
import { formatoPesosColombianos } from '@/service/utils/formatoPesos';
const text = ref('');
const text2 = ref('');
const store = usecartStore();
const user = useUserStore()


const obtenerHoraFormateadaAMPM = (fecha) => {
  const fechaParseada = new Date(fecha);
  const horas = fechaParseada.getHours();
  const minutos = fechaParseada.getMinutes();
  const ampm = horas >= 12 ? 'pm' : 'am';
  const hora12 = horas % 12 || 12;
  const horaFormateada = hora12 < 10 ? '0' + hora12 : hora12;
  const minutosFormateados = minutos < 10 ? '0' + minutos : minutos;

  return `${horaFormateada}:${minutosFormateados} ${ampm}`;
};






onMounted(() => {
  text.value = `Hola soy *${user.user.name.toUpperCase()}* 🤗 acabo de hacer el siguiente pedido en la página web. El número de la orden es *#${store.last_order}*.\n

*Escribo para Realizar la Transferecia*\n
*🛒 PRODUCTOS*\n${store.cart.products.map(product => `*${product.quantity}* ${product.product.product_name}`).join('\n')}\n\n`;

  if (store.cart.additions.length > 0) {
    text.value += `*➕ ADICIONES*\n${store.cart.additions.filter(a => a.group == 'ADICIONES').map(product => `*${product.quantity}* ${product.name}`).join('\n')}\n\n`;
  }

  if (store.cart.additions.filter(a => a.group == 'CAMBIOS').length > 0) {
    text.value += `*➕ CAMBIOS*\n${store.cart.additions.filter(a => a.group == 'CAMBIOS').map(product => `*${product.quantity}* ${product.name}`).join('\n')}\n\n`;
  }

  if (store.cart.additions.filter(a => a.group == 'SALSAS').length > 0) {
    text.value += `*➕ SALSAS*\n${store.cart.additions.filter(a => a.group == 'SALSAS').map(product => ` ${product.name}`).join('\n')}\n\n`;
  }

  text.value += `*📍 DIRECCIÓN*\n${user.user.address} BARRIO ${site.location?.neigborhood?.name}\n
*📞 TELEFONO*\n${user.user.phone_number}\n
*📝 NOTAS*\n${store.cart.order_notes || 'Sin notas'}\n
*💰 METODO DE PAGO*\n${user.user.payment_method_option.name}\n
*Muchas Gracias* 🙏`;

  console.log(text.value);

});








onMounted(() => {
  text2.value = `Hola soy *${user.user.name.toUpperCase()}* 🤗 acabo de hacer el siguiente pedido en la página web. El número de la orden es *#${store.last_order}*.\n

*Escribo para aplicar por el obsequio de las 7 compras*\n
*🛒 PRODUCTOS*\n${store.cart.products.map(product => `*${product.quantity}* ${product.product.product_name}`).join('\n')}\n\n`;

  if (store.cart.additions.length > 0) {
    text.value += `*➕ ADICIONES*\n${store.cart.additions.filter(a => a.group == 'ADICIONES').map(product => `*${product.quantity}* ${product.name}`).join('\n')}\n\n`;
  }

  if (store.cart.additions.filter(a => a.group == 'CAMBIOS').length > 0) {
    text.value += `*➕ CAMBIOS*\n${store.cart.additions.filter(a => a.group == 'CAMBIOS').map(product => `*${product.quantity}* ${product.name}`).join('\n')}\n\n`;
  }

  if (store.cart.additions.filter(a => a.group == 'SALSAS').length > 0) {
    text.value += `*➕ SALSAS*\n${store.cart.additions.filter(a => a.group == 'SALSAS').map(product => ` ${product.name}`).join('\n')}\n\n`;
  }

  text.value += `*📍 DIRECCIÓN*\n${user.user.address} BARRIO ${site.location?.neigborhood?.name}\n
*📞 TELEFONO*\n${user.user.phone_number}\n
*📝 NOTAS*\n${store.cart.order_notes || 'Sin notas'}\n
*💰 METODO DE PAGO*\n${user.user.payment_method_option.name}\n
*Muchas Gracias* 🙏`;

  console.log(text.value);

});








const whatsappUrl = computed(() => {
  const baseUrl = 'https://api.whatsapp.com/send';
  const urlParams = new URLSearchParams({
    phone: '573135839879',
    text: text.value
  });
  return `${baseUrl}?${urlParams.toString()}`;
});



const whatsappUrl2 = computed(() => {
  const baseUrl = 'https://api.whatsapp.com/send';
  const urlParams = new URLSearchParams({
    phone: '573135839879',
    text: text2.value
  });
  return `${baseUrl}?${urlParams.toString()}`;
});



onBeforeUnmount(() => {
  // user.user = {
  //   name: '',
  //   neigborhood: '',
  //   address: '',
  //   phone_number: '',
  //   payment_method_option: ''
  // },

  store.cart = {
    products: [],
    total_cost: 0,
    additions: []  // Nueva propiedad para manejar las adiciones a nivel del carrito
  }
})

onBeforeMount(() => {
  store.cart.products.length <= 0 ? router.push('/') : ''
})

</script>


<style scoped>
@keyframes parpadeo {
  0% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.1);
    transform: scale(1.01);
  }

}

.wsp {
  animation: parpadeo ease infinite .5s;
  transition: all ease .5s;
}
</style>