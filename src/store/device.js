export default {
  namespaced: true,
  state: {
    camera: null,
    cameraRequested: false,
    cameraError: null,
    location: null,
    locationRequested: false,
    locationError: null,
    captureWidth: 1800,
    captureHeight: 1200
  },
  mutations: {
    set (state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key]
      })
    }
  },
  getters: {
    statusCamera (state) {
      if (state.camera != null) return 'allowed'
      if (state.cameraError != null) return 'denied'
      if (state.cameraRequested) return 'requested'
      return 'unknown'
    },
    statusLocation (state) {
      if (state.location != null) return 'allowed'
      if (state.locationError != null) return 'denied'
      if (state.locationRequested) return 'requested'
      return 'unknown'
    },
    permissionsGranted (state, { statusCamera, statusLocation }) {
      return statusCamera === 'allowed' && statusLocation === 'allowed'
    }
  },
  actions: {
    update ({ commit }, d) {
      commit('set', d)
    },
    async allowCamera ({ commit, state }) {
      commit('set', { cameraRequested: true })
      const options = {
        video: {
          width: state.captureWidth,
          height: state.captureHeight,
          aspectRatio: state.captureWidth / state.captureHeight,
          facingMode: {
            ideal: 'environment'
          }
        }
      }
      navigator.mediaDevices.getUserMedia(options).then((stream) => {
        commit('set', { camera: stream, cameraRequested: false })
      }).catch((error) => {
        commit('set', { cameraError: error, cameraRequested: false })
      })
    },
    async allowLocation ({ commit }) {
      commit('set', { locationRequested: true })
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.watchPosition(
        location => {
          commit('set', { location: location, locationRequested: false })
        },
        error => {
          commit('set', { locationError: error, locationRequested: false })
        }, options)
    }
  }
}
