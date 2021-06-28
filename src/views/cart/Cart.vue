<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="cart_topbar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList></CartList>
    <!-- 底部导航 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";
export default {
  name: "Cart", //模板名称
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //方法一：
    // ...mapGetters(['cartLength','cartList',])
    //方法二：
    ...mapGetters({
      // 把this.$store.getters.cartLength  映射为 this.length
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
/* 购物车整体 */
.cart {
  height: 100vh;
  position: relative;
}
/* 导航栏 */
.cart_topbar {
  background: var(--color-tint);
  color: #fff;
}
</style>