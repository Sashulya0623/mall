<template>

  <Swiper>
    <SwiperItem v-for="(item,index) in banners"  :key="index" class="swiper_item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </SwiperItem>
  </Swiper>

</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"
export default {
  name: "HomeSwiper", //模板名称
  data() {
      return {
        // 判断图片是否加载
        isLoad: false,
      }
    },
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
  methods:{
    swiperImgLoad() {
      if(!this.isLoad)
      this.$emit("swiperImgLoad");
      this.isLoad = true;
    }
  }
};
</script>

<style>

</style>