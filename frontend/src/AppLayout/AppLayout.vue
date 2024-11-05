<template>
    <div class="layout-container" style="min-width: 341px;">
        <app-topbar style="position: sticky;z-index: 999;left: 0;top: 0;" class="app-topbar"></app-topbar>
        <div class="side-bar"
            style="display: flex;margin: auto; height: 100%;gap: 1rem; align-items: start;max-width: 1920px;position: relative;">

            <div class="side-bar" v-if="route.path == '/'"
                style=" position: fixed;left: 0;top:3rem;bottom: 0rem;overflow: hidden; width: 20rem;background-color: white;box-shadow: 0 0 2rem #00000050;overflow-y: auto;z-index: 9;">
                <div style="height: 100%;overflow: auto;display: flex;align-items: start;">
                    <side-bar class="side-bar" style="z-index: 99;position: relative;top: 0;">
                    </side-bar>
                </div>

            </div>


            <div :style="store.side_bar_visible ? 'left:0' : 'left: -90%;'" class="movil-bar"
                style="position: fixed;z-index: 9999;background-color: #fff;top: 0;max-height: 100vh;overflow-y: auto;">
                <side-bar style="position: relative;top:0"> </side-bar>
            </div>


            <div class="view" :style="route.fullPath != '/' ? 'margin-left : 0' : ''"
                style="width: 100%; overflow: hidden;padding-bottom: 2rem;">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>

import AppTopbar from '@/components/AppTopbar.vue';
import Banner from '@/components/Banner.vue';
import SideBar from '@/components/SideBar.vue';
import { useSidebarStore } from '@/stores/sidebar';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute()
const store = useSidebarStore()


watch(() => route.path, () => {
    scrollToTop();
    // alert('ho')
});

// Función para realizar scroll al inicio de la página
const scrollToTop = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

};


</script>

<style scoped>
.layout-container {
    padding: 0rem;
    margin: 0;
}

.app-topbar {}

.movil-bar {
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.722);
}

@media (width > 900px) {




    .movil-bar {
        display: none;
    }




}

.view {
    margin-left: 20rem;
}


@media (width < 900px) {


    .view {
        margin-left: 0rem;
    }


    .side-bar {
        display: none;
    }

    .banner {
        padding-left: 1rem;
    }

}



@media (width < 1400px) {
    .banner {
        padding-right: 1rem;
    }
}


@media (width < 500px) {
    .banner {
        padding: 0rem;
    }
}

* {
    transition: all ease .3s;
}
</style>