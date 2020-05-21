import ajax from './axios.config';

const Api = {

  /*home*/
  getHopGoodsList:() => ajax('/goods/goods-top','GET'),

  /*普通：用户登录、注册*/
  signIn: (data) => ajax('/user/login', "GET", data),
  signUp: (data) => ajax('/user/register', "POST", data),

  /*角色公用：获取公钥进行数据加密*/
  getPublicKey: () => ajax('/user/publicKey', "GET"),

  /*角色公用：个人信息获取*/
  getUserInfo: (id) => ajax('/user/userInfo', "GET", id),
  /*角色公用：个人信息编辑、修改*/
  updateUserInfo: (data) => ajax('/user/userInfo', "PATCH", data),

  /*上传*/
  uploadAvatar: (file) => ajax('/upload/avatar', "POST", file, 'multipart/form-data'),
  uploadStoreLogo: (file) => ajax('/upload/store-logo', 'POST', file, 'multipart/form-data'),
  uploadGoodsPreviewImg: (file) => ajax('/upload/goods-preview', 'POST', file, 'multipart/form-data'),

  /*普通：商家入驻*/
  settledIn: (data) => ajax('/store/settled-in', "PUT", data),
  /*商户：店铺中心信息获取*/
  getStoreInfo: (id) => ajax('/store/store-info', "GET", id),

  /*商户：商品上架*/
  setGoodsInfo: (data) => ajax('/goods/goods-info', 'PUT', data),
  updateGoodsInfo: (data) => ajax('/goods/goods-info', 'PATCH', data),
  deleteGoodsInfo: (data) => ajax('/goods/goods-info', 'POST', data),
  /*商户：获取商品列表*/
  getGoodsList: (data) => ajax('/goods/goods-list', 'GET', data),

  /*角色公用：购物车组件*/
  getShoppingCartGoodsList: (data) => ajax('/shopping-cart/goods-list', 'GET', data),
  addShoppingCartGoodsItem: (data) => ajax('/shopping-cart/goods-item', 'POST', data),
  updateShoppingCartGoodsInfo: (data) => ajax('/shopping-cart/goods-item', 'PATCH', data),

  /*角色公用：地址操作*/
  addAddressItem: (data) => ajax('/address/address-item', 'POST', data),
  getAddressList: () => ajax('/address/address-list', 'GET'),
  getAddressItem: (data) => ajax('/address/address-item', 'GET', data),
  updateAddressItem: (data) => ajax('/address/address-item', 'PATCH', data),

  /*订单操作*/
  createOrder: (data) => ajax('/order/stage-one','POST',data),
  updateOrderInfo:(data) => ajax('/order/stage-two','PATCH',data),
  toAliPayPage:(data) => ajax('/alipay/pay-page','POST',data), // 废弃
  getOrderHistoryList:(data) => ajax('/order/order-history','GET',data),
  getGoodsGroup:(data,opts) => ajax('/goods/goods-group','GET',data,opts),
  updateOrderStatusPayCompleted:(data) => ajax('/order/stage-four','PATCH',data),
  updateOrderStatusCompleted:(data) => ajax('/order/stage-seven','PATCH',data),
  deleteOrderItem:(data,opts) => ajax('/order/order-history','POST',data,opts),

  /*数据中心*/
  getMonthSaleData:(data)=> ajax('/data-center/base-data','GET',data),
  /* 数据中心 - 主页*/
  getTotalSalesVolume:(data) => ajax('/data-center/sales-volume','GET',data),

  /*主页*/
  getActiveUserList:(data) => ajax('/link/user-list','GET',data)
}




export default Api
