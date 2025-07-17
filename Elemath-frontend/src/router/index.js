import { createRouter, createWebHistory } from 'vue-router'
import landingpage from '@/views/landingpage.vue'
import signin from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import studentDashboard from '@/views/student-ui/studentDashboard.vue'
import waitingLobby from '@/views/student-ui/waitingLobby.vue'

import setting from '@/views/teacher-ui/setting.vue'
import teacberDashboard from '@/views/teacher-ui/teacber-dashboard.vue'
import teacherCreateClass from '@/views/teacher-ui/teacher-createClass.vue'
import teacherUi from '@/views/teacher-ui/teacher-ui.vue'
import questionMaker from '@/views/teacher-ui/questionMaker.vue'
import signInSucess from '@/views/teacher-ui/signInSucess.vue'
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
      path: '/sd',
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
    },
    {
      path: '/tc',
      name: 'teacher-create-class',
      component: teacherCreateClass
    },
    {
      path: '/wl',
      name: 'waiting-lobby',
      component: waitingLobby
    },
    {
      path: '/ts',
      name: 'setting',
      component: setting
    },
    {
      path: '/signInSucess',
      name: 'signInSucess',
      component: signInSucess

    }

  ],
})

export default router
