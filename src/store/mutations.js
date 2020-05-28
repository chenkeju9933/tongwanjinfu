import {GET_MERCHANT, CHANGE_CITY, SAVE_ADDRESS, SET_ADDRESS} from "./mutation-types";
// 引用API文件
import api from '../api/index.js'
// 将API方法绑定到全局
const $http = api;
import unique from '../components/common/uni'
import MyService from '../components/common/service/service'


export default {
  [GET_MERCHANT] (state, type) {
    var params = {}
    if(type.type === 'home') {
      params = {
        start: type.start,
        limit: 10
      }
    } else if (type.type === 'active') {
      params = {
        start: type.start,
        limit: 10,
        shopType: type.shopType,
        cityId: type.cityId
      }
      if (type.schoolId) {
        params.schoolId = type.schoolId
      }
    }
    var promise = MyService.queryMerchant(params);
    // $http.get('/cms/shop/shopActivity/selectByPage', params).then((res) => {
    promise.then((res) => {
      if(res.data.records.length === res.data.size){
        type.start++
      }
      state.merchant.homeMerchantList.push(res.data)
      state.merchant.homeMerchantList = unique(state.merchant.homeMerchantList, 'current')
      state.merchant.homeMerchantList.forEach(function (item) {
        state.merchant.merchantList = state.merchant.merchantList.concat(item.records)
      });
      state.merchant.merchantList=unique(state.merchant.merchantList, 'id')
    }).catch(function (res) {
      type.start = params.start - 1
    })
  },
  [CHANGE_CITY] (state, city) {
    state.cityInfo.city = city.city;
    state.cityInfo.cityId = city.cityId;
  },
  [SET_ADDRESS] (state, params) {
    state.addressInfo.countyName = params.countyName;
    state.addressInfo.detailInfo = params.detailInfo;
    state.addressInfo.isDef = params.isDef;
    state.addressInfo.nikeName = params.nikeName;
    state.addressInfo.phone = params.phone;
    state.addressInfo.postalCode = params.postalCode;
    state.addressInfo.provinceName = params.provinceName;
  }
}
