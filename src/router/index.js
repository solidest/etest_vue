import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import ESankey from '../views/ESankey.vue' 
import EChartOne from '../views/EChartOne.vue'
import EPanelView from '../views/EPanelView.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/custom1',
    name: 'custom1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EDialog.vue')
  },
  {
    path: '/custom2',
    name: 'custom2',
    component: EPanelView,
    props: { panel_id: "panels/panel01" }
  },
  {
    path: '/custom3',
    name: 'custom3',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/custom/EDialog1.vue')
  },
  {
    path: '/custom4',
    name: 'custom4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/custom/ETable1.vue')
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
    component: ESankey,
  },
  {
    path: '/diagnosis_1',
    name: 'Diagnosis1',
    component: EChartOne,
    props: { chart_key: 'diagnosis1' }
  },
  {
    path: '/diagnosis_2',
    name: 'Diagnosis2',
    component: EChartOne,
    props: { chart_key: 'diagnosis2' }
  },
  {
    path: '/diagnosis_3',
    name: 'Diagnosis3',
    component: EChartOne,
    props: { chart_key: 'diagnosis3' }
  },
  {
    path: '/diagnosis_4',
    name: 'Diagnosis4',
    component: EChartOne,
    props: { chart_key: 'diagnosis4' }
  },
  {
    path: '/zoom_data',
    name: 'Zoom_data',
    component: () => import(/* webpackChunkName: "zoomdata" */ '../views/EZoomData.vue'),
  },
  {
    path: '/analysis_base',
    name: 'Analysis_base',
    component: EChartOne,
    props: { chart_key: 'analysis_base'}
  },
  {
    path: '/analysis_histogram',
    name: 'Analysis_histogram',
    component: () => import(/* webpackChunkName: "analysis_histogram" */ '../views/EAnalysisHistogram.vue'),
  },
  {
    path: '/analysis_clustering',
    name: 'Analysis_clustering',
    component: () => import(/* webpackChunkName: "analysis_clustering" */ '../views/EAnalysisClustering.vue'),
  },
  {
    path: '/analysis_regression1',
    name: 'Analysis_regression1',
    component: () => import(/* webpackChunkName: "analysis_regression1" */ '../views/EAnalysisRegression1.vue'),
  },
  {
    path: '/analysis_regression2',
    name: 'Analysis_regression2',
    component: () => import(/* webpackChunkName: "analysis_regression2" */ '../views/EAnalysisRegression2.vue'),
  },
  {
    path: '/analysis_regression3',
    name: 'Analysis_regression3',
    component: () => import(/* webpackChunkName: "analysis_regression3" */ '../views/EAnalysisRegression3.vue'),
  },
  {
    path: '/analysis_regression4',
    name: 'Analysis_regression4',
    component: () => import(/* webpackChunkName: "analysis_regression4" */ '../views/EAnalysisRegression4.vue'),
  },
  {
    path: '/epanel_view1',
    name: 'Epanel_view1',
    component: EPanelView,
    props: { panel_id: "panels/panel1" }
  },
  {
    path: '/epanel_view2',
    name: 'Epanel_view2',
    component: EPanelView,
    props: { panel_id: "panels/panel2" }
  },
  {
    path: '/epanel_view3',
    name: 'Epanel_view3',
    component: EPanelView,
    props: { panel_id: "panels/panel3" }
  },
  {
    path: '/epanel_view4',
    name: 'Epanel_view4',
    component: EPanelView,
    props: { panel_id: "panels/panel4" }
  },
  {
    path: '/epanel_view5',
    name: 'Epanel_view5',
    component: () => import(/* webpackChunkName: "e3ddemo" */ '../views/E3dDemo.vue'),
  },
  {
    path: '/epanel_view6',
    name: 'Epanel_view6',
    component: EPanelView,
    props: { panel_id: "panels/panel6" }
  },
  {
    path: '/epanel_view7',
    name: 'Epanel_view7',
    component: EPanelView,
    props: { panel_id: "panels/panel7" }
  },
  {
    path: '/epanel_view8',
    name: 'Epanel_view8',
    component: EPanelView,
    props: { panel_id: "panels/panel8" }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
