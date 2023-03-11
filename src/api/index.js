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
