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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard2/:garden_id',
      name: 'dashboard2',
      component: Dashboard2
    },
    {
      path: '/new',
      name: 'new-inventory',
      component: NewInventory
    },
    {
      path: '/new2/:garden_id',
      name: 'new-inventory2',
      component: NewInventory2
    },
    {
      path: '/edit/:garden_id',
      name: 'edit-inventory',
      component: EditInventory
    },
    {
      path: '/edit2/:inventory_id',
      name: 'edit-inventory2',
      component: EditInventory2
    },
    {
      path: '/:inventory_id',
      name: 'view-inventory2',
      component: ViewInventory2
    },

    {
      path: '/:garden_id',
      name: 'view-inventory',
      component: ViewInventory
    },
  ]
})
