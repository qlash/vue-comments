import moment from 'moment';

export default {
  namespaced: true,
  state() {
    return {
      list: null,
    };
  },
  getters: {
    getLastId: (state) => Math.max(...state.list.map((c) => c.id)),
  },
  mutations: {
    setComments(state, payload) {
      state.list = payload;
    },
    add(state, payload) {
      console.log(payload);
      state.list.push(payload);
    },
  },
  actions: {
    async get({ commit }) {
      const res = await fetch('https://my-json-server.typicode.com/zaszczyk/demo/comments');
      const list = await res.json();
      commit('setComments', list);
    },
    async add({ commit, getters, rootState }, payload) {
      const res = await fetch('https://my-json-server.typicode.com/zaszczyk/demo/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const answer = await res.json();
      console.log(answer); // could contain json with added comment

      const { avatar, first_name, last_name } = rootState.Users.current;

      commit('add', {
        id: getters.getLastId + 1,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        text: payload.comment,
        avatar,
        first_name,
        last_name,
      });
    },
  },
};
