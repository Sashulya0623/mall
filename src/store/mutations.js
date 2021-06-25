import {
    ADDCOUNTER,
    ADDTOCART
  } from './mutation-types'
  
  export default {
    //mutations唯一的目的就是修改state中状态
    //mutations中的每个方法尽可能完成的事件比较单一一点
    // 数量加一
    [ADDCOUNTER](state,payload) {
      payload.count++
    },
    [ADDTOCART](state,payload) {
      state.cartList.push(payload)
    }
  }
  