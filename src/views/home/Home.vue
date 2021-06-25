<template>
  <div id="home">
    <!-- 标题栏 -->
    <NavBar class="home_navbar"><div slot="center">购物街</div></NavBar>
    <TabControl ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab_control2"
        v-show="isTabFixed"
      ></TabControl>

    <!-- 滑动 -->
    <Scroll class="home_scroll" 
              ref="home_scroll" 
              :probeType="3"
              @scroll="contentScroll"
              :pullUpLoad="true"
              @pullingUp="pullingUp">
      <HomeSwiper :banners="banners"
      @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <HomeRecomView :recommends="recommends"></HomeRecomView>
      <HomeFashion></HomeFashion>
      <!-- @tabClick="tabClick()" 就会无效 -->
      <TabControl ref="tabcontrol1"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick()" v-show="istopShow"></BackTop>
    

    

  </div>
</template>

<script>
// 1. 组件导入
// 1.1 公共组件
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/common/backtop/BackTop.vue";
// 1.2 子组件导入
import HomeSwiper from "./childCops/HomeSwiper.vue";
import HomeRecomView from "./childCops/HomeRecomView.vue";
import HomeFashion from "./childCops/HomeFashion.vue";
// 2. js文件导入
import { getHomeMultidata, getHomeGoods } from "network/home.js";
// 防抖函数导入  后面从mixin中用到
// import {debounce} from "common/utils.js";
import {imgListnerMixin,backTopMixin} from "common/mixin.js";

export default {
  name: "Home", //模板名称
  mixins:[imgListnerMixin,backTopMixin],
  data() {
    return {
      // 存储请求到的轮播图数据
      banners: [],
      // 推荐
      recommends: [],
      // 首页数据存储
      goods: {
        // 默认请求第一页的数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 当前商品数据请求，默认为流行页面
      currentType: "pop",
      // 回到顶部按钮
      //istopShow:false,
      // tabcontrol
      tabOffsetTop: 0,
      // tabcontrol吸顶效果是否显示
      isTabFixed: false,
      // 保存scroll离开时滑动到的位置
      saveY:0,
      
    };
  },
  computed: {
    // 商品显示
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  components: {
    // 公共组件
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    // 子组件
    HomeSwiper,
    HomeRecomView,
    HomeFashion,
  },
  destroyed() {
    // 销毁后，当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁
    console.log('homedestroyed');// 使用keep-alive后失效
  },
  activated() {
    // 在使用vue-router时有时需要使用<keep-alive></keep-alive>来缓存组件状态
    // 这个时候created钩子就不会被重复调用了
    // 进来的时候  先刷新一下 再滑动到saveY的位置  
    this.$refs.home_scroll.refresh();
    this.$refs.home_scroll.scrollTo(0, this.saveY, 0)
    
  },
  deactivated() {
    // <keep-alive></keep-alive>组件被移除时使用
    // console.log('deactivated');
    // 1. 离开的时候把当前位置保存在saveY中
    this.saveY = this.$refs.home_scroll.getScrollY();

    // 2. 取消全局事件的监听
    // 2.1 因为取消全局事件不能只传事件，否则取消所有该事件的监听，还要把对应函数传进去
    // 2.2 原来是在mounted中监听的，这里把箭头函数提取出来，设置变量homeListener
    this.$bus.$off("itemImgLoad",this.homeListener);
  },
  created() {
    // 1. 请求首页多个数据
    this.getHomeMultidata();
    // 2. 请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    
  },
  mounted() {
    // 3. 监听商品图片加载事件
    // 3.1 该方法最好写在mounted中，因为created很可能拿不到html标签元素
    // 放在mixin中了
                                                                                                                           
  },
  methods: {
    // 事件监听方法
    
    // 1. 商品数据监听切换栏点击事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol2.currentIndex = index;
      this.$refs.tabcontrol1.currentIndex = index;

    },
    // 2. backtop回到顶部
    //backClick() {
      // this.$refs.home_scroll 拿到滑动组件
      // this.$refs.home_scroll.scroll  拿到滑动组件中的scroll对象
      // this.$refs.home_scroll.scroll.scrollTo(0,0,500);
     // this.$refs.home_scroll.scrollTo(0,0);
    //},
    contentScroll(position) {
      // 1. 判断backTop是否显示
      //console.log(position);
      // 滑动到一定位置 回到顶部按钮出现
        this.istopShow = (-position.y) >1000; 

        // 2. 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    // 3. 上拉加载更多
    pullingUp() {
      // 再加载一次当前类型商品
      // console.log('dubu');
      this.getHomeGoods(this.currentType);
    },
    // 4. scroll监听轮播图图片是否加载完成
    swiperImgLoad: function()  {
      // 图片加载完成，获取tabcontrol1的offsetTop
      this.tabOffsetTop = this.$refs.tabcontrol1.$el.offsetTop;
    },

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
    // 2. 请求首页商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // pullingUp只能调用一次  ，所以要结束调用   完成上拉加载更多
        this.$refs.home_scroll.finishPullUp();
      });
    },
  },
};
</script>

<style>
#home {
  /* padding-top: 44px; */
  /* 子绝父相： 滑动组件绝对定位 */
  position: relative;
  /* 要设置高度 好确定scroll组件所占空间 */
  height: 100vh;
  
}
/* 标题栏 */
.home_navbar {
  background-color: var(--color-tint);
  color: #fff;

/*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /* position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 99; */
}

/* 吸顶 */
.tab_control2 {
    position: relative;
    z-index: 9;
}

/* 控制栏切换  定位*/
/* scroll 组件   让下面设置失效 */
/* .tabcont {
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
} */

/* 滑动组件设置高度和溢出隐藏 ：第一种方法 */
.home_scroll {
  position: absolute;
  /* 标题栏高44 */
  top:44px;
  /* 底部组件高49 */
  bottom: 49px;
  left: 0px;
  right: 0px;

  overflow: hidden;

  
}
</style>