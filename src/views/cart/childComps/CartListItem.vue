<template>
  <div class="cart_list_item">
    <!-- 选择商品按钮 -->
    <div class="item_selector">
        <CheckBtn :isSelected="product.checked" @checkBtnClick="checkBtnClick"></CheckBtn>
    </div>
    <!-- 商品样式 -->
    <div class="item_img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item_info">
      <div class="item_title">{{ product.title }}</div>
      <div class="item_desc">商品描述:{{ product.desc }}</div>
      <div class="info_bottom">
        <div class="item_price left">￥{{ product.newPrice }}</div>
        <div class="item_count right">×{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBtn from "components/common/checkbtn/CheckBtn.vue";
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckBtn,
  },
  methods: {
    checkBtnClick: function () {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>
<style scoped>
/* 整体样式 */
.cart_list_item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}

/* 选择按钮 */
.item_selector {
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 图片设置 */
.item_img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
}

.item_img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
/* 商品信息 */
.item_info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}

.item_title, .item_desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item_info .item_desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}

.info_bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
}

.info_bottom .item_price {
    color: orangered;
}
</style>
