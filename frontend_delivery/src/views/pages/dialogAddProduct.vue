<template>

    <Toast></Toast>
    <Dialog closeOnEscape v-model:visible="store.visibles.dialogAddProduct" modal style="width: 40rem;">
        <Button @click="store.visibles.dialogAddProduct = false" severity="danger"
            style="position: absolute; right: 0; top: 0; right: -1rem; top: -1rem;" rounded icon="pi pi-times"></Button>

        <div class="image" style="display: flex; flex-direction: column;position: relative; justify-content: end; align-items: end;">
            <img v-if="imagePreview" :src="imagePreview" alt="Preview"
                style="width: 100%; aspect-ratio: 1 / 1; background-color: rgb(255, 255, 255); object-fit: cover; border-radius: 0.2rem;" />

            <div v-if="subiendo_foto" style="position: absolute;left: 0; top: 0; width: 100%;display: flex;justify-content: center;align-items: center; height: 100%;background-color: #ffffff80;">
                <ProgressSpinner strokeWidth="8" style="color: white;"></ProgressSpinner>
            </div>
            
            <Button class="my-3" severity="help" @click="fileInput.click()">Agregar foto</Button>
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
     
            <div>
                <span>ID de Categoría:</span>
                <Dropdown v-model="newProduct.category_id" :options="categories" optionLabel="name" optionValue="id" placeholder="Selecciona una categoría" style="width: 100%;" />
            </div>

            <div>
                <span>Nombre:</span>
                <InputText v-model="newProduct.product_name" style="width: 100%;"></InputText>
            </div>
            <div>
                <span>Descripción:</span>
                <Textarea v-model="newProduct.product_description" rows="3" style="width: 100%; resize: none;"></Textarea>
            </div>
          
            <div>
                <span>Anterior Precio:</span>
                <InputNumber v-model="newProduct.last_price" prefix="$" maxFractionDigits="0" style="width: 100%;"></InputNumber>
            </div>

            <div>
                <span>Precio Actual:</span>
                <InputNumber v-model="newProduct.price" prefix="$" maxFractionDigits="0" style="width: 100%;"></InputNumber>
            </div>
        </div>

        <div class="m-auto col-12 p-0" style="max-width: 600px;" v-for="(items, grupo) in adicionales" :key="grupo">
            <p class="text-center text-2xl py-4" style="font-weight: bold; text-transform: capitalize; display: flex; align-items: center; justify-content: center; gap: 1rem;">
                <span>{{ grupo }}</span>
                <InputSwitch :modelValue="allSelected(grupo)" @update:modelValue="toggleGroup(grupo, $event)" />
            </p>
            <DataTable stripedRows :value="items" class="p-0">
                <Column style="text-transform: capitalize;" class="p-0" field="aditional_item_name" header="Nombre">
                    <template #body="adicion">
                        <span style="text-transform: uppercase;">{{ adicion.data.item_name }}</span>
                    </template>
                </Column>
                <Column class="p-0" field="aditional_item_price" header="Precio">
                    <template #body="adicion">
                        <span style="font-weight: bold;">{{ formatoPesosColombianos(adicion.data.item_price) }}</span>
                    </template>
                </Column>
                <Column class="py-0 pl-4 p-0" header="Estado" headerStyle="width:1rem">
                    <template #body="adicion">
                        <InputSwitch v-model="adicion.data.status" @update:modelValue="handleSwitch(adicion.data.item_id, grupo, $event)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <template #footer>
            <div class="col-12 px-0 pb-0">
                <Button @click="prepareToSend" severity="success" label="Guardar"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted,watch,computed } from 'vue';
import { useProductStore } from '@/store/productStore';
import { adicionalesService } from '@/service/restaurant/aditionalService';
import { formatoPesosColombianos } from '@/service/formatoPesos';
import { productService } from '@/service/ProductService';
import { restaurantService } from '@/service/restaurant/restaurantService.js';
import { categoriesService } from '@/service/restaurant/categoriesService';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import { useSitesStore } from '../../store/site';




const site_store = useSitesStore()
const toast = useToast()

const subiendo_foto = ref(false)

const seleccionados = ref([])
const store = useProductStore();
const adicionales = ref([]);
const newProduct = ref({
    product_name: '',
    product_description: '',
    price: 0,
    last_price: 0,
    category_id: null,
    restaurant_id: 5,
    img_identifier: null
});
const categories = ref([]);
const restaurants = ref([]);
const imagePreview = ref(null);
const fileInput = ref(null);

// Cargar categorías y restaurantes al montar el componente
onMounted(async () => {
    try {
        // categories.value = await categoriesService.getCategories();
        restaurants.value = await restaurantService.getAllRestaurants();
        categories.value = await categoriesService.getCategoriesByRestaurantId(5);
        adicionales.value = await adicionalesService.getAllAditionsRegistered();
    } catch (error) {
        console.error('Error loading data:', error);
    }
});


const restaurantId = 5

watch(restaurantId, async (newRestaurantId, oldRestaurantId) => {
    if (newRestaurantId !== oldRestaurantId) {
        categories.value = await categoriesService.getCategoriesByRestaurantId(5);
        newProduct.value.category_id = null
    }
}, { deep: true });




const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    imagePreview.value = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
        subiendo_foto.value = true
        const response = await productService.uploadPhoto(formData);
        newProduct.value.img_identifier = response.image_identifier;
        URL.revokeObjectURL(imagePreview.value);
        subiendo_foto.value = false
    } catch (error) {
        console.error("Error uploading image:", error);
        subiendo_foto.value = false 
    }
};

// Funciones para manejar los adicionales
const allSelected = (grupo) => adicionales.value[grupo].every(item => item.status);
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

// Guardar el nuevo producto con los adicionales seleccionados
const prepareToSend = () => {
    if (typeof adicionales.value !== 'object' || adicionales.value === null) {
        console.error("adicionales.value no es un objeto", adicionales.value);
        return; // Salir de la función si no es un objeto
    }

    let aditional_ids = [];
    
    // Iterar sobre las propiedades del objeto adicionales.value
    for (const group in adicionales.value) {
        if (adicionales.value.hasOwnProperty(group)) {
            // Aquí, adicionales.value[group] es un array
            adicionales.value[group].forEach(item => {
                if (item.status) {
                    aditional_ids.push(item.item_id);
                }
            });
        }
    }

    seleccionados.value = aditional_ids;
    send();
};

const send = async() => {
    const product = {
        "name": newProduct.value.product_name,
        "price": newProduct.value.price || 0,
        "last_price": newProduct.value.last_price || 0,
        "description": newProduct.value.product_description,
        "category_id": newProduct.value.category_id,
        "restaurant_id":5,
        "status": true,
        "img_identifier": newProduct.value.img_identifier || '', // Establecer un valor predeterminado
        "parent_id": null // Asegúrate de que este campo esté incluido si es necesario
    };

    const additional_item_ids = seleccionados.value;
    await productService.createProductInstance(product, additional_item_ids);
    resetForm()
   

};

// Resetear el formulario
const resetForm = () => {
    newProduct.value = {
        product_name: '',
        product_description: '',
        price: 0,
        last_price: 0,
        category_id: null,
        restaurant_id: 5,
        img_identifier: null
    };
    imagePreview.value = null;
    // Resetear adicionales si es necesario

    if (adicionales.value?.length > 0){
        adicionales.value?.forEach(items => {
        items.forEach(item => {
            item.status = false; // o el estado que desees
        });
    });

   

    }

    toast.add({
        severity: 'success',
        summary: 'Producto agregado',
        detail: `Listo`,
        life: 3000 // Duración del toast en milisegundos (3 segundos)
    });

    store.visibles.dialogAddProduct = false
    site_store.update += 1

};
</script>
