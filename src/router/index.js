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
    component: () => import(/* webpackChunkName: "sankey" */ '../views/ESankey.vue')
  },
  {
    path: '/diagnosis_1',
    name: 'Diagnosis1',
    component: () => import(/* webpackChunkName: "echartone" */ '../views/EChartOne.vue'),
    props: { chart_key: 'diagnosis1' }
  },
  {
    path: '/diagnosis_2',
    name: 'Diagnosis2',
    component: () => import(/* webpackChunkName: "echartone" */ '../views/EChartOne.vue'),
    props: { chart_key: 'diagnosis2' }
  },
  {
    path: '/diagnosis_3',
    name: 'Diagnosis3',
    component: () => import(/* webpackChunkName: "echartone" */ '../views/EChartOne.vue'),
    props: { chart_key: 'diagnosis3' }
  },
  {
    path: '/diagnosis_4',
    name: 'Diagnosis4',
    component: () => import(/* webpackChunkName: "echartone" */ '../views/EChartOne.vue'),
    props: { chart_key: 'diagnosis4' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
