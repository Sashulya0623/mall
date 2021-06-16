<template>
   <div class="goodslist">
       <GoodsListItem v-for="(item,index) in goods" :key="index" :listItem="item"> </GoodsListItem>
   </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList", //模板名称
  props:{
      goods:{
          type:Array,
          default() {
              return [];
          }
      }
  },
  components:{
      GoodsListItem,
  }
};
</script>

<style scoped>
.goodslist {
    display: flex;
    /* 让弹性盒元素在一行放不下子元素的时候换行  */
    flex-wrap: wrap;
    /* 周围留有空白 */
    justify-content: space-around;

    padding: 2px;
}

</style>