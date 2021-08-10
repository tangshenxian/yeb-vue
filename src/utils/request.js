import axios from "axios";
import {Message} from "element-ui";
import router from "@/router";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

/*创建axios实例*/
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '',
  timeout: 10000
})

/*axios 相应拦截*/
service.interceptors.response.use(success => {
  /*判断响应码*/
  if (success.status && success.status === 200) {
    if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
      Message.error({message: success.data.message})
      return
    }
    if (success.data.message) {
      Message.success({message: success.data.message})
    }
  }
  return success.data
}, error => {
  const code = error.response.code
  if (code === 504 || code === 404) {
    Message.error({message: '服务器被吃啦( ╯□╰ )'})
  } else if (code === 403) {
    Message.error({message: '权限不足， 请联系管理员'})
  } else if (code === 401) {
    Message.error({message: '请先登录'})
    router.replace('/')
  } else {
    if (error.response.data.message) {
      Message.error({message: error.response.data().message})
    } else {
      Message.error({message: '未知错误'})
    }
  }
})

service.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token')
  //如果存在token
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, error => {
  Message.error(error.message)
})

export default service
