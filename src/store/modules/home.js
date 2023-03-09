/*
管理首页相关的vuex子模块
*/
import {
    reqCategoryList,
    reqBannerList,
    reqRecommends,
    reqFloors
} from '@/api'
const state = {
    categoryList: [], //所有分类的数组
    bannerList: [],
    recommends: [],
    floors: []
}
const mutations = {
    /*
    接收保存分类列表
    */
    RECEIVE_CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList.splice(0, 15) //所有分类的数组
    },
    /*
    接收保存轮播分类列表
    */
    RECEIVE_BANNER_LIST(state, bannerList) {
        state.bannerList = bannerList
    },
    /*
    接收保存推荐分类列表
    */
    RECEIVE_RECOMMENDS(state, recommends) {
        state.recommends = recommends
    },
    /*
    接收保存楼层分类列表
    */
    RECEIVE_FLOORS(state, floors) {
        state.floors = floors
    },

}
const actions = {
    /*
    异步获取商品三级分类列表
    */
    async getCategoryList({ commit }) {
        const result = await reqCategoryList()
        if (result.code === 200) {
            const categoryList = result.data
            commit('RECEIVE_CATEGORY_LIST', categoryList)
        }
    },
    /*
    异步获取广告轮播列表的异步action
    */
    async getBannerList({ commit }) {
        // console.log('getBannerList()');
        const result = await reqBannerList()
        if (result.code === 200) {
            const bannerList = result.data
            commit('RECEIVE_BANNER_LIST', bannerList)
        }
    },

    /*
    异步获取推荐列表的异步action
    */
    async getRecommends({ commit }) {
        // console.log('getBannerList()');
        const result = await reqRecommends()
        if (result.code === 200) {
            const recommends = result.data
            commit('RECEIVE_RECOMMENDS', recommends)
        }
    },

    /*
    异步获取楼层列表的异步action
    */
    async getFloors({ commit }) {
        // console.log('getBannerList()');
        const result = await reqFloors()
        if (result.code === 200) {
            const floors = result.data
            commit('RECEIVE_FLOORS', floors)
        }
    },

}
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}