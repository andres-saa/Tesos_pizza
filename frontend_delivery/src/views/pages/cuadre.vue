<template>
  <div style="margin: auto; max-width: 700px; margin-top: 4rem;" class="p-3">
    
    <!-- Filtros de fecha -->
    <div class="flex gap-3 mb-4">
      <!-- Calendar de PrimeVue para fechaInicio -->
      <Calendar 
        showTime 
        hourFormat="12" 
        v-model="fechaInicio" 
        dateFormat="dd / mm / yy" 
        placeholder="Fecha inicio" 
      />
      <!-- Calendar de PrimeVue para fechaFin -->
      <Calendar 
        showTime 
        hourFormat="12"  
        v-model="fechaFin" 
        dateFormat="dd / mm / yy" 
        placeholder="Fecha fin" 
      />
      <!-- Botón para buscar (PrimeVue Button) -->
      <Button 
        size="small" 
        severity="help" 
        label="Buscar" 
        icon="pi pi-search" 
        @click="buscarReportes" 
      />
    </div>

    <!-- Iteración sobre data -->
    <div v-for="categorie in data" :key="categorie.category_name">
      <h5 class="m-0 my-2">
        <b>{{ categorie.category_name }}</b>
      </h5>

      <DataTable stripedRows :value="categorie.products_info">
        <Column class="p-0" style="width: 15rem;">
          <template #body="nuevo">
            <h6 
              class="px-4 m-0 py-1" 
              style="text-transform: capitalize; background-color: var(--primary-color); color: white;"
            >
              <b style="display: flex; justify-content: space-between;">
                {{ nuevo.data.product_name?.toLowerCase() }}
              </b>
            </h6>

            <DataTable :value="nuevo.data.flavors_info">
              <!-- Columna Sabor -->
              <Column header="Sabor" class="p-0" style="width: 15rem;">
                <template #body="datos">
                  <h6 
                    class="m-0" 
                    style="text-transform: capitalize;" 
                    v-if='datos.data.flavor?.replace(/"/g, "") != "NO_FLAVOR"'
                  >
                    {{ datos.data.flavor?.toLowerCase() }}
                  </h6>
                  <h6 class="m-0" v-else> --- </h6>
                </template>
              </Column>

              <!-- Columna Cantidad -->
              <Column class="p-0 text-center" style="width: 15rem;">
                <template #header>
                  <div class="text-center" style="width: 100%;">
                    <h6 class="m-0"><b>Cantidad</b></h6>
                  </div>
                </template>
                <template #body="datos">
                  <h6 class="m-0">{{ datos.data.quantity_text }}</h6>
                </template>
              </Column>

              <!-- Columna Valor -->
              <Column class="p-0 text-right" style="width: 15rem;">
                <template #header>
                  <div class="text-right" style="width: 100%;">
                    <h6 class="m-0"><b>Valor</b></h6>
                  </div>
                </template>
                <template #body="datos">
                  <h6 class="m-0">{{ formatToColombianPeso(datos.data.revenue) }}</h6>
                </template>
              </Column>
            </DataTable>
          </template>
        </Column>
      </DataTable>

      <h5 class="m-0 my-0 text-right" style="width: 100%;">
        <b>{{ formatoPesosColombianos(categorie.category_total_revenue) }}</b>
      </h5>
    </div>

    <div style="height: 2px;width: 100%;background-color: black;">

    </div>
    <h2 class="m-0 my-0 text-right" style="width: 100%;display: flex;justify-content: space-between;">
      <span><b>Total</b></span>
        <b>{{ formatoPesosColombianos(totalCategoryRevenue) }}</b>
      </h2>
 
  </div>


</template>

<script setup>
/* ===== Importaciones de Vue y librerías ===== */
import { ref, onMounted, computed } from 'vue';

/* ===== Importaciones de tu proyecto ===== */
import { useOrderStore } from '../../store/order';
import { useSitesStore } from '../../store/site';
import { fetchService } from '../../service/utils/fetchService';
import { URI } from '../../service/conection';
import { formatToColombianPeso } from '../../service/valoresReactivosCompartidos';
import { formatoPesosColombianos } from '../../service/formatoPesos';

/* ===== Importar y configurar dayjs con timezone ===== */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extender dayjs
dayjs.extend(utc);
dayjs.extend(timezone);


const totalCategoryRevenue = computed(() => {
  return data.value.reduce((acc, category) => {
    return acc + category.category_total_revenue
  }, 0)
})

// Zona horaria para Colombia
const ZONA_HORARIA_COLOMBIA = 'America/Bogota';

/* ===== Stores y refs ===== */
const store = useOrderStore();
const siteStore = useSitesStore();

// Data principal que se renderiza
const data = ref([]);

// Variables para los calendarios
const fechaInicio = ref(null);
const fechaFin = ref(null);

/* ===== Función para obtener reportes ===== */
const buscarReportes = async () => {
  // Validar que ambos campos tengan valor
  if (!fechaInicio.value || !fechaFin.value) {
    alert("Por favor selecciona ambas fechas.");
    return;
  }

  // Convertimos a string en formato YYYY-MM-DD
  const startDate = fechaInicio.value.toISOString().split("T")[0];
  const endDate = fechaFin.value.toISOString().split("T")[0];

  // Llamada a la API
  data.value = await fetchService.get(`${URI}/get-reports?start_date=${startDate}&end_date=${endDate}`);
};

/* ===== Ciclo de vida onMounted ===== */
onMounted(async () => {
  // 1. Obtenemos la fecha/hora actual en la zona horaria de Colombia
  let ahora = dayjs().tz(ZONA_HORARIA_COLOMBIA);

  // 2. Establecemos la fechaInicio: hoy a las 10:00 a. m.
  const inicio = ahora.hour(10).minute(0).second(0);

  // 3. Establecemos la fechaFin: mañana a las 4:00 a. m.
  const fin = inicio.add(1, 'day').hour(4).minute(0).second(0);

  // 4. Convertimos a objetos Date (para que Calendar de PrimeVue los acepte)
  fechaInicio.value = inicio.toDate();
  fechaFin.value = fin.toDate();

  // 5. Cargamos pedidos y reportes
  store.getTodayOrders();
  await buscarReportes();
});

/* ===== Ejemplo de cómputo (sólo si lo usas en otro lado) ===== */
const totalEnviadas = computed(() => {
  return store.TodayOrders
    .filter(order => order.current_status === 'enviada')
    .reduce((total, order) => total + order.total_order_price, 0);
});

/* ===== Funciones para formatear moneda (importadas) ===== */
</script>
