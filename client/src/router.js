import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Search from './views/Search.vue'
import State from './views/State.vue'

//Fixed routes

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },


    {
      path: '/aguascalientes',
      name: 'Aguascalientes',
      component: State
    },
    {
      path: '/bajaCalifornia',
      name: 'Baja California',
      component: State
    },
    {
      path: '/bajaCaliforniaSur',
      name: 'Baja California Sur',
      component: State
    },
    {
      path: '/campeche',
      name: 'Campeche',
      component: State
    },
    {
      path: '/chihuahua',
      name: 'Chihuahua',
      component: State
    },
    {
      path: '/chiapas',
      name: 'Chiapas',
      component: State
    },
    {
      path: '/coahuila',
      name: 'Coahuila',
      component: State
    },
    {
      path: '/colima',
      name: 'Colima',
      component: State
    },
    {
      path: '/durango',
      name: 'Durango',
      component: State
    },
    {
      path: '/guerrero',
      name: 'Guerrero',
      component: State
    },
    {
      path: '/guanajuato',
      name: 'Guanajuato',
      component: State
    },
    {
      path: '/hidalgo',
      name: 'Hidalgo',
      component: State
    },
    {
      path: '/jalisco',
      name: 'Jalisco',
      component: State
    },
    {
      path: '/michoacan',
      name: 'Michoacan',
      component: State
    },
    {
      path: '/morelos',
      name: 'Morelos',
      component: State
    },
    {
      path: '/nayarit',
      name: 'Nayarit',
      component: State
    },
    {
      path: '/nuevoLeon',
      name: 'Nuevo León',
      component: State
    },
    {
      path: '/oaxaca',
      name: 'Oaxaca',
      component: State
    },
    {
      path: '/puebla',
      name: 'Puebla',
      component: State
    },
    {
      path: '/queretaro',
      name: 'Queretaro',
      component: State
    },
    {
      path: '/quintanaRoo',
      name: 'Quintana Roo',
      component: State
    },
    {
      path: '/sinaloa',
      name: 'Sinaloa',
      component: State
    },
    {
      path: '/sanLuisPotosi',
      name: 'San Luis Potosí',
      component: State
    },
    {
      path: '/sonora',
      name: 'Sonora',
      component: State
    },
    {
      path: '/tabasco',
      name: 'Tabasco',
      component: State
    },
    {
      path: '/tamaulipas',
      name: 'Tamaulipas',
      component: State
    },
    {
      path: '/tlaxcala',
      name: 'Tlaxcala',
      component: State
    },
    {
      path: '/veracruz',
      name: 'Veracruz',
      component: State
    },
    {
      path: '/yucatan',
      name: 'Yucatán',
      component: State
    },
    {
      path: '/zacatecas',
      name: 'Zacatecas',
      component: State
    },
    {
      path: '/cdmx',
      name: 'Ciudad de México',
      component: State
    },
    {
      path: '/mexico',
      name: 'Estado de México',
      component: State
    },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
