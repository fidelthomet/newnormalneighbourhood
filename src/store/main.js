export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    async init ({ dispatch }) {
      dispatch('api/fetchChallenges', null, { root: true })
    }
  },
  modules: {
  }
}
