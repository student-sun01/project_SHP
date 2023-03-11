import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

// 所有路由匹配的数组
export default [
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
  },
  {
    path: "/detail/:skuId",
    component: Detail,
  },
  {
    path: "/",
    component: Home,
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    // props: true //只映射prarms参数
    props: (route) => ({
      keyword3: route.params.keyword,
      keyword4: route.query.keyword2,
    }),
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
  },
];
