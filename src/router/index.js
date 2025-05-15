import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AuthView from '../views/AuthView.vue'
import BoardView from '../views/BoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthView
    },
    {
      path: '/board',
      name: 'Board',
      component: BoardView
    }
  ],
})

export default router
