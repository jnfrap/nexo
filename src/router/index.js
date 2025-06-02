import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AuthView from '../views/AuthView.vue'
import BoardView from '../views/BoardView.vue'
import RegisterComponent from '../components/auth/RegisterComponent.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: BoardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        next();
      } else {
        next({ name: 'auth' });
      }
    });
  } else {
    next();
  }
});

export default router
