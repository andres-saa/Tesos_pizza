<template>
    <div class="m-auto" style="max-width: 1024px;">
        <p class="text-center text-3xl" style="font-weight: bold; display: flex; gap: 1rem; align-items: center;">
    <div style="width: 100%; height: 5px; min-width: max-content; background-color: #ff6200;"></div>
    <span style="min-width: max-content; width: auto;">ADICIONALES DE {{ siteStore.site.site_name }}</span>  
    <div style="width: 100%; height: 5px; min-width: max-content; background-color: #ff6200;"></div>
</p>
    </div>

    <div class="m-auto col-12" style="max-width: 600px;" v-for="(items, grupo) in adicionales" :key="grupo">
        <p class="text-center text-2xl" style="font-weight: bold;text-transform: capitalize;">{{ grupo }}</p>
        <DataTable stripedRows :value="items">
            <Column style="text-transform: capitalize;" class="p-0" field="aditional_item_name" header="Nombre">
            
                <template #body="adicion">

                <span style="text-transform: uppercase;"> {{ adicion.data.aditional_item_name }} </span>
                
                </template>
            
            </Column>
            <Column class="p-0 pl-3" field="aditional_item_price" header="Precio" >
             <template  #body="adicion">
                <span style="font-weight: bold;" v-if="adicion.data.aditional_item_price != 0">
                    {{ formatoPesosColombianos(adicion.data.aditional_item_price) }}

                </span>
            
            </template>
            
            </Column>
            <Column style="width: 2rem;" class="p-0 pl-3" header="">
                <template #body="adicion">
                    <InputSwitch  class="p-0 m-0" v-model="adicion.data.status" @change="updateStatus(adicion.data.aditional_item_instance_id, adicion.data.status)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { adicionalesService } from '@/service/restaurant/aditionalService';
import { onMounted, ref,watch } from 'vue';
import { formatoPesosColombianos } from '../../../service/formatoPesos';
import { useRoute } from 'vue-router';
import { useSitesStore } from '../../../store/site';
import { nextTick } from 'vue';
const siteStore = useSitesStore()
const route = useRoute()

const adicionales = ref({});

onMounted(async () => {
   adicionales.value = await adicionalesService.getAllAditions();
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
    if(route.params.category_id){
        adicionales.value = await adicionalesService.getAllAditions();
    await nextTick(); 
    }
},{deep:true});


watch(() => siteStore.site, async () => {
    if(siteStore.site){
        adicionales.value = await adicionalesService.getAllAditions();
    await nextTick(); 
    }
},{deep:true});



</script>


<style scoped>
*{
    text-transform: uppercase;
}
</style>