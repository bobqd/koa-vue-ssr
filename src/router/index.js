import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        component: resolve => require(['../pages/home'], resolve)
      },
      {
        path: '*',
        redirect: '/home'
      }
    ]
  });
}