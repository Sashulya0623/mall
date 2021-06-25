<template>
  <div class="listitem" @click="itemClick">
      <!--  
          listItem.show && listItem.show.img - 对应首页图片
          listItem.image 对应详情页推荐图片
        -->
      <img :src="showImg" alt="" @load="itemImgLoad">
      <div class="item_info">
          <p>{{listItem.title}}</p>
          <span class="price">{{listItem.price}}</span>
          <span class="collect_star">{{listItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem", //模板名称
  props:{
      // 每个商品是一个对象
      listItem:　{
          type:Object,
          default() {
              return {};
          }
      }
  },
  methods:{
      itemImgLoad() {        
          // console.log('imgload');
          // 发送给home.vue
          this.$bus.$emit('itemImgLoad');
      },
      itemClick() {
          //console.log("点击");
          // 跳转到详情页  
          // 详情页有个返回  所以用push
          //this.$router.push('/detail/' + this.listItem.iid);

        // if(this.listItem.iid) {
        //     this.$router.push('/detail/' + this.listItem.iid);
        // } else {
        //     this.$router.replace('/detail/' + this.listItem.item_id);
        // }

        if(this.$route.path.indexOf('home') !== -1) {
            // 首页推荐
            this.$router.push('/detail/' + this.listItem.iid);
        } else if(this.$route.path.indexOf('detail') !== -1) {
            // 没有数据接口  详情页推荐
            this.$router.replace('/detail/' + this.listItem.item_id);
        }
        
          
      },
      
  },
  computed:{
      // 显示图片
      showImg() {
          return (this.listItem.show && this.listItem.show.img) || this.listItem.image;
      }
  }
};
</script>

<style scoped>
.listitem {
    width: 48%;
    padding-bottom: 40px;
    /* 子绝父相，用来定位下面的title 和星图标 */
    position: relative;
}

.listitem img {
    width: 100%;
    border-radius: 5px;
}

.item_info {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
 

    font-size: 12px;
    text-align: center;
}
/* 标题设置 */
.item_info p {
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    /* 隐藏溢出的标题 */
    overflow: hidden;
}

.item_info .price {
    color: var(--color-high-text);
    margin-right: 20px;
}

.item_info .collect_star {
    position: relative;
}
/* 星星图标 */
.item_info .collect_star::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }



</style>