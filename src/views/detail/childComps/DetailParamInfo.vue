<template>
     <div class="param_info" v-if="Object.keys(paramInfo).length !== 0">
         <!-- 尺码表格 -->
         <table class="info_sizes"  >
            <tr v-for="(table,index) in paramInfo.sizes[0]" :key="index">
                <td v-for="(item,indey) in table" :key="indey">
                    {{item}}
                </td>
            </tr>
         </table>

         <!-- 厂家等信息 -->
         <table class="info_intro">
             <tr v-for="(tableo,indexo) in paramInfo.infos" :key="indexo">
                 <td class="intro_key">{{tableo.key}}</td>
                 <td class="intro_value">{{tableo.value}}</td>
             </tr>
         </table>

         <!-- 有的商品下面有图片有的没有，先判断有没有再显示 -->
         <div class="info_img" v-if="paramInfo.image.length !== 0">
             <img :src="paramInfo.image" alt="">
         </div>

     </div>
</template>

<script>
 
  export default {
    name: "DetailParamInfo",
    props:{
        paramInfo:{
            type:Object,
            default() {
		      return {}
            }
        }
    }
    
  }
</script>

<style scoped>
/* 整体样式 */
.param_info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}
/* 尺码表样式 */
.param_info table {
    width: 100%;
    border-collapse: collapse;
}

.param_info table tr {
    height: 42px;
}

.param_info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
}

.param_info .info_intro .intro_key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 30%;
}

.param_info .info_intro .intro_value {
    width: 70%;
    color: #eb4868;
}

.param_info .info_intro {
    border-top: 1px solid rgba(0,0,0,.1);
}

/* 可能存在的图片 */
.info_img img {
    width: 100%;
}






</style>