import {GET_MERCHANT, CHANGE_CITY, SAVE_ADDRESS, SET_ADDRESS} from './mutation-types'
// 引用API文件
import api from '../api/index.js'
// 将API方法绑定到全局
const $http = api

export default {
  getData ({commit}, params){
    commit(GET_MERCHANT, params)
  },
  changeCity ({commit}, city) {
    commit(CHANGE_CITY, city)
  },
  setAddress ({commit}, params){
    commit(SET_ADDRESS, params)
  }
}
