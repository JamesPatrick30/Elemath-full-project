import { createRouter, createWebHistory } from 'vue-router'
import landingpage from '@/views/landingpage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: landingpage,
    },

  ],
})

export default router
