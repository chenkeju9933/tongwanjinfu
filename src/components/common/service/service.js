// 引用API文件
import api from '../../../api/index.js'
const $http = api;

var service = {
  //查询优惠信息
  queryMerchant (param) {
    let params = param || {};
    return $http.get('/cms/shop/shopActivity/selectByPage', params);
  },
  //优惠信息店铺详情查询
  queryShopDetail (param) {
    let params = param || {};
    return $http.get('/cms/shop/shopActivity/detail', params);
  },
  // 查询学校所在哪些区域
  queryLocationTree (param) {
    let params = param || {};
    return $http.get('/cms/dict/location/selectLocationTree', params);
  },
  // 查询各区域有哪些学校
  querySchool (param) {
    let params = param || {};
    return $http.post('/cms/dict/location/selectSchools', params);
  },
  //砍价列表信息
  queryCutDownList (param) {
    let params = param || {};
    return $http.get('/cms/shop/cutDown/selectCutDownList', params);
  },
  //砍价详情基本信息
  queryCutDownDetail (param) {
    let params = param || {};
    return $http.get('/cms/shop/cutDown/selectOne', params);
  },
  //查询登陆信息
  queryMpLogin (param) {
    let params = param || {};
    return $http.get('/wechat/mpLogin', params);
  },
  //登陆
  Logain (param) {
    let params = param || {};
    return $http.post('/user/login', params);
  },
  //创建砍单
  createCutDown (param) {
    let params = param || {};
    return $http.get('/cms/shop/cutDown/createCutDown', params);
  },
  //帮砍查询
  helpCutDown (param) {
    let params = param || {};
    return $http.get('/cms/shop/cutDown/helpCutDown', params);
  },
  //帮砍人员查询
  queryHelper (param) {
    let params = param || {}
    return $http.get('/cms/shop/cutDown/cutDownHelpersV2', params)
  },
  //获取微信配置信息
  queryWXInfo (param) {
    let params = param || {}
    return $http.get('/wechat/portal/createJsapiSignature', params);
  },
  //获取我的砍单列表
  queryMycutDownList (param) {
    let params = param || {};
    return $http.get('/cms/user/userCutDown/selectUserCutDownActivityInfoPage', params);
  },
  //获取可用优惠券列表
  queryDiscountList (param) {
    let params = param || {};
    return $http.get('/cms/user/coupon/selectByPage', params);
  },
  //增加地址
  insertAddress (param) {
    let params = param || {};
    return $http.post('/cms/user/deliveryAddress/insertAddress', params);
  },
  //查询地址
  queryAddress (param) {
    let params = param || {};
    return $http.get('/cms/user/deliveryAddress/getAddress', params);
  },
  //设置默认地址
  setDefaultAddress (param) {
    let params = param || {};
    return $http.get('/cms/user/deliveryAddress/setDef', params);
  },
  //删除地址
  delAddress (param) {
    let params = param || {};
    return $http.get('/cms/user/deliveryAddress/delAddress', params);
  },
  //砍单详情页商品详情
  queryGoodsById (param) {
    let params = param || {};
    return $http.get('/cms/shop/goods/selectGoodsById', params);
  },
  //砍单信息查询
  qureyCutDownInfo (param) {
    let params = param || {};
    return $http.get('/cms/shop/cutDown/checkCutDownInfo', params);
  },
  //创建订单号
  createOrderNum () {
    return $http.get('/order/createOrderId');
  },
  //创建砍单预下单
  createCutPreOrder (param) {
    let params = param || {};
    return $http.post('/pay/cutDownUnifiedOrder', params);
  },
  //查询订单列表
  queryOrderList (param) {
    let params = param || {};
    return $http.get('/order/getOrdersByUserId', params);
  },
  //取消订单
  canaelOrder (param) {
    let params = param || {};
    return $http.get('/order/closeOrder', params);
  },
  //查询订单详细信息
  queryOrderDetail (param) {
    let params = param || {};
    return $http.get('/order/getOrder', params);
  }

};
export default service
