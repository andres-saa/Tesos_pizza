<template>
  <Dialog
    :closable="false"
    v-model:visible="store.visibles.currentProduct"
    :modal="true"
    class="p-fluid pt-0 m-0 mx-3 dialog"
    style="justify-content: center; margin: 0 1rem;  background-color: white; position: relative; border-radius: .5rem; padding-top: 2rem;"
  >
    <Button
      @click="store.setVisible('currentProduct', false)"
      severity="danger"
      icon="pi pi-times"
      style=" width: 2.5rem; height: 2.5rem; border: none; position: absolute; right: -1rem; top: -1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 900;"
    >
    </Button>

    <template #header>
      <div class="header col-12 my-0 py-0 px-0 md:px-3"
        style="display: flex; justify-content: space-between; background-color: rgb(255, 255, 255); z-index:99; height: min-content;"
      >
        <p
          class="mayuscula md:pl-4 nombre col-9 text-l lg:text-4xl p-0 text-left"
          style="color:black; font-weight: bold"
        >
          {{ store.currentProduct.product_name }}
        </p>
        <p
          class="md:pr-4 precio col-3 text-l lg:text-xl p-0 text-right mayuscula"
          style="color:black; font-weight: bold"
        >
          {{ formatoPesosColombianos(store.currentProduct.price + (selected_size.price || 0)) }}
        </p>
      </div>
    </template>

    <div class="container">

  
    <div
      class="col-12 p-0 mt-0 shadow-5 photo"
      style="display: flex; align-items: center; max-height: 45rem; background-color:white;;top: 0; border-radius: 0.5rem;"
    >
      <img
        style="width: 100%; height: 100%; border-radius: 0.5rem; background-color: rgb(255, 255, 255); object-fit: cover;"
        :src="`${URI}/read-photo-product/${store.currentProduct.img_identifier}/600`"
        alt=""
      />
    </div>

    <div>
    <div class="col-12 p-0 my-0" style="margin: 3rem 0;">
      <p class="col-12 p-0" style="font-weight: bold; color: black; margin: 1rem 0;">
        DESCRIPCION
      </p>
      <p
        class="col-12 text-l p-0"
        style="color: black; text-transform: capitalize; margin: 1rem 0;"
      >
        {{ store.currentProduct.product_description.toLowerCase() }}
      </p>
    </div>

    <!-- SECCION DE SABORES Y GASEOSA -->
    <div v-if="sizes?.length > 0">
      <div v-if="store.currentProduct?.max_flavor > 1" style="display: flex; gap: 1rem; align-items: center;">
        <h6 class="py-3"><b>¿La quieres de 2 sabores combinados?</b></h6>
        <InputSwitch v-model="saboresmultiples"></InputSwitch>
      </div>

      <!-- Indicaciones del texto -->
      <h6 class="py-3" v-if="selectedSaborOption?.id == 1">
        <b> Elige un sabor</b>
      </h6>
      <h6 class="py-3" v-if="selectedSaborOption?.id == 2">
        <b> Elige los 2 sabores para la combinada</b>
      </h6>

      <!-- Primer sabor -->
      <div>
        <h6 class="py-0 m-0 mb-2">
          <b v-if="!saboresmultiples">Elija el sabor</b>
          <b v-else>Elija el sabor 1</b>
        </h6>
        <Select
          filterPlaceholder="Buscar sabor..."
          filter
          :options="sizes"
          style="width: 100%; max-width: 100%; min-width: 100%;"
          v-model="sabor1"
        >
          <template #option="option">
            <div style="display: flex; align-items: center; gap: .5rem;">
              <Tag
                v-if="option.option.premium"
                style="background-color: #10b981; color:#fff"
              >
                Premium
              </Tag>
              <h6 style="margin: 0;">{{ option.option.name }}</h6>
              <h6 v-if="option.option.premium" style="margin: 0;">+</h6>
              <h6
                v-if="option.option.premium && saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(option.option.price / 2) }}
              </h6>
              <h6
                v-if="option.option.premium && !saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(option.option.price) }}
              </h6>
            </div>
          </template>

          <template #value="value">
            <div style="display: flex; align-items: center; gap: .5rem;">
              <Tag
                v-if="value.value.premium"
                style="background-color: #10b981; color:#fff"
              >
                Premium
              </Tag>
              <h6 style="margin: 0;">{{ value.value.name }}</h6>
              <h6 v-if="value.value.premium" style="margin: 0;">+</h6>
              <h6
                v-if="value.value.premium && saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(value.value.price / 2) }}
              </h6>
              <h6
                v-if="value.value.premium && !saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(value.value.price) }}
              </h6>
            </div>
            <span style="opacity: .8;" v-if="!sabor1?.id"> Selecciona el sabor </span>
          </template>
        </Select>
      </div>

      <!-- Segundo sabor si se seleccionan 2 sabores -->
      <br />
      <div v-if="saboresmultiples">
        <h6 class="py-0 m-0 mb-2">
          <b> Elija el sabor 2</b>
        </h6>
        <Select class="mb-3"
          filterPlaceholder="Buscar sabor..."
          filter
          :options="sizes"
          style="width: 100%; max-width: 100%; min-width: 100%;"
          v-model="sabor2"
        >
          <template #option="option">
            <div style="display: flex; align-items: center; gap: .5rem;">
              <Tag
                v-if="option.option.premium"
                style="background-color: #10b981; color:#fff"
              >
                Premium
              </Tag>
              <h6 style="margin: 0;">{{ option.option.name }}</h6>
              <h6 v-if="option.option.premium" style="margin: 0;">+</h6>
              <h6
                v-if="option.option.premium && saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(option.option.price / 2) }}
              </h6>
              <h6
                v-if="option.option.premium && !saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(option.option.price) }}
              </h6>
            </div>
          </template>

          <template #value="value">
            <div style="display: flex; align-items: center; gap: .5rem;">
              <Tag
                v-if="value.value.premium"
                style="background-color: #10b981; color:#fff"
              >
                Premium
              </Tag>
              <h6 style="margin: 0;">{{ value.value.name }}</h6>
              <h6 v-if="value.value.premium" style="margin: 0;">+</h6>
              <h6
                v-if="value.value.premium && saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(value.value.price / 2) }}
              </h6>
              <h6
                v-if="value.value.premium && !saboresmultiples"
                style="margin: 0;"
              >
                {{ formatoPesosColombianos(value.value.price) }}
              </h6>
            </div>
            <span style="opacity: .8;" v-if="!sabor2?.id"> Selecciona el sabor </span>
          </template>
        </Select>
      </div>

      <!-- Gaseosa -->
      <div v-if="gaseosas.length > 0">
        <h6 class="py-0 m-0 mt-0 mb-3">
          <b> Elija el sabor de la gaseosa </b>
        </h6>
        <Select
          placeholder="sabor de la gaseosa"
          filterPlaceholder="Buscar sabor..."
          filter
          :options="gaseosas"
          style="width: 100%; max-width: 100%; min-width: 100%;"
          v-model="gaseosa"
        >
          <template #option="option">
            <div style="display: flex; text-transform: uppercase; align-items: center; gap: .5rem;">
              <h6 style="margin: 0;">{{ option.option.name }}</h6>
            </div>
          </template>

          <template #value="value">
            <h6 style="margin: 0; text-transform: uppercase;">{{ value.value.name }}</h6>
            <span style="opacity: .8;" v-if="!value.value?.name"> Selecciona el sabor de la gaseosa</span>
          </template>
        </Select>
      </div>
    </div>
    <!-- FIN SECCION DE SABORES Y GASEOSA -->

    <!-- SECCIÓN DE ADICIONALES -->
    <div style="color: black;">
      <div v-for="grupo in adicionales" :key="grupo.category">
        <div class="mb-2">
          <p class="mb-2 text-center" style="margin: 1rem 0;">
            <b>{{ grupo.category }}</b>
          </p>
          <div class="mt-2">
            <div
              v-for="item in grupo.items"
              :key="item.aditional_item_instance_id"
              style="display: flex; gap: 1rem; align-items: center;"
            >
              <Checkbox
                class="my-1"
                :binary="true"
                v-model="item.checked"
                @change="() => handleAdditionChange(item, grupo.category)"
              />
              <div
                style="display: flex; width: 100%; gap: 1rem; justify-content: space-between;"
              >
                <span class="text-sm adicion" style="text-transform: lowercase;">
                  {{ item.aditional_item_name }}
                </span>
                <span v-if="item.checked" style="display: flex; align-items: center;">
                  <span
                    v-if="item.aditional_item_price > 0"
                    class="pl-2 py-1 text-sm"
                  >
                    <b>
                      {{
                        formatoPesosColombianos(
                          item.aditional_item_price * selectedAdditions[item.aditional_item_instance_id]?.quantity
                        )
                      }}
                    </b>
                  </span>
                  <Button
                    @click="decrement(item)"
                    class="ml-2"
                    severity="danger"
                    style="width: 2rem; height: 1.5rem; border: none;"
                    icon="pi pi-minus"
                  ></Button>
                  <InputText
                    :modelValue="selectedAdditions[item.aditional_item_instance_id]?.quantity"
                    readonly
                    style="width: 2rem; border: none; height: 1.5rem;"
                    class="p-0 text-center"
                  />
                  <Button
                    @click="increment(item)"
                    severity="danger"
                    style="width: 2rem; height: 1.5rem; border: none;"
                    icon="pi pi-plus"
                  ></Button>
                </span>
                <span
                  v-else-if="item.aditional_item_price > 0"
                  class="pl-2 py-1 text-sm"
                >
                  <b>{{ formatoPesosColombianos(item.aditional_item_price) }}</b>
                </span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>



    </div>
  </div>
    <template #footer>
      <div style="display: flex; justify-content: center;">
        <Button
          @click="addToCart(store.currentProduct)"
          label="Agregar al carrito"
          icon="pi pi-shopping-cart"
        />
      </div>
    </template>
  </Dialog>

  <Toast />
</template>

<script setup>
import { onMounted, watch,computed, ref } from 'vue';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Select from 'primevue/select';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

import { usecartStore } from '@/stores/shoping_cart';
import { adicionalesService } from '@/service/restaurant/aditionalService';
import { fetchService } from '@/service/utils/fetchService';
import { formatoPesosColombianos } from '@/service/utils/formatoPesos';
import { URI } from '@/service/conection';

const toast = useToast();

// Store y estados principales
const store = usecartStore();

const selectedAdditions = ref({});
const saboresmultiples = ref(false);
const sabor1 = ref({});
const sabor2 = ref({});
const gaseosa = ref({});
const sizes = ref([]);
const gaseosas = ref([]);

// Control para cuando se ofrecen varias opciones de sabor
const saborOption = ref([
  { id: 1, name: 'Un solo sabor' },
  { id: 2, name: 'Combinada(2 sabores)' }
]);
const selectedSaborOption = ref({});

// Manejo de adiciones
const adicionales = ref([]);


const dialogStyle = computed(() => {
  return isBelow1200.value
    ? { width: '90%', 'max-width': '40rem' }
    : { width: '90%', 'max-width': '1200px' };
});



// Computed para determinar si la pantalla es menor a 1200px
const isBelow1200 = computed(() => screenWidth.value < 1200);

// Ejemplo de tamaño o tipo seleccionado (si aplica)
const selected_size = ref({});

// Al montar o cuando el producto cambie, cargamos adiciones y sabores
onMounted(async () => {
  const product_id = store.currentProduct.id;
  if (product_id) {
    adicionales.value = await adicionalesService.getAditional(product_id);

    const sabores = await fetchService.get(`${URI}/sabores/product_id/${store.currentProduct?.product_id}`);
    sizes.value = sabores?.normal || [];
    gaseosas.value = sabores?.gaseosa || [];
  }
});

watch(
  () => store.currentProduct,
  async () => {
    const product_id = store.currentProduct.id;
    if (product_id) {
      adicionales.value = await adicionalesService.getAditional(product_id);

      const sabores = await fetchService.get(`${URI}/sabores/product_id/${store.currentProduct?.product_id}`);
      sizes.value = sabores?.normal || [];
      gaseosas.value = sabores?.gaseosa || [];

      // Resetear selección de sabores y gaseosa
      sabor1.value = {};
      sabor2.value = {};
      gaseosa.value = {};
    }
  }
);

// Manejo de adiciones
const handleAdditionChange = (item, group) => {
  if (item.checked) {
    const new_item = {
      id: item.aditional_item_instance_id,
      name: item.aditional_item_name,
      price: item.aditional_item_price,
      group
    };
    selectedAdditions.value[new_item.id] = {
      ...new_item,
      quantity: item.quantity || 1
    };
  } else {
    delete selectedAdditions.value[item.aditional_item_instance_id];
  }
};

const increment = (item) => {
  if (item.checked && selectedAdditions.value[item.aditional_item_instance_id]) {
    selectedAdditions.value[item.aditional_item_instance_id].quantity++;
  }
};

const decrement = (item) => {
  if (
    selectedAdditions.value[item.aditional_item_instance_id] &&
    selectedAdditions.value[item.aditional_item_instance_id].quantity > 1
  ) {
    selectedAdditions.value[item.aditional_item_instance_id].quantity--;
  }
};

/**
 * Agrega el producto principal y, de forma separada, sus adicionales.
 */
const addToCart = (product) => {
  // Validaciones de sabores:
  if (sizes.value?.length > 0) {
    if (saboresmultiples.value) {
      if (!sabor1.value?.id || !sabor2.value?.id) {
        toast.add({
          severity: 'warn',
          summary: 'Sabores incompletos',
          detail: 'Debes seleccionar ambos sabores antes de agregar al carrito.',
          life: 3000
        });
        return;
      }
    } else {
      if (!sabor1.value?.id) {
        toast.add({
          severity: 'warn',
          summary: 'Falta sabor',
          detail: 'Debes seleccionar un sabor antes de agregar al carrito.',
          life: 3000
        });
        return;
      }
    }
  }

  // Validación de gaseosa (si aplica)
  if (gaseosas.value?.length > 0) {
    if (!gaseosa.value?.name) {
      toast.add({
        severity: 'warn',
        summary: 'Falta gaseosa',
        detail: 'Debes seleccionar la gaseosa antes de agregar al carrito.',
        life: 3000
      });
      return;
    }
  }

  // Agregar el producto principal SIN incluir las adiciones
  const flavors = saboresmultiples.value
    ? [sabor1.value, sabor2.value]
    : sabor1.value?.id
      ? [sabor1.value]
      : [];

  store.addProductToCart(product, 1, [], flavors, gaseosa.value);

  // Agregar cada adicional seleccionado por separado
  const additionsArray = Object.values(selectedAdditions.value);
  additionsArray.forEach(adition => {
    store.addAdditionToCart(adition);
    console.log('Adicional agregado:', adition);
  });

  // Resetear selecciones
  selectedAdditions.value = {};
  saboresmultiples.value = false;
  sabor1.value = {};
  sabor2.value = {};
  gaseosa.value = {};

  // Cerrar el diálogo
  store.setVisible('currentProduct', false);

  // Mostrar confirmación
  toast.add({
    severity: 'success',
    summary: 'Producto agregado',
    detail: `${product.product_name} se ha agregado al carrito.`,
    life: 3000
  });

  console.log('Carrito:', store.cart.products);
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
  }
}
.cargado {
  opacity: 0;
  animation: fadeIn .1s ease-out forwards;
}

.adicion::first-letter {
  text-transform: uppercase;
}

.mayuscula {
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
}

* {
  font-family: roboto;
}


.container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  /* background-color: red; */
  padding: 0;

}

.photo{
  position: sticky
}

.dialog{
  max-width: 1070px !important;
}

@media (width < 1070px) {

  .container{
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 30rem;


}

.photo{
    position: static;
  }


  .mayuscula {
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0;
  margin: 0;
}


  
}
</style>
