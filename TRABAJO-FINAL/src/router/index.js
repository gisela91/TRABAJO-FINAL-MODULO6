import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/areas',
    name: 'areas',
    component: () => import(/* webpackChunkName: "inventarios" */ '../views/InventarioView.vue')
  },
  {
    path: '/areas/:id/ver',
    name: 'verActivos',
    component: () => import(/* webpackChunkName: "activos" */ '../views/ActivosView.vue')
  },
  {
    path: '/areas/:id/editar',
    name: 'editarArea',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditarAreaView.vue')
  },
  {
    path: '/areas/:id/activoEditar',
    name: 'editarActivo',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditarActivo.vue')
  },
  {
    path: '/areas/crear',
    name: 'crearAreaView',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrearAreaView.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
