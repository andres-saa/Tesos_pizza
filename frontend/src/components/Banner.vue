<template>

    <div class="banner-container" style="">

        <Button class="button next" style=" right: 0;
    border-radius: 50% 0 0 50%;">
            <i class="pi pi-angle-right"></i>
        </Button>
        <img src="https://www.allrecipes.com/thmb/9Q9LUDJXEEJ5o3P9G48iN7bFrRQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-2x1-bdc59852305a41cf8f98c6c15e8b540c.jpg"
            alt="">
        <Button style=" left: 0;
    border-radius: 0 50% 50% 0;" class="button preview">
            <i class="pi pi-angle-left"></i>
        </Button>
    </div>

</template>
<style scoped>
img {
    width: 100%;
    object-fit: cover;
    max-height: 50vh;
}
</style>

<script setup>
import Button from 'primevue/button';

</script>




<style scoped>
.banner-container {
    display: flex;
    align-items: center;
    position: relative;
    /* margin-right: 2.5rem; */
    margin-top: 0rem;
}

.button {
    position: absolute;
    border-radius: 0;
    background-color: #cd1f3080;
    border: none;

    aspect-ratio: 1 / 1;
}

.button:hover {
    border: none !important;
    background-color: var(--primary-color) !important;
}

i {
    color: #fff;
    font-size: 1.5rem;
    opacity: 1;
}

.next {}

.preview {}
</style>
