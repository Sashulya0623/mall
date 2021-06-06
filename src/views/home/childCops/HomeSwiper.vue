<template>

  <Swiper>
    <SwiperItem v-for="(item,index) in banners"  :key="index" class="swiper_item">
      <a :href="item.link">
        <img :src="item.image" alt="" >
      </a>
    </SwiperItem>
  </Swiper>

</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"
export default {
  name: "HomeSwiper", //模板名称
  props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
  components:{
    Swiper,
    SwiperItem,
  },
};
</script>

<style>

</style>