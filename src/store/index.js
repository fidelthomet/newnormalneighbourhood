import { createStore } from 'vuex'
import api from './api'
import data from './data'
import view from './view'
import main from './main'

console.log(api)

export default createStore({
  modules: {
    main,
    api,
    data,
    view
  }
})
