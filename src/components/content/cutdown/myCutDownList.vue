<template>
  <div id="myCutDown " class="content">
    <div class="cut-list margin-l-r-5 flex-column font-color-666 " v-for="(list, index) in cutDownList">
      <div class="cut-space-line"></div>
      <div class="time-action flex-row-sb">
        <span>{{list.expiry}}</span>
        <!--<span>{{list.cutDownTime}}</span>-->
        <count-down :endTime="list.endTime" :callback="callback" endText="已经结束了"></count-down>
      </div>
      <div class="bor-bot bor-top p-1">
        <div class="flex-row-sb">
          <span>
            <img  class="cut-down-list-img" :src="list.cutDownActivity.goods.thumbnail" alt="">
          </span>
          <span class="cut-down-info flex-column">
            <span class="cut-lgood-name font-color-666">{{list.cutDownActivity.goods.goodsName}}</span>
            <span class="flex-row-start">
              <span class="wx-kanjia">￥0元</span>
              <span class="original-price">原价{{list.amount}}元</span>
            </span>
          </span>
        </div>
        <div>离免费领还差{{list.lastmount}}元</div>
      </div>
      <div class="flex-row-sb activeSchool m-t-b-1">
        <span v-show="list.isOver">砍价中</span>
        <span v-show="!list.isOver" class="font-color-666">已结束</span>
        <mt-button plain type="danger" @click="toBargain (list.cutDownId)" >继续砍价</mt-button>
      </div>
    </div>
    <no-data v-show="cutDownList.length === 0"></no-data>
    <no-more-data v-show="cutDownList.length > 0"></no-more-data>
  </div>
</template>
<script>
  import Myservice from '../../common/service/service'
  import TimeSer from '../../common/timeService'
  import countDown from '../../common/countDown'
  import noData from '../../common/noData'
  import noMoreData from '../../common/noMoreData'
  export default {
    components: {
      countDown,
      noData,
      noMoreData
    },
    data () {
      return {
        wxUserInfo: {},
        isOver: false,
        params: {
          start: 1,
          limit: 10
        },
        cutDownList: [],
        expiryTime : '',
        countDown: ''
      }
    },
    mounted () {
      console.log(encodeURIComponent(window.location.href))
      this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
      console.log(this.wxUserInfo);
      this.getMycutDownList ()
    },
    methods: {
      getMycutDownList () {
        var params = {
          userId: this.wxUserInfo.userId,
          start: this.params.start,
          limit: this.params.limit
        };
        var promise = Myservice.queryMycutDownList(params);
        promise.then(res => {
          console.log(res);
          if (res && res.data && res.data.body && res.data.body.records) {
            this.cutDownList = res.data.body.records;
            let newDate = new Date();
            this.cutDownList.forEach(item => {
              let isOver = item.endTime - newDate.getTime();
              if(isOver > 0) {
                item.isOver = true;
              } else {
                item.isOver = false;
              }
              item.cutDownTime = item.endTime - new Date().getTime();
              item.expiry = TimeSer.expirationTime(item.endTime);
            })
          }
        })
      },
      toBargain (id) {
        var uri = {name: 'cutDownDetail', params: {id: id}};
        this.$router.push(uri)
      }
    }
  }
</script>
