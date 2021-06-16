<template>
  <Swiper class="detail_swiper">
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
/* 设置轮播图高度 */
.detail_swiper {
    height: 300px;
    overflow: hidden;
}


</style>
