import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tree',
    name: 'Tree',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tree.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import(/* webpackChunkName: "lists" */ '../views/Lists.vue')
  },
  {
    path: '/runsingle',
    name: 'Runsingle',
    component: () => import(/* webpackChunkName: "runsingle" */ '../views/RunSingle.vue')
  },
  {
    path: '/icons',
    name: 'Icons',
    component: () => import(/* webpackChunkName: "icons" */ '../views/Icons.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue')
  },
  {
    path: '/multitree',
    name: 'MultiTree',
    component: () => import(/* webpackChunkName: "multitree" */ '../views/MultiTree.vue')
  },
  {
    path: '/inputform',
    name: 'InputForm',
    component: () => import(/* webpackChunkName: "inputform" */ '../views/InputForm.vue')
  },
  {
    path: '/diagnosis_all',
    name: 'DiagnosisAll',
    component: Home
  },
  {
    path: '/diagnosis_1',
    name: 'Diagnosis1',
    component: Home
  },
  {
    path: '/diagnosis_2',
    name: 'Diagnosis2',
    component: Home
  },
  {
    path: '/diagnosis_3',
    name: 'Diagnosis3',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
