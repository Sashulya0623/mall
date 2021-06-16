<template>
    <div class="back_top" >
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>


export default {
  name: "BackTop", //模板名称
  data() {
      return {
          //isShow:false,
      }
  }
 
};
</script>

<style scoped>
.back_top {
    position: fixed;
    right: 10px;
    bottom: 60px;
}

.back_top img {
    width: 43px;
    height: 43px;
}
</style>>

