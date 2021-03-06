// wxapi.js
import wx from 'weixin-js-sdk'
import api from './index'
const wxApi = {
  /**
   * [isweixin 判断是否微信浏览器]
   */
  isweixin () {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true
    } else {
      this.$router.push({path: '/wxkj/isnotWechat'})
      return false
    }
  },
  /**
   * * [wxRegister 微信Api初始化]
* @param  {Function} callback [ready回调函数]
*/
  wxRegister (callback) {
    api.get('/wechat/portal/createJsapiSignature', {url:window.location.href}).then((res) => {
      var wxInfo = res.data.body;
      wx.config({
        debug: false, // 开启调试模式
        appId: wxInfo.appId, // 必填，公众号的唯一标识
        timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
        signature: wxInfo.signature,// 必填，签名
        jsApiList: [
          'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })
  },

  /**
   * [ShareTimeline 微信分享到朋友圈]
   * @param {[type]} opstion [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareTimeline (opstion) {
    wx.onMenuShareAppMessage({
      title: opstion.title, // 分享标题
      desc: opstion.desc, // 分享描述
      link: opstion.link, // 分享链接
      imgUrl: opstion.imgUrl, // 分享图标
      type: opstion.type, // 分享类型,music、video或link，不填默认为link
      dataUrl: opstion.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
      success () {
        // 用户成功分享后执行的回调函数
        opstion.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        opstion.error()
      }
    })
    console.log(wx.onMenuShareAppMessage)
  },
  payment (params) {
    wx.chooseWXPay({
      timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
      package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: params.paySign, // 支付签名
      success: function (res) {
// 支付成功后的回调函数
        params.success()
      }
    });
  }

}
export default wxApi

