import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store ({
  state: {
    cartList:[],
  },
  mutations,
  actions,
  //有判断逻辑的放到actions中
})
//3.导出store对象
export default store
