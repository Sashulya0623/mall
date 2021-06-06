// 首页数据请求
// 注意这里用大括号引入request是因为request.js中没有默认导出request
import {request} from "./request.js"

// 请求首页数据
export function getHomeMultidata() {
    return request({
      url: '/home/multidata',
    })
  }
