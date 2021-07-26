import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectName: 'epoch',
    authorized: false,
    apiList: [],
    showBottom: true,
    nickname: '未登录'
  },
  mutations: {
    authorChange (state, data) {
      state.authorized = data
    },
    initAPI (state, data) {
      state.apiList = data
    },
    setBottom (state, data) {
      state.showBottom = data
    },
    setNickName (state, data) {
      state.nickname = data
    }
  },
  actions: {
    initAPIList (store) {
      axios.get('/epoch/api/apis/list').then(res => {
        store.commit('initAPI', res.data)
      }).catch(err => err)
    }
  },
  modules: {
  }
})
