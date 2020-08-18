import Vue from 'vue';
import Vuex from 'vuex';

import Comments from './modules/comments';
import Users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Comments,
    Users,
  },
});
