<template>





<!-- Diálogo de confirmación para eliminar adición individual -->
<Dialog v-model:visible="visibleDialogDeleteAdition" header="Confirmar Eliminación" modal style="width: 30rem;">
    <div class="py-3">
        <p>¿Estás seguro de que deseas eliminar la adición <b>{{ aditionToDelete.name }}</b>?</p>
    </div>
    <template #footer>
        <div style="display: flex; justify-content: end; gap: 1rem;">
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDeleteAdition"></Button>
            <Button label="Eliminar" icon="pi pi-check" class="p-button-text p-button-danger" @click="deleteAdition"></Button>
        </div>
    </template>
</Dialog>

<!-- Diálogo de confirmación para eliminar grupo de adiciones -->
<Dialog v-model:visible="visibleDialogDeleteAditionGroup" header="Confirmar Eliminación" modal style="width: 30rem;">
    <div class="py-3">
        <p>¿Estás seguro de que deseas eliminar el grupo de adiciones <b>{{ aditionGroupToDelete.name }}</b>?</p>
    </div>
    <template #footer>
        <div style="display: flex; justify-content: end; gap: 1rem;">
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeDeleteAditionGroup"></Button>
            <Button label="Eliminar" icon="pi pi-check" class="p-button-text p-button-danger" @click="deleteAditionGroup"></Button>
        </div>
    </template>
</Dialog>













    <div class="px-3" style="">
        <div class="p-2 mx-auto"
            style=" max-width: 600px;overflow: hidden;background-color: var(--primary-color);border-bottom: 2px solid #00000050; border-radius: .5rem .5rem 0 0;  box-shadow:  0 1rem 1rem #00000030;overflow: hidden; gap: 1rem; padding:  0 3rem;margin: auto;display: flex;justify-content: space-between;align-items: center;">
            <p class="text-center pl-3 text-xl p-0 m-0"
                style="font-weight: bold;width:min-content;color: white; gap: 1rem; align-items: center;">
                ADICIONES
            </p>

            <div style="display: flex;gap: .5rem;align-items: center;">
                <Button @click="visibleDialogAddAdition = true" icon="pi pi-plus" size="small"
                    style="height: 2.5rem;background-color: var(--primary-color);border: none;border-radius: .3rem;r"
                    label="Nueva adicion"></Button> 
                    <h6 class="m-0 text-white p-0">|</h6>
                <Button @click="visibleDialogAddAditionGroup = true" icon="pi pi-plus" size="small"
                    style="height: 2.5rem;background-color: var(--primary-color);border: none;border-radius: .3rem;r"
                    label="Nuevo Grupo"></Button>
            </div>

        </div>


    </div>




        <div  class="m-auto col-12 m-0 p-0 selector" style="max-width: 600px;box-shadow:  0 1rem 1rem #00000030; overflow: hidden;border-bottom: 2px solid #00000050;"  v-for="(items) in adicionales" :key="grupo">
        <div class="my-1 px-2" :class="updateanime? 'update' : ''" style="display: flex;justify-content: space-between;align-items: center;gap: 1rem;">

       
            <div class="py-3 pl-2"   style="width: 100%;height:100%;display: flex;justify-content: center;flex-direction: column;" @click="visible_groups[items.type_id] = !visible_groups[items.type_id]" >


                <h6 class="text-left text-xl m-0" style="font-weight: bold;text-transform: capitalize;">
                       {{ items?.name  }}</h6> 
                       
                       
                       <h6 v-if="items.max_selected > 0" style="text-transform: capitalize;" class="m-0">El usuario puede seleccionar hasta <b>{{ items.max_selected }}</b> variaciones </h6>
                       <h6 v-else style="text-transform: capitalize;" class="m-0">El usuario puede seleccionar <b style="text-transform: capitalize;">todos los que el quiera</b> </h6>

                       

                </div>

            <h6 class="text-center text-xl m-0" style="font-weight: bold;text-transform: capitalize;"></h6>

          

            <div style="display: flex;gap: 1rem;justify-content: end;align-items: center;">
                
                <InputSwitch v-model="items.available" @change="update_group_available(items.type_id,items.available)"  @click="3"></InputSwitch>
                <Button @click="openAdditionGroupEdit(items)" style="width: 2.5rem;height: 2.5rem;border-radius: .3rem;" severity="warning" class="p-1 m-0"
                    rounded icon=" pi pi-pencil"></Button>
                    <Button 
    @click="openDeleteAditionGroup(items)" 
    style="width: 2.5rem; height: 2.5rem; border-radius: .3rem;" 
    severity="danger" 
    class="p-1" 
    rounded 
    icon="pi pi-trash">
</Button>
            </div>

        </div>

        <div  v-if="visible_groups[items.type_id]" >
        <DataTable style="background-color: white;" showGridlines stripedRows :value="items.items">
            <Column style="text-transform: capitalize;" class="p-0 px-2" field="aditional_item_name" header="NOMBRE">

                <template #body="adicion">

                    <h6 class="m-0 " style="text-transform: uppercase;"> {{ adicion.data.name }} </h6>

                </template>

            </Column>
            <Column class=" px-2 " field="aditional_item_price" header="PRECIO"
                style="text-transform: capitalize;display: flex;justify-content: center;">
                <template #body="adicion">
                    <h6 class="m-0" style="font-weight: bold;text-align: end;"
                        v-if="adicion.data.aditional_item_price != 0">
                        {{ formatoPesosColombianos(adicion.data.price) }}
                    </h6>
                </template>

            </Column>
            <Column style="width: 2rem;" class="p-0  py-1 pl-3 px-2" header="Interactuar">
                <template #body="adicion">
                    <div style="display: flex;gap: 1rem;justify-content: end;align-items: center;">


                        <InputSwitch @change="update_aditional_available(adicion.data.id, adicion.data.available)" v-model="adicion.data.available"  ></InputSwitch>

                        <Button @click="openAditionEdit(adicion.data)" style="width: 2.5rem;height: 2.5rem;border-radius: .3rem;" severity="warning"
                            class="p-1 m-0" rounded icon=" pi pi-pencil"></Button>
                            <Button 
                                @click="openDeleteAdition(adicion.data)" 
                                style="width: 2.5rem; height: 2.5rem; border-radius: .3rem;" 
                                severity="danger" 
                                class="p-1" 
                                rounded 
                                icon="pi pi-trash">
                            </Button>
                    </div>
                </template>
            </Column>
        </DataTable>

      
        </div>

    </div>




    <Dialog v-model:visible="visibleDialogEditAdition" header="Editar adicion" modal style="width: 30rem;">


        <div class="py-3">

            <div style="display: flex;gap: 1rem;flex-direction: column;">
                <h6 class="m-0 p-0"><b>Nombre</b> </h6>
                <InputText v-model="addition_to_edit.name" style="width: 100%;"></InputText>
                <h6 class="m-0 p-0"><b>precio</b> </h6>
                <InputNumber min="0"  v-model="addition_to_edit.price" prefix="$ " style="width: 100%;"></InputNumber>
            </div>
        </div>

        <template #footer>
            <div style="display: flex;justify-content: end;">

                <Button @click="edit_adition()"
                    style="background-color: var(--primary-color);border: none;border-radius: .3rem;"
                    label="Guardar"></Button>
            </div>
        </template>

    </Dialog>



    <Dialog v-model:visible="visibleDialogAddAditionGroup" header="Nuevo grupo de adiciones" modal style="width: 30rem;">


        <div class="py-3">

            <div style="display: flex;gap: 1rem;flex-direction: column;">

                <h6 class="m-0 p-0"><b>Nombre</b> </h6>
                <InputText v-model="new_adition_group.name" style="width: 100%;"></InputText>

                <div style="display: flex; justify-content: space-between; width: 100%; text-transform: capitalize;"> <h6 class="m-0 p-0" style="width: max-content;">Limitar seleccion?</h6> <InputSwitch  v-model="limit"></InputSwitch> </div>
                <h6 v-if="limit" class="m-0 p-0"><b>Limite de seleccion</b> </h6>
                <InputNumber v-if="limit"  min="0" v-model="new_adition_group.max_selected" style="width: 100%;"></InputNumber>

            </div>
        </div>

        <template #footer>
            <div style="display: flex;justify-content: end;">

                <Button @click="create_adition_group()"
                    style="background-color: var(--primary-color);border: none;border-radius: .3rem;"
                    label="Guardar"></Button>
            </div>
        </template>

    </Dialog>



    <Dialog v-model:visible="visibleDialogAddAdition" header="Nuevo adicion" modal style="width: 30rem;">


        <div class="py-3">

            <div style="display: flex;gap: 1rem;flex-direction: column;">
                <h6 class="m-0 p-0"><b>Grupo</b> </h6>
                <Dropdown v-model="new_adition.type_id" optionLabel="name" optionValue="id"
                    :options="types_adition">
                </Dropdown>
                <h6 class="m-0 p-0"><b>Nombre</b> </h6>
                <InputText v-model="new_adition.name" style="width: 100%;"></InputText>
                <h6 class="m-0 p-0"><b>precio</b> </h6>
                <InputNumber v-model="new_adition.price" prefix="$ " style="width: 100%;"></InputNumber>


            </div>
        </div>

        <template #footer>
            <div style="display: flex;justify-content: end;">

                <Button @click="create_adition"
                    style="background-color: var(--primary-color);border: none;border-radius: .3rem;"
                    label="Guardar"></Button>
            </div>
        </template>

    </Dialog>



    <Dialog v-model:visible="visibleDialogEditAditionGroup" header="Editar grupo" modal style="width: 30rem;">


        <div class="py-3">

            <div style="display: flex;gap: 1rem;flex-direction: column;">

                <h6 class="m-0 p-0"><b>Nombre</b> </h6>
                <InputText v-model="group_to_edit.name" style="width: 100%;"></InputText>

                <div style="display: flex; justify-content: space-between; width: 100%; text-transform: capitalize;"> <h6 class="m-0 p-0" style="width: max-content;">Limitar seleccion?</h6> <InputSwitch  v-model="limit"></InputSwitch> </div>
                <h6 v-if="limit" class="m-0 p-0"><b>Limite de seleccion</b> </h6>
                <InputNumber v-if="limit"  min="0" v-model="group_to_edit.max_selected" style="width: 100%;"></InputNumber>
            </div>
        </div>

        <template #footer>
            <div style="display: flex;justify-content: end;">

                <Button @click="edit_adition_group()"
                    style="background-color: var(--primary-color);border: none;border-radius: .3rem;"
                    label="Guardar"></Button>
            </div>
        </template>

    </Dialog>



</template>

<script setup>
import { adicionalesService } from '@/service/restaurant/aditionalService';
import { onMounted, ref, watch } from 'vue';
import { formatoPesosColombianos } from '../../../service/formatoPesos';
import { useRoute } from 'vue-router';
import { useSitesStore } from '../../../store/site';
import { nextTick } from 'vue';
import { fetchService } from '@/service/utils/fetchService.js'
import { URI } from '../../../service/conection';

const siteStore = useSitesStore()
const route = useRoute()

const adicionales = ref({});

const visible_groups = ref({})
const limit = ref(false)
const visibleDialogAddAdition = ref(false)
const visibleDialogAddAditionGroup = ref(false)
const visibleDialogEditAdition = ref(false)
const visibleDialogEditAditionGroup = ref(false)
// Variables para eliminar adiciones individuales
const visibleDialogDeleteAdition = ref(false);
const aditionToDelete = ref({});

// Variables para eliminar grupos de adiciones
const visibleDialogDeleteAditionGroup = ref(false);
const aditionGroupToDelete = ref({});

const types_adition = ref([])

const new_adition = ref({
  "name": '',
  "type_id": 3,
  "price": 0
})


const new_adition_group = ref({
    name: '',

})





const update_group_available = async(group_id, status) => {
     
     await fetchService.put(`${URI}/update_additional_order_type_available/${status}/${group_id}`)
     update()
 }
 
 const update_aditional_available = async(group_id, status) => {
      

        alert
      await fetchService.put(`${URI}/update_additional_item_available/${status}/${group_id}`)
      update()
  }
 
 
 
 


const openDeleteAdition = (adition) => {
    aditionToDelete.value = adition;
    visibleDialogDeleteAdition.value = true;
}

/**
 * Cierra el diálogo de confirmación para eliminar una adición individual.
 */
const closeDeleteAdition = () => {
    visibleDialogDeleteAdition.value = false;
    aditionToDelete.value = {};
}

/**
 * Elimina una adición individual utilizando el endpoint correspondiente.
 */
const deleteAdition = async () => {
    if (!aditionToDelete.value.id) {
        alert("ID de la adición no encontrado.");
        return;
    }

    try {
        await fetchService.delete(`${URI}/delete_aditional/${aditionToDelete.value.id}`);
        // Actualizar la lista de adiciones después de la eliminación
        closeDeleteAdition();

        await update();
        // Cerrar el diálogo de confirmación
    } catch (error) {
        console.error('Error al eliminar la adición:', error);
        alert("Hubo un error al eliminar la adición.");
    }
}


const openDeleteAditionGroup = (group) => {
    aditionGroupToDelete.value = group;
    visibleDialogDeleteAditionGroup.value = true;
}

/**
 * Cierra el diálogo de confirmación para eliminar un grupo de adiciones.
 */
const closeDeleteAditionGroup = () => {
    visibleDialogDeleteAditionGroup.value = false;
    aditionGroupToDelete.value = {};
}

/**
 * Elimina un grupo de adiciones utilizando el endpoint correspondiente.
 */
const deleteAditionGroup = async () => {
    if (!aditionGroupToDelete.value.type_id) {
        alert("ID del grupo no encontrado.");
        return;
    }

    try {
        await fetchService.delete(`${URI}/delete_aditional_category/${aditionGroupToDelete.value.type_id}`);
        // Actualizar la lista de adiciones y grupos después de la eliminación
        closeDeleteAditionGroup();

        await update();
        // Cerrar el diálogo de confirmación
    } catch (error) {
        console.error('Error al eliminar el grupo de adiciones:', error);
        alert("Hubo un error al eliminar el grupo de adiciones.");
    }
}







watch(limit,() => {
    new_adition_group.value.max_selected = 0,
    addition_to_edit.value.max_selected = 0
})



const create_adition_group = async() => {
    
    if (!new_adition_group.value.name){
        alert("El nombre del grupo es obligatorio")
    }

    if (!limit.value){
        new_adition_group.value.max_selected = 0
    }

    await fetchService.post(`${URI}/create-aditional-category`,new_adition_group.value)
    await update()
    visibleDialogAddAditionGroup.value = false
    
}

const edit_adition_group = async() => {
       
    if (!group_to_edit.value.name){
        alert("El nombre del grupo es obligatorio")
    }

    if (!limit.value){
        group_to_edit.value.max_selected = 0
    }

    await fetchService.put(`${URI}/update_aditional_category/${group_to_edit.value?.type_id}`,group_to_edit.value)
    await update()
    visibleDialogEditAditionGroup.value = false

}



const edit_adition = async() => {
       
       if (!addition_to_edit.value.name || !addition_to_edit.value.price){
           alert("Llene todos los campos")
       }
   
       await fetchService.put(`${URI}/update_aditional_item/${addition_to_edit.value?.id}`,addition_to_edit.value)
       await update()
       visibleDialogEditAdition.value = false
   
   }
   



const group_to_edit = ref({})
const addition_to_edit = ref({})



const openAditionEdit = (falvor) => {

    addition_to_edit.value = {...falvor}
    visibleDialogEditAdition.value = true
}


const openAdditionGroupEdit = (grup) => {

group_to_edit.value = {...grup}
visibleDialogEditAditionGroup.value = true
}


const aditions = ref({});


const create_adition = async () => {



    if (!new_adition.value.name || !new_adition.value.type_id){
        alert("nombre y tipo son obligatorios")
    }

    await fetchService.post(`${URI}/create-aditional-to-group`,new_adition.value)
    await update()
    visibleDialogAddAdition.value = false
    
}


const update = async() => {
    adicionales.value = await fetchService.get(`${URI}/all-aditional-registered-edit`);
    types_adition.value = await fetchService.get(`${URI}/get-aditional-category-types`);
}


const updateanime = ref(false)

onMounted(async () => {
    updateanime.value = true
    await update()
});

const updateStatus = async (aditional_item_instance_id, status) => {
    try {
        const updateData = { status }; // This can be expanded to include other fields if necessary
        const result = await adicionalesService.toggleAditionalStatus(aditional_item_instance_id, updateData);
        if (!result) {
            throw new Error("Failed to update the status");
        }
        console.log('Status updated successfully:', result);
    } catch (error) {
        console.error('Error updating status:', error);
    }
}





watch(() => route.path, async () => {
    if (route.params.category_id) {
        adicionales.value = await adicionalesService.getAllAditions();
        await nextTick();
    }
}, { deep: true });


watch(() => siteStore.site, async () => {
    if (siteStore.site) {
        adicionales.value = await adicionalesService.getAllAditions();
        await nextTick();
    }
}, { deep: true });



watch(visibleDialogAddAdition, () => {
    new_adition.value = {
  "name": '',
  "type_id": 3,
  "price": 0
}

})


watch(visibleDialogEditAditionGroup, () => {
    new_adition_group.value = {
  "name": ''}
})



</script>


<style scoped>
* {
    text-transform: uppercase;
}


.selector:hover{
    background-color: rgba(0, 198, 56, 0.19);
    cursor: pointer;
  
}


.update{
    /* background-color: red; */
    animation: animate .5s ease;
}


@keyframes animate {

    0%{
        transform: translateX(2rem);
        background-color: rgba(0, 198, 56, 0.19);
        opacity: 0  ;
    }
    100%{
        transform: translateX(0);
    }
    

    
}
</style>