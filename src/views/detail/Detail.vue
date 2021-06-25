<template>
    <div id="detail">
        <DetailNavbar class="detail_nav" ref="nav" @themeClick="themeClick"></DetailNavbar>
        <!-- 为了使用混入mixin，这里吧scroll的ref属性名设置和home一样 -->
        <Scroll class="detail_scroll" ref="home_scroll" @scroll="contentPosition" :probeType="3"> 
            <!-- 在scroll标签中做一个li接收方便查看商品是否可以添加 -->
            <!-- <ul>
                <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li>
            </ul> -->

            <DetailSwiper :topImages="topImages"></DetailSwiper>
            <DetailBaseInfo :GoodsInfo="GoodsInfo"></DetailBaseInfo>
            <DetailShopInfo :Shop="Shop"></DetailShopInfo>
            <DetailImagesInfo :imagesInfo ="imagesInfo" @imagesLoad="imagesLoad"></DetailImagesInfo>
            <DetailParamInfo ref="param" :paramInfo="paramInfo"></DetailParamInfo>
            <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
            <DetailRecommendInfo ref="recommend" :recommendInfo="recommendInfo"></DetailRecommendInfo>
        </Scroll>
        <!-- 底部分栏 -->
        <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
        <BackTop @click.native="backClick()" v-show="istopShow"></BackTop>
       
    </div>
    
</template>

<script>
 import DetailNavbar from "./childComps/DetailNavbar.vue";
 import Scroll from "components/common/scroll/Scroll.vue";
 import DetailSwiper from "./childComps/DetailSwiper.vue";
 import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
 import DetailShopInfo from "./childComps/DetailShopInfo.vue";
 import DetailImagesInfo from "./childComps/DetailImagesInfo.vue";
 import DetailParamInfo from "./childComps/DetailParamInfo.vue";
 import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
 import DetailRecommendInfo from "./childComps/DetailRecommendInfo.vue";
 import DetailBottomBar from "./childComps/DetailBottomBar.vue";
 import BackTop from "components/common/backtop/BackTop.vue";

 import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from "network/detail.js";
 import {imgListnerMixin,backTopMixin} from "common/mixin.js";
 import {debounce} from "common/utils.js";

  export default {
    name: "Detail",
    mixins:[imgListnerMixin,backTopMixin],
    data() {
        return {
            // 商品id保存
            iid:null,
            // 轮播图
            topImages:[],
            // 商品信息
            GoodsInfo:{},
            // 商家
            Shop: {},
            // 图片信息：下面的大图片
            imagesInfo:{},
            // 商品参数
            paramInfo:{},
            //评论信息
            commentInfo:{},
            // 推荐
            recommendInfo:[],
            // 保存获取的offsetTop
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            // 回到顶部按钮
            //istopShow:false,
        }
    },
    components:{
        DetailNavbar,
        Scroll,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailImagesInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailRecommendInfo,
        DetailBottomBar,
        BackTop,
    },
    created() {
        // 1. 接收商品iid
        // 1.1 问题： 点击很多商品拿到的都是第一个商品的iid
        // 1.2 解决问题 ： 本组件不使用keep-alive，在App.vue中keep-alive添加exclude="Detail"
        this.iid = this.$route.params.iid;
        

        // 2. 请求详情页商品数据
        this.getDetail(this.iid);

        // 3. 请求详情页推荐数据
        this.getRecommend();

         // 4. 给getThemeTopY赋值(对给this.themeTopYs复制的操作进行防抖)
            this.getThemeTopY = debounce(() =>{
                if(this.$refs.param && this.$refs.comment && this.$refs.recommend) {
                    this.themeTopYs = []
                    this.themeTopYs.push(0);
                    this.themeTopYs.push(this.$refs.param.$el.offsetTop);//参数的offsetTop
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);//评论的offsetTop
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);//推荐的offsetTop
                    this.themeTopYs.push(Number.MAX_VALUE);
                    console.log(this.themeTopYs);
                }  
            },200)

                
    },
    mounted() {

    },
    
    destroyed() {
        this.$bus.$off("itemImgLoad",this.homeListener);
  },

    methods:{
        // 2. 网络请求相关方法
        getDetail(iid) {
            getDetail(iid).then((res) => {
                console.log(res);
                // 2.1 保存轮播图数据
                const data = res.result;
                this.topImages = data.itemInfo.topImages;

                // 2.2 商品信息展示数据获取
                this.GoodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

                // 2.3 商家信息
                this.Shop = new Shop(data.shopInfo);

                // 2.4  获取商品图片信息  没有使用类
                this.imagesInfo = data.detailInfo;

                // 2.5 获取商品参数数据
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                // 2.6 获取评论数据
                // 2.6.1 先判断是否有评论
                if(data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0];
                }

              
            }) 
        },

        // 3.1 请求推荐数据
        getRecommend() {
            getRecommend().then((res) => {
                 console.log(res);
                this.recommendInfo = res.data.list;
            })
        } ,   
        
        
        // 监听图片加载事件回调函数
        imagesLoad() {
            this.$refs.home_scroll.refresh();
            // 在图片加载完成后,获取正确的offsetTop
            this.getThemeTopY();
        },
        
        // 监听标题点击事件回调函数
        themeClick:function(index) {
            // 运行后发现跳转到商品评论会多往上面一块
            // 给这里加一个44，把头部导航站的位置空出来
            //this.$refs.home_scroll.scrollTo(0,-this.themeTopYs[index] + 44,100);  
            // 如果有一个没有比如评论没有,就跳到下一个主题
                if(isNaN(-this.themeTopYs[index])==true){
                    this.$refs.home_scroll.scrollTo(0, -this.themeTopYs[index + 1] + 44,100)
                } else {
                    this.$refs.home_scroll.scrollTo(0,-this.themeTopYs[index] + 44,100); 
                }
        },

        // 监听滑动事件
        contentPosition: function(position) {
            // positionY和主题中themeTopYs[index]值进行对比
            // 1.获取y值,这里加上顶部导航的宽度44，不然需要上滚一段才能切换索引值
            const positionY = -position.y + 44;
	        let length = this.themeTopYs.length;
            // for (let i=0;i<length;i++) {
            //     if(this.currentIndex != i &&
            //         ((i<length - 1 && positionY >= this.themeTopYs[i] &&
           	//             positionY < this.themeTopYs[i+1])|| (i === length - 1 && 
           	//             positionY >= this.themeTopYs[i]))){
            //         this.currentIndex = i;
            //         this.$refs.nav.currentIndex = this.currentIndex;//实现联动，让索引值等于currentIndex值
            //     }
            // }
            for (let i=0;i<length-1;i++) {
                if (this.currentIndex !== i && 
                    (positionY >= this.themeTopYs[i] && 
                        positionY < this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }

            //  监听滑动位置
            // 滑动到一定位置 回到顶部按钮出现
            this.istopShow = (-position.y) >1000;

        },

        //  backtop回到顶部
        // backClick() {
        //   this.$refs.home_scroll.scrollTo(0,0);
        // },

        // 监听购物车
        addToCart: function() {
            //1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.GoodsInfo.title;
            product.desc = this.GoodsInfo.desc;
            product.newPrice = this.GoodsInfo.realPrice;
            product.iid = this.iid;

            //2. 将商品添加到购物车中
            //this.$store.commit('addCart',product);
            this.$store.dispatch('addCart',product);
        },

        

        },

        

    
    
  }
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 为了scroll方便设置高度 */
    height: 100vh;
}

/* 固定标题栏 */
.detail_nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}

/* 设置scroll高度：第二种方法 */
.detail_scroll {
    /* 算式的空格不能省略 */
    /* 做详情页底部栏时，为了完全显示商品调整滚动区域高度 再-58px */
    /* 在父组件的滚动部分scroll的class类content的height属性中减去底部导航的高度 */
    height: calc(100% - 44px - 58px);
}
</style>
