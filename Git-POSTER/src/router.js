import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Posters from './views/Posters.vue'
import Product_details from './views/Product_details.vue'
import Shopping_bag from './views/Shopping_bag.vue'
import Admin from './views/Admin.vue'
import Orders from './views/Orders.vue'
import AddNewItems from './components/admin/AddNewItems.vue'
import EditItems from './components/admin/EditItems.vue'
import Login from './components/admin/Login.vue'
import Favourite from './views/Favourite.vue'

import firebase from 'firebase'
import 'firebase/firestore'



Vue.use(Router)

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posters',
      name: 'posters',
      component: Posters
    },
    {
      path: '/details/:name',
      name: 'details',
      component: Product_details
    },
    {
      path: '/bag',
      name: 'bag',
      component: Shopping_bag
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: Favourite
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addNew',
      name: 'addNew',
      component: AddNewItems,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditItems,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    },

  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else next();
});

export default router

