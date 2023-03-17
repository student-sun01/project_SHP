/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

// 配置通用的基础路径和超时
const service = axios.create({
  baseURL: "/api", //基础路径
  timeout: 5000, //连接请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求前回调
  // 显示请求进度条
  Nprogress.start();
  // 携带临时标识
  let userTempId = store.state.user.userTempId;
  if (userTempId) {
    config.headers.userTempId = userTempId;
  }
//携带登录后标识token
  let token = store.state.user.token;
  if (token) {
    config.headers.token = token;
  }
  // 必须返回config  ==> 用于内部发ajax请求
  return config;
});

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    //请求成功返回的回调
    // 隐藏请求进度条
    Nprogress.done();
    // 成功返回的数据不再是response, 而直接是响应体数据response.data
    return response.data;
  },
  (err) => {
    //请求失败返回的回调
    // 隐藏请求进度条
    Nprogress.done();
    /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
    // 统一处理错误
    // alert(`请求出错: ${error.message || '未知错误'}`)
    // 将错误传递下去, 外面可以选择处理或不处理
    // throw error
    return Promise.reject(err);
  }
);

export default service;
