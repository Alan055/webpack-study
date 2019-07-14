import Vue from 'vue';
import vuex from "vuex";

Vue.use(vuex)
import service from "@/js/service";

export default new vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},

  },
  mutations: {
    // 保存用户信息
    setUserInfo(state, data) {
      state.isLogin = true // 设置为已登录
      state.userInfo = data // 登录信息保存在vuex中
      localStorage.setItem('userInfo', JSON.stringify(data)) // 并且保存在浏览器缓存中
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {} // 登录信息保存在vuex中
      localStorage.removeItem('userInfo') // 并且保存在浏览器缓存中
      state.isLogin = false
    }
  },
  actions: {
    // 退出登录
    async logout({commit, state}, that) {
      let res = await service.post(that, '/logout', {})
      if (res.code === 200) {
        console.log("123")
        commit('removeUserInfo')
        return true
      } else {
        console.log(res.msg)
      }
    }
  }
})
