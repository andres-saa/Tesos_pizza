<template>
    

<div v-if="renderComponent">

    <dialogEditProduct @actualizar="actualiza" class="m-3"></dialogEditProduct>
    <dialogDeleteProduct></dialogDeleteProduct> 
    <dialogAddProduct @actualizar="actualiza"></dialogAddProduct>
    <dialogGestorCategorias></dialogGestorCategorias>
    

    <p class="text-center text-3xl col-12" style="font-weight: bold;display: flex;gap: 1rem;align-items: center;">

     <p class="text-3xl text-center" style=" width: 100%;text-transform: capitalize;"> <p style="">{{ route.params.menu_name }}</p> </p> 
    

        
    </p>

    <div v-if="!noProducts" class="grid p-1 pb-8" style="max-width: 900px;margin: auto;" >
    
    
    
   
    
    
        <div v-for="(product, index) in products" :key="product.id" class=" col-12 md:col-4 lg:col-3 sm:col-6">
    
                <TarjetaMenu  @update="getProducts()" style="width: 100%;" :id="`tarjeta-${index}`"  :product="product"></TarjetaMenu>
        </div>
    
    
    
    
    </div>
    

    <p style="font-weight: bold;" class="text-4xl text-center my-8 p-0" v-else>
        Selecciona una sede y una categoria.
    </p>
    
</div>

   

    
</template>

<script setup>
import { onMounted,ref,watch } from 'vue'
import {productService} from '@/service/ProductService'
import TarjetaMenu from '@/components/TarjetaMenu.vue'
import { useRoute } from 'vue-router'
import dialogEditProduct from '../dialogEditProduct.vue'
import dialogAddProduct from '../dialogAddProduct.vue'
import dialogDeleteProduct from '../dialogDeleteProduct.vue'
import { useSitesStore } from '@/store/site'
import dialogGestorCategorias from '../dialogGestorCategorias.vue'
// import { nextTick } from 'vue'
import { siteService } from '@/service/siteService'
import { nextTick } from 'vue';

const siteStore = useSitesStore()
const route = useRoute()
const products = ref([])
const noProducts = ref (false)




onMounted( async () => {
    getProducts()
})



const renderComponent = ref(true);

const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

    // Wait for the change to get flushed to the DOM
    await nextTick();

    // Add the component back in
  renderComponent.value = true;
};




const getProducts = async()=> {
    // products.value = []
    let category_id = route.params.category_id
    let site_id = siteStore.site.site_id;
    setTimeout(async() => {
        products.value = await productService.getProductsByCategorySite(category_id,site_id)

    }, 2000);
    
}




const actualiza = async() => {
// const { proxy } = getCurrentInstance()
  await getProducts()


  
}


watch(() => route.params.category_id, async () => {
   
        getProducts();
    
},{deep:true});


watch(() => siteStore.site, async () => {
    if(siteStore.site){
        getProducts();
    await nextTick(); 
    }
},{deep:true});


watch(() => siteStore.update, async () => {
    
    getProducts()
},{deep:true});

</script>