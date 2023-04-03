import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  getters: {
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user;
      console.log('User logged in:', user);
    },
    LOGOUT(state) {
      state.user = null;
      localStorage.removeItem('user');
      console.log('User logged out');
    },
  },
  actions: {
  },
  modules: {
  }
})
