<template>
    <!-- {{ store.currentProduct }} -->

    <div v-if="renderComponent" @mouseover=" () => house = true" @mouseleave="() => house = false" class="container shadow-2 col-12 shadow-2 p-3" style="border-radius: 0.5rem;background-color: white; height: 100%;position: relative;">

        <div style="display: flex; position: absolute; right: -1rem; top: -1rem; gap: 0.2rem;z-index: 9;">
            


           

            <Button 
                v-if="props.product.is_combo"
                
                class="shadow-2" 
                @click="setMainProduct(props.product.product_id)" 
                severity="info" 
                style="font-weight: bold; height: 2rem; border-radius: 10rem; right: 0; top: 0;" 
                rounded
                label="Combo"
                icon="pi pi-star ">
            </Button>
            



            <Button   :class="anim[house]" class="shadow-2" @click="prepareToDelete(props.product)" severity="danger" style=" width: 2rem;height: 2rem; right: 0;top: 0;border-radius: 50%;" rounded
                icon="pi pi-times"></Button>

                

            <Button    :class="anim[house]" class="shadow-2" @click="prepareToEdit(props.product)" severity="warning" style="font-weight: bold;width: 2rem;height: 2rem;border-radius: 50%;  right: 0;top: 0;" rounded
                icon="pi pi-pencil"></Button>


                
                <Button 
                v-if=" props.product.main" 
                class="shadow-2" 
                
               
                severity="success" 
                style="font-weight: bold; width: 2rem; height: 2rem; border-radius: 50%; right: 0; top: 0;" 
                rounded
                icon="pi pi-home">
            </Button>

        </div>


        <div class="imagen3" style="overflow: hidden;">

            <img     :class="loaded? 'cargado': 'sin-cargar'" class=""
                style="width: 100%;aspect-ratio: 1 / 1; background-color: rgb(255, 255, 255);object-fit: cover; border-radius: 0.2rem;"
                :src="src" alt=""
                >

                

                


        </div>

        <div class="texto" style="">
            <div style="display: flex;gap: 1rem; height: 100%; flex-direction: column;justify-content: space-between;">

                <div style="display: grid;grid-template-columns: auto auto; width: 100%; justify-content: space-between; align-items: center;">
                    <span>
                        <b style="text-transform: uppercase;">
                            {{ props.product.product_name }}
                        </b>
                    </span>
                    <Button class="elipsis" text style="color: black;" icon="pi pi-ellipsis-v p-0 text-xl" />




                </div>

                <span>
                    {{ truncatedDescription?.toLocaleLowerCase() }}
                </span>

                <div style="display: flex;justify-content: space-between; align-items: c;">

                    <!-- {{ props.pr }} -->

                    <!-- <Button icon="pi pi-heart text-2xl" text rounded style="color: red;"/> -->
                    <InputSwitch    v-model="props.product.status"
                        @update:modelValue="updateProductStatus(props.product.status)" />

                  
                    <div style="display: flex; align-items: center;gap: 1rem;">
                        <span class="text-xl"><b>{{ formatoPesosColombianos(props.product.price) }}</b> </span>

                    </div>

                </div>

            </div>


        </div>


        <!-- <Button  style="position: absolute; right: -1rem; top:-1rem;" @click="addToCart(props.product)" severity="danger"  rounded icon="pi pi-plus text-xl fw-100"/> -->


    </div>
</template>
    
<script setup>

import { formatoPesosColombianos } from '../service/formatoPesos'
import { computed,ref, watch } from 'vue';
import { productService } from '../service/ProductService';

import { useProductStore } from '../store/productStore';
import { URI } from '../service/conection';
import { useSitesStore } from '../store/site';
import { nextTick } from 'vue';
const emit = defineEmits(['update'])


const store = useProductStore()


const anim = {
    true:'entrar',
    false:'salir'
}




const renderComponent = ref(true);

const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

    // Wait for the change to get flushed to the DOM
    await nextTick();

    // Add the component back in
  renderComponent.value = true;
};




const house = ref(false)

const props = defineProps({
    product: {
        type: Object,
        default: {}
    },


});


watch( () => props.product.img_identifier, () => {
    forceRerender()
})

const src = computed(() => `${URI}/read-photo-product/${props.product.img_identifier}/600?update=${siteStore.update}`);

const loaded = ref(false);

const see = () => {
    loaded.value = true;
};


const prepareToEdit = (product) => {
    store.visibles.dialogEditProduct = true
    store.currentProductToEdit = product
}


const setMainProduct = async (productId) => {

    props.product.main = true
    try {
        const response = await fetch(`${URI}/set-main-product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Producto principal actualizado:', result);

        // Opcional: Actualizar el estado local o la tienda para reflejar el cambio
        // Por ejemplo, puedes emitir un evento, recargar los productos o actualizar el estado del producto actual
        // store.fetchProducts(); // Si tienes una función para recargar productos
        // store.currentProduct = result; // Actualizar el producto actual si corresponde
        // location.reload()

        emit('update')


    } catch (error) {
        console.error('Error al establecer el producto principal:', error);
        // Opcional: Mostrar una notificación de error al usuario
    }
};


const siteStore = useSitesStore()



const prepareToDelete = (product) => {
    store.visibles.dialogDeleteProduct = true
    store.currentProductToDelete = product
}


const updateProductStatus = async (newStatus) => {
    try {
        const response = await productService.updateProductInstanceStatus(props.product.id, newStatus);
        if (response) {
            console.log('Status updated:', response);
        }
    } catch (error) {
        console.error('Failed to update status:', error);
    }
};

const truncatedDescription = computed(() => {
    const description = props.product.product_description;
    return description.substring(0, 100) + '...'
});

const imagenError = (Event) => {
    Event.target.src = 'https://salchimonster.com/images/logo.png';
}





</script>
    


    
    
<style scoped>
.container {
    display: grid;
    gap: 1rem;
    /* Spacing between grid items */
    grid-template-columns: 1fr;

    margin: 0;
    padding: 1rem;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    border-radius: 0.5rem 0.5rem 1.4rem 0.6rem;
}

.elipsis{
        display: none;
    }
/* Responsive adjustments */
@media (max-width: 576px) {
    .container {
        grid-template-columns: 1fr 2fr;
        width: 100%;
        
        /* 1:2 ratio for image to details */
        /* Stack elements vertically on smaller screens */
    }
    .elipsis{
        display: inline;
    }

    .imagen3,
    .texto {
        width: 100%;
        /* Ensure full width on smaller screens */
    }
}

.imagen3 img {
    width: 100%;
    height: auto;
    /* Maintain aspect ratio */
    background-color: #fff;
    object-fit: contain;
    border-radius: 0.2rem;
}

.texto {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.rating {
    width: 1rem;
    /* Adjust based on your design */
}


@keyframes fadeIn {
    from {
       opacity: 0;
        transform: translateY(-100px);
        /* transform: scale(.5); */
        /* background-color: rgb(255, 255, 0); */
        /* filter: blur(1px); */
    }
    to {
        opacity: 1;
        /* filter: blur(1px); */

    }
}

.cargado {
    opacity: 0; /* Inicialmente invisible */
    animation: fadeIn .1s ease-out forwards; /* Duración de 1 segundo, 'ease-out' para desacelerar hacia el final, y 'forwards' para mantener el estado final visible */
}



.entrar {
  animation: entrarcorto 0.2s forwards;
  opacity: 0;
}

.salir {
    opacity: 0;
  animation: salircorto 0.2s forwards;
}

@media (width < 600px) {

  .salir {
  animation: salir 0.3s forwards;
  }

  .entrar {
    animation: entrar 0.2s forwards;
  }

  
}

@keyframes entrar {

  0% {
        transform: translateY(-50vw) scale(0.5);
        opacity: 0;
    }

    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
  
}

@keyframes salir {

0% 

  {
      transform: translateX(0) scale(1);
      opacity: 1;
  }

  100% {
      transform: translateX(50vw) scale(0.5);
      opacity: 0;
  }

}



@keyframes entrarcorto {

0% {
      transform: translateX(-10vw) scale(0.5);
      opacity: 0;
  }

  100% {
      transform: translateX(0) scale(1);
      opacity: 1;
  }

}
.imagen {
  animation: saltitos .5s linear infinite;
  border-radius: 50%;
  /* opacity: 0; */

}


@keyframes saltitos {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-30px); /* Salto hacia arriba */
  }
  50% {
    transform: translateY(0); /* Vuelve a la posición original */
  }
  65% {
    transform: translateY(-15px); /* Rebote pequeño */
  }
  100% {
    transform: translateY(0); /* Termina en reposo */
  }
}



@keyframes salircorto {

0% 

{
    transform: translateY(0) scale(1);
    opacity: 1;
}

100% {
    transform: translateY(10vw) scale(0.5);
    opacity: 0;
}

}

/* Add additional styles for buttons, text, etc., as needed */
</style>
    
    
    