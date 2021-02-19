export default {
  namespaced: true,
  state: {
    ready: false
  },
  mutations: {
    set (state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key]
      })
    }
  },
  actions: {
    async init ({ dispatch, commit }) {
      await dispatch('api/fetchChallenges', null, { root: true })
      await dispatch('api/fetchSpeculations', null, { root: true })
      commit('set', { ready: true })
    }
  },
  modules: {
  }
}
