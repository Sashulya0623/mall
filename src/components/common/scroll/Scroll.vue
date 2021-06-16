<template>
  <!-- 
    1. ref如果是绑定在组件中的, 那么通过**this.$refs.refname**获取到的是一个组件对象.

    2. ref如果是绑定在普通的元素中, 那么通过**this.$refs.refname**获取到的是一个元素对象.

 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
BScroll.use(ObserveDOM);
BScroll.use(Pullup);

export default {
  name: "Scroll", //模板名称
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 使用scroll组件后页面无法点击设置click
      click: true,
      observeDOM: true,
      // 不设置2或3就不监听
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2. 监听滑动位置
    if (this.probeType === 2 || this.probeType === 3) {
      // 判断，更为严谨
      this.scroll.on("scroll", (position) => {
        //console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 3. 上拉加载更多 监听scroll滚到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 封装一下 滑动位置
    scrollTo(x, y, time = 300) {
      // 调用方法之前做个逻辑判断，看是否拿到scroll对象
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // 判断防抖函数是否生效
      console.log('imgload');
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      // 获取当前滑动的位置y
      return this.scroll ? this.scroll.y : 0;
    }
  },
};
</script>

<style scoped>
</style>>

