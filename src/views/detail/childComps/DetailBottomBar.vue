<template>
  <div class="bottom_bar">
      <!-- 客服 店铺 收藏 -->
      <div class="bar_item  bar_left" >
          <div>
              <i class="icon service"></i>
              <span class="text">客服</span>
          </div>
          <div>
              <i class="icon shop"></i>
              <span class="text">店铺</span>
          </div>
          <div>
              <i class="icon select"></i>
              <span class="text">收藏</span>
          </div>
      </div>
      <!-- 加入购物车 购买 -->
      <div class="bar_item bar_right">
          <div class="cart" @click="addToCart">加入购物车</div>
          <div class="buy">购买</div>
      </div>
  </div>
</template>

<script>

  export default {
    name: "DetailBottomBar",
    methods:{
       addToCart(){
           this.$emit('addCart')
       }
    }
    
  }
</script>

<style scoped>
 /* 整体样式 */
 .bottom_bar {
     height: 58px;
     /* position: fixed; */
     /* 临时测试购物车添加商品  绝对定位保证底部导航栏位置不变 */
     position: absolute;
     left: 0;
     right: 0;
     bottom: 0;
     display: flex;
     text-align: center;
     background-color: #fff;
 }

 /* 左边设置 */
 .bar_item {
  flex: 1;
  display: flex;
}
.bar_item>div {
  flex: 1;
}
.bar_left .text {
    font-size: 14px;
}
/* 精灵图标 */
.bar_left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar_left .service {
  background-position:0 -54px;
}
.bar_left .shop {
  background-position:0 -98px;
}
/* 右边设置 */
.bar_right {
  font-size: 16px;
  color: #fff;
  line-height: 58px;
}
.bar_right .cart {
  background-color: #ffe817;
  color: #333;
}
.bar_right .buy {
  background-color: #f69;
}
</style>