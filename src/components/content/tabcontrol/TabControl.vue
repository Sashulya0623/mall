<template>
  <div class="tab_control">
    <div class="item_control"
      v-for="(item, index) in titles" :key="index"
      @click="itemClick(index)">
      <span :class="{ active: currentIndex === index }">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl", //模板名称
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style>
/* 设置样式 */
.tab_control {
  display: flex;
  text-align: center;
}

.item_control {
  flex: 1;
  height: 44px;
  line-height: 44px;
}

.item_control span {
  padding: 5px;
}

.active {
  color: var(--color-tint);
  border-bottom: 2px var(--color-tint) solid;
}
</style>