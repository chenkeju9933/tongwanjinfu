<template>
  <div id="fillOrder" class="content grid-bg picker-slot-wrapper">
    <div style="font-size: 0">
      <img class="body-width bg-white" src="../../../../static/image/order-top.png" >
    </div>
    <div class="header-address p5 bg-white pto">
      <span class="font-3-5 lh6 flex-column">
        <span>{{shippingAddress.nikeName}}，{{shippingAddress.phone}}</span>
        <span>{{shippingAddress.provinceName}}&nbsp{{shippingAddress.cityName}}&nbsp{{shippingAddress.countyName}}&nbsp{{shippingAddress.detailInfo}}</span>
        <span class="font-color-666" @click="changeAddress">更改地址</span>
      </span>
    </div>
    <div class="order-info flex-column p5 mt2 bg-white">
      <span class="flex-row-sb list-up bor-bot-dashed">
        <span>商品合计</span>
        <span>{{goodsInfo.lastmount}}</span>
      </span>
      <span class="flex-row-sb list-up">
        <span>运费</span>
        <span>0￥</span>
      </span>
    </div>
    <div class="goods-info flex-row p5 mt2 bg-white">
      <div>
        <img class="share-image" :src="goodsInfo.sku.thumbnail" alt="">
      </div>
      <div class="flex-column w60">
        <span class="break-all">{{goodsInfo.cutDownTitle}}</span>
        <span>￥{{goodsInfo.lastmount}}元<span>原价{{goodsInfo.amount}}</span></span>
      </div>
    </div>
    <!--<div class="leave-word p5 mt2 bg-white">买家留言</div>-->
    <mt-field label="买家留言" type="textarea" rows="2" v-model="leaveWord"></mt-field>
    <div class="submit-btn flex-row bg-white come-on p0">
      <span class="buyNow w70 mint-header bor-top">当前应支付￥{{goodsInfo.lastmount}}</span>
      <span class="w30" @click="goPay">去支付</span>
    </div>
  </div>
</template>
<script>
  import Myservice from '../../common/service/service'
  import FormatSearch from '../../common/formatSearch'
  import wxapi from '../../../api/wxapi.js'
  export default {
    data () {
      return {
        shippingAddress: {
          cityName: '',
          countyName: '',
          detailInfo: '',
          isDef: 0,
          nikeName: '',
          phone: '',
          postalCode: '',
          provinceName: '',
          userId: ''
        },
        urlSearch: {},
        postFee: 0,
        goodsInfo: {
          amount: '',
          lastmount: ''
        },
        leaveWord: '',
      }
    },
    beforeMount () {
      this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
      if(window.location.search.indexOf('address=reset') > -1) {
        this.shippingAddress = this.$store.state.addressInfo;
      } else {
        this.getAddress ();
      }
      this.getGoodsInfo ();
      this.urlSearch = FormatSearch(window.location.search);
    },
    methods: {
      getAddress () {
        let params = {
          userId: this.wxUserInfo.userId
        };
        let promise = Myservice.queryAddress(params);
        promise.then(res => {
          if(res && res.data && res.data.body) {
            let myAddress = res.data.body;
            self = this;
            myAddress.forEach(function (address) {
              if (address.isDef === 0) {
                self.shippingAddress = address;
              }
            })

          }
        })
      },
      getGoodsInfo () {
        let params = {
          userId: this.wxUserInfo.userId,
          cutDownId: this.$route.query.cutDownId
        };
        let promise = Myservice.qureyCutDownInfo(params);
        promise.then(res => {
          if(res && res.data && res.data.body) {
            this.goodsInfo = res.data.body;
          }
        })
      },
      goPay () {
        let params = {
          userCutDownId: this.goodsInfo.id,
          userId: this.wxUserInfo.userId,
          payment: this.goodsInfo.lastmount * 100,
          lastAmount: this.goodsInfo.lastmount,
          postFee: this.postFee,
          userMessage: this.leaveWord,
          deliveryId: this.shippingAddress.id,
          orderId: this.urlSearch.orderId,
          success: function () {

          }
        };
        let promise = Myservice.createCutPreOrder(params);
        promise.then(res => {
          if (res && res.data && res.data.body) {
            let param = res.data.body;
            param.success = this.paySuccess();
            wxapi.payment(param);
          }
        })
      },
      paySuccess () {
        alert('付款成功')
      },
      changeAddress () {
        let search = FormatSearch(window.location.search);
        let uri = {name: 'myAddress', query:search};
        this.$router.push(uri);
      }
    }
  }
</script>
