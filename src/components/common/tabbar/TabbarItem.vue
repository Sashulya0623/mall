<template>
  <div class="tab_bar_item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item_icon"></slot>
    </div>
    <div v-else>
      <slot name="item_active_icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item_text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      // isActive:true,
    };
  },
  methods: {
    itemClick() {
      //解决两次点击报错问题
      if (this.$route.path == this.path) {
        return '';
      }
      //路由跳转
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      // this.$route.path当前活跃路由路径
      // this.path 是item各自的路径
      //如果当前path在路由映射表内，则返回true（隐式返回），不在数组里，indexOf会返回-1，这是indexOf函数
      return !this.$route.path.indexOf(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style>
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
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
}
   
    
</style>