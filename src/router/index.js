// 路由器对象
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 声明使用插件
Vue.use(VueRouter)

// 缓存原本的push方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 指定新的push方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    // console.log('push');
    // 如果指定了成功或者失败的回调
    if (onResolve || onReject) {
        // 直接调用原来的push方法
        return originalPush.call(this, location, onResolve, onReject)
    }
    // 没有指定成功或者失败的回调，必须用catch处理
    return originalPush.call(this, location).catch((err) => {
        // 如果是重复导航产生的错误，不再向外传递错误
        if (VueRouter.isNavigationFailure(err)) {
            // resolve err
            return err  //产生的是成功的promise，成功的promise的value是err
        }
        // 如果是其他原因导航的错误，将错误向下传递
        // rethrow error
        return Promise.reject(err)
    })
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    // 如果指定了成功或者失败的回调
    if (onResolve || onReject) {
        // 直接调用原来的push方法
        return originalReplace.call(this, location, onResolve, onReject)
    }
    // 没有指定成功或者失败的回调，必须用catch处理
    return originalReplace.call(this, location).catch((err) => {
        // 如果是重复导航产生的错误，不再向外传递错误
        if (VueRouter.isNavigationFailure(err)) {
            // resolve err
            return err  //产生的是成功的promise，成功的promise的value是err
        }
        // 如果是其他原因导航的错误，将错误向下传递
        // rethrow error
        return Promise.reject(err)
    })
}

// 缓存原型上的push函数
// const originPush = VueRouter.prototype.push
// const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
// VueRouter.prototype.push = function (location, onComplete, onAbort) {
// console.log('push()', onComplete, onAbort)
// 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
// if (onComplete === undefined && onAbort === undefined) {
// return originPush.call(this, location).catch(() => { })
// return originPush.call(this, location).catch(() => {})
// } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
// originPush.call(this, location, onComplete, onAbort)
// }
// }
// VueRouter.prototype.replace = function (location, onComplete, onAbort) {
// if (onComplete === undefined && onAbort === undefined) {
// return originReplace.call(this, location, onComplete, onAbort).catch(() => { })
// } else {
// originReplace.call(this, location, onComplete, onAbort)
// }
// }
// 
// 向外默认暴露路由器对象
export default new VueRouter({
    mode: 'history', //没有#的模式
    // 应用中的所有路由
    routes
})