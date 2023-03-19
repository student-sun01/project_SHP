// 路由器对象
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";

// 声明使用插件
Vue.use(VueRouter);

// 缓存原本的push方法
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// 指定新的push方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  // console.log('push');
  // 如果指定了成功或者失败的回调
  if (onResolve || onReject) {
    // 直接调用原来的push方法
    return originalPush.call(this, location, onResolve, onReject);
  }
  // 没有指定成功或者失败的回调，必须用catch处理
  return originalPush.call(this, location).catch((err) => {
    // 如果是重复导航产生的错误，不再向外传递错误
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err; //产生的是成功的promise，成功的promise的value是err
    }
    // 如果是其他原因导航的错误，将错误向下传递
    // rethrow error
    return Promise.reject(err);
  });
};

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  // 如果指定了成功或者失败的回调
  if (onResolve || onReject) {
    // 直接调用原来的push方法
    return originalReplace.call(this, location, onResolve, onReject);
  }
  // 没有指定成功或者失败的回调，必须用catch处理
  return originalReplace.call(this, location).catch((err) => {
    // 如果是重复导航产生的错误，不再向外传递错误
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err; //产生的是成功的promise，成功的promise的value是err
    }
    // 如果是其他原因导航的错误，将错误向下传递
    // rethrow error
    return Promise.reject(err);
  });
};

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
const router = new VueRouter({
  mode: "history", //没有#的模式
  // 应用中的所有路由
  routes,

  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { x: 0, y: 0 };
  },
});

//全局前置导航守卫
router.beforeEach(async (to, from, next) => {
  //token校验
  let token = store.state.user.token;
  if (token) {
    // 代表登录了或之前登录过
    if (to.path === "/login") {
      // 登陆过了，又想去登录页，直接跳转到首页
      next("/");
    } else {
      let hasUserInfo = !!store.state.user.userInfo.nickName;
      if (hasUserInfo) {
        next();
      } else {
        {
          // 此时登录了，去的不是登录页，那我们要根据token发送请求获取用户的真正信息
          try {
            await store.dispatch("getUserInfo");
            next();
          } catch (error) {
            alert("用户token过期或其他未知错误");
            store.dispatch("resetUserInfo");
            // 去到之前那想去但是没有去成的地方，需要和登录逻辑去配合使用
            next("/login?redirect=" + to.path);
          }
        }
      }
    }
  } else {
    // 代表用户没登录或者之前也没登录过
    // 后期我们需要判断用户是不是去订单相关的页面，如果是那么就先登录
    //交易相关的 支付相关的 用户中心相关的 都是需要登录才能访问
    if (
      to.path.indexOf("/trade") === 0 ||
      to.path.startsWith("/pay") ||
      to.path.startsWith("/center")
    ) {
      next("/login?redirect=" + to.path);
    } else {
      next()
    }
  }
});
export default router;
