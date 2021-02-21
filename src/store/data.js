export default {
  namespaced: true,
  state: {
    title: '',
    description: '',
    photo: null,
    coords: null
  },
  mutations: {
    set (state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key]
      })
    }
  },
  actions: {
    update ({ commit }, d) {
      commit('set', d)
    },
    storePhoto ({ commit, rootState }, photo) {
      commit('set', {
        photo,
        coords: [
          +rootState.device.location.coords.latitude.toFixed(5),
          +rootState.device.location.coords.longitude.toFixed(5)
        ]
      })
    },
    storeSketch ({ commit }, sketch) {
      commit('set', { sketch })
    },
    wipe ({ commit }) {
      commit('set', {
        title: '',
        description: '',
        photo: null,
        sketch: null,
        coords: null
      })
    }
  },
  modules: {
  }
}
