/*
管理登录用户数据的vuex子模块
*/
import { reqGetCode, reqUserLogin, reqUserRgister } from "@/api";
import {
  getUserTempId,
  setToken,
  getToken,
  removeToken,
} from "@/utils/userabout";
const state = {
  // getUserTempId 获取临时标识id
  userTempId: getUserTempId(),
  code: "",
  token: getToken(), //先从localstorage中获取
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  RECEIVE_TOKEN(state, token) {
    state.token = token;
  },
};
const actions = {
  async userRegister({ commit }, userInfo) {
    const result = await reqUserRgister(userInfo);
    // console.log(result);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    // console.log(result);
    if (result.code === 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 登录
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo);
    console.log(result);
    if (result.code === 200) {
      commit("RECEIVE_TOKEN", result.data.token);
      // localStorage.setItem("TOKEN_KEY", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
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
