<template>
  <div id="detail" class=" flex-column-sb detail-content">
    <div class="m2">
      <div class="detail-header flex-row-sb">
        <img class="header-img" :src="shopInfo.thumbnail" alt="">
        <div class="header-info flex-column-sb">
          <span class="shop-name">{{shopInfo.name}}</span><br>
          <span class="action-font">{{shopInfo.address}}</span>
        </div>
      </div>
      <div class=" mt10">
        <img class="detail-image" :src="shopInfo.thumbnail" alt="">
        <span class="flex-row-center" ><span class="money-off white-font-color">{{shopInfo.activityAmount}}</span></span>
      </div>
      <div class="detail-desc bor-bot shop-name">{{shopInfo.desc}}</div>
      <div class="detail-desc shop-name">活动时间：<span><span class="action-font detail-action">活动进行中</span></span></div>
    </div>
    <div class="space-line"></div>
    <div class="mt10">
      <div class="iconfont icon-address normal-font-black m10">{{shopInfo.address}}</div>
      <div id="container" class="detail-map">
    </div>

    </div>
  </div>
</template>
<script>
  import MyService from '../../common/service/service';
  export default {
    data () {
      return {
        shopId: 0,
        shopInfo: {

        }
      }
    },
    created () {
      console.log(this.$route.query.activityId)
      if(this.$route.query && this.$route.query.activityId){
        this.shopId = this.$route.query.activityId || ''
      }
    },
    mounted () {
      let param = {
        id: this.shopId
      }
      let promise = MyService.queryShopDetail(param);
      // this.$http.get('/cms/shop/shopActivity/detail', param).then(res =>  {
      promise.then(res =>  {
        if(res && res.data && res.data.body && res.data.body.shop){
          this.shopInfo = res.data.body.shop;
          this.shopInfo.activityAmount = res.data.body.activityAmount;
          this.shopInfo.desc = res.data.body.desc;
          this.shopInfo.longitude = Number(this.shopInfo.location.split(',')[0])
          this.shopInfo.latitude = Number(this.shopInfo.location.split(',')[1])
          console.log(this.shopInfo.longitude)
          console.log(this.shopInfo.latitude)
          this.loadMap();
        }
      })
    },
    methods: {
      loadMap(){
        var myLatlng = new qq.maps.LatLng(this.shopInfo.longitude, this.shopInfo.latitude);
        var myOptions = {
          zoom: 24,
          center: myLatlng,
          mapTypeId: qq.maps.MapTypeId.ROADMAP
        }
        var map = new qq.maps.Map(document.getElementById("container"), myOptions);
        var marker = new qq.maps.Marker({
          position: myLatlng,
          map: map
        });
      }
    }
  }
</script>
