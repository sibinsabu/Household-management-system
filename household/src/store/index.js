import { createStore } from 'vuex'
import jwt_decode from 'jwt-decode';
import router from '@/router'; // <-- Import router here

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
    CHECK_TOKEN_EXPIRATION({ state, commit }) {
      if (!state.user || !state.user.token) {
        return;
      }
      const decodedToken = jwt_decode(state.user.token);
      if (!decodedToken.exp) {
        console.error('Token does not have expiration time:', state.user.token);
        return;
      }
      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentTime = new Date();
      const timeDifference = expirationDate.getTime() - currentTime.getTime();
      if (timeDifference <= 0) {
        commit('LOGOUT');
        router.push('/Login');
      } else {
        setTimeout(() => {
          commit('LOGOUT');
          router.push('/Login');
        }, timeDifference);
      }
    },
    
  },
  modules: {
  }
})
