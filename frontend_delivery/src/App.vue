<script setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import router from './router';
import { useOrderStore } from './store/order';
import { useSitesStore } from './store/site';
import { orderService } from './service/orderService';
import { URI } from './service/conection';
import { useReportesStore } from './store/reportes';


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



const sonido = new Audio('/sound/beep.mp3')
const acept = () => {
    notif.value = false
    sonido.play()
}
</script>

<template>
        <div
    class=""
    v-if="reportes.loading.visible"
    style="width: 100vw;transition: all ease .3s;backdrop-filter: blur(5px);  flex-direction: column;pointer-events:auto; background-color: #00000020; height: 100vh;position: fixed;display: flex;align-items: center;justify-content: center; left: 0;right: 0;z-index: 99999999;"
  >
  <div class="luz" style="aspect-ratio: 1  / 1;display: flex;justify-content: center;align-items: center;">

    <div class="girar" style="width: 150px;z-index: -1; height: 150px;padding: 3rem; background-color: var(--primary-color); position: absolute;"></div>
    <div class="imagen" style="display: flex;padding: 1rem;border-radius: .3rem; background-color: white;  gap: 1rem; flex-direction: column; align-items:center;">
      <img src="https://tezospizza.com/assets/logo-OWRhlFWd.webp" style="width:20vw ;max-width: 100px;" alt="">
      <h5 style="color: black;">Cargando...</h5>
    </div>
  </div>

  </div>

    <router-view class="col-12 p-0" />
</template>


<style scoped>



.girar{

animation: girar infinite .5s linear;

}



@keyframes girar {

100%{
  transform: rotate(360deg);
}

}
</style>