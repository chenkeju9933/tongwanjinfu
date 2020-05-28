// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import axios from 'axios'
import store from './store/index'
import 'mint-ui/lib/style.css'
import '../static/font/iconfont.css'
import '../static/css/style.css'
import VueBarcode from '@xkeshi/vue-barcode'; //导入条形码插件
Vue.component('barcode', VueBarcode);  //声明条形码组件
// 引用API文件
import api from './api/index.js'
import Global from './config/index'
import MyService from './components/common/service/service'
Vue.config.devtools = true
// 将API方法绑定到全局
Vue.prototype.$http = api
Vue.prototype.GLOBAL = Global


Vue.use(MintUI, axios)

Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    // 需要在这里取到设置好的token的值
    const token = localStorage.getItem("token")
    if (token) {
      // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
      config.headers.Authorization = token;
      console.log(token)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  });
// 登录
if(!localStorage.getItem('user'))  {
  localStorage.setItem('user', '')
}
function getMyLogin() {
  var code = GetQueryString('code');
  var state = GetQueryString('state');
  var params = {
    code: code,
    state: state
  };
  var promise = MyService.queryMpLogin(params);
  promise.then((res) => {
    var user = res.data;
    var token = res.data.token;
    var data = res.data.body.wxUser.userId;
    console.log(res.data)
    localStorage.setItem("username", data);
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  })
};
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) {
    return unescape(r[2]);
  }
  return null;
};
// // 判断路径是否带有
function loginCode(){
  var url= window.location.href;
  if(url.indexOf("state=01")>=0){
    window.location.href = 'https://creditcard.cmbc.com.cn/wsv2/?etr=RZ0sn1tvLXif3fF1HtfDH7rOuCH79xOCeAlZXS+rLef8AkP727TfRc3/5DN+Rgym234qjpHlY3ALB49Tgb0wcF8ZVdMz6wHJHJ7SnPrw49JQSNe0CqtAAyeEsQJKODYbro/vvnJ7s+LMGuN6r7ynxWO/pbYjiucpBTq6XhkKHSef4gCD5hieWAVcgsQ6Mz1Lmk57FAX8IevWGOLoUmEVqnED2o2YtDf38Y9Ei4/rltScZUbCI6Vxj+yUFPpiQ1fEZdq5WkpNsiyBEUjyYxTJz0ZU2BZ73cliJwtm//1TTgHGyZBdCF8w5WOiFaNjeTrmdVbhqk3tSlDROtsDdFwXGxVleREpgfEwMrpgh4Y0LUhANLLngZbM5y/muQkhxiVTXB/Swa7xjS9DdMo4PraHttfVY/TqT20W5xZeJtXp3hSEPUK2hQOhVcihhChV/M1A5Iq9aUbDlWLtPKYvMRk6dYd9FNbmbAukkklMikw5PoffXATCSR0nHAL0AJK3c9U9';
  }
};
// 判断用户是否有登录
function login(){
  var userId = localStorage.getItem("username");
  var username = localStorage.getItem("user");
  var url = window.location.href;
  if(url.indexOf("code")>=0){
    getMyLogin();
    return;
  }else{
    if(!username){
      if(!userId){
        getCode()
      }else{
        var params = {
          userId: userId
        };
        var promise = MyService.Logain(params);
        promise.then((res)=>{
          localStorage.setItem("token",JSON.stringify(res.data))
          localStorage.setItem("username",username);
          localStorage.setItem("token",res.token)
          console.log('sdufjhiahfuhagufhuafghuijghfsuihu')
          window.location.href = 'https://creditcard.cmbc.com.cn/wsv2/?etr=RZ0sn1tvLXif3fF1HtfDH7rOuCH79xOCeAlZXS+rLef8AkP727TfRc3/5DN+Rgym234qjpHlY3ALB49Tgb0wcF8ZVdMz6wHJHJ7SnPrw49JQSNe0CqtAAyeEsQJKODYbro/vvnJ7s+LMGuN6r7ynxWO/pbYjiucpBTq6XhkKHSef4gCD5hieWAVcgsQ6Mz1Lmk57FAX8IevWGOLoUmEVqnED2o2YtDf38Y9Ei4/rltScZUbCI6Vxj+yUFPpiQ1fEZdq5WkpNsiyBEUjyYxTJz0ZU2BZ73cliJwtm//1TTgHGyZBdCF8w5WOiFaNjeTrmdVbhqk3tSlDROtsDdFwXGxVleREpgfEwMrpgh4Y0LUhANLLngZbM5y/muQkhxiVTXB/Swa7xjS9DdMo4PraHttfVY/TqT20W5xZeJtXp3hSEPUK2hQOhVcihhChV/M1A5Iq9aUbDlWLtPKYvMRk6dYd9FNbmbAukkklMikw5PoffXATCSR0nHAL0AJK3c9U9'
        })
        loginCode();
      }
    }else{
      loginCode();
    }
  }

};
// 跳转到授权登录的页面
function getCode(){
  console.log(window.location.href)
  var url = encodeURIComponent(window.location.href);
  // var url = encodeURIComponent('https://wapt.tongyuenet.com');
  // var url = encodeURIComponent('http://localhost:8080');
  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx444e7a64378e3e7b&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STAT#Ewechat_redirect&connect_redirect=1';
}

var orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key,newValue){
  var setItemEvent = new Event("setItemEvent");
  setItemEvent.newValue = newValue;
  window.dispatchEvent(setItemEvent);
  orignalSetItem.apply(this,arguments);
}

// localStorage.setItem("nm","1234");
login();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
