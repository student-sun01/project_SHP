/*
管理登录用户数据的vuex子模块
*/
import {
  reqGetCode,
  reqUserInfo,
  reqUserLogin,
  reqUserRgister,
  reqUserLogout,
} from "@/api";
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
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  RECEIVE_TOKEN(state, token) {
    state.token = token;
  },
  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RESETUSERINFO(state) {
    (state.userInfo = {}), (state.token = "");
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
    console.log(result);
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
    // console.log(result);
    if (result.code === 200) {
      commit("RECEIVE_TOKEN", result.data.token);
      // localStorage.setItem("TOKEN_KEY", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // token校验
  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    if (result.code === 200) {
      commit("RECEIVE_USERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //清除用户信息和token
  async resetUserInfo({ commit }) {
    // 先调用函数清除localstorage当中的token信息
    removeToken();
    commit("RESETUSERINFO");
  },
  // 退出登录
  async userLogout({ commit }) {
    const result = await reqUserLogout();
    if (result.code === 200) {
      removeToken();
      commit("RESETUSERINFO");
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
