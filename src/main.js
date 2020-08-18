import Vue from 'vue';
import App from './App.vue';
import Loader from './components/Loader.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.component('Loader', Loader);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
