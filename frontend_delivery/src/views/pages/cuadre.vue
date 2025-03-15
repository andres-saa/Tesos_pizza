<template>
  <div style="margin: auto; max-width: 800px; margin-top: 4rem;" class="p-3">
    
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






    <h3 class="mb-0 mt-8"><b>Reporte de combos </b></h3>
    <h6 class="m-0"> <span style="font-size: 1.4rem;color:var(--primary-color);">Mustra cuanto se vendio' en combos ( es informativo ) , abajo esta el reporte de cada producto de manera individual incluidos los que hacen parte de combos.</span> </h6>





    <!-- Iteración sobre data -->
    <div class="shadow-3 p-3   mt-4" v-for="categorie in dataCombos" :key="categorie.category_name">
      <h5 class="m-0 mt-0" style="display: flex;justify-content: space-between; width: 100%;">
        <b class="pb-3">{{ categorie.category_name }}</b>
        <!-- <b>{{ categorie.category_total_quantity }}</b> -->
      </h5>

      <DataTable v-if="categorie.category_name != 'Adicionales'" stripedRows :value="categorie.products_info">
        <Column class="p-0" style="width: 15rem;">
          <template #body="nuevo">
            <h6 
              class="px-2 m-0 py-1" 
              style="text-transform: capitalize;display: flex;justify-content: space-between; background-color: var(--primary-color); color: white;"
            >
              <b style="display: flex; justify-content: space-between;">
                {{ nuevo.data.product_name?.toLowerCase() }}

              </b>

            
            
            </h6>

            <DataTable v-if="nuevo.data.flavors_info" :value="nuevo.data.flavors_info">
              <!-- Columna Sabor -->
              <Column header="Combo" class="p-0" style="width: 60%;">
                <template #body="datos">
                  <h6 
                    class="m-0" 
                    style="text-transform: capitalize;" 
                    v-if='datos.data.flavor?.replace(/"/g, "") != "NO_FLAVOR"'
                  >
                  <h6 class="mb-0 mt-2"> {{ datos.data.flavor?.toLowerCase() }}</h6>
                   
                  <h6 class="my-1"><b>Detalles</b></h6>
                    <div v-for="sabor in datos.data.flavors">
                      <h6  class="my-1" style="text-transform: capitalize;"><b> -- {{ sabor.invoice_name.toLowerCase() }} ( {{ formatToColombianPeso(sabor.selector_price)  }} ) </b> </h6>
                      <div>
                        <h6 class="my-0 ml-4" style="text-transform: capitalize;" v-for="sa in sabor.flavors"><b></b> {{ sabor.flavors.length == 2? '1/2': 1 }} {{ sa.name.toLowerCase()}}  <span v-if="sa.price">= {{formatToColombianPeso(sa.price)  }} <Tag severity="success" class="py-0" style="border-radius: .2rem;" icon="pi pi-check">  premium </Tag> </span></h6>
                      </div>
                      
                    </div>
                  </h6>
                  <h6 class="m-0" v-else>  </h6>
                </template>
              </Column>

              <!-- Columna Cantidad -->
              <Column class="p-0 text-center" style="width: 10%;">
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
              <Column class="p-0 text-right" style="width:30%;">
                <template #header>
                  <div class="text-right" style="width: 100%;">
                    <h6 class="m-0"><b>Valor</b></h6>
                  </div>
                </template>
                <template #body="datos">
                  <h6 class="m-0" style="opacity: .7;">
                    Producto: {{ formatToColombianPeso(datos.data.revenue - datos.data.revenue_flavors) }}
                  </h6>


                  <h6 class="m-0" style="opacity: .7;">
                    Detalles: {{ formatToColombianPeso(datos.data.revenue_flavors) }}
                  </h6>

                  <h6 class="m-0">
                    <b>                    Total: {{ formatToColombianPeso( datos.data.revenue) }}
                    </b>
                  </h6>

                  
                </template>
              </Column>
            </DataTable>
            
          </template>
        </Column>
      </DataTable>
      


      <div class="my-1" style="height: 1px;width: 100%;background-color: black;">

</div>

<h5 style="text-transform: capitalize;" class="p-0 m-0"> <b>Resumen de combos </b> </h5>


<DataTable stripedRows :value="categorie.products_info">
          <Column class="p-0" style="width: 15rem;">
            <template #body="nuevo">
              <h6 
                class="px-0 m-0 py-0" 
                style="text-transform: capitalize;display: flex;justify-content: space-between; "
              >
                
              <span>
                <b> {{ nuevo.data.product_total_quantity_text }} </b>    {{ nuevo.data.product_name?.toLowerCase() }}

              </span>


              <span>
                <b> {{ formatoPesosColombianos( nuevo.data.product_total_revenue) }} </b>   
              </span>
              
              </h6>
            </template>
          </Column>
          
          



      </DataTable>
      <div class="my-1" style="height: 1px;width: 100%;background-color: black;">

</div>


      <h6 class="m-0 my-0 text-right" style="width: 100%;justify-content: space-between;display: flex;">
 
        <span class="m-0" style="text-transform: capitalize;">  <b> {{ categorie.category_total_quantity_text }} </b> 
          
          
            Combos</span>
       
        <b>{{ formatoPesosColombianos(categorie.category_total_revenue) }}</b>
      </h6>
    </div>










    <h3 class="mb-0"><b>Reporte individual </b></h3>
    <h6 class="m-0"> <span style="font-size: 1.4rem;color:var(--primary-color);">Incluye los productos que conforman los combos y los productos que se vendieron de manera individuales</span> </h6>









    <!-- Iteración sobre data -->
    <div class="shadow-3 p-3   mt-4" v-for="categorie in data" :key="categorie.category_name">
      <h5 class="m-0 mt-0" style="display: flex;justify-content: space-between; width: 100%;">
        <b class="pb-3">{{ categorie.category_name }}</b>
        <!-- <b>{{ categorie.category_total_quantity }}</b> -->
      </h5>

      <DataTable v-if="categorie.category_name != 'Adicionales'" stripedRows :value="categorie.products_info">
        <Column class="p-0" style="width: 15rem;">
          <template #body="nuevo">
            <h6 
              class="px-2 m-0 py-1" 
              style="text-transform: capitalize;display: flex;justify-content: space-between; background-color: var(--primary-color); color: white;"
            >
              <b style="display: flex; justify-content: space-between;">
                {{ nuevo.data.product_name?.toLowerCase() }}

              </b>

            
            
            </h6>

            <DataTable v-if="nuevo.data.flavors_info" :value="nuevo.data.flavors_info">
              <!-- Columna Sabor -->
              <Column header="Sabor" class="p-0" style="width: 60%;">
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
              <Column class="p-0 text-center" style="width: 10%;">
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
              <Column class="p-0 text-right" style="width: 30%;">
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
      


      <div class="my-1" style="height: 1px;width: 100%;background-color: black;">

</div>

<h5 style="text-transform: capitalize;" class="p-0 m-0"> <b>Resumen de {{ categorie.category_name?.toLowerCase() }}'s</b> </h5>


<DataTable stripedRows :value="categorie.products_info">
          <Column class="p-0" style="width: 15rem;">
            <template #body="nuevo">
              <h6 
                class="px-0 m-0 py-0" 
                style="text-transform: capitalize;display: flex;justify-content: space-between; "
              >
                
              <span>
                <b> {{ nuevo.data.product_total_quantity_text }} </b>    {{ nuevo.data.product_name?.toLowerCase() }}

              </span>


              <span>
                <b> {{ formatoPesosColombianos( nuevo.data.product_total_revenue) }} </b>   
              </span>
              
              </h6>
            </template>
          </Column>
          
          



      </DataTable>
      <div class="my-1" style="height: 1px;width: 100%;background-color: black;">

</div>


      <h6 class="m-0 my-0 text-right" style="width: 100%;justify-content: space-between;display: flex;">
 
        <span class="m-0" style="text-transform: capitalize;">  <b> {{ categorie.category_total_quantity_text }} </b> 
          
          
          {{ categorie.category_name?.toLowerCase() }}'s</span>
       
        <b>{{ formatoPesosColombianos(categorie.category_total_revenue) }}</b>
      </h6>
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



// 1) Definir la función que convierte un número en texto con fracciones
function quantityToFractionText(num) {
  const rounded     = Math.round(num * 2) / 2; 
  const wholePart   = Math.floor(rounded);
  const decimalPart = rounded - wholePart;
  
  if (decimalPart === 0) {
    return String(wholePart);
  } else {
    // aquí decimalPart = 0.5
    if (wholePart > 0) {
      return `${wholePart} + 1/2`;
    } else {
      return `1/2`;
    }
  }
}


function generarReporte(ordenes) {
  const acumulador = {};

  ordenes.forEach((orden) => {
    orden.products.forEach((product) => {
      // 1) ¿Tiene "sabores"? (arreglo con 1+ "selector")
      if (product.sabores && product.sabores.length > 0) {
        product.sabores.forEach((selector) => {
          const categoryId   = selector.category_id;
          const categoryName = selector.category_name;

          // Aseguramos la categoría
          if (!acumulador[categoryId]) {
            acumulador[categoryId] = {
              category_name: categoryName,
              products: {},
              totalQuantity: 0,
              totalRevenue: 0,
            };
          }

          // Aseguramos el producto de referencia
          const referenceId = selector.reference_id;
          const productName = selector.reference_product_name;
          if (!acumulador[categoryId].products[referenceId]) {
            acumulador[categoryId].products[referenceId] = {
              reference_product_name: productName,
              flavors: {},
              totalQuantity: 0,
              totalRevenue: 0,
            };
          }

          // 2) Si NO hay flavors dentro del selector, lo tratamos como "NO_FLAVOR"
          if (!selector.flavors || selector.flavors.length === 0) {
            const flavorKey     = "NO_FLAVOR";
            const pricePorSabor = selector.selector_price; 
            const thisQuantity  = product.quantity; 
            const thisRevenue   = thisQuantity * pricePorSabor;

            if (!acumulador[categoryId].products[referenceId].flavors[flavorKey]) {
              acumulador[categoryId].products[referenceId].flavors[flavorKey] = {
                quantity: 0,
                revenue: 0,
              };
            }

            // Sumamos quantity y revenue
            acumulador[categoryId].products[referenceId].flavors[flavorKey].quantity += thisQuantity;
            acumulador[categoryId].products[referenceId].flavors[flavorKey].revenue += thisRevenue;

            // Totales del producto y categoría
            acumulador[categoryId].products[referenceId].totalQuantity += thisQuantity;
            acumulador[categoryId].products[referenceId].totalRevenue  += thisRevenue;
            acumulador[categoryId].totalQuantity += thisQuantity;
            acumulador[categoryId].totalRevenue  += thisRevenue;
          } 
          else {
            // 3) Caso normal: el selector tiene flavors (e.g. mitad ranchera, mitad tocineta)
            const numFlavors = selector.flavors.length;
            // El costo base por "pedazo" de sabor
            const baseCostPerFlavor = selector.selector_price / numFlavors; 

            // Por ejemplo, si selector_price=9000 y hay 2 sabores,
            // baseCostPerFlavor=4500.

            selector.flavors.forEach((flavorObj) => {
              const flavorKey   = flavorObj.name; 
              const flavorExtra = flavorObj.price; // e.g. +500 para tocineta
              
              // Revenue asignado a ESTE sabor:
              // la parte proporcional del base + costo extra del sabor completo
              const flavorRevenue = baseCostPerFlavor + flavorExtra;
              
              // Cantidad "real" del sabor (para totales de unidades):
              // si pides 1 pizza con 2 sabores, cada sabor es "0.5".
              const flavorQuantity = product.quantity / numFlavors;

              if (!acumulador[categoryId].products[referenceId].flavors[flavorKey]) {
                acumulador[categoryId].products[referenceId].flavors[flavorKey] = {
                  quantity: 0,
                  revenue: 0,
                };
              }

              // Sumamos la fracción a la cantidad
              acumulador[categoryId].products[referenceId].flavors[flavorKey].quantity += flavorQuantity;
              
              // Sumamos el "ingreso" de este sabor:
              // OJO: aquí, como la idea es que la suma final de todos los sabores = precio total,
              //      utilizamos "product.quantity" * (costo por sabor).
              //      Pero si product.quantity=1 => sumas la parte base + extra. 
              //      Nota: es usual que la suma final coincida con total=9000 + 500 = 9500
              //
              // Si quisieras multiplicar la fracción por flavorRevenue,
              // entonces te quedaría la mitad del valor en cada sabor
              // y perderías la parte del recargo extra si fuera solo medio.
              // Por convención, para que sume EXACTO 9500, se asume cada sabor
              // paga el baseCostPerFlavor completo + su recargo.
              // Lógicamente, eso hace que la sumatoria de revenue sea la real.
              //
              // Ejemplo:
              //   ranchera => 4500
              //   tocineta => 5000
              //   total => 9500
              const thisFlavorRevenue = product.quantity * flavorRevenue; 
              
              acumulador[categoryId].products[referenceId].flavors[flavorKey].revenue += thisFlavorRevenue;

              // Totales del producto
              acumulador[categoryId].products[referenceId].totalQuantity += flavorQuantity;
              acumulador[categoryId].products[referenceId].totalRevenue  += thisFlavorRevenue;

              // Totales de la categoría
              acumulador[categoryId].totalQuantity += flavorQuantity;
              acumulador[categoryId].totalRevenue  += thisFlavorRevenue;
            });
          }
        });
      } 
      // Si el producto NO tiene ningún "selector" => procesar directo
      else {
        const categoryId   = product.category_id;
        const categoryName = product.category_name;

        if (!acumulador[categoryId]) {
          acumulador[categoryId] = {
            category_name: categoryName,
            products: {},
            totalQuantity: 0,
            totalRevenue: 0,
          };
        }

        const referenceId = product.product_id;
        const productName = product.name;
        if (!acumulador[categoryId].products[referenceId]) {
          acumulador[categoryId].products[referenceId] = {
            reference_product_name: productName,
            flavors: {},
            totalQuantity: 0,
            totalRevenue: 0,
          };
        }

        const flavorKey      = "NO_FLAVOR";
        const pricePorSabor  = product.price;
        const thisQuantity   = product.quantity;
        const thisRevenue    = thisQuantity * pricePorSabor;

        if (!acumulador[categoryId].products[referenceId].flavors[flavorKey]) {
          acumulador[categoryId].products[referenceId].flavors[flavorKey] = {
            quantity: 0,
            revenue: 0
          };
        }

        acumulador[categoryId].products[referenceId].flavors[flavorKey].quantity += thisQuantity;
        acumulador[categoryId].products[referenceId].flavors[flavorKey].revenue  += thisRevenue;

        acumulador[categoryId].products[referenceId].totalQuantity += thisQuantity;
        acumulador[categoryId].products[referenceId].totalRevenue  += thisRevenue;
        acumulador[categoryId].totalQuantity += thisQuantity;
        acumulador[categoryId].totalRevenue  += thisRevenue;
      }
    });
  });

  // Convertir acumulador en arreglo final
  const reporte = Object.entries(acumulador).map(([catId, catData]) => {
    const products_info = Object.entries(catData.products).map(([refId, prodData]) => {
      const flavors_info = Object.entries(prodData.flavors).map(([flavName, flavData]) => {
        return {
          flavor: flavName,
          quantity: flavData.quantity,
          // Aquí tu función que convierte 0.5 -> "1/2", 1.5 -> "1 + 1/2", etc.
          quantity_text: quantityToFractionText(flavData.quantity),
          revenue: flavData.revenue
        };
      });

      return {
        product_name: prodData.reference_product_name,
        product_total_quantity: prodData.totalQuantity,
        product_total_quantity_text: quantityToFractionText(prodData.totalQuantity),
        product_total_revenue: prodData.totalRevenue,
        flavors_info
      };
    });

    return {
      category_name: catData.category_name,
      category_total_quantity: catData.totalQuantity,
      category_total_quantity_text: quantityToFractionText(catData.totalQuantity),
      category_total_revenue: catData.totalRevenue,
      products_info
    };
  });

  return reporte;
}
  function generarReporteSoloCombosSinFracciones(ordenes) {
  const combosCategory = {
    category_name: "",
    category_total_quantity: 0,
    category_total_quantity_text: "0",
    category_total_revenue: 0,
    products_info: []
  };

  // Estructura auxiliar para agrupar combos por nombre de producto
  const productMap = {};

  ordenes.forEach((orden) => {
    orden.products.forEach((product) => {
      // Identificamos si es combo por tener >= 2 “sabores”
      if (product.sabores && product.sabores.length >= 2) {
        // Si no existe en el mapa, lo creamos
        if (!productMap[product.name]) {
          productMap[product.name] = {
            product_name: product.name,
            product_total_quantity: 0,
            product_total_quantity_text: "0",
            product_total_revenue: 0,
            flavors_info: []
          };
        }

        // Cantidad del combo
        const lineQuantity = product.quantity;

        // Suma el precio base del producto + la suma de los precios de cada sabor
        const sumFlavorPrices = product.sabores.reduce((acc, flavor) => acc + (flavor.price || 0), 0);
        const lineRevenue = (product.total_price );
        const revenue_flavors = (product.total_price - product.price * lineQuantity ) 
        // Agregamos al array de “flavors_info” una entrada por este combo
        productMap[product.name].flavors_info.push({
          flavor: product.name,         // Nombre del combo (aquí lo manejamos como "sabor" principal)
          quantity: lineQuantity,
          quantity_text: String(lineQuantity),
          revenue: lineRevenue,
          revenue_flavors:revenue_flavors,
          flavor_prices:sumFlavorPrices,
          // JSON de los sabores
          flavors: product.sabores
        });

        // Acumular en totales de ese producto-combo
        productMap[product.name].product_total_quantity += lineQuantity;
        productMap[product.name].product_total_revenue += lineRevenue;

        // Acumular en totales de la categoría “Combos”
        combosCategory.category_total_quantity += lineQuantity;
        combosCategory.category_total_revenue += lineRevenue;
      }
    });
  });

  // Armar la lista final de “products_info”
  combosCategory.products_info = Object.values(productMap).map((prod) => {
    return {
      product_name: prod.product_name,
      product_total_quantity: prod.product_total_quantity,
      product_total_quantity_text: String(prod.product_total_quantity),
      product_total_revenue: prod.product_total_revenue,
      flavors_info: prod.flavors_info
    };
  });

  // Si no hay combos encontrados, retornamos arreglo vacío
  if (combosCategory.products_info.length === 0) {
    return [];
  }

  // Ajustar la propiedad de texto de la categoría
  combosCategory.category_total_quantity_text = String(combosCategory.category_total_quantity);

  // Devolvemos un arreglo con el objeto de categoría “Combos”
  return [combosCategory];
}


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
const dataCombos =  ref([]);
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

  // Convertir a string en formato con zona horaria de Colombia
  const startDate = dayjs(fechaInicio.value)
    .tz(ZONA_HORARIA_COLOMBIA)
    .format('YYYY-MM-DDTHH:mm:ssZ');
  const endDate = dayjs(fechaFin.value)
    .tz(ZONA_HORARIA_COLOMBIA)
    .format('YYYY-MM-DDTHH:mm:ssZ');

  // Llamada a la API
  const datos = await fetchService.get(`${URI}/get-reports?start_date=${startDate}&end_date=${endDate}&site_id=31`);
  data.value = generarReporte(datos)
  dataCombos.value = generarReporteSoloCombosSinFracciones(datos)

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
  // store.getTodayOrders();
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
