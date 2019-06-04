import Vue from 'vue';
import Router from 'vue-router';
import Map from '@/components/home/Map';
import Signup from '@/components/auth/Signup';
import Login from '@/components/auth/Login';

Vue.use(Router);

export default new Router({
  // mode: history,
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
