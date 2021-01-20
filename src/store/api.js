const api = 'https://api.nnn.ft0.ch'

export default {
  namespaced: true,
  state: {
    challenges: null
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    async fetchChallenges ({ commit }) {
      commit('set', { key: 'challenges', value: await fetch(`${api}/challenges`).then(r => r.json()) })
    }
  }
}
