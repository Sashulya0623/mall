<template>
  <div class="home_recom">
      <div v-for="(item,index) in recommends" :key="index" class="recom_item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecomView", //模板名称
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
/* 设置图片大小等 */
.home_recom {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 16px;
    /* 上下皆有空白，底部有灰色空白 */
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
}

.recom_item {
    flex: 1;
}

.recom_item img {
    width: 70px;
    height: 70px;
    /* 图片与文字之间有距离 */
    margin-bottom: 10px;
}
</style>