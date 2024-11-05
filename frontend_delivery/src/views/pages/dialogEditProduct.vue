<template>
    <Dialog closeOnEscape v-model:visible="store.visibles.dialogEditProduct" modal style="width: 40rem;">

        <!-- {{ seleccionados }} -->
        <Button @click="store.visibles.dialogEditProduct = false" severity="danger"
            style="position: absolute; right: 0;top: 0;right: -1rem; top: -1rem;" rounded icon="pi pi-times"></Button>

        <!-- {{ store.currentProductToEdit }} -->

        <div class="image" style="display: flex;flex-direction: column; justify-content: end; align-items: end;">
            <img v-if="imagePreview" :src="imagePreview" alt="Preview"
                style="width: 100%; aspect-ratio: 1 / 1; background-color: rgb(255, 255, 255); object-fit: contain; border-radius: 0.2rem;" />

            <!-- Mostrar la imagen del servidor si no hay imagen cargada -->
            <img v-else class=""
                style="width: 100%; aspect-ratio: 1 / 1; background-color: rgb(255, 255, 255); object-fit: contain; border-radius: 0.2rem;"
                :src="`${URI}/read-photo-product/${store.currentProductToEdit.img_identifier}/600`" alt="">

            <Button style="" class="my-3" severity="help" @click="fileInput.click()">Cambiar foto</Button>
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
        </div>



        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <span>Nombre:</span>
                <InputText v-model="store.currentProductToEdit.product_name" style="width: 100%;">
                </InputText>
            </div>
            <div>
                <span>descripcion:</span>
                <Textarea v-model="store.currentProductToEdit.product_description" rows="3"
                    style="width: 100%;resize: none;">
                </Textarea>
            </div>


            <div>
                <span>Precio anterior:</span>
                <InputNumber v-model="store.currentProductToEdit.last_price" prefix="$" maxFractionDigits="0" rows="3"
                    style="width: 100%;resize: none;">
                </InputNumber>
            </div>
            <div>
                <span>Precio actual:</span>
                <InputNumber v-model="store.currentProductToEdit.price" prefix="$" maxFractionDigits="0" rows="3"
                    style="width: 100%;resize: none;">
                </InputNumber>
            </div>

           
        </div>



        <div class="m-auto col-12 p-0" style="max-width: 600px;" v-for="(items, grupo) in adicionales" :key="grupo">
            <p class="text-center text-2xl py-4"
                style="font-weight: bold;text-transform: capitalize;display: flex; align-items: center;justify-content: center;gap: 1rem;">
                <span>{{ grupo }}</span>
                <!-- {{ currentAditions }} -->
                <InputSwitch :modelValue="allSelected(grupo)" @update:modelValue="toggleGroup(grupo, $event)" />
            </p>
            <DataTable stripedRows :value="items" class="p-0">
                <Column style="text-transform: capitalize;" class="p-0" field="aditional_item_name" header="Nombre">
                    <template #body="adicion">
                        <span style="text-transform: uppercase;"> {{ adicion.data.item_name }} </span>
                    </template>
                </Column>
                <Column class="p-0" field="aditional_item_price" header="Precio">
                    <template #body="adicion">
                        <span style="font-weight: bold;">
                            {{ formatoPesosColombianos(adicion.data.item_price) }}
                        </span>
                    </template>
                </Column>
                <Column class="py-0 pl-4 p-0" header="Estado" headerStyle="width:1rem">
                    <template #body="adicion">
                        <InputSwitch v-model="adicion.data.status"
                            @update:modelValue="handleSwitch(adicion.data.item_id, grupo, $event)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <template #footer>

            <div class="col-12 px-0 pb-0">
                <Button class="" @click="prepareToSend" severity="success" label="Guardar"></Button>
            </div>
        </template>
    </Dialog>


</template>


<script setup>
import { ref, watch } from 'vue';
import { useProductStore } from '@/store/productStore';
import { adicionalesService } from '@/service/restaurant/aditionalService';
import { formatoPesosColombianos } from '@/service/formatoPesos';
import { onMounted } from 'vue';
import { productService } from '@/service/ProductService';
import { URI } from '@/service/conection';


const currentAditions = ref([]);
const store = useProductStore();
const adicionales = ref([]);

// Cargar todas las adiciones y detalles de adiciones actuales al montar el componente
// onMounted(async () => {
//     currentAditions.value = await adicionalesService.getAditional(store.currentProductToEdit.id); // Obtener las adiciones actuales
//     adicionales.value = await adicionalesService.getAllAditionsRegistered(); // Obtener todos los adicionales registrados
//     updateAdicionalesStatus();
// });

// Función para actualizar el estado de los items en `adicionales` basado en `currentAditions`
// Mantener la vista previa de la imagen localmente
const imagePreview = ref(null);  // Aquí se almacena la URL de la imagen seleccionada

const fileInput = ref(null);



const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Crear una URL temporal para mostrar la imagen seleccionada
    imagePreview.value = URL.createObjectURL(file);

    // Llamar al servicio para subir la imagen
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await productService.uploadPhoto(formData);
        const newImageIdentifier = response.image_identifier;

        // Actualizar el identificador de la imagen en el producto actual
        store.currentProductToEdit.img_identifier = newImageIdentifier;

        // Limpiar la URL temporal después de que se haya subido la imagen
        URL.revokeObjectURL(imagePreview.value);
    } catch (error) {
        console.error("Error al subir la imagen:", error);
    }
};

const updateAdicionalesStatus = () => {
    // Asegurar que adicionales está completo y listo para ser procesado
    if (!adicionales.value || adicionales.value.length === 0) return;

    // Recorrer cada grupo de adicionales
    Object.entries(adicionales.value).forEach(([grupo, items]) => {
        items.forEach(item => {
            // Buscar coincidencia en currentAditions
            const match = currentAditions.value.some(addition =>
                addition.items.some(aditional =>
                    aditional.aditional_item_name.toLowerCase() === item.item_name.toLowerCase()
                    && aditional.aditional_item_price === item.item_price &&
                    aditional.aditional_item_type_name === item.type_name
                )
            );
            // Establecer el estado basado en la existencia de la coincidencia
            item.status = match;
        });
    });
};

// Verifica si todos los items en un grupo están seleccionados
const allSelected = (grupo) => {
    return adicionales.value[grupo].every(item => item.status);
};

// Cambiar el estado de todos los items en un grupo
const toggleGroup = (grupo, value) => {
    adicionales.value[grupo].forEach(item => {
        item.status = value;
        handleSwitch(item.item_id, grupo, value);
    });
};

// Manejar conmutadores individuales
const handleSwitch = (itemId, grupo, value) => {
    const index = adicionales.value[grupo].findIndex(item => item.item_id === itemId);
    if (index !== -1) {
        adicionales.value[grupo][index].status = value;
    }
};



watch(() => store.currentProductToEdit.id, async () => {
    currentAditions.value = await adicionalesService.getAditional(store.currentProductToEdit.id); // Obtener las adiciones actuales
    adicionales.value = await adicionalesService.getAllAditionsRegistered(); // Obtener todos los adicionales registrados
    updateAdicionalesStatus();
})


const seleccionados = ref([])

const prepareToSend = () => {
    let aditional_ids = [];

    // Iteramos sobre cada grupo en el objeto 'adicionales'
    for (const group in adicionales.value) {
        // Aseguramos que estamos accediendo a una propiedad propia del objeto
        if (adicionales.value.hasOwnProperty(group)) {
            // Iteramos sobre cada item en el grupo
            adicionales.value[group].forEach(item => {
                if (item.status) {
                    aditional_ids.push(item.item_id);
                }
            });
        }
    }

    seleccionados.value = aditional_ids;
    send()
}


const send = () => {
    const product = {
        "product_id": store.currentProductToEdit.id,
        "name": store.currentProductToEdit.product_name,
        "price": store.currentProductToEdit.price,
        "last_price": store.currentProductToEdit.last_price || 0,
        "description": store.currentProductToEdit.product_description,
        "category_id": store.currentProductToEdit.category_id,
        "status": true,
        "img_identifier": store.currentProductToEdit.img_identifier,
        "parent_id": store.currentProductToEdit.product_id // Incluir el nuevo identificador
    };

    const additional_item_ids = seleccionados.value;

    // Llamar al servicio para actualizar el producto
    productService.updateProductInstance(product, additional_item_ids);
};
</script>
