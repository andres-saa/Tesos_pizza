<template>
    <div class="col-12 px-2 my-0  p-0" style="margin-top: 6rem;">



        <h4 class="title" style="">Finalizar compra</h4>
        <div class="grid mx-auto " style="max-width:800px;">




            <div class="col-12 md:col-6 p-1 md:px-4" style="display: flex; flex-direction: column; gap:.6rem;">


                <div style=" display: flex; gap: 1rem;align-items: center;">
                    <h6 class="m-0">METODO DE PAGO</h6>
                    <Tag v-if="user.user.payment_method_option" style="width: min-content;" severity="success">Listo
                    </Tag>

                </div>

                <div class="flex flex-wrap align-items-center mb-2 gap-2" style="width: 100%;">
                    <!-- <label for="username" class="p-sr-only">Username</label> -->
                    <!-- <InputNumber v-model="user.user.payment_method_option" style="width: 100%;" id="username" placeholder="METODO DE PAGO" invalid /> -->


                    <Select v-model="user.user.payment_method_option" style="width: 100%;" id="username"
                        placeholder="Selecciona un metodo de pago" invalid :options="payment_method_options"
                        optionLabel="name">
                    </Select>
                </div>


                <div style=" display: flex; gap: 1rem;align-items: center;">
                    <h6 class="m-0">BARRIO</h6>
                    <Tag v-if="siteStore.location.neigborhood.name" style="width: min-content;" severity="success">Listo
                    </Tag>

                </div>

                <div class="flex flex-wrap align-items-center mb-2 gap-2" style="width: 100%;">
                    <!-- <label for="username" class="p-sr-only">Username</label> -->

                    <InputText @click="siteStore.setVisible('currentSite', true)"
                        :modelValue="siteStore.location.neigborhood?.name" style="width: 100%;" id="username"
                        placeholder="Selecciona un barrio" invalid readonly />
                </div>


                <div v-if="siteStore.location.neigborhood.delivery_price > 0" style=" display: flex; gap: 1rem;align-items: center;">
                    <h6 class="m-0">DIRECCION</h6>
                    <Tag v-if="user.user.address" style="width: min-content;" severity="success">Listo</Tag>

                </div>

                <div v-if="siteStore.location.neigborhood.delivery_price > 0"  class="flex flex-wrap align-items-center mb-2 gap-2" style="width: 100%;">
                    <!-- <label for="username" class="p-sr-only">Username</label> -->
                    <InputText @click="siteStore.setVisible('currentSite', true)"  v-model="user.user.address" style="width: 100%;" id="username"
                        placeholder="Escribe tu direccion" invalid />
                </div>

                <div style=" display: flex; gap: 1rem;align-items: center;">
                    <h6 class="m-0">NOMBRE</h6>
                    <Tag v-if="user.user.name" style="width: min-content;" severity="success">Listo</Tag>

                </div>

                <div class="flex flex-wrap align-items-center mb-2 gap-2" style="width: 100%;">
                    <!-- <label for="username" class="p-sr-only">Username</label> -->
                    <InputText style="width: 100%;" id="username" placeholder="Escribe tu nombre"
                        v-model="user.user.name" invalid />
                </div>


                <div style=" display: flex; gap: 1rem;align-items: center;">
                    <h6 class="m-0">TELEFONO</h6>
                    <Tag v-if="user.user.phone_number" style="width: min-content;" severity="success">Listo</Tag>

                </div>
                <!-- {{ siteStore.visibles }} -->



                <div class="flex flex-wrap align-items-center mb-2 gap-2" style="width: 100%;">
                    <!-- <label for="username" class="p-sr-only">Username</label> -->
                    <!-- <p>El telefono debe estar disponible en WhatsApp para validar el pedido <img style="width: 1.5rem;" src="/images/WhatsApp.svg.webp" alt=""></p>  -->
                    <InputMask v-model="user.user.phone_number" style="width: 100%;" id="basic" mask="999 999 9999"
                        placeholder="Escribe tu telefono" />
                </div>


                <div style=" display: flex; gap: 1rem;align-items: center;">
                    <h6 class="m-0">NOTAS</h6>
                    <Tag v-if="store.cart.order_notes" style="width: min-content;" severity="success">Listo</Tag>

                </div>

                <Textarea v-model="store.cart.order_notes" style="height: 8rem;resize: none;"
                    placeholder="Deja una nota para la cocina:"></Textarea>



            </div>

            <resumen class="md:col-6"></resumen>




        </div>
    </div>

</template>


<script setup>
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import resumen from './resumen.vue';
import { usecartStore } from '@/stores/shoping_cart';

import { useSitesStore } from '@/stores/site';
import { useUserStore } from '@/stores/user';
import { paymentMethodService } from '@/service/restaurant/paymentMethodService';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import InputMask from 'primevue/inputmask';
import Tag from 'primevue/tag';

const store = usecartStore()
const siteStore = useSitesStore()
const use = ref(0)
const user = useUserStore()

const payment_method_options = ref([])

onMounted(async () => {
    payment_method_options.value = await paymentMethodService.getPaymentMethods()

    if (user.user.payment_method_option?.id != 7)
        siteStore.setNeighborhoodPrice()
    else {
        siteStore.setNeighborhoodPriceCero()

    }



})


watch(() => user.user.payment_method_option, (new_val) => {

    if (new_val.id == 7) {
        siteStore.current_delivery = siteStore.location.neigborhood.delivery_price
        siteStore.location.neigborhood.delivery_price = 0
    } else {
        siteStore.setNeighborhoodPrice()
    }
})




</script>


<style scoped>

.led {
    animation: cambiaColor 1s infinite;
    /* 3s de duración, animación infinita */
}




.title {
    margin: 0;
    padding: 0;
    font-family: "Luckiest Guy", cursive;
    letter-spacing: .1cap;
    width: 100%;
    text-align: center;
    margin: 2rem 0;
    font-size: 3rem;
    color: var(--primary-color);
    transition: all ease .3s;
}


@media (width < 900px) {
    .title {
        font-size: 2rem;
    }
}

h2:hover {
    transform: scale(1.1);

}


.name-product::first-letter {
    text-transform: uppercase;
}

img {
    border-radius: 50%;
}

.domi-name {
    text-transform: capitalize;
}

.descripcion::first-letter {
    text-transform: uppercase;
}

@keyframes cambiaColor {
    0% {
        background-color: rgb(0, 0, 0);
    }

    50% {
        background-color: rgb(30, 255, 0);
    }

    100% {
        background-color: var(--primary-color);
    }
}

.triangulo {
    width: 0;
    height: 0;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 2rem solid #ffede1;
    /* Altura del triángulo dependiendo del ancho */
    transform: rotate(-65deg);
    position: absolute;
    top: -1rem;
    left: -1.2rem;
}


.container {
    background-color: rgb(0, 0, 0);
}

.fixed {
    position: fixed;
    width: 25%;
}

.scrollit {
    float: left;
    width: 71%
}

.sumary {
    /* background-color: green; */
}

.izq {
    /* width: 100%; */

}

*:focus {
    /* outline: none; */
}


.contenedor-producto {
    align-items: center;
    border-radius: .5rem;
    overflow: hidden;
    height: 7rem;
    position: relative;
}

@media (max-width: 991px) {
    .contenedor-producto {
        /* background-color: #ffffffea;align-items: center;border-radius: rem;overflow: hidden;height: 7rem;position: relative; */
    }
}

.nombre-sesion {
    font-weight: bold;
    /* width: auto; */
    border-radius: 5rem;
}

.contenedor-principal {
    /* border-radius: 2rem; */
    /* position: sticky */
    /* top: 100px; */
    /* margin-bottom: 10rem; */
    /* background-color: var(--primary-color); */
    /* height: auto; */
}


.producto {
    border-bottom: 2px solid #00000020;
}



.cantidad:focus-visible {
    outline: none;

}

.imagen {
    height: 100px;
    object-fit: contain;
}

.contador {
    background-color: white;
    /* height: 3rem;  */

    display: flex;
    border-radius: 0.1rem;
    padding: 0.1rem 1rem;
    /* border: 1px solid var(--primary-color); */
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.274);
    /* bottom: 0.5rem; */
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: 8rem;
    height: 2.5rem;

}

i {
    font-weight: bold;
}

i:hover {
    color: var(--primary-color);
}

button:hover {
    cursor: pointer;
}

@media (min-width: 768px) and (max-width: 991px) {
    .clase {
        /* background-color: red; */
        min-width: 720px;
    }
}

@media (min-width: 1200px) and (max-width: 1920px) {
    .clase {
        /* background-color: red; */
        min-width: 1024px;

    }

    .productos-scroll {
        overflow-y: auto;
        border-radius: 2rem;
        /* height: 80vh; */
        overflow-y: auto;
        /* max-height: 720px */
    }
}

::-webkit-scrollbar {
    width: 1rem;
    /* Ancho de la barra de desplazamiento */
    padding-top: 1rem;
    position: absolute;
    display: none;
}

.clase {}



/* 
* {
    text-transform: lowercase;
} */

*::first-letter {
    text-transform: uppercase;
}



/* Estilo del pulgar de la barra de desplazamiento */
/* WebKit (Chrome, Safari) */
::-webkit-scrollbar-thumb {
    background-color: rgb(255, 0, 0);
    /* Color del pulgar de la barra de desplazamiento */
    border-radius: 9px;
    border: 5px solid var(--primary-color);
    height: 10rem;
    width: 10rem;
    /* display: none;  */
}
</style>