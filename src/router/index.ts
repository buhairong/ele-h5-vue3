import { createRouter, createWebHistory } from 'vue-router'
import TabsView from '../views/tabs/TabsView.vue'
import HomeView from '../views/tabs/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../views/tabs/order/OrderView.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('../views/tabs/me/MeView.vue')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: LoginView
    }
  ]
})

export default router
