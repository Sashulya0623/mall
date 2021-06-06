<template>
  <div id="home">
    <!-- 标题栏 -->
    <NavBar class="home_navbar"><div slot="center">购物街</div></NavBar>
    <!-- 轮播图 -->
    <HomeSwiper :banners="banners"></HomeSwiper>
    <!-- 推荐信息 -->
    <HomeRecomView :recommends="recommends"></HomeRecomView>
    <!-- 流行趋势 -->
    <HomeFashion></HomeFashion>

    
  </div>
</template>

<script>
// 1. 组件导入
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childCops/HomeSwiper.vue";
import HomeRecomView from "./childCops/HomeRecomView.vue";
import HomeFashion from "./childCops/HomeFashion.vue";
// 2. js文件导入
import { getHomeMultidata } from "network/home.js";

export default {
  name: "Home", //模板名称
  data() {
    return {
      // 存储请求到的轮播图数据
      banners: [],
      // 推荐
      recommends: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecomView,
    HomeFashion,
  },
  created() {
    // 1. 请求首页多个数据
    this.getHomeMultidata();
  },
  methods: {
    // 网络请求相关方法
    // 1. 首页多个数据请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 1.1 请求轮播图数据
        this.banners = res.data.banner.list;
        // 1.2 请求推荐信息数据
        this.recommends = res.data.recommend.list;
      });
    },
  },
};
</script>

<style>

.home_navbar {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0px;
  left: 0px;
  right: 0px; */

}
</style>