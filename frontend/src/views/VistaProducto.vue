<template>
  <Dialog
    :closable="false"
    v-model:visible="store.visibles.currentProduct"
    :modal="true"
    class="p-fluid pt-0 m-0 mx-3 dialog"
    style="
      justify-content: center;
      margin: 0 1rem;
      background-color: white;
      position: relative;
      border-radius: 0.5rem;
      padding-top: 2rem;
    "
  >
    <!-- Botón "cerrar" -->
    <Button
      @click="store.setVisible('currentProduct', false)"
      severity="danger"
      icon="pi pi-times"
      style="
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        position: absolute;
        right: -1rem;
        top: -1rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 900;
      "
    />

    <!-- Encabezado del diálogo -->
    <template #header>
      <div
        class="header col-12 my-0 py-0 px-0 md:px-3"
        style="
          display: flex;
          justify-content: space-between;
          background-color: rgb(255, 255, 255);
          z-index: 99;
          height: min-content;
        "
      >
        <!-- Nombre del producto -->
        <p
          class="mayuscula md:pl-4 nombre col-9 text-l lg:text-4xl p-0 text-left"
          style="color: black; font-weight: bold"
        >
          {{ store.currentProduct.product_name }}
        </p>

        <!-- Precio del producto -->
        <p
          class="md:pr-4 precio col-3 text-l lg:text-xl p-0 text-right mayuscula"
          style="color: black; font-weight: bold"
        >
          {{ formatoPesosColombianos(store.currentProduct.price) }}
        </p>
      </div>
    </template>

    <!-- Contenido principal -->
    <div class="container">
      <!-- Imagen del producto -->
      <div
        class="col-12 p-0 mt-0 shadow-5 photo"
        style="
          display: flex;
          align-items: center;
          max-height: 45rem;
          background-color: white;
          top: 0;
          border-radius: 0.5rem;
        "
      >
        <img
          style="
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            background-color: rgb(255, 255, 255);
            object-fit: contain;
            aspect-ratio: 1 / 1;
          "
          :src="`${URI}/read-photo-product/${store.currentProduct.img_identifier}/600`"
          alt=""
        />
      </div>

      <!-- Descripción del producto -->
      <div>
        <div class="col-12 p-0 my-0" style="margin: 3rem 0">
          <p
            class="col-12 p-0"
            style="font-weight: bold; color: black; margin: 1rem 0"
          >
            DESCRIPCIÓN
          </p>
          <p
            class="col-12 text-l p-0"
            style="color: black; text-transform: capitalize; margin: 1rem 0"
          >
            {{ store.currentProduct.product_description?.toLowerCase() }}
          </p>
        </div>

        <!-- SECCIÓN DINÁMICA DE GRUPOS DE SABORES -->
        <div
          v-for="(group, gIndex) in flavorGroups"
          :key="gIndex"
          style="margin-bottom: 2rem"
        >
          <!-- Etiqueta del grupo -->
          <div
            style="
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 1rem;
            "
          >
            <h6 class="m-0">
              <b>{{ group.shoping_name }}</b>
            </h6>

            <!-- Interruptor para combinar (SOLO ESTE GRUPO) -->
            <div
              v-if="group.combine"
              style="
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 0.5rem;
              "
            >
              <span>Combinar?</span>
              <!-- IMPORTANTE: manejamos en el @change -->
              <InputSwitch
                v-model="groupCombine[gIndex]"
                @change="toggleCombine(gIndex)"
              />
            </div>
          </div>

          <!-- MOSTRAR 1 o 2 SELECTS, dependiendo de groupCombine[gIndex] -->
          <div
            v-for="(flavorSel, sIndex) in groupSelections?.[gIndex]?.flavors"
            :key="sIndex"
            style="margin-bottom: 1rem"
          >
            <Select
              filter
              filterPlaceholder="Buscar..."
              :options="group.flavors"
              style="width: 100%; max-width: 100%; min-width: 100%"
              v-model="groupSelections[gIndex].flavors[sIndex]"
            >
              <!-- Opciones en el dropdown -->
              <template #option="slotProps">
                <div style="display: flex; align-items: center; gap: 0.5rem">
                  <Tag v-if="slotProps.option.premium">Premium</Tag>
                  <span>{{ slotProps.option.name }}</span>
                  <span v-if="slotProps.option.premium">
                    +
                    {{
                      groupCombine[gIndex]
                        ? formatoPesosColombianos(slotProps.option.price / 2)
                        : formatoPesosColombianos(slotProps.option.price)
                    }}
                  </span>
                </div>
              </template>

              <!-- Lo que se muestra cuando se selecciona algo -->
              <template #value="slotProps">
                <div
                  v-if="slotProps.value?.id"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <Tag v-if="slotProps.value.premium">Premium</Tag>
                  <span>{{ slotProps.value.name }}</span>
                  <span v-if="slotProps.value.premium">
                    +
                    {{
                      groupCombine[gIndex]
                        ? formatoPesosColombianos(slotProps.value.price / 2)
                        : formatoPesosColombianos(slotProps.value.price)
                    }}
                  </span>
                </div>
                <!-- Fallback: nada seleccionado -->
                <span v-else style="opacity: 0.8">Selecciona una opción</span>
              </template>
            </Select>
          </div>
        </div>
        <!-- FIN SECCIÓN DE GRUPOS DE SABORES -->

        <!-- SECCIÓN DE ADICIONALES (extras) -->
        <div style="color: black">
          <!-- v-for para cada "grupo" de adicionales.
               Asumimos cada 'grupo' => { category, items, max_selected }
          -->
          <div v-for="grupo in adicionales" :key="grupo.category">
            <div class="mb-2">
              <!-- Nombre de la categoría -->
              <p class="mb-2 text-center" style="margin: 1rem 0">
                <b>{{ grupo.category }}</b>
              </p>
              <div class="mt-2">
                <!-- Cada ítem de ese grupo -->
                <div
                  v-for="item in grupo.items"
                  :key="item.aditional_item_instance_id"
                  style="display: flex; gap: 1rem; align-items: center"
                >
                  <Checkbox
                    class="my-1"
                    :binary="true"
                    v-model="item.checked"
                    @change="() => handleAdditionChange(item, grupo)"
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
                      class="text-sm adicion"
                      style="text-transform: lowercase"
                    >
                      {{ item.aditional_item_name }}
                    </span>
                    <!-- Cantidad y precio -->
                    <span
                      v-if="item.checked"
                      style="display: flex; align-items: center"
                    >
                      <span
                        v-if="item.aditional_item_price > 0"
                        class="pl-2 py-1 text-sm"
                      >
                        <b>
                          {{
                            formatoPesosColombianos(
                              item.aditional_item_price *
                                selectedAdditions[
                                  item.aditional_item_instance_id
                                ]?.quantity
                            )
                          }}
                        </b>
                      </span>
                      <Button
                        @click="decrement(item)"
                        class="ml-2"
                        severity="danger"
                        style="width: 2rem; height: 1.5rem; border: none"
                        icon="pi pi-minus"
                      />
                      <InputText
                        :modelValue="
                          selectedAdditions[item.aditional_item_instance_id]
                            ?.quantity
                        "
                        readonly
                        style="width: 2rem; border: none; height: 1.5rem"
                        class="p-0 text-center"
                      />
                      <Button
                        @click="increment(item)"
                        severity="danger"
                        style="width: 2rem; height: 1.5rem; border: none"
                        icon="pi pi-plus"
                      />
                    </span>
                    <span
                      v-else-if="item.aditional_item_price > 0"
                      class="pl-2 py-1 text-sm"
                    >
                      <b>
                        {{ formatoPesosColombianos(item.aditional_item_price) }}
                      </b>
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <!-- FIN SECCIÓN DE ADICIONALES -->
      </div>
    </div>

    <!-- BOTÓN FOOTER: Agregar al carrito -->
    <template #footer>
      <div style="display: flex; justify-content: center">
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
import { ref, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'

import { usecartStore } from '@/stores/shoping_cart'
import { adicionalesService } from '@/service/restaurant/aditionalService'
import { fetchService } from '@/service/utils/fetchService'
import { formatoPesosColombianos } from '@/service/utils/formatoPesos'
import { URI } from '@/service/conection'

const store = usecartStore()
const toast = useToast()

// Sabor Groups
const flavorGroups = ref([])
const groupSelections = ref([])
const groupCombine = ref([])

// Adicionales
const adicionales = ref([])
/**
 * selectedAdditions => key: aditional_item_instance_id
 *                     value: { id, name, price, group, quantity }
 */
const selectedAdditions = ref({})

// Lifecycle
onMounted(loadProductData)

// Re-load data when currentProduct changes
watch(
  () => store.currentProduct,
  () => loadProductData()
)

// Re-init groupSelections when flavorGroups changes
watch(
  flavorGroups,
  () => {
    initGroups()
  },
  { immediate: true }
)

/**
 * Carga data del producto y sus adicionales
 */
async function loadProductData() {
  // 1) Sabor groups (puede venir directo en store.currentProduct.flavors)
  flavorGroups.value = store.currentProduct.flavors || []

  // 2) Cargar adicionales
  if (!store.currentProduct?.id) return
  adicionales.value = await adicionalesService.getAditional(store.currentProduct.id)

  // 3) Limpiar la selección de extras
  selectedAdditions.value = {}
}

/**
 * Inicializa la estructura para los grupos de sabores
 */
function initGroups() {
  if (!flavorGroups.value?.length) {
    groupSelections.value = []
    groupCombine.value = []
    return
  }

  groupSelections.value = flavorGroups.value.map((grp) => ({
    invoice_name: grp.invoice_name,
    selector_id: grp.id,
    flavors: [{}], // Por defecto, 1 selección
  }))

  // Por defecto, todos "no combinan"
  groupCombine.value = flavorGroups.value.map(() => false)
}

/**
 * Cuando cambia el switch "combinar?"
 */
function toggleCombine(gIndex) {
  const group = groupSelections.value[gIndex]
  if (groupCombine.value[gIndex]) {
    // Si se activa, nos aseguramos de que haya 2 slots
    if (group.flavors.length === 1) {
      group.flavors.push({})
    }
  } else {
    // Si se desactiva, quitar el segundo slot si existe
    if (group.flavors.length > 1) {
      group.flavors.pop()
    }
  }
}

/**
 * Al marcar/desmarcar un adicional
 */
function handleAdditionChange(item, grupo) {
  // El usuario acaba de marcar (checked=true)
  if (item.checked) {
    // Sacar cuántos distintos ya hay en este grupo
    const groupDistinctItems = Object.values(selectedAdditions.value).filter(
      (add) => add.group === grupo.category
    )
    // Ver si este item ya estaba seleccionado
    const alreadySelected = groupDistinctItems.some(
      (add) => add.id === item.aditional_item_instance_id
    )

    // Si no está repetido, chequear si excedemos max_selected
    if (!alreadySelected) {
      if (grupo.max_selected !== 0 && groupDistinctItems.length >= grupo.max_selected) {
        // revertir check
        item.checked = false
        toast.add({
          severity: 'warn',
          summary: 'Límite alcanzado',
          detail: `Solo puedes seleccionar ${grupo.max_selected} variedades en la categoría "${grupo.category}".`,
          life: 3000,
        })
        return
      }
    }

    // Guardar en selectedAdditions
    selectedAdditions.value[item.aditional_item_instance_id] = {
      id: item.aditional_item_instance_id,
      name: item.aditional_item_name,
      price: item.aditional_item_price,
      group: grupo.category, // para que en el carrito aparezca bien
      quantity: 1,
    }
  } else {
    // Quitarlo de selectedAdditions
    delete selectedAdditions.value[item.aditional_item_instance_id]
  }
}

/**
 * Incrementar cantidad (misma variedad => no afecta max_selected)
 */
function increment(item) {
  if (item.checked && selectedAdditions.value[item.aditional_item_instance_id]) {
    selectedAdditions.value[item.aditional_item_instance_id].quantity++
  }
}

/**
 * Decrementar cantidad sin bajar de 1
 */
function decrement(item) {
  const target = selectedAdditions.value[item.aditional_item_instance_id]
  if (target && target.quantity > 1) {
    target.quantity--
  }
}

/**
 * Agregar el producto al carrito
 */
function addToCart(product) {
  // Verificar que en cada grupo de sabores se haya hecho la selección
  for (let gIndex = 0; gIndex < flavorGroups.value.length; gIndex++) {
    const groupArray = groupSelections.value[gIndex].flavors
    for (let sIndex = 0; sIndex < groupArray.length; sIndex++) {
      if (!groupArray[sIndex]?.id) {
        toast.add({
          severity: 'warn',
          summary: 'Falta seleccionar',
          detail: `Debes seleccionar en: "${flavorGroups.value[gIndex].shoping_name}"`,
          life: 3000,
        })
        return
      }
    }
  }

  const additionsArray = Object.values(selectedAdditions.value)

  store.addProductToCart(product, 1, groupSelections.value, additionsArray)
  store.setVisible('currentProduct', false)
  toast.add({
    severity: 'success',
    summary: 'Producto agregado',
    detail: `${product.product_name} se ha agregado al carrito.`,
    life: 3000,
  })
}
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
  animation: fadeIn 0.1s ease-out forwards;
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

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 0;
}

.photo {
  position: sticky;
}

.dialog {
  max-width: 1070px !important;
}

@media (max-width: 1070px) {
  .container {
    grid-template-columns: 1fr;
    max-width: 30rem;
  }
  .photo {
    position: static;
  }
  .mayuscula {
    font-size: 1rem;
  }
}
</style>
