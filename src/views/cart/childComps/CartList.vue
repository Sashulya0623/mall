<template>
  <scroll class="wrapper" ref="scroll">
    <div v-if="cartList.length">
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"/>
    </div>
    <div v-else class="empty-cart">
            <p>购物车居然是空的（°ο°）~ ~　</p>
            <p>再忙，也记得买点什么犒赏自己</p>
            <p @click="goHome">去逛逛</p>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartList", //模板名称
  components: {
    Scroll,
    CartListItem,
  },
  methods:{
    goHome(){
            this.$router.replace('/home');
        }
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.wrapper {
  /* 设置滑动区域的高度 */
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  /* 为了购物车页面的商品能够完全显示，bottom应该再加上结算栏的高度44   49+44*/
  bottom: 93px;
  overflow: hidden;
}

.empty-cart {
    padding-top: 50px;
    text-align: center;
}
.empty-cart p:nth-child(3){
    margin: 20px auto;
    width: 80px;
    padding: 4px 12px;
    background: #f3f3f3;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0, .3);
}
</style>
