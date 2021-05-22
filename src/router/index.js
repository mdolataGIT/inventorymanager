import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewInventory from '@/components/NewInventory'
import NewInventory2 from '@/components/NewInventory2'
import EditInventory from '@/components/EditInventory'
import ViewInventory from '@/components/ViewInventory'
import EditInventory2 from '@/components/EditInventory2'
import ViewInventory2 from '@/components/ViewInventory2'
import Dashboard2 from '@/components/Dashboard2'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/dashboard2/:garden_id',
      name: 'dashboard2',
      component: Dashboard2,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-inventory',
      component: NewInventory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new2/:garden_id',
      name: 'new-inventory2',
      component: NewInventory2,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:garden_id',
      name: 'edit-inventory',
      component: EditInventory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit2/:inventory_id',
      name: 'edit-inventory2',
      component: EditInventory2,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:inventory_id',
      name: 'view-inventory2',
      component: ViewInventory2,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/:garden_id',
      name: 'view-inventory',
      component: ViewInventory,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuests)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }

  } else {
    next();
  }
})

export default router;