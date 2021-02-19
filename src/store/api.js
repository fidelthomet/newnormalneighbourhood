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
    set (state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key]
      })
    }
  },
  actions: {
    async fetchChallenges ({ commit }) {
      commit('set', {
        challenges: await fetch(`${api}/challenges`)
          .then(r => r.json())
          .then(d => d.map(challenge => ({
            ...challenge,
            img: `${files}/${challenge.img}`
          })))
      })
    },
    async fetchSpeculations ({ commit }) {
      commit('set', {
        speculations: await fetch(`${api}/speculations`)
          .then(r => r.json())
          .then(d => d.map(speculation => ({
            ...speculation,
            img: `${files}/s/${speculation._id}.jpg`
          })))
      })
    },
    async fetchSpeculation ({ commit }, id) {
      commit('set', { speculation: null })
      commit('set', {
        speculation: await fetch(`${api}/speculation/${id}`)
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
