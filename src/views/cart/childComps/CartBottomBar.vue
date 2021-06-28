<template>
  <div class="bottom-bar">
    <CheckBtn
      class="select_all"
      :isSelected="isSelectAll"
      @click.native="checkClick"
    ></CheckBtn>
    <span>全选</span>
    <span class="price">合计：{{ totalPrice }}</span>
    <span class="calculate" @click="calcClick">去结算({{ checkLength }})</span>
  </div>
</template>

<script>
import CheckBtn from "components/common/checkbtn/CheckBtn.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: { CheckBtn },
  computed: {
    ...mapGetters(["cartList"]),
    // 总价
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.lowNowPrice * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },

    //这里主要是如果上面全选了，下面的全选按钮就显示全选
    isSelectAll: function () {
      // 最好要有这个判断条件，不然购物车为空的时候也是选中状态
      if (this.cartList.length === 0) return false;
      //方法一：使用filter 先找一下有多少个没被选中的，再取反，也就是全被选中了，‘全选’按钮就变选中
      // return !(this.cartList.filter(item => !item.checked).length)
      // 方法二：使用find
      // return !this.cartList.find(item => !item.checked)
      // 方法三：普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    //这里是点击全选按钮，上面改变状态
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分或全部不选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },

    calcClick() {
       if (!this.isSelectAll) {
             this.$toast.show('请选购商品哦')
       }
    }
  },
};
</script>
<style scoped>
.bottom-bar {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 51px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #888;
  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-bar .select_all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-bar .price {
    margin-left: 35px;
    font-size: 16px;
    color: #666;
}

.bottom-bar .calculate {
    background-color: red;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
}
</style>
