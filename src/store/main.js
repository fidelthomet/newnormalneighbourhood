export default {
  namespaced: true,
  state: {
    ready: false
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    async init ({ dispatch, commit }) {
      await dispatch('api/fetchChallenges', null, { root: true })
      await dispatch('api/fetchSpeculations', null, { root: true })
      commit('set', { key: 'ready', value: true })
    }
  },
  modules: {
  }
}
