<template>
  <div id="home" class="flex-column content">
    <div class="homeImg">
      <img class="homeImg" src="http://src.tongyuenet.com/bank/ttyh.jpg" alt="主页图片">
      <!--<mt-swipe :auto="4000">-->
        <!--<mt-swipe-item v-for="(img, index) in goodsInfo.goodsHeaderImgs">-->
          <!--<img class="cut-detail-img" :src="img.url" alt="">-->
        <!--</mt-swipe-item>-->
      <!--</mt-swipe>-->
    </div>
    <nav class="navItem flex-row">
      <div v-for="(nav, index) in navItem" :key="index" @click="goDetail(nav)" class="flex-column-cen">
        <router-link :to="nav.src" tag="div">
          <span :class="nav.icon" class="iconfont flex-row dx-nav-icon"></span>
          <span class="normal-font-black">{{nav.text}}</span>
        </router-link>
      </div>
    </nav>
    <Merchant v-infinite-scroll="getMerchant"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10"></Merchant>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import {GET_MERCHANT} from '../../store/mutation-types'
  import Merchant from '../common/merchant'
  import {merchant} from "../../store/getters";
  import MyService from '../common/service/service'
  export default {
    components: {
      Merchant
    },
    created () {
      this.merchant.homeMerchantList = [];
      this.merchant.merchantList = []
      this.params.start = 0;
    },
    computed: {
      ...mapState(['merchant', 'city'])
    },
    mounted () {
      // if(window.location.href.indexOf('userCutDownId')> -1) {
      //   var uri2 = {name: 'cutDownDetail', params: {id: this.changeSearch(window.location.search)['id']}, query: {userCutDownId: this.changeSearch(window.location.search)['userCutDownId']}}
      //   this.$router.push(uri2)
      // }
    },
    data() {
      return {
        navItem: [{
          url: '/pages/activityList/main',
          id: 'applyCard',
          text: '办信用卡',
          icon: 'icon-card',
          openType: 'switchTab',
          src: '/'
        },
          {
            url: '/pages/zeroActivity/main',
            id: 'minsheng',
            text: '民生商城',
            icon: 'icon-basket',
            openType: 'switchTab',
            src: '/'
          },
          {
            url: '/pages/coupon/main',
            id: 'moreAction',
            text: '更多优惠',
            icon: 'icon-jiangpin',
            openType: 'navigate',
            src: '/allList'
          }
        ],
        options: {

          autoplay: {
            delay: 20000,

          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        msg: "同玩金服",
        list: [],
        banner: [],
        starttime: '',
        endtime: '',
        showDate: false,
        showda: false,
        show: false,
        params: {
          type: 'home',
          start: 0
        }
      }
    },
    methods: {
      getMerchant () {
       this.$store.dispatch('getData', this.params)
      },
      changeSearch(str) {
        if(str === undefined){
          return;
        }
        str = str.substr(1)
        var arr = str.split("&"),
          obj = {},
          newArr = [];
        arr.map(function(value,index,arr){
          newArr = value.split("=")
          if(newArr[0] !== undefined) {
            obj[newArr[0]] = newArr[1]
          }
        });
        return obj
      },
      getBannerImg () {

      }
    }
  }
</script>
