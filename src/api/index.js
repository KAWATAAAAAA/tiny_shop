import ajax from './axios.config';

const Api = {
  signIn: (data) => ajax('/user/login', "GET", data),
  getPublicKey: () => ajax('/user/PublicKey', "GET"),
  getUserInfo: () => ajax('/user/UserInfo', "GET"),
  uploadAvatar: (data) => ajax('/upload/avatar', "POST",data,'multipart/form-data')

}
export default Api
