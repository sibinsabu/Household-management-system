import { createStore } from 'vuex'
import jwt_decode from 'jwt-decode';
import router from '@/router'; // <-- Import router here

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    savedJobs: JSON.parse(localStorage.getItem('savedJobs')) || null,
    saveJob: ''
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
    },
    REMOVE_JOB(state, job) {
      state.savedJobs = state.savedJobs.filter(j => j.id !== job.id);
      localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
    },
    Check_Saved_Job(state){
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs'));
      state.savedJobs = savedJobs || [];
    },
    SET_SAVE_JOB(state, value) {
      state.saveJob = value;
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
    SAVE_JOB({ commit, state }, job) {
      if (state.savedJobs === null) {
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs'));
        state.savedJobs = savedJobs || [];
      }
      const existingJob = state.savedJobs.find(j => j.id === job.id);
      if (existingJob) {
        console.log('Job already saved:', job);
      } else {
        state.savedJobs.push(job); // <-- Add job to savedJobs array
        localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs))
        commit('SET_SAVE_JOB', 'Job Saved')
      }
    },
       
  },
  modules: {
  }
})
