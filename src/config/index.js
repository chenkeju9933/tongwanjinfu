export default {
  data () {
    return {
      globalData: {
        userInfo: null,
        openId: null,
        havLogin: false,
        cityId: null,
        cityName: "杭州市",
        citys: [],
        cityList: [],
        windowWidth: 0,
        windowHeight: 0,
        locationType: [1, 2, 3, 4],
        host: "https://tapi.tongyuenet.com",
        sysInfo: {
        },
        api: {
          getCommissionDetail: "/partnerComm/selectCommInfoByUserId", // query = '?userId=1'
          getFlowDetail: "/partnerComm/selectCommByUserId",  // query = '?userId=1'
          getPartner: "/user/selectUserMember", // query = '?refereeId=985052122319015937&type=-1'
          getPartnerTotal: "/user/selectUserMemStats", // query='?refereeId=985052122319015937'
          getColumn: "/cms/kms/koeCategory/selectKoeCategroy",
          getColumnList: "/cms/kms/koeArticle/1", // query='?start=0&limit=10'
          getCityList: "/cms/dict/location/selectLocationTree",
          getSchoolList: "/cms/dict/location/selectSchools",
          emailConfirm: "/cms/system/email/sendEmailCheck", // query='?to=liyh@twyhj.com'
          emailVerificationCodeConfirm: "/cms/system/email/checkEmailCode", // query='?email=liyh@twyhj.com&code=1231y'
          sendMessageVerificationCode: "/cms/system/sms/sendVidifySms", // query='?phone=15869026934'
          messageVerificationCodeConfirm: "/cms/system/sms/smsCodeCheck", // query='?phone=15869026934&code=12314'
          activityRegistration: "/cms/user/activityApply/save",
          activityList: "/cms/shop/shopActivity/selectByPage", // query='?start=0&limit=20[&cityCode=3303][&areaCode=3303][&shopType=1]'
          shopActivityDetail: "/cms/shop/shopActivity/detail",//
          activityApply: "/cms/user/activityApply/save",
          selectShopTypes: "/cms/shop/shopType/selectTypes",
          updateUserInfo: "/wechat/min/updateUserInfo",
          selectCutDownList: "/cms/shop/cutDown/selectCutDownList",
          selectOneCutDown: "/cms/shop/cutDown/selectOne",
          createCutDown: "/cms/shop/cutDown/createCutDown",
          helpCutDown: "/cms/shop/cutDown/helpCutDown",
          cutDownHelpers: "/cms/shop/cutDown/cutDownHelpers",
          myCutDownList: "/cms/user/userCutDown/selectUserCutDownActivityInfoPage",
          getUserCoupon: "/cms/user/coupon/selectByPage",
          insertAddress: "/cms/user/deliveryAddress/insertAddress",
          getAddress:"/cms/user/deliveryAddress/getAddress",
          setDefAddress: "/cms/user/deliveryAddress/setDef",
          delAddress: "/cms/user/deliveryAddress/delAddress",
        }
      }
    }
  }
}
