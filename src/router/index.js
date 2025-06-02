import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AuthView from '../views/AuthView.vue'
import BoardView from '../views/BoardView.vue'
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
      component: AuthView,
      meta: { guest: true }
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
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const guestOnly = to.matched.some(record => record.meta.guest);
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
  } else if (guestOnly) {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        next({ name: 'main' });
      } else {
        next();
      }
    });
  }else {
    next();
  }
});

export default router
