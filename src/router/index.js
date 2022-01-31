import {
  createRouter,
  createWebHistory
} from "vue-router";
import Index from "../components/Index.vue"
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"

const routes = [{
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
