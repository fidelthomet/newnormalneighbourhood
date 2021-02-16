export default {
  namespaced: true,
  state: {
    // storage: null,
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
    set (state, { key, value }) {
      state[key] = value
    }
  },
  getters: {
    // statusStorage (state) {
    //   if (state.storage === true) return 'allowed'
    //   return 'unknown'
    // },
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
    // async allowStorage ({ commit }) {
    //   commit('set', { key: 'storage', value: true })
    // },
    async allowCamera ({ commit, state }) {
      commit('set', { key: 'cameraRequested', value: true })
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
        commit('set', { key: 'camera', value: stream })
        commit('set', { key: 'cameraRequested', value: false })
        stream.getTracks().filter(track => track.kind === 'video').forEach(function (track) {
          // console.log(track)
          // track.enabled = false
          // console.log(track.enabled)
          // track.stop()
          // track.start()
          // commit('set', { key: 'camera', value: track })
        })
      }).catch((error) => {
        commit('set', { key: 'cameraError', value: error })
        commit('set', { key: 'cameraRequested', value: false })
      })
    },
    async allowLocation ({ commit }) {
      commit('set', { key: 'locationRequested', value: true })
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.watchPosition(
        location => {
          commit('set', { key: 'location', value: location })
          commit('set', { key: 'locationRequested', value: false })
        },
        error => {
          commit('set', { key: 'locationError', value: error })
          commit('set', { key: 'locationRequested', value: false })
        }, options)
    }
  }
}
