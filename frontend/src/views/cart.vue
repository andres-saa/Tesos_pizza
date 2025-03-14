<template>
  <div>
    <div class="col-12 my-8 md:my-8 p-0">
      <h4 class="title">Carrito de compras</h4>

      <div class="mx-auto container" style="max-width:900px;">
        <!-- Si no hay productos en el carrito -->
        <div v-if="store.cart.products.length === 0" class="empty-cart-message">
          <p>Tu carrito está vacío. ¡Agrega productos para comenzar!</p>
        </div>

        <!-- Si hay productos en el carrito -->
        <div
          v-else
          style="
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 8rem;
            gap: 1rem;
            justify-content: center;
          "
        >
          <!-- Recorre los productos en el carrito -->
          <div
            class="p-3 p-shadow"
            v-for="product in store.cart.products"
            :key="product.signature"
            style="
              align-items: end;
              position: relative;
              box-shadow: 0 0.5rem 2rem #00000010;
              border: 1px solid #00000030;
              gap: 1rem;
              border-radius: 0.3rem;
            "
          >
            <!-- Info principal: imagen, nombre, categoría, etc. -->
            <div style="display: flex; gap: 1rem; justify-content: space-between;">
              <img
                style="width: 5rem; object-fit: cover; height: 5rem;"
                :src="`${URI}/read-photo-product/${product.product.img_identifier}/600`"
                alt=""
              />

              

              <!-- {{ product }} -->

              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    gap: 0.3rem;
                    width: 100%;
                  "
                >
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: end;
                      align-items: end;
                      width: 100%;
                      gap: 0rem;
                    "
                  >
                    <span class="p-0 m-0">
                      {{ product.product.product_name }}
                    </span>
                    <span style="font-weight: bold;">
                      {{ product.product.category_name?.toLowerCase() }}
                    </span>
                  </div>

                  <!-- Control de cantidad (+/-) -->
                  <div style="display: flex;">
                    <div
                      class="p-0"
                      style="
                        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
                        background-color: #ff620000;
                        border-radius: 5rem;
                        display: flex;
                      "
                    >
                      <Button
                        @click="store.decrementProductBySignature(product.signature)"
                        icon="pi pi-minus"
                        severity="success"
                        style="
                          border: none;
                          outline: none;
                          width: 2rem;
                          height: 1.5rem;
                          border-radius: 0.4rem 0 0 0.4rem;
                        "
                      />
                      <InputText
                        class="text-center"
                        style="
                          background-color: transparent;
                          font-weight: bold;
                          width: 3rem;
                          height: 1.5rem;
                          color: black;
                          border: none;
                        "
                        :modelValue="product.quantity"
                        readonly
                      />
                      <Button
                        @click="store.incrementProductBySignature(product.signature)"
                        icon="pi pi-plus"
                        severity="success"
                        style="
                          font-weight: bold;
                          border: none;
                          outline: none;
                          width: 2rem;
                          height: 1.5rem;
                          border-radius: 0 0.4rem 0.4rem 0;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón para eliminar producto por signature -->
            <Button
              class="ml-2"
              @click="store.removeProductFromCartBySignature(product.signature)"
              icon="pi pi-times"
              severity="danger"
              rounded
              style="
                border: none;
                right: -0.5rem;
                top: -0.5rem;
                position: absolute;
                outline: none;
                width: 2rem;
                height: 2rem;
              "
            />

            <!-- Sección de sabores -->
            <div
              style="
                display: flex;
                gap: .5rem;
                /* align-items: center; */
                width: 100%;
                margin-top: 1rem;
                flex-direction: column;
                flex-wrap: wrap;
              "
              v-if="product.flavors?.length"
            >
              <!-- Etiqueta según si es combinado o cuántos sabores hay -->
            

              <div v-for="(grupo, index) in product.flavors"
              style="display: flex; gap: .5rem;flex-wrap: wrap; flex-direction: column;">
<h6 class="m-0">
  {{ grupo.invoice_name }} 

</h6>

              <div style="display: flex; flex-wrap: wrap;gap: .3rem;">
                <Tag
                  v-for="(flavor, index) in grupo.flavors"
                  :key="index"
                  style="text-transform: capitalize;"
                >
                {{   grupo.flavors.length == 2
                        ? '1/2'
                        : ''}} {{ flavor.name }} x {{ product.quantity }}

                  <!-- Si el flavor tiene precio > 0, muéstralo -->
                  <span >
                    {{ formatoPesosColombianos(
                      grupo.flavors.length == 2
                        ? (flavor.price / 2) * product.quantity
                        : flavor.price * product.quantity
                    ) }}
                  </span>
                </Tag>
                
              </div>
             
              </div>
            </div>

            <!-- Sección de gaseosas -->
            <div
              style="
                display: flex;
                gap: 1rem;
                align-items: center;
                width: 100%;
                flex-wrap: wrap;
              "
              v-if="product.gaseosa && product.gaseosa.length"
            >
              <h6 style="margin: 1rem 0;">
                <b
                  >{{ product.gaseosa.length > 1 ? 'Gaseosas' : 'Gaseosa' }}</b
                >
              </h6>
              <div style="display: flex; gap: .5rem; flex-direction: row;">
                <Tag
                  v-for="pro in product.gaseosa"
                  :key="pro.name"
                  severity="info"
                  style="text-transform: capitalize;"
                >
                  {{ pro.name }}
                </Tag>
              </div>
            </div>

            <!-- Precio total de este producto -->
            <h5 class="p-0 m-0" style="text-align: end;">
              <b>{{ formatoPesosColombianos(product.total_cost) }}</b>
            </h5>
          </div>

          <!-- A continuación, tus ADICIONES "globales" a nivel de carrito -->
          <div class="p-0 mt-1">
            <div class="col-12 p-0 mt-1">
              <div
                class="p-shadow p-3 mb-4"
                v-for="(items, grupo) in agrupados"
                :key="grupo"
                style="position: relative; border-radius: 0.3rem;"
              >
                <Button
                  class="ml-2"
                  @click="deleteGroup(items)"
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                  style="
                    border: none;
                    right: -0.5rem;
                    top: -0.5rem;
                    position: absolute;
                    outline: none;
                    width: 2rem;
                    height: 2rem;
                  "
                />

                <div class="mb-2">
                  <span class="mb-2 text-center">
                    <b>{{ grupo }}</b>
                  </span>

                  <div class="mt-2">
                    <div
                      v-for="item in items"
                      :key="item.aditional_item_instance_id"
                      style="display: flex; gap: 1rem; align-items: center;"
                    >
                      <!-- Botón borrar adición -->
                      <Button
                        text
                        rounded
                        @click="deleteAd(item)"
                        class="p-0 m-0"
                        severity="danger"
                        style="width: 2rem; height: 2rem; border: none;"
                        icon="pi pi-trash m-0"
                      />

                      <div
                        style="
                          display: flex;
                          width: 100%;
                          gap: 1rem;
                          justify-content: space-between;
                        "
                      >
                        <span
                          class="text adicion"
                          style="text-transform: capitalize;"
                          >{{ item.name }}</span
                        >
                        <span style="display: flex; align-items: center;">
                          <!-- Precio por la adición * su cantidad -->
                          <span v-if="item.price > 0" class="pl-2 py-1 text-sm">
                            <b
                              >{{ formatoPesosColombianos(
                                item.price * item.quantity
                              ) }}</b
                            >
                          </span>

                          <!-- Controles + / - si no son salsas -->
                          <div
                            v-if="grupo != 'SALSAS'"
                            style="
                              box-shadow: 0 0 5px rgba(0, 0, 0, 0.411);
                              display: flex;
                              border-radius: 0.3rem;
                            "
                            class="ml-2"
                          >
                            <Button
                              @click="decrement(item)"
                              severity="danger"
                              style="
                                width: 2rem;
                                height: 1.5rem;
                                border: none;
                                border-radius: 0.3rem 0 0 0.3rem;
                              "
                              icon="pi pi-minus"
                            />
                            <InputText
                              :modelValue="item.quantity"
                              readonly
                              style="width: 2rem; border: none; height: 1.5rem;"
                              class="p-0 text-center"
                            />
                            <Button
                              @click="increment(item)"
                              severity="danger"
                              style="
                                width: 2rem;
                                height: 1.5rem;
                                border: none;
                                border-radius: 0 0.3rem 0.3rem 0;
                              "
                              icon="pi pi-plus"
                            />
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Botón para abrir dialogo "addAdditionToCart" -->
              <div
                @click="store.setVisible('addAdditionToCart',true)"
                class="col-12 p-0 m-0"
                style="display: flex; justify-content: end;"
              >
                <Button
                  style="width: 2rem; left: 0.3rem; height: 2rem;"
                  rounded
                  severity="danger"
                  icon="pi pi-plus"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen del carrito (subtotal, envío, total, etc.) -->
        <resumen class="md:col-6"></resumen>
      </div>
    </div>

    <!-- Dialogo para añadir adiciones globales -->
    <dialogAddAditions></dialogAddAditions>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, watch } from 'vue';
import resumen from './resumen.vue';
import { usecartStore } from '@/stores/shoping_cart';
import { formatoPesosColombianos } from '@/service/utils/formatoPesos';
import { useSitesStore } from '@/stores/site';
import { adicionalesService } from '@/service/restaurant/aditionalService';
import dialogAddAditions from './dialogAddAditions.vue';
import { useUserStore } from '@/stores/user';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { URI } from '@/service/conection';

const store = usecartStore();
const siteStore = useSitesStore();
const user = useUserStore();
const toast = useToast();

// Para manejar las adiciones globales (no específicas de un producto)
const selectedAdditions = ref({});
const agrupados = ref({});

// Actualiza la vista agrupada de las adiciones globales
const update = () => {
  agrupados.value = store.cart.additions.reduce((acumulador, elemento) => {
    let grupo = elemento.group;
    if (!acumulador[grupo]) {
      acumulador[grupo] = [];
    }
    acumulador[grupo].push(elemento);
    return acumulador;
  }, {});
};

// Vigilar cambios en las adiciones globales
watch(
  () => store.cart.additions,
  () => {
    update();
  },
  { deep: true }
);

// Incrementa la cantidad de una adición global
const increment = (adition) => {
  const new_adition = { ...adition };
  new_adition.quantity = 1;
  store.addAdditionToCart(new_adition);
};

// Decrementa la cantidad de una adición global
const decrement = (adition) => {
  if (adition.quantity > 1) {
    store.removeAdditionFromCart(adition.id);
  }
};

// Elimina por completo una adición global
const deleteAd = (adicion) => {
  store.removeAdditionCompletelyFromCart(adicion.id);
  update();
};

// Elimina un grupo completo de adiciones
const deleteGroup = (items) => {
  items.forEach((item) => {
    deleteAd(item);
  });
};

// Si abrimos el diálogo "añadir adiciones", limpiar la selección
watch(
  () => store.visibles.addAdditionToCart,
  (newval) => {
    if (newval) {
      selectedAdditions.value = {};
    }
  },
  { deep: true }
);

const adicionales = ref([]);
onMounted(async () => {
  // Manejo de costos de envío, etc.
  if (user.user.payment_method_option?.id != 7) {
    siteStore.setNeighborhoodPrice();
  } else {
    siteStore.setNeighborhoodPriceCero();
  }

  // Ejemplo: cargar adiciones si hiciera falta
  const product_id = 53;
  if (product_id) {
    adicionales.value = await adicionalesService.getAditional(product_id);
  }

  // Inicializar la agrupación de adiciones
  agrupados.value = store.cart.additions.reduce((acumulador, elemento) => {
    let grupo = elemento.group;
    if (!acumulador[grupo]) {
      acumulador[grupo] = [];
    }
    acumulador[grupo].push(elemento);
    return acumulador;
  }, {});
});
</script>

<style scoped>
/* === Estilos tal cual los solicitaste, más la clase .empty-cart-message === */

*:focus {
  border: none;
}

.led {
  animation: cambiaColor 1s infinite;
  /* 3s de duración, animación infinita */
}

.name-product::first-letter {
  /* vacío intencional */
}

img {
  border-radius: 5%;
}

.title {
  margin: 0;
  padding: 0;
  font-family: "Luckiest Guy", cursive;
  letter-spacing: 0.1cap;
  width: 100%;
  text-align: center;
  margin: 2rem 0;
  font-size: 3rem;
  color: var(--primary-color);
  transition: all ease 0.3s;
}

h2:hover {
  transform: scale(1.1);
}

.domi-name {
  text-transform: capitalize;
}

.descripcion::first-letter {
  /* vacío intencional */
}

@keyframes cambiaColor {
  0% {
    background-color: rgb(0, 0, 0);
  }

  50% {
    background-color: rgb(30, 255, 0);
  }

  100% {
    background-color: var(--primary-color);
  }
}

.triangulo {
  width: 0;
  height: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 2rem solid #ffede1;
  /* Altura del triángulo dependiendo del ancho */
  transform: rotate(-65deg);
  position: absolute;
  top: -1rem;
  left: -1.2rem;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.fixed {
  position: fixed;
  width: 25%;
}

.scrollit {
  float: left;
  width: 71%;
}

.sumary {
  /* background-color: green; */
}

.izq {
  /* width: 100%; */
}

*:focus {
  /* outline: none; */
}

.contenedor-producto {
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 7rem;
  position: relative;
}

@media (max-width: 991px) {
  .contenedor-producto {
    /* estilos adaptativos si los necesitas */
  }
}

.nombre-sesion {
  font-weight: bold;
  border-radius: 5rem;
}

.contenedor-principal {
  /* otras reglas */
}

.producto {
  border-bottom: 2px solid #00000020;
}

.cantidad:focus-visible {
  outline: none;
}

.imagen {
  height: 100px;
  object-fit: contain;
}

.contador {
  background-color: white;
  display: flex;
  border-radius: 0.1rem;
  padding: 0.1rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 8rem;
  height: 2.5rem;
}

i {
  font-weight: bold;
}

i:hover {
  color: var(--primary-color);
}

button:hover {
  cursor: pointer;
}

@media (min-width: 768px) and (max-width: 991px) {
  .clase {
    /* min-width: 720px; */
  }
}

@media (min-width: 1200px) and (max-width: 1920px) {
  .clase {
    /* min-width: 1024px; */
  }

  .productos-scroll {
    overflow-y: auto;
    border-radius: 2rem;
  }
}

::-webkit-scrollbar {
  width: 1rem;
  padding-top: 1rem;
  position: absolute;
  display: none;
}

.clase {
  /* vacío intencional */
}

* {
  text-transform: lowercase;
}

*::first-letter {
  text-transform: uppercase;
}

/* Estilo del pulgar de la barra de desplazamiento (Chrome/Safari) */
::-webkit-scrollbar-thumb {
  background-color: rgb(255, 0, 0);
  border-radius: 9px;
  border: 5px solid var(--primary-color);
  height: 10rem;
  width: 10rem;
}

.p-shadow {
  box-shadow: 0 0.2rem 5px rgba(0, 0, 0, 0.15);
}

@media (width < 800px) {
  .title {
    font-size: 2rem;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
}

/* Clase adicional para el mensaje de carrito vacío */
.empty-cart-message {
  text-align: center;
  font-size: 1.2rem;
}
</style>
