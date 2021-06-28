<template>
  <div class="check_btn" :class="{no_selected: !isSelected}" @click="selectItem">
      <img src="@/assets/img/cart/tick.svg" alt=""  v-show="isSelected">
  </div>
</template>
<script>
export default {
    name: 'CheckBtn',
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        }
    },
    methods:{
        selectItem() {
            this.$emit("checkBtnClick");
        }
    }

}
</script>

<style scoped>
.check_btn{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
}
.no_selected {
    border: 2px solid rgba(100,100,100,.2);
}
.check_btn img {
    border-radius: 50%;
    background: var(--color-tint);
}
</style>
