/*
包含应用的所有接口的接口请求函数
    函数内部调用ajax函数发送请求
    函数返回的是promise对象
*/
import { method } from "lodash";
import ajax from "./ajax";
import mockAjax from "./mockAjax";

/*
首页三级分类
/api/product/getBaseCategoryList
 */

export function reqCategoryList() {
  return ajax({
    url: "/product/getBaseCategoryList",
  });
}

/*
获取首页广告轮播列表
*/
export const reqBannerList = () => mockAjax("/banners");

/* 
获取mock接口函数
*/
export const reqRecommends = () => mockAjax("/recommends");
export const reqFloors = () => mockAjax("/floors");

// reqRecommends().then(result => {
// console.log('result--', result);
// })

/* 
搜索分页列表
/api/list  POST
*/
export const reqSearch = (searchParams) => ajax.post("/list", searchParams);

/* 
获取详情数据
/api/item/{ skuId }
*/
export const reqDetailInfo = (skuId) => {
  return ajax({
    url: `/item/${skuId}`,
    method: "get",
  });
};

/* 
添加购物车（修改购物车的商品数量）
/api/cart/addToCart/{ skuId }/{ skuNum }  POST
*/
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

/* 
获取购物车列表
/api/cart/cartList   GET
*/
export const reqCartList = () => {
  return ajax({
    url: "/cart/cartList",
    method: "get",
  });
};

/* 
切换商品选中状态
/api/cart/checkCart/{skuID}/{isChecked}
GET
 */
export const reqUpdateCartChecked = (skuId, isChecked) => {
  return ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

/* 
删除购物车商品
/api/cart/deleteCart/{skuId}
DELETE
 */
export const reqDeleteCart = (skuId) => {
  return ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};

/* 
注册用户
/api/user/passport/register
POST
*/
export const reqUserRgister = (userInfo) => {
  return ajax({
    url: "/user/passport/register",
    method: "post",
    data: userInfo,
  });
};

/* 获取验证码 */
// /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone) => {
  return ajax({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

/* 登录 
/api/user/passport/login
POST
*/
export const reqUserLogin = (userInfo) => {
  return ajax({
    url: "/user/passport/login",
    method: "post",
    data: userInfo,
  });
};

/*
 token校验
api/user/passport/auth/getUserInfo
GET
 */
export const reqUserInfo = () => {
  return ajax({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
};

/* 退出登录
/api/user/passport/logout
GET
*/
export const reqUserLogout = () => {
  return ajax({
    url: "/user/passport/logout",
    method: "get",
  });
};

/* 
获取订单交易页信息
/api/order/auth/trade
GET
*/
export const reqTradeInfo = () => {
  return ajax({
    url: "/order/auth/trade",
    method: "get",
  });
};

/* 
提交订单
/api/order/auth/submitOrder?tradeNo={tradeNo}
POST
*/
export const reqSubmitOrder = (tradeNo, tradeData) => {
  return ajax({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: tradeData,
  });
};

/* 
获取订单支付信息
/api/payment/weixin/createNative/{orderId}
GET
*/
export const reqPayInfo = (orderId) => {
  return ajax({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

/* 
查询支付订单状态
/api/payment/weixin/queryPayStatus/{orderId}
GET
*/
export const reqPayStatus = (orderId) => {
  return ajax({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

/* 
获取我的订单列表
/api/order/auth/{page}/{limit}
GET
*/
export const reqMyOrderList = (page, limit) => {
  return ajax({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
};
