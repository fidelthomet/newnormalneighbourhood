export default {
  namespaced: true,
  state: {
    storage: null,
    camera: null,
    cameraError: null,
    location: null,
    locationError: null
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  getters: {
    statusStorage (state) {
      if (state.storage === true) return 'allowed'
      return 'unknown'
    },
    statusCamera (state) {
      if (state.camera != null) return 'allowed'
      if (state.cameraError != null) return 'denied'
      return 'unknown'
    },
    statusLocation (state) {
      if (state.location != null) return 'allowed'
      if (state.locationError != null) return 'denied'
      return 'unknown'
    },
    permissionsGranted (state, { statusStorage, statusCamera, statusLocation }) {
      return statusStorage === 'allowed' && statusCamera === 'allowed' && statusLocation === 'allowed'
    }
  },
  actions: {
    async allowStorage ({ commit }) {
      commit('set', { key: 'storage', value: true })
    },
    async allowCamera ({ commit }) {
      const options = {
        video: {
          width: 2048,
          height: 2048,
          aspectRatio: 1,
          facingMode: {
            ideal: 'environment'
          }
        }
      }
      navigator.mediaDevices.getUserMedia(options).then((stream) => {
        commit('set', { key: 'camera', value: stream })
        stream.getTracks().filter(track => track.kind === 'video').forEach(function (track) {
          // console.log(track)
          // track.enabled = false
          // commit('set', { key: 'camera', value: track })
        })
      }).catch((error) => {
        commit('set', { key: 'cameraError', value: error })
      })
    },
    async allowLocation ({ commit }) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      navigator.geolocation.watchPosition(
        location => {
          commit('set', { key: 'location', value: location })
        },
        error => {
          commit('set', { key: 'locationError', value: error })
        }, options)
    }
  }
}
