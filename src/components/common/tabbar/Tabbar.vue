<template>
  <div class="tab_bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabbar", 
};
</script>

<style>
/* tabbar设置在底部 */
.tab_bar {
  /* 弹性布局 */
  display: flex;
  position: fixed;
  /* 同时设置left和right保证宽度占满 */
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #f3f3f3;
}
 .tab_bar_item {
   /* 子元素都有相同的长度 */
  flex: 1;
  text-align: center;
  height: 49px;
} 

/* 设置图片大小 */
.tab_bar_item img {
  width: 24px;
  height: 24px;
}
</style>