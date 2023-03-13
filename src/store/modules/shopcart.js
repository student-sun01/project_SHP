/* 
管理购物车的数据
*/

import {
  reqAddOrUpdateCart,
  reqCartList,
  reqDeleteCart,
  reqUpdateCartChecked,
} from "@/api";

const state = {
  shopCartList: { cartInfoList: [] },
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
      commit("RECEIVE_SHOPCART_LIST", result.data[0] || { cartInfoList: [] });
    }
  },
  async updateCartChecked({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCartChecked(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 修改全部产品的状态
  async updateCartCheckedAll({ commit, state, dispatch }, isChecked) {
    let promises = [];
    state.shopCartList[0].cartInfoList.forEach((item) => {
      if (item.isChecked === isChecked) return;
      let promise = dispatch("updateCartChecked", {
        skuId: item.skuId,
        isChecked,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },
  // 删除购物车（单个商品）
  async deleteCartOne({ commit }, skuId) {
    const result = await reqDeleteCart(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 删除选中的商品（多个）
  async deleteCartAll({ commit, state, dispatch }) {
    let promises = [];
    state.shopCartList.cartInfoList.forEach((item) => {
      if (!item.isChecked) return;
      let Promise = dispatch("deleteCartOne", item.skuId);
      promises.push(Promise);
    });
    return Promise.all(promises);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
