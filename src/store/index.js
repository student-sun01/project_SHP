/*
Vuex最核心的管理对象store
*/
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'





// 声明使用vuex插件
Vue.use(Vuex)


const mutations = {
    xxx(state) { }
}
const actions = {
    yyy({ commit }) {

    }
}
const getters = {
    zzz(state) {

    }
}

// 向外暴露store对象
export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules
})