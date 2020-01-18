import axios from 'axios'
import router from "../router/index";
/*
* 或许我应该称这个文件为 fetch 更贴切，因为内部实现了一套 Promise的操作
* */
axios.defaults.baseURL = 'http://localhost:8080'
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

    if (response.data.status !== 200){
      console.log('nb1')
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
export default function ajax(url,type="GET",data={}) {
  return new Promise((resolve, reject)=>{
    let promise
    let dataString = ""

    if (dataString !== "")
    {
      /*
      * www.baidu.com?name=nenglong&password=123456
      * */
      Object.keys(data).forEach((key)=>{
        dataString += key + "=" + data[key] + '&'
      })
      dataString = dataString.substring(0,dataString.lastIndexOf('&'))
      url = url + '?' + dataString
    }
    if(type === 'GET'){
      promise = axios.get(url)
    }
    else{
      promise = axios.post(url,data)
    }

    promise.then(response =>{
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
