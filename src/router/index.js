import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewInventory from '@/components/NewInventory'
import EditInventory from '@/components/EditInventory'
import ViewInventory from '@/components/ViewInventory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-inventory',
      component: NewInventory
    },
    {
      path: '/edit/:inventory_id',
      name: 'edit-inventory',
      component: EditInventory
    },
    {
      path: '/:inventory_id',
      name: 'view-inventory',
      component: ViewInventory
    },
  ]
})
