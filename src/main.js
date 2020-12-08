import Vue from 'vue';

import App from './app.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

// 导出函数，用于创建新的应用程序
export function createApp () {

  const router = createRouter();

  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    // 根据实列简单的渲染应用程序组件
    render: h => h(App)
  });
  return { app, router, store };
}