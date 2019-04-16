import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

import ManagerHome from '../components/managerHome.vue'
import Login from '../components/mangerLogin.vue'
// import router from '../router'
import './global-components'
import state from './state'
import VueFetch, { $fetch } from '../plugins/fetch'
import VueState from '../plugins/state'
import * as filters from './filters'

for (const key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
});
Vue.use(VueState, state);

async function main() {
  try {
    state.user = await $fetch('user');
    state.manager = await $fetch('manager');
  } catch (e) {
    console.warn(e);
  }
}


new Vue({
  el: '#app',
  data: state,
  render: h => h(ManagerHome),
  // router
})

// main();
