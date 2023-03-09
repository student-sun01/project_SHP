/*
包含应用的所有接口的接口请求函数
    函数内部调用ajax函数发送请求
    函数返回的是promise对象
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

/*
首页三级分类
/api/product/getBaseCategoryList
 */

export function reqCategoryList() {
    return ajax({
        url: '/product/getBaseCategoryList'
    })
}

/*
获取首页广告轮播列表
*/
export const reqBannerList = () => ajax('/cms/banner')

/* 
获取mock接口函数
*/
export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')

// reqRecommends().then(result => {
// console.log('result--', result);
// })

/* 
搜索分页列表
/api/list  POST
*/
export const reqSearch = (searchParams) => ajax.post('/list', searchParams)


