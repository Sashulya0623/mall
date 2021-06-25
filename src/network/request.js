import axios from 'axios'

// 由于axios.create本身就是返回了一个Promise，因此这里可以直接返回axios实例
export function request(config) {
    //1、创建axios的实例
    const instance = axios.create({
        baseURL: '找老师',
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1.请求拦截的作用  
    instance.interceptors.request.use(config => {
        
        return config;
        }, err => {
            // console.log(err);
        })

    // 2.2.响应拦截 2个参数，第一个参数是成功后的结果集res处理函数，一个失败的处理函数
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })


    //3、发送真正的网络请求
    return instance(config);
}




