<script setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import router from './router';
import { useOrderStore } from './store/order';
import { useSitesStore } from './store/site';
import { orderService } from './service/orderService';
import { URI } from './service/conection';
import { useReportesStore } from './store/reportes';
import { categoriesService } from '@/service/restaurant/categoriesService';


const reportes = useReportesStore()

const sitestore = useSitesStore();
const store = useOrderStore();

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        alert('Las notificaciones están deshabilitadas. Por favor, habilite las notificaciones para obtener alertas en tiempo real.');
    }
};


const playNotificationSound = () => {

        store.Notification.play().then(() => {
            store.Notification.loop = true;

})
}

const stopNotificationSound = () => {
  
        store.Notification.loop = false; // Desactivar el bucle
        store.Notification.pause(); // Pausar la reproducción
        store.Notification.currentTime = 0; // Reiniciar el tiempo a 0

};


onMounted(() => {
    // requestNotificationPermission();

    actualiza()
    const fetchOrdersAndNotify = async () => {
        try {
            const site_id = sitestore.site.site_id;
            const order_response = await orderService.is_recent_order_generated(site_id);
            if (order_response) {
                 store.last_order_id != order_response?  await store.getTodayOrders() : ''
                    store.last_order_id = order_response;
                
                playNotificationSound();
                
            
            } else{
                stopNotificationSound()
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    
    const intervalId = setInterval(fetchOrdersAndNotify, 15000);    
    onUnmounted(() => {
        clearInterval(intervalId);
    });
});

const notif = ref(true)

const loadingClass = ref({
  true:'entrar',
  false:'salir'
})


const sonido = new Audio('/sound/beep.mp3')
const acept = () => {
    notif.value = false
    sonido.play()
}


const actualiza = async() => {
// const { proxy } = getCurrentInstance()


    const categoires = await categoriesService.getCategories()
    siteStore.categories = categoires


    siteStore.categories.push({
        category_name:'Adiciones',
        category_id:1000,
        products:[]
    })

    siteStore.categories.push({
        category_name:'Sabores',
        category_id:2000,
        products:[]
    })
    const { products } = categoires.find(c => c.category_id == route.params.category_id)
    siteStore.currentProducts = products
    // console.log(products)
;

}

</script>

<template>
    <div  style="width: 100vw;pointer-events: none; height: 100vh;position: fixed;display: flex;align-items: center;justify-content: center; left: 0;right: 0;z-index: 99999999;">
    
    <div :class="loadingClass[reportes.loading.visible]">
      <img class="imagen"  src="/images/logo.png" style="width:15vw ;max-width: 150px; " alt="">

    </div>
  </div>

    <router-view class="col-12 p-0" />
</template>


<style scoped>




.entrar {
  animation: entrarcorto 0.3s forwards;
  opacity: 0;
}

.salir {
  animation: salircorto 0.3s forwards;
  opacity: 0;
}

@media (width < 600px) {

  .salir {
  animation: salir 0.3s forwards;
  }

  .entrar {
    animation: entrar 0.3s forwards;
  }

  
}

@keyframes entrar {

  0% {
        transform: translateX(-50vw) scale(0.5);
        opacity: 0;
    }

    100% {
        transform: translateX(0) scale(1);
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
    transform: translateX(0) scale(1);
    opacity: 1;
}

100% {
    transform: translateX(10vw) scale(0.5);
    opacity: 0;
}

}

</style>