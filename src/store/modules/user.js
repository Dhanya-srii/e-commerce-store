import { user } from '@/api/user';
export const users = {
  state: {
    userData: '',
  },
  mutations: {
    setUser(state, data) {
      state.userData = data;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
  actions: {
    async getUser({ commit }) {
      try {
        const response = await user.getAuthUser();
        commit('setUser', response.data);
        return response.data;
      } catch {
        commit('clearUser');
        throw new Error('Session expired');
      }
    },
    logout({ commit }) {
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      commit('clearUser');
    },
    startSessionTimeout({ dispatch }, router) {
      setTimeout(() => {
        dispatch('logout');
        router.push('/login');
      }, 60000 * 5);
    },
  },
};
