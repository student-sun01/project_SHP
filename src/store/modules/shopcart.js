/* 
管理购物车的数据
*/

import { reqAddOrUpdateCart, reqCartList } from "@/api";

const state = {
  shopCartList: [],
};

const mutations = {
  RECEIVE_SHOPCART_LIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};

const actions = {
  async addOrUpdateCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  async getCartList({ commit }) {
    const result = await reqCartList();
    if (result.code === 200) {
      commit("RECEIVE_SHOPCART_LIST", result.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
