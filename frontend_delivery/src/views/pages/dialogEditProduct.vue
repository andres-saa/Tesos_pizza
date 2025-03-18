<template>
    <Dialog closeOnEscape v-model:visible="store.visibles.dialogEditProduct" modal style="width:90w;min-width: 800px; max-width: 1200px;">
      <Button @click="store.visibles.dialogEditProduct = false" severity="danger"
        style="position: absolute; right: -1rem; top: -1rem; border-radius: 50%;" rounded icon="pi pi-times"></Button>
  
      <div class="container">
        <div class="image" style="display: flex;position: sticky;top: 0; flex-direction: column; justify-content: end; align-items: end;">
          <img v-if="imagePreview" :src="imagePreview" alt="Preview"
            style="width: 100%; aspect-ratio: 1 / 1; background-color: rgb(255, 255, 255); object-fit: cover; border-radius: 0.2rem;" />
          <img v-else :src="`${URI}/read-photo-product/${store?.currentProductToEdit?.img_identifier}`" alt="Preview"
            style="width: 100%; aspect-ratio: 1 / 1; background-color: rgb(255, 255, 255); object-fit: cover; border-radius: 0.2rem;" />
          <div v-if="subiendo_foto" style="position: absolute; left: 0; top: 0; width: 100%; display: flex; justify-content: center; align-items: center; height: 100%; background-color: #ffffff80;">
            <ProgressSpinner strokeWidth="8" style="color: white;"></ProgressSpinner>
          </div>
          <Button size="large" label="Foto" icon="pi pi-camera" style="position: absolute; right: 1rem; top: 0;" class="my-3" severity="help" @click="fileInput.click()"></Button>
          <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
        </div>
  
        <div>

            
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex;width: min-content;gap: 1rem; align-items: center;justify-content: end;">

<h6 class="m-0" style="min-width: max-content;"><b>Es un combo?</b></h6>
<InputSwitch  v-model="store.currentProductToEdit.is_combo" ></InputSwitch>

<h6 class="m-0" style="min-width: max-content;"><b>Programar disponibilidad?</b></h6>
<InputSwitch  v-model="programar" ></InputSwitch>



</div>






<div>
 
  <div v-if="programar" style="width: 100%;gap: 1rem;border: 2px dashed var(--primary-color);border-radius: .5rem;background-color: #ff000020; " class="p-3"> 

    <div style="display: flex;"> <h6 class="m-0"> <b>Configura el horario de disponibilidad </b> </h6> <i class="pi ml-2 pi-clock text-2xl"></i> </div>
    


    <div style="display: flex;gap: 2rem;">
      <div>
    <h6 class="my-2"> <b>Inicio</b></h6>
    <Calendar v-model="store.currentProductToEdit.start_date" timeOnly hourFormat="12"></Calendar>
  </div>

  <div> 
    <h6 class="my-2"  ><b>Fin</b></h6>
    <Calendar v-model="store.currentProductToEdit.end_date" timeOnly hourFormat="12"></Calendar>

  </div>
    </div>
 
</div>

</div>



            <div style="display: flex; width: 100%;gap: 1rem;">
                <div style="display: flex;flex-direction: column; gap: 1rem; width: 100%;">
                    <h6 class="m-0"><b>Nombre:</b></h6>
                    <InputText v-model="store.currentProductToEdit.product_name" style="width: 100%;"></InputText>
                </div>
             
            </div>

            


            <div>
              <h6><b>Description:</b></h6>
              <Textarea v-model="store.currentProductToEdit.product_description" rows="10" style="width: 100%; resize: none;"></Textarea>
            </div>
            <div>
              <h6><b>Precio anterior:</b></h6>
              <InputNumber v-model="store.currentProductToEdit.last_price" prefix="$" maxFractionDigits="0" style="width: 100%;"></InputNumber>
            </div>
            <div>
              <h6><b>Precio actual:</b></h6>
              <InputNumber v-model="store.currentProductToEdit.price" prefix="$" maxFractionDigits="0" style="width: 100%;"></InputNumber>
            </div>
          </div>
  
          <!-- Sección de Adiciones -->
          <div class="mt-4" style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100%; background-color: var(--primary-color); height: .5rem;"></div>
            <h6 class="m-0">
              <p class="text-center text-2xl py-0" style="font-weight: bold; text-transform: capitalize; display: flex; align-items: center; justify-content: center; gap: 1rem;">
                <span>ADICIONES</span>
              </p>
            </h6>
            <div style="width: 100%; background-color: var(--primary-color); height: .5rem;"></div>
          </div>
  
          <div class="m-auto col-12 p-0" v-for="(items, grupo) in adicionales" :key="grupo">
            <p class="text-center text-2xl py-0 px-2 shadow"
              style="font-weight: bold; text-transform: capitalize; border-bottom: 3px solid #00000030; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
              <Button @click="() => visible_group_items[grupo] = !visible_group_items[grupo]" class="p-2" text style="aspect-ratio: 1 / 1; border: none; color: var(--primary-color); font-weight: bold;">
                <i class="pi pi-angle-down text-3xl"></i>
              </Button>
              <span>{{ grupo }}</span>
              <InputSwitch style="min-width: 3rem;" :modelValue="allSelected(grupo)" @update:modelValue="toggleGroup(grupo, $event)" />
            </p>
            <DataTable v-if="visible_group_items[grupo]" stripedRows :value="items" class="p-0">
              <Column style="text-transform: capitalize;" field="aditional_item_name" header="Nombre">
                <template #body="adicion">
                  <span style="text-transform: uppercase;">{{ adicion.data.item_name }}</span>
                </template>
              </Column>
              <Column field="aditional_item_price" header="Precio">
                <template #body="adicion">
                  <span style="font-weight: bold;">{{ formatoPesosColombianos(adicion.data.item_price) }}</span>
                </template>
              </Column>
              <Column header="Estado" headerStyle="width:1rem">
                <template #body="adicion">
                  <InputSwitch v-model="adicion.data.status" @update:modelValue="handleSwitch(adicion.data.item_id, grupo, $event)" />
                </template>
              </Column>
            </DataTable>
          </div>
  
          <!-- Sección de Selectores -->
          <div class="mt-4" style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100%; background-color: var(--primary-color); height: .5rem;"></div>
            <h6 class="m-0">
              <p class="text-center text-2xl py-0" style="font-weight: bold; text-transform: capitalize; display: flex; align-items: center; justify-content: center; gap: 1rem;">
                <span>SELECTORES</span>
              </p>
            </h6>
            <div style="width: 100%; background-color: var(--primary-color); height: .5rem;"></div>
          </div>
  
          <!-- Iteramos sobre los selectores combinados (los que existen y los nuevos) -->
          <div class="p-3 shadow-2" v-for="(selector, index) in combinedSelectors" :key="index" style="border: 2px dashed;position: relative; border-radius: .5rem; margin: 2rem 0;">



            <div v-if="store.currentProductToEdit.is_combo">
                <h6 class="mb-2"><b>Producto de Referencia</b></h6>
              <Dropdown class="" filter filterPlaceholder="Busca un producto" 
              v-model="selector.reference_id"
              optionLabel="name" :options="all_products.filter(p => !p.is_combo && p.visible && p.product_id !== store.currentProductToEdit.product_id )" optionValue="id" style="width: 100%;"></Dropdown>

        
                 

            <h6 style="width: 100%;" class="mb-2"><b>Valor de este producto en el combo</b></h6>
            <InputNumber class="mb-3" prefix="$ " placeholder="Cuanto vale este producto en este combo" v-model="selector.price" style="width: 100%;"></InputNumber>

            
            </div>
          

            
            <div style="display: flex; justify-content: space-between; align-items: center;">




           
              <h6 class="mb-2"><b>Grupo de Variaciones</b></h6>
              <!-- Botón para eliminar el selector -->
              <Button  style="position: absolute;border-radius: 50%;aspect-ratio: 1 / 1; right: -1rem;top: -1.9rem;" icon="pi pi-trash" class="p-2" severity="danger" @click="removeSelector(selector)"></Button>


              <div class="mb-2" style="display: flex; gap: 1rem; align-items: center;">
                <h6 class="p-0 m-0">Se puede combinar</h6>
                <InputSwitch v-model="selector.combine"></InputSwitch>
              </div>
            </div>
            <Dropdown filter filterPlaceholder="Busca un grupo de variaciones" v-model="selector.flavor_group_id"
              optionLabel="group_name" :options="sabores.flavor_groups" optionValue="group_id" style="width: 100%;"></Dropdown>


              




            <h6 style="width: 100%;" class="mb-2"><b>Llamado a la acción</b></h6>
            <InputText placeholder="Es el texto que aparece arriba de un selector" v-model="selector.shoping_name" style="width: 100%;"></InputText>
            <h6 style="width: 100%;" class="mb-2"><b>Identificador en factura</b></h6>
            <InputText placeholder="Así aparece en la factura" v-model="selector.invoice_name" style="width: 100%;"></InputText>
          </div>
  
          <div style="width: 100%; display: flex; justify-content: end;">
            <Button @click="addSelector" style="border-radius: 50%;" label="Nuevo selector" severity="help" icon="pi pi-plus"></Button>
          </div>
        </div>
      </div>
  
      <template #footer>
        <div class="col-12 px-0 pb-0">
          <Button @click="prepareToSend" severity="success" label="Guardar"></Button>
        </div>
      </template>
    </Dialog>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted } from 'vue';
  import { useProductStore } from '@/store/productStore';
  import { adicionalesService } from '@/service/restaurant/aditionalService';
  import { formatoPesosColombianos } from '@/service/formatoPesos';
  import { productService } from '@/service/ProductService';
  import { URI } from '@/service/conection';
  import { fetchService } from '../../service/utils/fetchService';
  import { useSitesStore } from '../../store/site';
import { useRoute } from 'vue-router';
  
  const store = useProductStore();
  const route = useRoute()

  const handleChangeSwitch = () => {
    alert(hola)
  }


  const programar = ref(false)

  const emit = defineEmits(['actualizar'])


  const site_store = useSitesStore();
  const is_combo = ref(false)
  const all_products = ref([])
  // Variables reactivas para la imagen
  const imagePreview = ref(null);
  const fileInput = ref(null);
  const subiendo_foto = ref(false);
  const img = ref('');
  
  // Variables para adicionales
  const adicionales = ref([]);
  const currentAditions = ref([]);
  const visible_group_items = ref([]);
    
  // Variable reactiva para sabores (incluye flavor_groups y selectors)
  const sabores = ref({ flavor_groups: [], selectors: [] });
  
  // Creamos tres listas para los selectores:
  const maintainedSelectors = ref([]); // Los que vienen de la BD
  const newSelectors = ref([]); // Los agregados nuevos
  const deletedSelectors = ref([]); // Los eliminados
  

  const cargado = ref(false)


  watch(() => store.currentProductToEdit.is_combo, (newval) => {

    


    if (!newval && maintainedSelectors.value.length + newSelectors.value.length > 1 && cargado.value){
        alert("como estas deshabilitando la opcion de combo y este producto tiene mas de un selector, hemos eliminado todos los selectores para evitar errores, solo pon de nuevo el que deseas")
        maintainedSelectors.value = []
        newSelectors.value = []
        deletedSelectors.value = []
    }

    if(!newval){
        maintainedSelectors.value = []
        newSelectors.value = []
        deletedSelectors.value = []
    }


  })




  watch(() =>   store.visibles.dialogEditProduct
  , (newval) => {

    

    if(!newval){
        maintainedSelectors.value = []
        newSelectors.value = []
        deletedSelectors.value = []
        imagePreview.value = null

    }



})



watch(programar,() => {
   store.currentProductToEdit.start_date = store.currentProductToEdit.end_date = null
})







  // Computed para combinar maintained y nuevos en la vista
  const combinedSelectors = computed(() => {
    return [...maintainedSelectors.value, ...newSelectors.value];
  });
  
  // Función para agregar un nuevo selector (se agrega a la lista de nuevos)
  const addSelector = () => {


    if (!store.currentProductToEdit.is_combo && maintainedSelectors.value.length + newSelectors.value.length > 0) {
        alert("Para agregaar mas de un selector debe ser un combo")
        return
    }

    newSelectors.value.push({
      product_id: store.currentProductToEdit.product_id,
      flavor_group_id: 0,
      shoping_name: '',
      invoice_name: '',
      combine: false,
      price:null,
      reference_id:null
    });
  };
  
  // Función para remover un selector
  const removeSelector = (selector) => {
    if (selector.id !== undefined && selector.id !== null) {
      // Si es un selector existente (mantenido), se remueve y se agrega a eliminados
      const index = maintainedSelectors.value.findIndex(s => s.id === selector.id);
      if (index !== -1) {
        deletedSelectors.value.push(maintainedSelectors.value[index]);
        maintainedSelectors.value.splice(index, 1);
      }
    } else {
      // Si es un selector nuevo, solo se elimina de la lista de nuevos
      const index = newSelectors.value.indexOf(selector);
      if (index !== -1) {
        newSelectors.value.splice(index, 1);
      }
    }
  };
  
  // Funciones para manejar adiciones
  const allSelected = (grupo) => {
    return adicionales.value[grupo].every(item => item.status);
  };
  
  const toggleGroup = (grupo, value) => {
    adicionales.value[grupo].forEach(item => {
      item.status = value;
      handleSwitch(item.item_id, grupo, value);
    });
  };
  
  const handleSwitch = (itemId, grupo, value) => {
    const index = adicionales.value[grupo].findIndex(item => item.item_id === itemId);
    if (index !== -1) {
      adicionales.value[grupo][index].status = value;
    }
  };
  
  // Manejo de subida de imagen
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    imagePreview.value = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      subiendo_foto.value = true;
      const response = await productService.uploadPhoto(formData);
      img.value = response.image_identifier;
      URL.revokeObjectURL(imagePreview.value);
      subiendo_foto.value = false;
    //   emit("actualizar")
    } catch (error) {
      console.error("Error uploading image:", error);
      subiendo_foto.value = false;
    }
  };
  
  // Actualiza el estado de los adicionales según currentAditions
  const updateAdicionalesStatus = () => {
    if (!adicionales.value || adicionales.value.length === 0) return;
    Object.entries(adicionales.value).forEach(([grupo, items]) => {
      items.forEach(item => {
        const match = currentAditions.value.some(addition =>
          addition.items.some(aditional =>
            aditional.aditional_item_name.toLowerCase() === item.item_name.toLowerCase() &&
            aditional.aditional_item_price === item.item_price &&
            aditional.aditional_item_type_name === item.type_name
          )
        );
        item.status = match;
      });
    });
  };
  
  // onMounted y watch para cargar datos
  onMounted(async () => {
    img.value = store.currentProductToEdit.img_identifier;
         all_products.value = await fetchService.get(`${URI}/products/`);

  });
  
  watch(() => store.visibles.dialogEditProduct, async (newval) => {

    if (!newval){
        cargado.value = false
        return
    }

    currentAditions.value = await adicionalesService.getAditional(store.currentProductToEdit.id);
    adicionales.value = await adicionalesService.getAllAditionsRegistered();
    updateAdicionalesStatus();
  
    // Se obtiene la información de sabores, que incluye flavor_groups y selectors
    const data = await fetchService.get(`${URI}/get_flavors_by_product/${store?.currentProductToEdit?.product_id}`);
    sabores.value = data;
  
    // Al cargar, se inicializan los selectores mantenidos con los que vienen del servidor
    if (data && data.selectors) {
      maintainedSelectors.value = data.selectors;
    }

    cargado.value = false
  });
  
  // Para recolectar IDs de adicionales seleccionados y enviar la información
  const seleccionados = ref([]);
  
  const prepareToSend = () => {
    let aditional_ids = [];
    // Recolectar IDs de adicionales
    for (const group in adicionales.value) {
      if (adicionales.value.hasOwnProperty(group)) {
        adicionales.value[group].forEach(item => {
          if (item.status) {
            aditional_ids.push(item.item_id);
          }
        });
      }
    }
    seleccionados.value = aditional_ids;
    send(aditional_ids);
  };
  
  // Función send que prepara el payload con tres listas de selectores
  const send = async (additional_item_ids) => {
  const selectorsPayload = {
    maintained: maintainedSelectors.value,
    deleted: deletedSelectors.value,
    new: newSelectors.value
  };

  const product = {
    product_id: store.currentProductToEdit.id,
    name: store.currentProductToEdit.product_name,
    price: store.currentProductToEdit.price,
    last_price: store.currentProductToEdit.last_price || 0,
    description: store.currentProductToEdit.product_description,
    category_id: store.currentProductToEdit.category_id,
    status: true,
    img_identifier: img.value || store.currentProductToEdit.img_identifier,
    parent_id: store.currentProductToEdit.product_id,
    max_flavor: store.currentProductToEdit.max_flavor,
    is_combo: store.currentProductToEdit.is_combo
  };

  if (store.currentProductToEdit.is_combo) {
    // Validamos que cada selector tenga un producto referenciado y un precio asignado
    const manteined_sin_precio = selectorsPayload.maintained.some(m => (!m.reference_id || !m.price));
    const new_sin_precio = selectorsPayload.new.some(m => (!m.reference_id || m.price === null));

    if (manteined_sin_precio || new_sin_precio) {
      alert("Recuerde que para los combos todos los selectores deben referenciar un producto y tener un precio dentro del combo");
      return;
    }

    // Nueva validación: La suma de los precios de los selectores debe ser igual al precio del producto
    const sumSelectorsPrice =
      selectorsPayload.maintained.reduce((sum, item) => sum + Number(item.price), 0) +
      selectorsPayload.new.reduce((sum, item) => sum + Number(item.price), 0);
      
      if (sumSelectorsPrice !== Number(store.currentProductToEdit.price)) {
  const difference = sumSelectorsPrice - Number(store.currentProductToEdit.price);
  if (difference > 0) {
    alert(`La suma de los precios de los selectores es mayor que el precio del producto por ${formatoPesosColombianos(difference) }`);
  } else {
    alert(`La suma de los precios de los selectores es menor que el precio del producto por ${formatoPesosColombianos( Math.abs(difference))}`);
  }
  return;
}
  }


 await productService.updateProductInstance(product, additional_item_ids, selectorsPayload);
//   site_store.update += 1;
  emit("actualizar")

  
};

  </script>
  
  <style scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    min-width:100%;
    align-items: start;
    gap: 2rem;
    padding: 0;
  }
  </style>
  