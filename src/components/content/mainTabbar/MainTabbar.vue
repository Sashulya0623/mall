<template>
  <Tabbar>
        <TabbarItem path="/home" activeColor="#D81E06">
          <img slot="item_icon" src="~assets/img/tabbar/home.svg" alt="">
          <img slot="item_active_icon" src="~assets/img/tabbar/home_active.svg" alt="">
          <div slot="item_text">首页</div>
        </TabbarItem>
        <TabbarItem path="/category" activeColor="#D81E06">
          <img slot="item_icon" src="~assets/img/tabbar/category.svg" alt="">
          <img slot="item_active_icon" src="~assets/img/tabbar/category_active.svg" alt="">
          <div slot="item_text">分类</div>
        </TabbarItem>
        <TabbarItem path="/cart" activeColor="#D81E06">
          <img slot="item_icon" src="~assets/img/tabbar/shopcart.svg" alt="">
          <img slot="item_active_icon" src="~assets/img/tabbar/shopcart_active.svg" alt="">
          <div slot="item_text">购物车</div>
        </TabbarItem>
        <TabbarItem path="/profile" activeColor="#D81E06">
          <img slot="item_icon" src="~assets/img/tabbar/profile.svg" alt="">
          <img slot="item_active_icon" src="~assets/img/tabbar/profile_active.svg" alt="">
          <div slot="item_text">我的</div>
        </TabbarItem>
      </Tabbar>
</template>

<script>
import Tabbar from 'components/common/tabbar/Tabbar.vue'
import TabbarItem from 'components/common/tabbar/TabbarItem.vue'
export default {
  name: "MainTabbar", 
  components: {
      Tabbar,
      TabbarItem
    }
};
</script>

<style>

</style>