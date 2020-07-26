import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Breed from '../views/Breed.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:breed/:sub?',
    name: 'Breed',
    component: Breed,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router;
