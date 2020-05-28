<template>
  <div id="orderList" class="order-list content">
    <div class="discount-list active-bar flex-row">
      <nav class="all-type" v-for="(nav, index) in navList" @click="selectNav(nav.id)"
           v-bind:class="{barActive : isSelect === nav.id}">{{nav.text}}</nav>
    </div>
    <div class="cut-list margin-l-r-5 flex-column font-color-666 " v-for="(list, index) in orderList">
      <div class="cut-space-line"></div>
      <div class="time-action flex-row-sb">
        <span>订单编号：{{list.orderId}}</span>
      </div>
      <div class="bor-bot bor-top p-1">
        <div v-if="list.orderItemList[0]" class="flex-row-sb"  @click="goOrderDetail(list.orderId)">
          <span>
            <img  class="cut-down-list-img" :src="list.orderItemList[0].thumbnail" alt="">
          </span>
          <span class="cut-down-info flex-column">
            <span class="cut-lgood-name font-color-666">{{list.orderItemList[0].title}}</span>
            <span class="flex-row-sb">
              <span class="cut-lgood-name"><span v-show="list.orderItemList[0].attrValue">规格：</span>{{list.orderItemList[0].attrValue}}</span>
              <span class="wx-kanjia">￥{{list.orderItemList[0].price}}元</span>
            </span>
          </span>
        </div>
      </div>
      <div class="flex-row-sb activeSchool m-t-b-1">
        <span v-show="list.status === 1">待付款</span>
        <span class="font-color-666" v-show="list.status === 2">待发货</span>
        <span class="font-color-666" v-show="list.status === 3">待收货</span>
        <span class="font-color-666" v-show="list.status === 4">已收货</span>
        <span class="font-color-666" v-show="list.status === 5">退款中</span>
        <span class="font-color-666" v-show="list.status === 6">已退款</span>
        <span class="font-color-666" v-show="list.status === 7">交易完成</span>
        <span class="font-color-666" v-show="list.status === 8">交易取消</span>
        <div class="order-list-btn">
          <button v-show="list.status === 1" class="font-3-5 my-btn"  @click="toPay (list.orderId)" >付款
            <pay-count-down :endTime="list.mustPayTime" :callback="callback" endText="已过期"></pay-count-down>
          </button>
          <button v-show="list.status === 1" class="font-3-5 my-btn"  @click="cancelOrder (list.orderId)" >取消订单</button>
          <button v-show="list.status !== 1" class="font-3-5 my-btn"  @click="singlegain" >再来一单</button>
        </div>
        </div>
    </div>
    <no-more-data v-show="orderList.length > 0"></no-more-data>
    <no-data v-show="orderList.length === 0"></no-data>
  </div>
</template>
<script>
  import Myservice from '../../common/service/service'
  import payCountDown from '../../common/payCountDown'
  import noMoreData from '../../common/noMoreData'
  import noData from '../../common/noData'
  import wxapi from '../../../api/wxapi.js'
  export default {
    components: {
      payCountDown,
      noMoreData,
      noData
    },
    data () {
      return {
        orderList: [],
        paramsData: {
          limit: 10,
          start: 1,
          userId: '',
        },
        isSelect: 'all',
        navList: [
          {
            id: 'all',
            text: '全部'
          },
          {
            id: '1',
            text: '待付款'
          },
          {
            id: '2',
            text: '待发货'
          },
          {
            id: '3',
            text: '待收货'
          },
          {
            id: '4',
            text: '已收货'
          },
        ],
        message: '取消订单成功',
      }
    },
    beforeMount () {
      this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
      this.getOrderList ();
    },
    methods: {
      getOrderList (id) {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.orderList = [];
        let params = {
          userId: this.wxUserInfo.userId,
          limit: this.paramsData.limit,
          start: this.paramsData.start,
          status: id
        };
        let promise = Myservice.queryOrderList(params);
        promise.then(res => {
          if (res && res.data && res.data.body) {
            this.$indicator.close();
            this.orderList = res.data.body.records;
          }
        })
      },
      selectNav (id) {
        this.isSelect = id
        let params = {};
        if (id === 'all') {
          let status = '';
          this.getOrderList (status);
        } else {
          let status = id;
          this.getOrderList(status);
        }
      },
      //取消订单
      cancelOrder (id) {
        this.$messagebox.confirm('确定取消订单吗?').then(action => {
          let params = {
            orderId: id
          }
          let promise = Myservice.canaelOrder(params);
          promise.then(res => {
            if (res && res.data) {
              this.getOrderList();
              this.showMsg();
            }
          })
        });
      },
      showMsg () {
        this.$toast({
          message: this.message,
          duration: 2000,
          iconClass: 'icon icon-success'
        })
      },
      singlegain () {
        let uri = {name: 'cutdown'};
        this.$router.push(uri);
      },
      goOrderDetail (id) {
        let uri = {name: 'orderDetail', query: {orderId: id}};
        this.$router.push(uri);
      },
      toPay (list) {
        console.log(this.orderList)
        let param = {
          userCutDownId: list.userCutDownId,
          userId: list.userId,
          payment: list.orderItemList[0].price * 100,
          lastAmount: list.orderItemList[0].price,
          postFee: list.postFee,
          userMessage: list.userMessage,
          orderId: list.orderId,
          success: function () {
            alert('付款成功')
          }
        };
        wxapi.payment(param)
      }
    }
  }
</script>
