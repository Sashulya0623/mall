<template>
     <NavBar class="de_navbar">
         <div slot="left" class="nav_left" @click="backClick">
             <img src="~assets/img/common/back.svg" alt="">
         </div>
         <div slot="center"  class="nav_center">
             <div v-for="(item,index) in titles" :key="index" 
              class="item_center"
              :class="{active:currentIndex === index}"
              @click="titleClick(index)">
                 {{item}}
             </div>
             
         </div>
     </NavBar>
</template>

<script>
 import NavBar from "components/common/navbar/NavBar.vue";
  export default {
    name: "DetailNavbar",
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex:0,
        }
    },
    components:{
        NavBar,
    },
    methods:{
        titleClick(index) {
            this.currentIndex = index;
        },
        backClick() {
            this.$router.back();
        }
    }
    
  }
</script>

<style scoped>
.nav_left {
    margin-top: 6px;
}
.nav_center {
    display: flex;
   
}

.item_center {
    flex: 1;
}

.active {
    color: var(--color-high-text);
}
</style>