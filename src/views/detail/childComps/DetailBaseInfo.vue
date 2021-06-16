<template>
  <div v-if="Object.keys(GoodsInfo).length !== 0" class="goods_info">
    <div class="info_title">{{GoodsInfo.title}}</div>
    <div class="info_price">
      <span class="n_price">{{GoodsInfo.newPrice}}</span>
      <span class="o_price">{{GoodsInfo.oldPrice}}</span>
      <span v-if="GoodsInfo.discount" class="discount">{{ GoodsInfo.discount}}</span>
    </div>
    <div class="info_other">
      <span>{{GoodsInfo.columns && GoodsInfo.columns[0]}}</span>
      <span>{{GoodsInfo.columns && GoodsInfo.columns[1]}}</span>
      <span>{{GoodsInfo.services && GoodsInfo.services[GoodsInfo.services.length - 1].name}}</span>
    </div>
    <div class="info_service">
      <span class="info_service_item" v-for="index in GoodsInfo.services.length-1" :key="index">
        <img :src="GoodsInfo.services[index-1].icon">
        <span>{{GoodsInfo.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    GoodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
/* 整个信息展示区设置 */
.goods_info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
   
}

.info_title {
    font-size: 20px;
    color: #222;
    font-weight: bold;
}

.info_price {
    margin-top: 10px;
}

.info_price .n_price {
    font-size: 24px;
    color: var(--color-high-text);
}

.info_price .o_price {
    font-size: 14px;
    margin-left: 5px;
    text-decoration: line-through;
  }

.info_price .discount {
    font-size: 16px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
}

/* 设置销量等样式 */
.info_other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 16px;
    border-bottom: 1px solid rgba(100,100,100,.2);
    justify-content: space-between;
}

/* 设置快递样式 */
.info_service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
}

.info_service_item img {
    width: 16px;
    height: 16px;
    position: relative;
    top: 2px;
}

.info_service_item span {
    font-size: 14px;
    color: #333;
}
</style>
