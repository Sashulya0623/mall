<template>
<!-- 先判断对象imagesInfo是否为空，空不展示 -->
 <div class="images_info" v-if="Object.keys(imagesInfo).length !== 0">
   <!-- 描述部分 -->
   <div class="info_desc" >
     <!-- class为start和end的元素 ：两条长横线 ,内部都包含一个伪元素小方块
          desc是对衣服的描述
     -->
     <div class="start"></div>
     <div class="desc">{{imagesInfo.desc}}</div>
     <div class="end"></div>
   </div>

   <!-- 图片关键词 -->
   <div class="info_key">
     {{imagesInfo.detailImage[0].key}}
   </div>

   <!-- 展示的图片 -->
   <div class="info_imagesList" >
      <img v-for="(item,index) in imagesInfo.detailImage[0].list" :key="index" :src="item" @load="imagesLoad" alt="">
   </div>
     
 </div>
</template>

<script>
 
  export default {
    name: "DetailImagesInfo",
    props:{
        imagesInfo:{
            type:Object,
            //default:{} // 不能设置默认值 会报错
        }
    },
    data() {
      return {
        counter:0,
        // 记录图片个数
        imagesLength: 0,
      }
    },
    methods:{
      imagesLoad() {
        // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了
        if(++this.counter === this.imagesLength) {
          this.$emit('imagesLoad');
        }
      }
    },
    watch:{
      // 监听imagesInfo对象的变化，获取最新的图片个数
      imagesInfo() {
        this.imagesLength = this.imagesInfo.detailImage[0].list.length;
      }
    }
    
  }
</script>

<style scoped>
/* 整体样式设置 */
.images_info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
}

/* 描述部分 */
.info_desc {
  padding: 0 15px;
}

.info_desc .start,
.info_desc .end {
    width: 90px;
    height: 2px;
    background-color: #a3a3a5;
    position: relative;
}

.info_desc .start {
  float: left;
}

.info_desc .end {
  float: right;
}

.info_desc .start::before, .info_desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
}

.info_desc .end::after {
    right: 0;
}

.info_desc .desc {
    padding: 15px 0;
    font-size: 14px;
}

/* 关键词样式 */
.info_key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 16px;
}

/* 图片设置 */
.info_imagesList img {
  width: 100%;
  
}
</style>