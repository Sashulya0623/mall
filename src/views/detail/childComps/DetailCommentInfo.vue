<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment_info">
      <div class="info_header">
          <div class="header_title">用户评价</div>
          <div class="header_more">
              更多>>
          </div>
      </div>

      <!-- 评论的用户名 -->
      <div class="info_user">
          <img :src="commentInfo.user.avatar" alt="">
          <span>{{commentInfo.user.uname}}</span>
      </div>

      <!-- 具体评论内容 -->
      <div class="info_detail">
          <p>{{commentInfo.content}}</p>
          <!-- 评论的时间 ，评论的衣服类型-->
          <div class="info_other">
              <span class="date">{{commentInfo.created | showDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
          <!-- 用户评论的图片 -->
          <div class="info_imgs">
              <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils"; 
  export default {
    name: "DetailCommentInfo",
    props:{
        commentInfo:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    filters: {
		showDate: function (value) {
            let date = new Date(value*1000);
            // 时间格式转换
            return formatDate(date, 'yyyy-MM-dd')
      }
    }
    
  }
</script>

<style scoped>
/* 整体样式 */
.comment_info {
    padding: 5px 15px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
}

 /* 头部样式 */
 .info_header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
}

 .header_title {
    float: left;
    font-size: 16px;
}

 .header_more {
    float: right;
    margin-right: 10px;
    font-size: 14px;
}
/* 用户名设置 */
.info_user {
    padding: 10px 0  5px;
}

.info_user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}

.info_user span {
    position: relative;
    font-size: 16px;
    top: -15px;
}

/* 评论内容 */
.info_detail {
    padding: 0 5px 15px;
}

.info_detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}

.info_detail .info_other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
}

.info_other .date {
    margin-right: 8px;
}

/* 用户评论图片 */
.info_imgs {
    margin-top: 10px;
}

.info_imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
 
</style>
