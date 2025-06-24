import { createRouter, createWebHistory } from 'vue-router'
import landingpage from '@/views/landingpage.vue'
import signin from '@/views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: landingpage,
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    }

  ],
})

export default router
