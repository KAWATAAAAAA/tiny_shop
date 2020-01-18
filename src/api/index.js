import ajax from './axios.config';

const Api = {
  signIn:(data) => ajax('/user/login',"POST",data),
  getPublicKey:() => ajax('/user/getPublicKey',"POST"),
  getUserInfo:() => ajax('/user/getUserInfo',"POST"),

}

export default Api
