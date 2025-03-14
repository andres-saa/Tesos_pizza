<template>
  <div class="p-0 my-1 md:my col-12" v-if="store.cart?.products?.length > 0">
    <div
      style="position: sticky; top: 5rem; border-radius: 0.5rem; z-index: 100; box-shadow: 0 .5rem 1rem #00000020; border: 1px solid #00000040;"
      class="col-12 p-3 p-shadow m-0"
    >
      <h5 style="text-transform: capitalize;"><b>Resumen</b></h5>

      <h5 style="text-transform: capitalize;" ><b>Productos</b></h5>

      <!-- Lista de productos en el carrito -->
      <div
        v-for="product in store.cart.products"
        :key="product.signature"
        style="display: flex; justify-content: space-between; flex-direction: column; margin-bottom: 0;"
      >
        <!-- Encabezado: cantidad, nombre del producto, precio base * cantidad -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 0;">
          <div style="display: flex; align-items: center;">
            <span style="min-width: 2rem; font-weight: bold;">{{ product.quantity }}</span>
            <span style="text-transform: uppercase;"><b>{{ product.product.product_name }}</b> </span>
          </div>
          <div style="text-align: right;">
            <span>
              <b>
                {{
                formatoPesosColombianos(
                  product.product.price * product.quantity
                )
              }}
              </b>
           
            </span>
          </div>
        </div>

        <!-- Sabores -->
        <div v-for="(grupo, index) in product.flavors"
          
        >
          <!-- Recorremos cada sabor -->
           <b style="text-transform: capitalize;">            {{ grupo.invoice_name }}
          </b>
          
          <div
            v-for="(flavor, index) in grupo.flavors"
            :key="index"
            
          >

          <div style="display: flex;flex-direction: ; width: 100%; gap: 0.2rem; align-items: center; justify-content: space-between;">



            <div style="text-transform: capitalize;">

  <span>

    <b>
      {{   grupo.flavors.length == 2
        ? '1/2'
        :'1' }}
    </b>
    
   </span>
<span style="color: black; margin-right: 0.3rem;">
<!-- Mostrar '1/2' si hay más de 1 sabor no-gaseosa. De lo contrario, 'sabor'. -->



</span>

{{ flavor.name }}
<!-- Si hay más de una unidad del producto y el flavor tiene precio, mostrar "x N" -->
<span >
x 
<b>
{{ product.quantity }}

</b>
</span>
</div>

<!-- Precio por sabor (si flavor.price > 0).  Si hay varios no-gaseosa, se cobra la mitad. -->
<p class="p-0 m-0" v-if="flavor.price > 0">
<b>
{{
// Si está combinado => half price. De lo contrario => full price.
formatoPesosColombianos(
  (grupo.flavors.length == 2 ? flavor.price / 2 : flavor.price) * product.quantity
)
}}
</b>
</p>
</div>












          </div>
          
         
        </div>

        <div style="width: 100%;border-top: 2px dashed;"></div>

        <!-- Múltiples gaseosas (array) -->
        <div
          v-if="Array.isArray(product.gaseosa) && product.gaseosa.length > 0"
          style="display: flex; gap:1rem; align-items: center; width: 100%; flex-wrap: wrap;"
        >
          <h6 style="margin: 0;">
            <b>
              {{ product.gaseosa.length > 1 ? 'Gaseosas' : 'Gaseosa' }}
            </b>
          </h6>
          <div style="display: flex; gap: 1rem; flex-direction: row;">
            <Tag
              v-for="(gas, i) in product.gaseosa"
              :key="i"
              severity="info"
              style="text-transform: capitalize;"
            >
              {{ gas.name }}
            </Tag>
          </div>
        </div>

        <!-- Gaseosa única (objeto) -->
        <div
          v-else-if="product?.gaseosa?.name"
          style="display: flex; gap:1rem; align-items: center; width: 100%; flex-wrap: wrap;"
        >
          <h6 style="margin: 0;"><b>Gaseosa</b></h6>
          <div style="display: flex; gap: 1rem; flex-direction: row;">
            <Tag severity="info" style="text-transform: capitalize;">
              {{ product.gaseosa?.name }}
            </Tag>
          </div>
        </div>
      </div>

      <!-- Adiciones globales agrupadas -->
      <div class="col-12 p-0 mt-1">
        <div
          class="p-0 mb-2"
          v-for="(items, grupo) in agrupados"
          :key="grupo"
          style="position: relative; border-radius: 0.3rem;"
        >
          <div class="mb-0">
            <span class="mb-1 text-center">
              <b>{{ grupo }}</b>
            </span>

            <div
              v-for="item in items"
              :key="item.aditional_item_instance_id"
              style="display: flex; gap: 1rem; align-items: center;"
            >
              <div style="display: flex; width: 100%; gap: 1rem; justify-content: space-between;">
                <!-- Cantidad y nombre de la adición -->
                <span class="text adicion">
                  <b>{{ item.quantity }}</b>
                  {{ item.name }}
                </span>

                <!-- Precio total de esa adición * su cantidad -->
                <span v-if="item.price > 0" class="pl-2 text-sm">
                  <b>{{ formatoPesosColombianos(item.price * item.quantity) }}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subtotal, domicilio, total -->
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex;text-transform: capitalize;align-items: center; justify-content: space-between;">
          <span><b>Subtotal</b></span>
          <span><b>{{ formatoPesosColombianos(store.cart.total_cost) }}</b></span>
        </div>

        <div style="display: flex;text-transform: capitalize; justify-content: space-between;">
          <span
            :style="siteStore.location.neigborhood.delivery_price == 0
              ? 'text-decoration: line-through;'
              : ''"
          >
            <b>Domicilio</b>
          </span>

          <!-- Si es gratis => “Recoger en local”; si no => su precio -->
          <span
            v-if="siteStore.location.neigborhood.delivery_price == 0"
            style="color: var(--primary-color);"
          >
            <b>Recoger en local</b>
          </span>
          <span v-else>
            <b>{{ formatoPesosColombianos(siteStore.location.neigborhood.delivery_price) }}</b>
          </span>
        </div>

        <div style="display: flex;text-transform: capitalize; justify-content: space-between;">
          <span><b>Total</b></span>
          <span>
            <b>
              {{
                formatoPesosColombianos(
                  store.cart.total_cost + siteStore.location.neigborhood.delivery_price
                )
              }}
            </b>
          </span>
        </div>
      </div>

   
    </div>
  </div>
</template>

<script setup>
import { formatoPesosColombianos } from '@/service/utils/formatoPesos';
import { usecartStore } from '@/stores/shoping_cart';
import { useSitesStore } from '@/stores/site';
import { useRoute } from 'vue-router';
import { orderService } from '@/service/order/orderService';
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const sending = ref(false)
const route = useRoute()
const store = usecartStore()
const siteStore = useSitesStore()
const user = useUserStore()



const agrupados = ref({})



const update = () => {
    agrupados.value = store.cart.additions.reduce((acumulador, elemento) => {
        let grupo = elemento.group;

        if (!acumulador[grupo]) {
            acumulador[grupo] = [];
        }
        acumulador[grupo].push(elemento);

        return acumulador;
    }, {})
}




onMounted(() => {
    update()

    if (user.user.payment_method_option?.id != 7)
        siteStore.setNeighborhoodPrice()
    else {
        siteStore.setNeighborhoodPriceCero()

    }

    if(siteStore.location?.neigborhood.delivery_price === null){
        siteStore.visibles.currentSite = true
    }


})


watch(() => store.cart.additions, () => {
    update()
}, { deep: true })



</script>
<style scoped>
.p-shadow {
    box-shadow: 0 .3rem 5px rgba(0, 0, 0, 0.15);
}

button {
    text-transform: uppercase;
}

* {
    text-transform: lowercase;
    font-size: 0.9rem;
}

*::first-letter {
    text-transform: uppercase;
}
</style>