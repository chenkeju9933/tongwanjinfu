<template>
  <div id="orderDetail" v-if="orderInfo.orderItemList[0]" class="content">
    <div class="margin-l-r-5">
      <div class="time-action flex-row-sb">
        <span>状态：{{status}}</span>
      </div>
      <div class="bor-bot bor-top p-1">
        <div v-if="orderInfo" class="flex-row-sb">
          <span>
            <img  class="cut-down-list-img" :src="orderInfo.orderItemList[0].thumbnail" alt="">
          </span>
          <span class="cut-down-info flex-column">
            <span class="cut-lgood-name font-color-666">{{orderInfo.orderItemList[0].title}}</span>
            <span class="flex-row-sb">
              <span class="cut-lgood-name"><span v-show="orderInfo.orderItemList[0].attrValue">规格：</span>{{orderInfo.orderItemList[0].attrValue}}</span>
              <span class="wx-kanjia">￥{{orderInfo.orderItemList[0].price}}元</span>
            </span>
          </span>
        </div>
      </div>
      <div class="address-space-line "></div>
      <dl class="flex-column font-3-55">
        <dt class="flex-row-sb bor-bot-dashed lh10">
          <span>订单编号：</span>
          <span>{{orderInfo.orderId}}</span>
        </dt>
        <dt class="flex-row-sb bor-bot-dashed lh10">
          <span>下单时间：</span>
          <span>{{createTime}}</span>
        </dt>
        <dt class="flex-row-sb bor-bot-dashed lh10">
          <span>收货人：</span>
          <span>{{orderInfo.orderShipping.nikeName}}</span>
        </dt>
        <dt class="flex-row-sb bor-bot-dashed lh10">
          <span>收货地址：</span>
          <span>{{orderInfo.orderShipping.provinceName}}&nbsp{{orderInfo.orderShipping.cityName}}&nbsp
          {{orderInfo.orderShipping.countyName}}&nbsp{{orderInfo.orderShipping.detailInfo}}</span>
        </dt>
        <dt class="flex-row-sb bor-bot-dashed lh10">
          <span>联系方式：</span>
          <span>{{orderInfo.orderShipping.phone}}</span>
        </dt>
        <dt class="flex-row-sb lh10">
          <span>实付：</span>
          <span>{{orderInfo.orderItemList[0].price}}</span>
        </dt>
      </dl>
    </div>
  </div>
</template>

<script>
  import MyService from '../../common/service/service'
  import FormatSearch from '../../common/formatSearch'
  import TimeSer from '../../common/timeService'
  export default {
    data () {
      return {
        orderInfo: {},
        status: '',
        createTime: ''
      }
    },
    beforeMount () {
      this.getOrderDetail();
    },
    methods: {
      getOrderDetail () {
        let searchObj = FormatSearch(window.location.search);
        let params = {orderId: searchObj.orderId};
        let promise = MyService.queryOrderDetail(params);
        promise.then(res => {
          if (res && res.data && res.data.body) {
            this.orderInfo = res.data.body;
            console.log(this.orderInfo);
            switch (this.orderInfo.status) {
              case this.orderInfo.status === 1: this.status = '待付款';
                break;
              case this.orderInfo.status === 2: this.status = '待发货';
                break;
              case this.orderInfo.status === 3: this.status = '待收货';
                break;
              case this.orderInfo.status === 4: this.status = '已收货';
                break;
              case this.orderInfo.status === 5: this.status = '退款中';
                break;
              case this.orderInfo.status === 6: this.status = '已退款';
                break;
              case this.orderInfo.status === 7: this.status = '交易完成';
                break;
              case this.orderInfo.status === 8: this.status = '交易取消';
                break;
            }
            this.createTime = TimeSer.expirationTime(this.orderInfo.crTime);
          }
        })
      }
    }
  }
</script>

