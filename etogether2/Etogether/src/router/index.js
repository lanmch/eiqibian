import Vue from 'vue'
import Router from 'vue-router'

import homePage from '../components/pages/homePage/homePage'
import articleDetails from '../components/pages/homePage/articleDetails'
import billZone from '../components/pages/billZone/billZone'
import testDistribution from '../components/pages/billZone/testDistribution'
import testPlan from '../components/pages/billZone/testPlan'
import testNotes from '../components/pages/billZone/testNotes'
import testRegister from '../components/pages/billZone/testRegister'
import specialRegist from '../components/pages/billZone/specialRegist'
import attachmentNotice from '../components/pages/billZone/attachmentNotice'
import testRegisterCap from '../components/pages/billZone/testRegisterCap'
import testRegisterMem from '../components/pages/billZone/testRegisterMem'
import stimulationTest from '../components/pages/billZone/stimulationTest'
import stimulationTestResult from '../components/pages/billZone/stimulationTestResult'
import scoreInquiry from '../components/pages/scoreInquiry/scoreInquiry'
import scoreResult from '../components/pages/scoreInquiry/scoreResult'
import onProgramming from '../components/pages/onProgramming/onProgramming'
import chooseProgram from '../components/pages/onProgramming/chooseProgram'
import courseCenter from '../components/pages/courseCenter/courseCenter'
import courseDetail from '../components/pages/courseCenter/courseDetail'
import downloadCenter from '../components/pages/downloadCenter/downloadCenter'
import downloadContent from '../components/pages/downloadCenter/downloadContent'
import login from '../components/pages/login/login'

import register from '../components/pages/register/register'
import registerStu from '../components/pages/register/registerStu'
import registerTea from '../components/pages/register/registerTea'
import search from '../components/pages/search/search'
import review from '../components/pages/review/review'
import personalInfo from '../components/pages/personalInfo/personalInfo.vue'
Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/articleDetails',
      name: 'articleDetails',
      component: articleDetails
    },
    {
      path: '/testDistribution',
      name: 'testDistribution',
      component: testDistribution
    },
    {
      path: '/billZone',
      name: 'billZone',
      component: billZone
    },
    {
      path: '/testPlan',
      name: 'testPlan',
      component: testPlan
    },
    {
      path: '/testRegister',
      name: 'testRegister',
      component: testRegister
    },
    {
      path: '/specialRegist',
      name: 'specialRegist',
      component: specialRegist
    },
    {
      path: '/attachmentNotice',
      name: 'attachmentNotice',
      component: attachmentNotice
    },
    {
      path: '/testNotes',
      name: 'testNotes',
      component: testNotes
    },
    {
      path: '/testRegisterCap',
      name: 'testRegisterCap',
      component: testRegisterCap
    },
    {
      path: '/testRegisterMem',
      name: 'testRegisterMem',
      component: testRegisterMem
    },
    {
      path: '/stimulationTest',
      name: 'stimulationTest',
      component: stimulationTest
    },
    {
      path: '/stimulationTestResult',
      name: 'stimulationTestResult',
      component: stimulationTestResult
    },
    {
      path: '/scoreInquiry',
      name: 'scoreInquiry',
      component: scoreInquiry
    },
    {
      path: '/scoreResult',
      name: 'scoreResult',
      component: scoreResult
    },
    {
      path: '/onProgramming',
      name: 'onProgramming',
      component: onProgramming
    },
    {
      path: '/chooseProgram',
      name: 'chooseProgram',
      component: chooseProgram
    },
    {
      path: '/courseCenter',
      name: 'courseCenter',
      component: courseCenter
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: courseDetail
    },
    {
      path: '/downloadCenter',
      name: 'downloadCenter',
      component: downloadCenter
    },
    {
      path: '/downloadContent',
      name: 'downloadContent',
      component: downloadContent
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },

    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/registerStu',
      name: 'registerStu',
      component: registerStu
    },
    {
      path: '/registerTea',
      name: 'registerTea',
      component: registerTea
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: personalInfo
    },
    {
      path: '/review',
      name: 'review',
      component: review
    }
  ]
})
