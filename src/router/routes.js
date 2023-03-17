import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

// 所有路由匹配的数组
export default [
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path:'',
        redirect:'myorder'
      }
    ],
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    path: "/paySuccess",
    component: PaySuccess,
  },
  {
    path: "/trade",
    component: Trade,
  },
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
