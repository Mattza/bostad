// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
import Axios from 'axios';
import App from './App';
import Bostad from './components/Bostad';

const router = new VueRouter({
  routes: [
    { path: '/bostad', component: Bostad },
    { path: '*', component: Bostad },
  ],
});
Vue.use(VueRouter);
// Vue.use(VueResource);
Vue.prototype.$http = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
