<template>
  <div id="header">
    <mt-header v-bind:title="title">
      <router-link to="/" slot="left" >
        <mt-button icon="back" v-show="backBtnShow">返回</mt-button>
      </router-link>
      <mt-button  slot="right" v-show="confirm">保存</mt-button>
    </mt-header>
  </div>
</template>
<script>
  import MyService from '../common/service/service'
  export default {
    data () {
      return {
        title: '同玩金服',
        backBtnShow: false,
        confirm: false,
        wxUser: {
          userId: "1009330882298859521",
          unionId: "oYaA1wKjB8x9zKskX6w_rOLtduoA",
          openId: "oGIUY4zwk5LTxH121IXvu6FFSnfg",
          nickname: "Lyon",
          sex: 1,
          province: "Henan",
          city: "周口",
          country: "中国",
          headImgUrl: "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIGH3icictC93DqjV9pBNxjdRlmY1UeCCg4UudNAUgf6yybBwSyxLSicxbnDs6zzFKfic0xtfmpGPr7Vw/132",
          privilege: "河南",
          updateTime: 1530514165000,
          createTime: 1530514165000,
          mpOpenId: "oI1gz0e09ZfpBaB6k2nlapZSrITM",
          subscribe: 1,
          appOpenId: "",
          iosOpenId: "",
          fwpOpenId: ""
        },
      }
    },
    created () {
       //临时数据
		// 	this.login();
      // localStorage.setItem('wxUserInfo', JSON.stringify(this.wxUser))

    },
    watch: {
      $route(to) {
        let path = to.path.substring(1);
        if(path === 'home'|| path === 'myinfo' || path === 'allList' || path.indexOf('activityDetail')) {
          this.title = '同玩金服';
          this.backBtnShow = false;
          this.confirm = false;
        } else if(path === 'cutdown'){
          this.title = '0元砍单';
          this.backBtnShow = false;
          this.confirm = false;
        } else if(path.indexOf('detail') > -1) {
          this.backBtnShow = true
        } else if (path === 'addaddress') {
          this.title = '增加收获地址';
          this.backBtnShow = true;
          this.confirm = true;
        } else if (path === 'myaddress') {
          this.title = '我的地址';
          this.backBtnShow = false;
          this.confirm = false;
        }
      }
    },
    methods: {
      footerChange(path){
        console.log(123)
      },
      operation () {
        let path = to.path.substring(1);
        if (path === 'addaddress') {
          this.$store.dispatch('addAddress', this.params)
        }
      }
      // // 登录
      // getMyLogin() {
      //   var code = this.GetQueryString('code');
      //   var state = this.GetQueryString('state');
      //   var params = {
      //     code: code,
      //     state: state
      //   };
      //   var promise = MyService.queryMpLogin(params);
      //   promise.then((res) => {
      //     console.log("3333333",res);
      //     var user = res.data;
      //     var token = res.data.token;
      //     var data = res.data.body.wxUser.userId;
      //     console.log(res.data)
      //     localStorage.setItem("username", data);
      //     localStorage.setItem("user", JSON.stringify(user))
      //     localStorage.setItem("token", token)
      //   })
      // },
      // GetQueryString(name) {
      //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      //   var r = window.location.search.substr(1).match(reg);
      //   if(r != null) {
      //     return unescape(r[2]);
      //   }
      //   return null;
      // },
      // // // 判断路径是否带有
      // loginCode(){
      //   var url= window.location.href;
      //   if(url.indexOf("state=01")>=0){
      //     window.location.href = 'https://creditcard.cmbc.com.cn/wsv2/?etr=RZ0sn1tvLXif3fF1HtfDH7rOuCH79xOCeAlZXS+rLef8AkP727TfRc3/5DN+Rgym234qjpHlY3ALB49Tgb0wcF8ZVdMz6wHJHJ7SnPrw49JQSNe0CqtAAyeEsQJKODYbro/vvnJ7s+LMGuN6r7ynxWO/pbYjiucpBTq6XhkKHSef4gCD5hieWAVcgsQ6Mz1Lmk57FAX8IevWGOLoUmEVqnED2o2YtDf38Y9Ei4/rltScZUbCI6Vxj+yUFPpiQ1fEZdq5WkpNsiyBEUjyYxTJz0ZU2BZ73cliJwtm//1TTgHGyZBdCF8w5WOiFaNjeTrmdVbhqk3tSlDROtsDdFwXGxVleREpgfEwMrpgh4Y0LUhANLLngZbM5y/muQkhxiVTXB/Swa7xjS9DdMo4PraHttfVY/TqT20W5xZeJtXp3hSEPUK2hQOhVcihhChV/M1A5Iq9aUbDlWLtPKYvMRk6dYd9FNbmbAukkklMikw5PoffXATCSR0nHAL0AJK3c9U9';
      //   }
      // },
      // // 判断用户是否有登录
      // login(){
      //   var userId = localStorage.getItem("username");
      //   var username = localStorage.getItem("user");
      //   var url = window.location.href;
      //   if(url.indexOf("code")>=0){
      //     this.getMyLogin();
      //     return;
      //   }else{
      //     if(!username){
      //       if(!userId){
      //         this.getCode()
      //       }else{
      //         var params = {
      //           userId: userId
      //         };
      //         var promise = MyService.Logain(params);
      //           promise.then((res)=>{
      //           localStorage.setItem("token",JSON.stringify(res.data))
      //           localStorage.setItem("username",username);
      //           localStorage.setItem("token",res.token)
      //           window.location.href = 'https://creditcard.cmbc.com.cn/wsv2/?etr=RZ0sn1tvLXif3fF1HtfDH7rOuCH79xOCeAlZXS+rLef8AkP727TfRc3/5DN+Rgym234qjpHlY3ALB49Tgb0wcF8ZVdMz6wHJHJ7SnPrw49JQSNe0CqtAAyeEsQJKODYbro/vvnJ7s+LMGuN6r7ynxWO/pbYjiucpBTq6XhkKHSef4gCD5hieWAVcgsQ6Mz1Lmk57FAX8IevWGOLoUmEVqnED2o2YtDf38Y9Ei4/rltScZUbCI6Vxj+yUFPpiQ1fEZdq5WkpNsiyBEUjyYxTJz0ZU2BZ73cliJwtm//1TTgHGyZBdCF8w5WOiFaNjeTrmdVbhqk3tSlDROtsDdFwXGxVleREpgfEwMrpgh4Y0LUhANLLngZbM5y/muQkhxiVTXB/Swa7xjS9DdMo4PraHttfVY/TqT20W5xZeJtXp3hSEPUK2hQOhVcihhChV/M1A5Iq9aUbDlWLtPKYvMRk6dYd9FNbmbAukkklMikw5PoffXATCSR0nHAL0AJK3c9U9'
      //         })
      //         this.loginCode();
      //       }
      //     }else{
      //       this.loginCode();
      //     }
      //   }
      //
      // },
      // // 跳转到授权登录的页面
      // getCode(){
      //   console.log(window.location.href)
      //   var url = encodeURIComponent(window.location.href);
      //   // var url = encodeURIComponent('https://wapt.tongyuenet.com');
      //   // var url = encodeURIComponent('http://localhost:8080');
      //   window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx444e7a64378e3e7b&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STAT#Ewechat_redirect&connect_redirect=1';
      // }
    }
  }
</script>
