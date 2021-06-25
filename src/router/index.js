// 1. 引入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件  懒加载
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')


// 2. 注入vue-router插件
Vue.use(VueRouter);

// 3. 定义路由
const routes = [
    // 默认进入页面路径
    {
        path:'',
        redirect: '/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/detail/:iid',
        component:Detail
    }
    
];

// 4. 创建vue-router实例
const router = new VueRouter({
    routes,
    // mode: 'history',
    
})

// 5. 导出router实例
export default router