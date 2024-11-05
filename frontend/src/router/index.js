import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../AppLayout/AppLayout.vue'),
      children: [
        {
          path: '/',
          name: 'main',
          component: () => import('../views/home.vue'),
        },
        {
          path: '/categoria/:category_name/:category_id',
          name: 'categoria',
          component: () => import('../views/CategoryView.vue'),
        },
        {
          path: '/carta',
          component: () => import('../views/carta.vue'),
        },
        {
          path: '/rastrear',
          component: () => import('../views/Rastrear.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('@/views/cart.vue'),
        },

        {
          path: '/pay',
          name: 'pay',
          component: () => import('@/views/pay.vue'),
        },

        {
          path: '/gracias',
          name: 'gracias',
          component: () => import('@/views/gracias.vue'),
        },
      ],
    },
  ],
})

export default router
