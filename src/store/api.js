const api = 'https://api.nnn.ft0.ch'
const files = 'https://files.nnn.ft0.ch'

export default {
  namespaced: true,
  state: {
    challenges: null,
    speculations: null,
    speculation: null,
    files
  },
  getters: {
    speculations: (state) => (scenario) => {
      // if (state.storage === true) return 'allowed'
      return state.speculations.filter(s => s.scenario === scenario)
    }
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    async fetchChallenges ({ commit }) {
      commit('set', {
        key: 'challenges',
        value: await fetch(`${api}/challenges`)
          .then(r => r.json())
          .then(d => d.map(challenge => ({
            ...challenge,
            img: `${files}/${challenge.img}`
          })))
      })
    },
    async fetchSpeculations ({ commit }) {
      commit('set', {
        key: 'speculations',
        value: await fetch(`${api}/speculations`)
          .then(r => r.json())
          .then(d => d.map(speculation => ({
            ...speculation,
            img: `${files}/s/${speculation._id}.jpg`
          })))
      })
    },
    async fetchSpeculation ({ commit }, id) {
      commit('set', { key: 'speculation', value: null })
      commit('set', {
        key: 'speculation',
        value: await fetch(`${api}/speculation/${id}`)
          .then(r => r.json())
          .then(d => d.map(speculation => ({
            ...speculation,
            img: `${files}/s/${speculation._id}.jpg`
          }))[0])
      })
    },
    async commitSpeculation ({ commit }, d) {
      const data = {
        // type: 'testing',
        ...d
      }

      const response = await fetch(`${api}/speculation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json())

      return response
    }
  }
}
