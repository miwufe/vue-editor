import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import store from '@/store/index'

export const BaseURL = process.env.VUE_APP_BASE_API

// 创建axios实例
const service = axios.create({
  baseURL: BaseURL,
  timeout: 1000000, // 请求超时时间,
  // request payload
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true
})

// 不显示右上角loading
NProgress.configure({ showSpinner: false })

// request拦截器
service.interceptors.request.use(config => {
  // 处理token
  // let { user } = store.state
  // config.headers.user = user.user
  // config.headers.token = user.token
  NProgress.start()
  return config
})

// 状态码错误信息--后期使用
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    NProgress.done()
    const resp = response.data
    // 如果请求不到数据或者非1
    return resp
  },
  error => {
    NProgress.done()
    let msg = ''
    if (!error.response) {
      msg = error.message
    } else {
      msg = `${codeMessage[error.response.status]}`
    }
    return Promise.reject(msg)
  }
)

export default service
