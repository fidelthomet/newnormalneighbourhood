export default {
  namespaced: true,
  state: {
    title: '',
    description: ''
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    update ({ commit }, d) {
      commit('set', d)
    },
    wipe ({ commit }) {
      commit('set', { key: 'title', value: '' })
      commit('set', { key: 'description', value: '' })
    }
  },
  modules: {
  }
}
