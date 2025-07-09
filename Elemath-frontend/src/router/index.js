import { createRouter, createWebHistory } from 'vue-router'
import landingpage from '@/views/landingpage.vue'
import signin from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import studentDashboard from '@/views/studentDashboard.vue'

import teacberDashboard from '@/views/teacher-ui/teacber-dashboard.vue'
import teacherUi from '@/views/teacher-ui/teacher-ui.vue'
import questionMaker from '@/views/teacher-ui/questionMaker.vue'
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
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/student-dashboard',
      name: 'studentDashboard',
      component: studentDashboard
    },
    {
      path: '/t',
      name: 'teacher-dashboard',
      component: teacberDashboard
    },
    {
      path: '/th',
      name: 'teacher-ui',
      component :teacherUi
    },
    {
      path:'/qm',
      name:'question-ui',
      component: questionMaker
    }

  ],
})

export default router
