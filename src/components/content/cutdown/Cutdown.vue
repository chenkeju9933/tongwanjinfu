<template>
  <div id="cutDown" class="flex-column content " v-infinite-scroll="getBargainData"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">
    <div class="homeImg" @click="shareToFriend">
      <img class="homeImg" src="http://src.tongyuenet.com/bananer/3/cutDownbananer.jpg" alt="主页图片">
    </div>
    <dl  class="flex-row mb0" >
      <dt class="pb2" v-bind:class="{barActive: isSelect === navs[0].id}"  @click="selectNav(navs[0].id)">{{navs[0].text}}</dt>
      <dt class="pb2" v-bind:class="{barActive: isSelect === navs[1].id}"  @click="selectNav(navs[1].id)">{{navs[1].text}}</dt>
      <dt class="pb2" v-bind:class="{barActive: isSelect === navs[5].id}"  @click="selectNav(navs[5].id)">{{navs[5].text}}</dt>
      <dt class="pb2" v-bind:class="{barActive: isSelect === all.id}"  @click="selectNav(all.id)">{{all.text}}</dt>
    </dl>
    <div class="po-relative">
      <div class="po-absolute flex-row">
        <span v-for="(nav, index) in navs" class="po-absolute goodsType m-t-b-1 goodsTypeChose">{{nav.text}}</span>
      </div>
    </div>
    <dl class="mt0 merchant-list">
      <dt class="activeActical bor-bot" v-for="(bargain, index) in bargainList">
        <router-link class="flex-row " tag="div" :to="'/cutdetail/'+bargain.id">
        <div>
          <img class="list-image bor-radiu5" :src="bargain.goods.thumbnail" alt="">
        </div>
        <dl class="flex-column act-msg">
          <dt class="title-font">{{bargain.title}}</dt>
          <dt class="font-color-666 l-h-7">
            <img class="cut-head-img" v-show="bargain.headerImages[0]" :src="bargain.headerImages[0]" alt="">
            <img class="cut-head-img" v-show="bargain.headerImages[1]" :src="bargain.headerImages[1]" alt="">
            <img class="cut-head-img" v-show="bargain.headerImages[2]" :src="bargain.headerImages[2]" alt="">
            <span v-show="bargain.headerImages.length>3">...</span>
            <span class="time-action" v-show="bargain.headerImages.length>0">已有{{bargain.headerImages.length}}人砍价</span>
            <span class="time-action" v-show="bargain.headerImages.length<=0">暂无人砍价</span>
          </dt>
          <dt>
            <span class="current-price">￥0元</span>
            <span class="original-price">原价{{bargain.goods.currentPrice}}元</span>
          </dt>
          <dt><span class="to-bargain">去砍价</span></dt>
        </dl>
        </router-link>
      </dt>
      <no-data v-show="bargainList.length === 0"></no-data>
      <no-more-data v-show="bargainList.length > 0"></no-more-data>
    </dl>
  </div>
</template>
<script>
  import unique from '../../common/uni'
  import MyService from '../../common/service/service'
  import noData from '../../common/noData'
  import noMoreData from '../../common/noMoreData'
  export default {
    components: {
      noData,
      noMoreData
    },
    data () {
      return {
        isSelect: '1',
        navs: [
          {
            id: '1',
            text: '推荐'
          },
          {
            id: '2',
            text: '优惠'
          },
          {
            id: '3',
            text: '数码'
          },
          {
            id: '4',
            text: '美妆'
          },
          {
            id: '5',
            text: '生活'
          },
          {
            id: '6',
            text: '培训'
          }
        ],
        all: {
          id: 'all',
          text: '全部'
        },
        bargainList: [],
        bargainParams: {
          start: 1,
          limit: 10,
          categoryId: 1
        }
      }
    },
    beforeCreate () {
      if(window.location.search && this.$route.query.userId && this.$route.query.userCutDownId && this.$route.query.userCutDownId) {
        console.log(this.$route.query)
        let param = {
          id: this.$route.query.id
        };
        let query = {
          userId: this.$route.query.userId,
          userCutDownId: this.$route.query.userCutDownId
        };
        let uri = {name: 'cutDownDetail', params: param, query: query};
        this.$router.push(uri);
      }
    },
    methods: {
      selectNav (id) {
        this.isSelect = this.bargainParams.categoryId = id;
        this.bargainParams.start = 1;
        if (id === 'all') {
          return;
        } else {
          this.bargainList = [];
          this.getBargainData ()
        }
      },
      getBargainData () {
        let that = this;
        let promise = MyService.queryCutDownList(this.bargainParams);
        promise.then( res => {
          if(res && res.data && res.data.body && res.data.body.records){
            let bargainList = []
            if (res.data.body.records.length === this.bargainParams.limit) {
              this.bargainParams.start++
            }
            bargainList.push(res.data.body);
            unique(bargainList, 'current').forEach(function (item) {
              that.bargainList = that.bargainList.concat(item.records)
            });
            this.bargainList = unique(this.bargainList, 'id')

          }
        })
      },
      shareToFriend () {


        console.log('hsuikfdusfgbjksdfgh',wx.onMenuShareAppMessage)
        this.$wx.onMenuShareAppMessage({
          title: '砍一刀', // 分享标题
          desc: '砍一刀', // 分享描述
          link: 'https://wapt.tongyuenet.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://src.tongyuenet.com/djq/hsd.png', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
// 用户点击了分享后执行的回调函数
            console.log(hsuikfdusfgbjksdfgh)
          }
        })


      }
    }
  }
</script>
