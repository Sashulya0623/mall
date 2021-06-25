<template>
  <div class="recommend_info">
      <GoodsList :goods="recommendInfo"></GoodsList>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";
  export default {
    name: "DetailRecommendInfo",
    props:{
        recommendInfo:{
            type:Array,
            default() {
                return []
            }
        }
    },
    components:{
         GoodsList,
    }
    
  }
</script>

<style scoped>
 
</style>
