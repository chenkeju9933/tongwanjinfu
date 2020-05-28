<template>
  <div id="main" class="content">
    <div class="my-info flex-row-center">
      <img class="my-info-image m10" :src="wxUserInfo.headImgUrl" alt="">
      <div class="my-info-text font-4-5">{{wxUserInfo.nickname}}</div>
    </div>
    <div class="contact-service font-4-5">联系客服</div>
    <div class="my-service ">
      <router-link to="/mycutlist" class="flex-row-sb pb5 m10 bor-bot" tag="div">
        <span class="font-3-5">我的砍价</span>
        <span class="iconfont icon-goright font-3-5"></span>
      </router-link>
      <router-link to="/myorderlist" class="flex-row-sb pb5 m10 bor-bot" tag="div">
        <span class="font-3-5">我的订单</span>
        <span class="iconfont icon-goright font-3-5"></span>
      </router-link>
      <router-link to="/mydiscountlist" class="flex-row-sb pb5 m10 bor-bot" tag="div">
        <span class="font-3-5">我的优惠券</span>
        <span class="iconfont icon-goright font-3-5"></span>
      </router-link>
      <router-link to="/myaddress" class="flex-row-sb m10" tag="div">
        <span class="font-3-5">我的收货地址</span>
        <span class="iconfont icon-goright font-3-5"></span>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        wxUserInfo: {}
      }
    },
    beforeMount () {
      this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
    }
  }
</script>
