<template>
  <div>
    <Dialog v-model:visible="cancelDialogVisible" closeOnEscape :closable="true" modal style="width: 30rem;">
      <template #header>
        <h3> <b>Cancelar Orden</b> </h3>
      </template>
      <form @submit.prevent="submitCancel" style="display: flex;gap: 1rem; flex-direction: column;align-items:start">
  
        <span for="responsible">Responsable</span>
        <Dropdown style="width: 100%;" id="responsible" v-model="cancelData.responsible" :options="responsibles" optionLabel="name"
          placeholder="Selecciona un responsable"></Dropdown>
  
  
        <span for="reason">Razón</span>
        <Textarea style="resize: none; text-transform: lowercase; width:100%" id="reason" v-model="cancelData.reason" rows="5"
          placeholder="Escribe la razón de la cancelación"></Textarea>
  
        <Button style="width: 100%;border-radius:0.5rem" label="cancelar" type="submit" class="p-button-danger" />
      </form>
  </Dialog>



  <Dialog v-model:visible="cancelDialogVisibleAdmin" closeOnEscape :closable="true" modal style="width: 30rem;">
    <template #header>
      <h3> <b>Cancelar Orden</b> </h3>
    </template>
    <form @submit.prevent="sendRequest" style="display: flex;gap: 1rem; flex-direction: column;align-items:start">

      <span class="advert" style="text-transform: lowercase; color:red;  font-weight: bold;"> Desde el 16 de mayo de 2024, la cancelación de órdenes requerirá autorización.</span>
      <span for="responsible">Responsable</span>
      <Dropdown style="width: 100%;" id="responsible" v-model="cancelData.responsible" :options="responsibles" optionLabel="name"
        placeholder="Selecciona un responsable"></Dropdown>

      <span for="reason">Razón</span>
      <Textarea style="resize: none; text-transform: lowercase; width:100%" id="reason" v-model="cancelData.reason" rows="5"
        placeholder="Escribe la razón de la cancelación"></Textarea>

      <Button  style="width: 100%;border-radius:0.5rem" label="solicitar cancelacion" type="submit" class="p-button-danger" />
    </form>
  </Dialog>



  <Dialog :closable="false" style="width: 30rem;" modal v-model:visible="showDeleteDeliveryPrice">

   <span style="text-transform: capitalize;">
    Esta seguro de llevar a $0.00 el valor del domicilio para la orden <b>{{store.currentOrder.order_id}} </b> del cliente  <b>{{store.currentOrder.user_name}}</b>?
   </span> 
   
   
   <template #footer>

    <div class="col-12 mb-0 pb-0 px-0 m-0" style="display: flex;justify-content: space-between;gap: 1rem;">

      <Button  text size="small"
        @click="() => {orderService.deliveryZero(store.currentOrder.order_id); showDeleteDeliveryPrice = false} " style="border-radius: 0.3rem;width: 100%;"
        severity="danger" label="si"></Button>

      <Button @click="showDeleteDeliveryPrice = false"  size="small" style="border-radius: 0.3rem;width: 100%;" severity="danger"
        label="no"></Button>
    </div>




  </template>



  </Dialog>


  <Dialog class="mx-3"  closeOnEscape :closable="false" v-model:visible="store.visibles.currentOrder" modal
    style="max-height: 95vh;width: 35rem; position: relative;">
    
    <div id="factura" style="width: 100%;">
  <!-- Mostrar "TRANSFERENCIA APROBADA" si existe store.currentOrder.responsible_id -->
  <Tag class="tag mb-2" severity="success" v-if="store.currentOrder.responsible_id">
    <i class="pi pi-whatsapp mr-2"></i>
    {{ 'transferencia aprobada' }}
  </Tag>
  <br />

  <!-- Nombre del responsable (en minúsculas) -->
  <Tag class="tag" severity="success" v-if="store.currentOrder.responsible_id">
    {{ store.currentOrder.name?.toLowerCase() }}
  </Tag>

  <div style="width: auto;">
    <!-- ID de la orden en minúsculas (conversión a string por seguridad) -->
    <p
      id="id"
      style="font-weight: bold;min-width: 100%; width: max-content; text-align: center; color: black; margin:0rem;"
    >
      ID: {{ store.currentOrder.order_id }}
    </p>

    <!-- Nombre del usuario en minúsculas -->
    <p
      id="id"
      style="font-weight: bold;min-width: 100%; width: max-content; text-align: center; color: black; margin:0rem;"
    >
      {{ store.currentOrder.user_name?.toLowerCase() }}
    </p>

    <!-- Fecha y hora en minúsculas -->
    <p
      style="padding: 0; color: black; margin: auto; margin-bottom: 1rem; text-align: center; width: max-content; min-width: max-content;"
    >
      <b>
        fecha: {{ (store.currentOrder.latest_status_timestamp?.split('T')[0])?.toLowerCase() }}
      </b>
      <br />
      <b style="text-align: center;">
        hora:
        {{
          (
            store.currentOrder.latest_status_timestamp
              ?.split('T')[1]
              ?.split(':')
              ?.slice(0, 2)
              ?.join(':')
          )?.toLowerCase()
        }}
      </b>
    </p>

    <!-- Encabezados "productos" / "total" -->
    <div
      style="
        font-weight: bold;
        color: white;
        margin: 0;
        background-color: black;
        align-items: center;
        display: grid;
        grid-template-columns: auto auto;
      "
    >
      <p style="width: 100%;padding: 0 .5rem;margin: 0;">
        <b>productos</b>
      </p>

      
        <p style="text-align: end;padding: 0 .5rem; font-weight: bold;">
          <b>total</b>
        </p>
      
    </div>

    <!-- Listado de productos -->
    <div v-for="(product, pIndex) in store.currentOrder.products" :key="pIndex">
      <div style="display: grid; grid-template-columns: auto auto;">
        <p class="m-0">
          <b>
            {{ product.quantity?.toString()?.toLowerCase() }}
            {{ product.name?.toLowerCase() }}
          </b>
         
        </p>
        <div>
          <p style="text-align: end; color: black;">
            <b>
              {{ formatoPesosColombianos(product.price * product.quantity) }}
            </b>
          
          </p>
        </div>
      </div>

  <div v-for="grupo in product.sabores">
    <div style="display: flex;align-items: center ;justify-content: space-between;">
      <h6 class="m-0 p-0" style="width: 100%;background-color: #00000020;" >
        <b>
          {{
              grupo.invoice_name
          }}
         
        </b>
      </h6>
    
       
    </div>
      

      <div
        class=""
        v-for="(flavor, fIndex) in grupo.flavors"
        :key="fIndex"
        style="padding: 0; gap: 1rem; display: flex; justify-content: space-between;"
      >
        <span style="color: black;">
          <b>
            {{
              grupo.flavors.length === 2
                ? '1/2'
                : ``
            }}


          </b>
          {{ flavor.name?.toLowerCase() }}
        </span>
        <span style="text-align: end; min-width: max-content;">
          
          <b >  
            {{ flavor.price > 0 ? formatoPesosColombianos(flavor.price) : '' }}
          </b>

      
      
        </span>
      </div>

  </div>
  
  
<div style="widows: 100%;border-top: .1rem solid ;opacity: .1;">

</div>
      <div style="width: 100%; border-top: 0.1rem solid;"></div>
      <div style="background-color: rgba(0, 0, 0, 0.286); height: 1px;"></div>
    </div>

    <!-- Adicionales -->
    <div
      v-for="(items, grupo) in store.currentOrder.additional_items"
      :key="grupo"
      style="position: relative; margin-top: 0.5rem;"
    >
      <p
        style="
          background-color: black;
          font-weight: bold;
          color: white;
          width: 100%;
          margin: 0;
        "
      >
        <b>{{ grupo?.toLowerCase() }}</b>
      </p>
      <div
        v-for="(aditional, aIndex) in items"
        :key="aIndex"
      >
        <div style="display: grid; grid-template-columns: auto 20%; align-items: center;">
          <div>
            <p>
              {{ aditional.aditional_quantity?.toString()?.toLowerCase() }}
              {{ aditional.aditional_name?.toLowerCase() }}
            </p>
          </div>
          <div>
            <p style="text-align: end; color: black;">
              {{ formatoPesosColombianos(aditional.total_aditional_price) }}
            </p>
          </div>
        </div>
        <div style="background-color: rgba(0, 0, 0, 0.286); height: 1px;"></div>
      </div>
    </div>

    <!-- Subtotal, domicilio, total -->
    <div
      style="
        display: grid;
        margin-top: 0.5rem;
        gap: 0;
        grid-template-columns: auto auto;
      "
    >
      <div>
        <span style="font-weight: bold;"><b>subtotal</b></span>
      </div>
      <div>
        <p style="text-align: end; font-weight: bold; color: black;">
          <b>{{ formatoPesosColombianos(store.currentOrder.total_order_price) }}</b>
        </p>
      </div>

      <div>
        <span style="font-weight: bold;"><b>domicilio</b></span>
      </div>
      <div>
        <p style="text-align: end; font-weight: bold; color: black;">
          <b>{{ formatoPesosColombianos(store.currentOrder.delivery_price) }}</b>
        </p>
      </div>

      <div>
        <span style="font-weight: bold; color: black;"><b>total</b></span>
      </div>
      <div>
        <p style="text-align: end; color: black; font-weight: bold;">
          <b>
            {{
              formatoPesosColombianos(
                store.currentOrder.delivery_price + store.currentOrder.total_order_price
              )
            }}
          </b>
        </p>
      </div>
    </div>

    <!-- Notas -->
    <p
      style="
        font-weight: bold;
        background-color: black;
        color: white;
        padding: 0 .5rem;
        margin: 0;
        margin-top: 0.5rem;
      "
    >
      <b>notas</b>
    </p>
    <p class="notas" style="border: 1px solid; margin: 0; color: black; padding: 0.5rem;">
      {{ store.currentOrder.order_notes?.toLowerCase() }}
    </p>

    <!-- Datos del cliente -->
    <p
      style="
        background-color: black;
        font-weight: bold;
        margin-top: 1rem;
        padding: 0 .5rem;
        color: white;
      "
    >
      <b>cliente</b>
    </p>
    <div style="display: grid; grid-template-columns: auto auto;gap: 0;">
      <div>
        <span><b>nombre</b></span>
      </div>
      <div>
        <p style="text-align: end; color: black;">
          {{ store.currentOrder.user_name?.toLowerCase() }}
        </p>
      </div>

      <div>
        <span><b>telefono</b></span>
      </div>
      <div>
        <p style="text-align: end; color: black;">
          {{ store.currentOrder.user_phone?.toLowerCase() }}
        </p>
      </div>

      <div>
        <span><b>direccion</b></span>
      </div>
      <div>
        <p style="text-align: end; color: black;">
          {{ store.currentOrder.user_address?.toLowerCase() }}
        </p>
      </div>

      <div>
        <span><b>metodo de pago</b></span>
      </div>
      <div>
        <p style="text-align: end; color: black;">
          {{ store.currentOrder.payment_method?.toLowerCase() }}
        </p>
      </div>
    </div>
  </div>
</div>


    <template #footer>

      <div class="col-12 mb-0 pb-0 px-0 m-0" style="display: flex;justify-content: space-between;gap: 1rem;">

        <Button v-if="store.currentOrder.current_status == 'generada'" size="small"
          @click="orderService.prepareOrder(store.currentOrder.order_id)" style="border-radius: 0.3rem;width: 100%;"
          severity="success" label="Preparar"></Button>

  


        <Button v-if="store.currentOrder.current_status == 'en preparacion'" size="small"
          @click="orderService.sendOrder(store.currentOrder.order_id)" style="border-radius: 0.3rem;width: 100%;"
          severity="success" label="enviar"></Button>
        <Button size="small" style="border-radius: 0.3rem;width: 100%;" @click="IMPRIMIR" severity="warning"
          label="imprimir"></Button>

          <Button  size="small" style="border-radius: 0.3rem;width: 100%;" @click="cancelDialogVisible = true" severity="danger"
          label="CANCELAR "></Button>  
      </div>



    </template>


    <Button class="shadow-4" @click="store.setVisible('currentOrder', false)" icon="pi pi-times" rounded severity="danger"
      style="position: absolute;top: 0;border-radius: 50%; right:-1rem; top: -1rem;"></Button>



  </Dialog>

  </div>

</template>

<script setup>
import { formatoPesosColombianos } from '../../service/formatoPesos';
import { onMounted, ref } from 'vue'
import { useOrderStore } from '../../store/order'
import { orderService } from '../../service/orderService';
import printJS from 'print-js';

const cancelDialogVisibleAdmin = ref(false)
const store = useOrderStore()






function convertTo12HourFormat(timeString) {
  // Crear un objeto Date desde la cadena de tiempo
  const date = new Date(`1970-01-01T${timeString}`);

  // Extraer horas, minutos y determinar AM/PM
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convertir a formato de 12 horas
  hours = hours % 12 || 12; // Convertir 0 a 12 para formato de 12 horas

  // Formatear la hora y minutos para que siempre tengan dos dígitos
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  return formattedTime;
}
      

const sendRequest = async() => {
  const data = {
    "order_id": store.currentOrder.order_id,
    "responsible": cancelData.value.responsible?.name,
    "reason": cancelData.value.reason
  }
  await orderService.create_cancellling_request(data)
  cancelDialogVisibleAdmin.value = false
  store.Notification.pause()
  store.Notification.currentTime = 0
}




const showDeleteDeliveryPrice = ref(false)



const IMPRIMIR = () => {
  const contenidoFactura = document.getElementById('factura').innerHTML;

  // Abrir una nueva ventana para imprimir
  const ventanaImpresion = window.open('', '_blank');

  ventanaImpresion.document.write('<html><head><title>Factura</title>');

  // Copiar estilos CSS de la página principal a la ventana de impresión
  const estilosPagina = document.getElementsByTagName('style');

  for (let i = 0; i < estilosPagina.length; i++) {
    ventanaImpresion.document.write(estilosPagina[i].outerHTML);
  }

  ventanaImpresion.document.write('<style>  @media print { html{height: min-content;} *:first-letter{text-transform:capitalize !important}  *{gap:3rem; text-transform: capitalize !important;align-items:start !important; width:100%; font-family: sans-serif;padding:0;margin:0;margin:0; font-size:o.7rem !IMPORTANT} body { padding:0; -webkit-print-color-adjust: exact; /* Chrome, Safari */ color-adjust: exact; /* Firefox */ } }  </style>');
  ventanaImpresion.document.write('</head><body>');
  ventanaImpresion.document.write(contenidoFactura);

  ventanaImpresion.document.write('</body></html>');

  ventanaImpresion.document.close();

  // Imprimir la ventana
  ventanaImpresion.print();

  // Cerrar la ventana después de 1 segundo (puedes ajustar este tiempo)
  setTimeout(() => {
    ventanaImpresion.close();
  }, 0.01);
};


// const IMPRIMIR = () => {
//   printJS({
//     printable: 'factura',
//     type: 'html',
//     targetStyles: ['*'],
//     style: `
//       * { font-size: 30pt; }
//     `
//   });
// };


onMounted(async () => {
  store.currentOrder.value = store.currentOrder
})


const cancelDialogVisible = ref(false);

const cancelData = ref({
  responsible: null,
  reason: 'Sin razon'
});
const responsibles = ref([
  { name: 'Restaurante', value: 'restaurant' },
  { name: 'Cliente', value: 'client' }
]);

const submitCancel = () => {
  if (cancelData.value.responsible) {
    orderService.cancelOrder(store.currentOrder.order_id, cancelData.value.reason, cancelData.value.responsible.name)
      .then(response => {
        if (response) {
          // Handle successful cancellation
          cancelDialogVisible.value = false;
          console.log('Order canceled successfully');
        }
      })
      .catch(error => {
        console.error('Failed to cancel order:', error);
      });
  }
}



const deliveryZero = async(order_id) => {
    await orderService.deliveryZero(order_id)
}


</script>




<style scoped>
.p-shadow {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
}

button {
  text-transform: uppercase;
}



*{
  align-items: center;
}
* {
  text-transform: uppercase;
  font-size: 12pt;
  /* color: black; */
}


.notas {
  text-transform: lowercase;
}

.notas::first-letter {
  text-transform: uppercase;
}

.advert::first-letter{
  text-transform: uppercase;

}

span {
  color: black
}

*{
  text-transform: uppercase;
  /* color: black; */
}


@media print {
  * {
    font-size: 30pt ; /* Ajusta el tamaño de fuente que necesites */
  }
  #id{
    font-size: 40pt;
  }

  .tag{
    display: none;
  }
}

</style>


















