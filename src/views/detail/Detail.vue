<template>
    <div id="detail">
        <DetailNavbar></DetailNavbar>
        <DetailSwiper :topImages="topImages"></DetailSwiper>
        <DetailBaseInfo :GoodsInfo="GoodsInfo"></DetailBaseInfo>
        <DetailShopInfo :Shop="Shop"></DetailShopInfo>
        <ul>
            <li>1li</li>
            <li>2li</li>
            <li>3li</li>
            <li>4li</li>
            <li>5li</li>
            <li>6li</li>
            <li>7li</li>
            <li>8li</li>
            <li>9li</li>
            <li>10li</li>
            <li>11li</li>
            <li>12li</li>
            <li>13li</li>
            <li>14li</li>
            <li>15li</li>
            <li>16li</li>
            <li>17li</li>
            <li>18li</li>
            <li>19li</li>
            <li>20li</li>
            <li>21li</li>
            <li>22li</li>
            <li>23li</li>
            <li>24li</li>
            <li>25li</li>
            <li>26li</li>
            <li>27li</li>
            <li>28li</li>
            <li>29li</li>
            <li>30li</li>
            <li>31li</li>
            <li>32li</li>
            <li>33li</li>
            <li>34li</li>
            <li>35li</li>
            <li>36li</li>
            <li>37li</li>
            <li>38li</li>
            <li>39li</li>
            <li>40li</li>
            <li>41li</li>
            <li>42li</li>
            <li>43li</li>
            <li>44li</li>
            <li>45li</li>
            <li>46li</li>
            <li>47li</li>
            <li>48li</li>
            <li>49li</li>
            <li>50li</li>
        </ul>
    </div>
    
</template>

<script>
 import DetailNavbar from "./childComps/DetailNavbar.vue";
 import DetailSwiper from "./childComps/DetailSwiper.vue";
 import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
 import DetailShopInfo from "./childComps/DetailShopInfo.vue";

 import {getDetail,GoodsInfo,Shop} from "network/detail.js";
  export default {
    name: "Detail",
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
        }
    },
    components:{
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
    },
    created() {
        // 1. 接收商品iid
        // 1.1 问题： 点击很多商品拿到的都是第一个商品的iid
        // 1.2 解决问题 ： 本组件不使用keep-alive，在App.vue中keep-alive添加exclude="Detail"
        this.iid = this.$route.params.iid;

        // 2. 请求详情页商品数据
        this.getDetail(this.iid);
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
            }) 
        }
    }

    
    
  }
</script>

<style scoped>

</style>
