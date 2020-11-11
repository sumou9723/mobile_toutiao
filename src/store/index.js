import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
const TOKEN = 'TOUTIAO_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登陆状态信息
    user: getItem(TOKEN)
  },
  mutations: {
    setUser(state, user) {
      // console.log(user)
      state.user = user
      // 保存本地数据
      setItem(TOKEN, state.user)
    }
  },
  actions: {},
  modules: {}
})
