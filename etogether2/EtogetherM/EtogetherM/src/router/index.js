import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../components/pages/homepage/homepage.vue'
import contest from '../components/pages/contest/contest.vue'
import specialManageHome from '../components/pages/specialManage/specialManageHome.vue'
import specialManageReview from '../components/pages/specialManage/specialManageReview.vue'
import specialManageCompa from '../components/pages/specialManage/specialManageCompa.vue'
import addcontest from '../components/pages/contest/addcontest.vue'
import course from '../components/pages/course/course.vue'
import addcourse from '../components/pages/course/addcourse.vue'
import notice from '../components/pages/notice/notice.vue'
import addnotice from '../components/pages/notice/addnotice.vue'
import project from '../components/pages/project/project.vue'
import addproject from '../components/pages/project/addproject.vue'
import user from '../components/pages/user/user.vue'
import changeKey from '../components/pages/changeKey/changeKey.vue'
import contestDetail from '../components/pages/homepage/contestDetail.vue'
import contestDetailList from '../components/pages/homepage/contestDetailList.vue'
import alluser from '../components/pages/user/alluser.vue'
import allmanager from '../components/pages/user/allmanager.vue'
import addmanager from '../components/pages/user/addmanager.vue'
import changeM from '../components/pages/user/changeM.vue'
import banner from '../components/pages/banner/banner.vue'
import articleDetail from '../components/common/articleDetail.vue'
import questionDetail from '../components/common/questionDetail.vue'
import modifyContest from '../components/pages/contest/modifyContest.vue'
import addContestDetail from '../components/pages/contest/addContestDetail.vue'
import login from '../components/pages/login/login.vue'
import addPaper from '../components/pages/contest/addPaper.vue'
import teaANDstu from '../components/pages/homepage/teaANDstu.vue'
import addscore from '../components/pages/contest/addscore.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name: 'login',
      component:login
    },
    {
      path:'/addscore',
      name: 'addscore',
      component:addscore
    },
    {
      path:'/teaANDstu',
      name: 'teaANDstu',
      component:teaANDstu
    },
    {
      path:'/addPaper',
      name: 'addPaper',
      component:addPaper
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/addContestDetail',
      name: 'addContestDetail',
      component: addContestDetail
    },
    {
      path: '/modifyContest',
      name: 'modifyContest',
      component: modifyContest
    },
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component:  questionDetail
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: articleDetail
    },
    {
      path: '/banner',
      name: 'banner',
      component: banner
    },
    {
      path: '/contest',
      name: 'contest',
      component: contest
    },
    {
      path: '/addcontest',
      name: 'addcontest',
      component: addcontest
    },
    {
      path: '/changeM',
      name: 'changeM',
      component: changeM
    },
    {
      path: '/course',
      name: 'course',
      component: course
    },
    {
      path: '/addcourse',
      name: 'addcourse',
      component: addcourse
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/addnotice',
      name: 'addnotice',
      component: addnotice
    },
    {
      path: '/project',
      name: 'project',
      component: project
    },
    {
      path: '/addproject',
      name: 'addproject',
      component: addproject
    },
    
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/alluser',
      name: 'alluser',
      component: alluser
    },
    {
      path: '/allmanager',
      name: 'allmanager',
      component: allmanager
    },
    {
      path: '/addmanager',
      name: 'addmanager',
      component: addmanager
    },
    {
      path: '/changeKey',
      name: 'changeKey',
      component: changeKey
    },
    {
      path: '/contestDetail',
      name: 'contestDetail',
      component: contestDetail
    },
    {
      path: '/contestDetailList',
      name: 'contestDetailList',
      component: contestDetailList
    },
    {
      path: '/specialManageHome',
      name: 'specialManageHome',
      component: specialManageHome
    },
    {
      path: '/specialManageReview',
      name: 'specialManageReview',
      component: specialManageReview
    },
    {
      path: '/specialManageCompa',
      name: 'specialManageCompa',
      component: specialManageCompa
    }
  ]
})
