import axios from 'axios'
export const request = axios.create({
  // baseURL:'http://realworld.api.fed.lagounews.com'
  baseURL: 'https://conduit.productionready.io'
})
// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default (context) => {
  const {
    store,
    route
  } = context
  // 请求拦截器
  // Add a request interceptor
  // 任何请求都要经过请求拦截器
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 请求就会经过这里
    const {
      user
    } = store.state

    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }

    // 返回 config 请求配置对象
    return config
  }, function (error) {
    // 如果请求失败(此时请求还没有发出去)就会进入这里
    // Do something with request error
    return Promise.reject(error)
  })

  // 添加响应拦截器
  request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
}
