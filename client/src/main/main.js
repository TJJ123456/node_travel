import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

import ManagerHome from '../components/managerHome.vue'
import Login from '../components/mangerLogin.vue'
import AppLayout from '../components/AppLayout.vue'
import router from '../router'
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

let managerdata = localStorage.getItem('manager')
if (managerdata) {
  state.manager = JSON.parse(managerdata).manager;
}

async function main() {
  try {
    state.user = await $fetch('user');
    if (!state.manager)
      state.manager = await $fetch('manager1');
  } catch (e) {
    console.warn(e);
  }
}

new Vue({
  el: '#app',
  data: state,
  render: h => h(AppLayout),
  router
})

main();
