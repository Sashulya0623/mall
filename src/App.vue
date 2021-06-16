<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>   
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar.vue";

export default {
  name: "App",
  components: {
    MainTabbar
  },
};
</script>

<style>
/* 引入base.css */
/* @import url('./assets/css/base.css'); */
@import "./assets/css/base.css";
</style>
