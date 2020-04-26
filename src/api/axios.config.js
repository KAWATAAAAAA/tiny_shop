import axios from 'axios'
import router from "../router/index";
import store from '../store'
/*
* 或许我应该称这个文件为 fetch 更贴切，因为内部实现了一套 Promise的操作
* */
axios.defaults.baseURL = 'http://localhost:8080/tiny_shop'
axios.defaults.timeout = 10000
axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem("token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.common['Authorization'] = window.localStorage.getItem("token");
    }

    return config;
  },
  error => {

    return Promise.reject(error);
  }
)
axios.interceptors.response.use(
  response =>{
    if (response.data.code === 10002 || response.data.code === 10001  || response.data.code === 401){
      alert("未登录，或者已经过期，或签名不匹配，我马上清除用户信息")
      window.sessionStorage.removeItem('userStatus')
      window.localStorage.removeItem('token')
      store.dispatch('userInfo/clearUserInfo')
      router.push({
        name:'Login'
      })
    }
     return response
  },
  error => {
    console.log(error)

    return Promise.reject(error);
  }
)
export default function ajax(url,type="GET",data={},opts = {}) {
  let promise
  let dataString = ""
  /*
  * 上传文件时的默认参数必须为 contentType：multipart/form-data;
  * 而 axios 默认的是 application/json，但我没做更改
  * 应该是请求的时候自动识别了传的参数，进行了 contentType 的改变
  * */
  switch(type){
    case 'GET':{
      /*
          * www.baidu.com?name=nenglong&password=123456
          * */
      Object.keys(data).forEach((key)=>{
        dataString += key + "=" + data[key] + '&'
      })
      dataString = dataString.substring(0,dataString.lastIndexOf('&'))
      url = url + '?' + dataString

      promise = axios.get(url)
    }break;
    case 'POST':{
      promise = axios.post(url,data,opts)
    }break;
    case 'PUT':{
      promise = axios.put(url,data,opts)
    }break;
    case 'PATCH':{
      promise = axios.patch(url,data,opts)
    }break;
  }


  return new Promise((resolve, reject)=>{
    promise.then(response =>{
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
