import { createRouter, createWebHistory } from 'vue-router'
import landingpage from '@/views/landingpage.vue'
import signin from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import studentDashboard from '@/views/student-ui/studentDashboard.vue'
import waitingLobby from '@/views/student-ui/game/waitingLobby.vue'
import studentSetting from '@/views/student-ui/setting.vue'
import testarea from '@/views/student-ui/game/testarea.vue'
import donegame from '@/views/student-ui/game/donegame.vue'

import setting from '@/views/teacher-ui/setting.vue'
import teacberDashboard from '@/views/teacher-ui/teacber-dashboard.vue'
import teacherCreateClass from '@/views/teacher-ui/teacher-createClass.vue'
import teacherUi from '@/views/teacher-ui/teacher-ui.vue'
import questionMaker from '@/views/teacher-ui/game/questionMaker.vue'
import classPage from '@/views/teacher-ui/classPage.vue'
import classCreate from '@/views/teacher-ui/createClass.vue'
import signGoogle from '@/views/signGoogle.vue'
import Analytics from '@/views/teacher-ui/Analytics.vue'
import addlist from '@/views/admin-ui/addlist.vue'
import Grade from '@/views/teacher-ui/Grade.vue'
import leaderboard from '@/views/teacher-ui/game/leaderboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'rev',
      name:'rev',
      component:donegame
    },
    {
      path: '/l',
      name: 'leaderboard',
      component: leaderboard
    },
    {
      path : '/test',
      name : 'testarea',
      component: testarea
    },
    {
      path :'/g',
      name:'grade',
      component:Grade
    },
    {
      path: '/an',
      name : 'Analytics',
      component: Analytics
    },
    {
      path : '/ad',
      name : 'addlist',
      component: addlist
    },
    {
      path:'/c',
      name: 'classPage',
      component: classPage
    },
    
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
    ,{
      path: '/sign-google',
      name: 'signGoogle',
      component: signGoogle
    
    },
    {
      path: '/cc',
      name: 'createClass',
      component: classCreate
    },

    {
      path:'/ss',
      name: 'student-setting',
      component:studentSetting
    }

  ],
})

export default router
