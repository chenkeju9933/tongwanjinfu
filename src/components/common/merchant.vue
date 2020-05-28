<template>
  <div class="merchant-list">
    <div v-for="(mock, index) in merchant.merchantList" :key="index" class="bor-top activeActical flex-row-sb">
      <router-link :to="mock.minAppUrl" tag="div" class="flex-row-sb">
        <div class="flex-column" >
          <img class="list-image" :src="mock.shop.thumbnail">
        </div>
        <div class="flex-column act-msg">
          <span class="title-font">{{mock.title}}</span>
          <span class="normal-font mt10">{{mock.desc}}</span>
          <span><span class="action-font action-border">{{mock.activityAmount}}</span></span>
          <span class="address-font iconfont icon-address">{{mock.shop.address}}</span>
        </div>
      </router-link>
    </div>
    <no-more-data v-show="merchant.merchantList.length > 0"></no-more-data>
    <no-data  v-show="merchant.merchantList.length === 0"></no-data>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import noMoreData from '../common/noMoreData'
  import noData from '../common/noData'
  export default {
    components: {
      noMoreData,
      noData
    },
    computed: {
      ...mapState([
        'merchant'
      ]),
    }
  }
</script>
