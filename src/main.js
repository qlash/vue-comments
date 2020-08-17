import Vue from 'vue';
import App from './App.vue';
import Loader from './components/Loader.vue';

Vue.config.productionTip = false;

Vue.component('Loader', Loader);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
