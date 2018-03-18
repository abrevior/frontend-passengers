// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import Notifications from 'vue-notification';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);
Vue.use(Notifications)
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';
Vue.http.options.headers = {
  'Accept': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded'
  'Content-Type': 'application/json'
};
// Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
