import ajax from './axios.config';

const Api = {
  signIn: (data) => ajax('/user/login', "GET", data),
  signUp: (data) => ajax('/user/register', "POST", data),
  getPublicKey: () => ajax('/user/publicKey', "GET"),
  getUserInfo: (id) => ajax('/user/userInfo', "GET", id),
  uploadAvatar: (file) => ajax('/upload/avatar', "POST", file, 'multipart/form-data'),
  updateUserInfo: (data) => ajax('/user/userInfo', "PATCH", data),
  uploadStoreLogo: (file) => ajax('/upload/store-logo', 'POST',file,'multipart/form-data'),
  settledIn: (data) => ajax('/store/settled-in',"PUT",data)
}

export default Api
