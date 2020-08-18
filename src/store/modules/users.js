export default {
  namespaced: true,
  state() {
    return {
      list: null,
      current: null,
    };
  },
  mutations: {
    setList(state, payload) {
      state.list = payload;
    },
    setCurrent(state) {
      const randomId = Math.floor(Math.random() * state.list.length);
      state.current = state.list[randomId];
    },
  },
  actions: {
    async getList({ commit }) {
      const res = await fetch('https://my-json-server.typicode.com/zaszczyk/demo/users');
      const users = await res.json();
      commit('setList', users);
    },
  },
};
