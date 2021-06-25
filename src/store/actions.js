import {
    ADDCOUNTER,
    ADDTOCART
  } from './mutation-types'
  
  export default {
    addCart(context, payload){
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      console.log(oldProduct);
      //2.判断oldProduct
      if (oldProduct) {
        context.commit(ADDCOUNTER, oldProduct);
      } else {
        payload.count = 1;
        context.commit(ADDTOCART, payload)
      }
    }
  }
  