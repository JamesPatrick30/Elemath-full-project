import { createRouter, createWebHistory } from 'vue-router'
import landingpage from '@/views/landingpage.vue'
import terms from '@/views/terms.vue'
import signin from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import studentDashboard from '@/views/student-ui/studentDashboard.vue'
import waitingLobby from '@/views/student-ui/game/waitingLobby.vue'
import studentSetting from '@/views/student-ui/setting.vue'
import testarea from '@/views/student-ui/game/testarea.vue'
import donegame from '@/views/student-ui/game/donegame.vue'
import dashboard2 from '@/views/student-ui/dashboard2.vue'
import settings from '@/views/student-ui/settings.vue'
import report from '@/views/student-ui/settingsfolder/report.vue'
import practicemode from '@/views/student-ui/game/practicemode.vue'
import donePractice from '@/views/student-ui/game/donePractice.vue'
import dashboard3 from '@/views/student-ui/dashboard3.vue'
import studentGrade from '@/views/student-ui/studentGrade.vue'
import history from '@/views/student-ui/history.vue'

import teacherSetting from '@/views/teacher-ui/setting.vue'
import windowCard from '@/views/teacher-ui/game/windowCard.vue'
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
import basicInfo from '@/views/student-ui/settingsfolder/basicInfo.vue'

import uploadd from '@/views/admin-ui/uploadd.vue'
import notfound from '@/views/notfound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/sg',
      name: 'student-grade',
      component: studentGrade
    },
    {
      path: '/dashboard3',
      name: 'dashboard3',
      component: dashboard3
    },
    {
      path: '/terms',
      name: 'terms',
      component: terms
    },
    {
      path:'/dp',
      name:'donePractice',
      component:donePractice
    },
    {
      path:'/pm',
      name:'practicemode',
      component:practicemode
    },
    {
      path:'/uploadd',
      name:'uploadd',
      component:uploadd
    },
    {
      path:'/bs',
      name:'basicInfo',
      component :basicInfo
    },
    {
      path:'/wc',
      name:'window-card',
      component:windowCard
    },
    {
      path:'/stt',
      name:'tsetting',
      component:teacherSetting
    },
    {
      path:'/r',
      name:'reports',
      component:report
    },
    {
      path:'/ds',
      name:'dash2',
      component:dashboard3
    },
    {
      path:'/rev',
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
      name: 'settings',
      component: settings
    },
    {
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
    },
    {
      path: '/404',
      name: 'NotFound',
      component: notfound
    },
    // 👇 this will catch ANY unknown path and redirect to /404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }

  ],
})

export default router
