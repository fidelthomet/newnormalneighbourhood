const api = 'https://api.newnormalneighbourhood.org'
const files = 'https://files.newnormalneighbourhood.org'

export default {
  namespaced: true,
  state: {
    challenges: null,
    speculations: null,
    speculation: null,
    speculationDetails: {

    },
    files
  },
  getters: {
    speculations: (state) => (scenario) => {
      return state.speculations.filter(s => s.scenario === scenario)
    }
  },
  mutations: {
    set (state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key]
      })
    },
    updateDetails (state, { id, speculation }) {
      state.speculationDetails[id] = speculation
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
          })).sort((a, b) => {
            return a.order - b.order
          }))
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
    async fetchSpeculation ({ commit, state }, id) {
      // commit('set', { speculation: null })
      if (state.speculationDetails[id] != null) {
        commit('set', { speculation: state.speculationDetails[id] })
      } else {
        const speculation = await fetch(`${api}/speculation/${id}`)
          .then(r => r.json())
          .then(d => d.map(speculation => ({
            ...speculation,
            img: `${files}/s/${speculation._id}.jpg`
          }))[0])
        commit('set', { speculation })
        commit('updateDetails', { id, speculation })
      }
    },
    async commitSpeculation ({ commit, rootState }, scenario) {
      const data = {
        ...rootState.data,
        scenario
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
