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
    <!-- 控制栏切换 -->
    <TabControl class="tabcont" :titles="['流行', '新款', '精选']"></TabControl>

    <ul>
      <li>le1</li>
      <li>le2</li>
      <li>le3</li>
      <li>le4</li>
      <li>le5</li>
      <li>le6</li>
      <li>le7</li>
      <li>le8</li>
      <li>le9</li>
      <li>le10</li>
      <li>le11</li>
      <li>le12</li>
      <li>le13</li>
      <li>le14</li>
      <li>le15</li>
      <li>le16</li>
      <li>le17</li>
      <li>le18</li>
      <li>le19</li>
      <li>le20</li>
      <li>le21</li>
      <li>le22</li>
      <li>le23</li>
      <li>le24</li>
      <li>le25</li>
      <li>le26</li>
      <li>le27</li>
      <li>le28</li>
      <li>le29</li>
      <li>le30</li>
      <li>le31</li>
      <li>le32</li>
      <li>le33</li>
      <li>le34</li>
      <li>le35</li>
      <li>le36</li>
      <li>le37</li>
      <li>le38</li>
      <li>le39</li>
      <li>le40</li>
      <li>le41</li>
      <li>le42</li>
      <li>le43</li>
      <li>le44</li>
      <li>le45</li>
      <li>le46</li>
      <li>le47</li>
      <li>le48</li>
      <li>le49</li>
      <li>le50</li>
      <li>le51</li>
      <li>le52</li>
      <li>le53</li>
      <li>le54</li>
      <li>le55</li>
      <li>le56</li>
      <li>le57</li>
      <li>le58</li>
      <li>le59</li>
      <li>le60</li>
      <li>le61</li>
      <li>le62</li>
      <li>le63</li>
      <li>le64</li>
      <li>le65</li>
      <li>le66</li>
      <li>le67</li>
      <li>le68</li>
      <li>le69</li>
      <li>le70</li>
      <li>le71</li>
      <li>le72</li>
      <li>le73</li>
      <li>le74</li>
      <li>le75</li>
      <li>le76</li>
      <li>le77</li>
      <li>le78</li>
      <li>le79</li>
      <li>le80</li>
      <li>le81</li>
      <li>le82</li>
      <li>le83</li>
      <li>le84</li>
      <li>le85</li>
      <li>le86</li>
      <li>le87</li>
      <li>le88</li>
      <li>le89</li>
      <li>le90</li>
      <li>le91</li>
      <li>le92</li>
      <li>le93</li>
      <li>le94</li>
      <li>le95</li>
      <li>le96</li>
      <li>le97</li>
      <li>le98</li>
      <li>le99</li>
      <li>le100</li>
    </ul>
    
  </div>
</template>

<script>
// 1. 组件导入
// 1.1 公共组件
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
// 1.2 子组件导入
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
    // 公共组件
    NavBar,
    TabControl,
    // 子组件
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

#home {
  padding-top: 44px;
  
 
}
/* 标题栏 */
.home_navbar {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 99;
}

/* 控制栏切换  定位*/
.tabcont {
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}
</style>