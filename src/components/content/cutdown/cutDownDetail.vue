<template>
  <div class="cut-down-detail content">
    <div>
      <div>
        <mt-swipe :auto="4000"  class="swiper-img">
          <mt-swipe-item v-for="img in goodsInfo.goodsHeaderImgs">
            <img class="swiper-img" :src="img.url" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="notice-bar" v-if="countDownTime">
        <count-down :endTime="countDownTime" :callback="callback" endText="已经结束了"></count-down>
      </div>
    </div>
    <div class="cut-info">
      <div  class="goods-title p5">{{baseInfo.goods.goodsName}}</div>
      <div class="goods-desc p-lr-5 pb5">&nbsp{{baseInfo.goods.goodsDes}}</div>
      <div class="flex-row-sb goods-price pb5">
        <span class="p-lr-5 ">
          <span class="current-price">￥{{floorPrice}}元</span>
          <span class="original-price">原价{{baseInfo.goods.marketPrice}}</span>
        </span>
        <span class="p-lr-5 lh10">
          <span class="original-desc">已有{{helperInfo.total}}人帮你砍</span>
        </span>
      </div>
      <div class=" p-lr-5 pb5">
        <div v-show="pressBarShow" class="progress-bar">
          <div class="progress-bar-process" v-bind:style="{width:barProgress}"></div>
          <div v-bind:style="{marginLeft:capsule}" class="capsule-parent">
            <div class="capsule" >当前价￥{{cutDownInfo.body.lastmount || baseInfo.goods.currentPrice}}元</div>
          </div>

        </div>
        <div v-show="!pressBarShow && selectType1Con === ''" class="specification flex-row-sb"  @click="chooseType">
          <span>请选择商品规格</span><span class="iconfont icon-goright"></span>
        </div>
        <div v-show="!pressBarShow && selectType1Con !== ''" class="specification flex-row-sb" @click="chooseType">
          <span>已选择：{{selectType1Con}}&nbsp{{selectType2Con}}</span>
          <span class="iconfont icon-goright"></span>
        </div>
      </div>
      <div class="space-line-root"></div>
      <div class="m10">
        <dl  class="flex-row mb0 font-4-5" >
          <dt class="pb2" v-bind:class="{barActive: isSelect === 'goods'}" @click="selectNav('goods')">商品信息</dt>
          <dt v-show="helperInfo.records.length > 0" class="pb2" v-bind:class="{barActive: isSelect === 'helper'}"
              @click="selectNav('helper')">真爱帮</dt>
        </dl>
        <div v-show="isSelect === 'goods'" class="goode-info flex-column shop-name mt5">
          <span class="goods-name flex-row bor-bot-dashed lh8">
            <span class="card-header font-color-666">品名</span>
            <span class="w70">{{baseInfo.goods.goodsName}}</span>
          </span>
          <span class="goods-descript flex-row bor-bot-dashed lh8"flex-row>
            <span class="card-header font-color-666">描述</span>
            <span class="w70">{{baseInfo.goods.goodsDes}}</span>
          </span>
        </div>
        <div v-show="isSelect === 'helper' && helperInfo.records.length > 0" class="my-help mt5">
          <div class="flex-row-sb m-t-b-1"  v-for="(helper, index) in helperInfo.records">
            <div class="wx-head-portrait flex-row-start">
              <img class="wx-head-portrait" :src="helper.headImgUrl" alt="">
              <span class="wx-name">{{helper.userNickname}}</span>
            </div>
            <div class="iconfont icon-40kanjia wx-kanjia">砍掉{{helper.amount}}元</div>
          </div>
        </div>
      </div>
      <div style="font-size: 0;">
        <img v-show="isSelect === 'goods'" class="body-width" v-for="(img ,index) in goodsAttrImgs" :src="img.url" alt="">
      </div>
    </div>
    <!--砍价成功弹窗-->
    <mt-popup style="margin-bottom: 32vh;border-radius: 1vw"
      v-model="popupVisible"
      position="bottom">
      <div class="flex-column-mid share-window">
        <img class="share-image" src="../../../../static/image/success.png" alt="">
        <span class="current-price">{{msg}}</span>
        <span class="original-desc" v-show="state===0 || state===1">悄悄的告诉你分享的次数越多机会越大哟</span>
        <div>
          <mt-button type="danger"   class="invite-friend" @click="shareToFrienf" >{{btnMsg}}</mt-button>
        </div>
      </div>
    </mt-popup>
    <mt-popup class="body-width h50 pt5"
              v-model="startPopupVisible"
              position="bottom">
      <div class="flex-column">
        <div class="choose-info flex-row-sb p-lr-5">
          <img class="goods-image list-image" :src="goodsTypeImg">
          <div class="goods-detail flex-column shop-name">
            <span class="wx-kanjia">{{floorPrice}}元</span>
            <span class="font-color-666">已选择：<span>{{mainName}}：{{selectType1Con}}</span></span>
            <span class="font-color-666" v-if="goodsAttrInfos[1]">{{minorName}}：{{selectType2Con}}</span>
          </div>
          <div class="goods-cancol iconfont icon-xxx" @click="closeChoiceBar"></div>
        </div>
        <div v-if="startPopupVisible && goodsAttrInfos[0]"  class="goods-color p-lr-5 flex-column shop-name">
          <div class="flex-row-start">
            <span>{{goodsAttrInfos[0].name}}:</span>
            <span></span>
          </div>
          <div class="flex-row-start">
            <span class="goodsType m-t-b-1" @click="selectTypeOne(type1)"
                  v-bind:class="{goodsTypeChose: selectType1 === type1.id}"
                  v-for="(type1 , index) in goodsAttrInfos[0].goodsAttrs">{{type1.value}}</span>
          </div>
        </div>
        <div v-if="startPopupVisible && goodsAttrInfos[1]"  class="goods-size p-lr-5 flex-column shop-name">
          <div class="flex-row-start">
            <span>{{goodsAttrInfos[1].name}}</span>
            <span></span>
          </div>
          <div class="flex-row-start">
            <span class="goodsType m-t-b-1" @click="selectTypeTwo(type2)"
                  v-bind:class="{goodsTypeChose: selectType2 === type2.id}"
                  v-for="(type2, index) in goodsAttrInfos[1].goodsAttrs">{{type2.value}}</span>
          </div>
        </div>
        <div class="come-on" @click="startCutDown">发起砍价</div>
      </div>
    </mt-popup>
    <div v-show="sharePopupVisible" class="tip-bg" @click="shareToFrienf">
      <div class="iconfont icon-right-up right-up-tip"></div>
      <div class="text-tip">赶紧分享给好友帮忙砍啦</div>
    </div>
    <div v-show="canBuyNow" class="come-on flex-row p0" >
      <!--{{btnMsg}}-->
      <div class="buyNow bor-top" @click="buyNow">以当前价购买{{cutDownInfo.body.lastmount || baseInfo.goods.currentPrice}}</div>
      <div class="startCutDown" @click="shareToFrienf">{{btnMsg}}</div>
    </div>
    <div v-show="!canBuyNow" class="come-on" @click="startCutDown">发起砍价</div>
    <div style="position: relative" @click.stop="cativeNeedKnow">
      <div class="need-know">活动须知</div>
    </div>
    <div class="picker-slot-wrapper tip-bg"  v-show="showMsg" @click.stop="cativeNeedKnow">
      <div class="flex-column bor-radiu5 bg-white need-content">
        <span class="flex-row-center">
          <span class="red-line"></span>
          <span class="activeSchool">活动规则</span>
          <span class="red-line"></span>
        </span>
        <span class="p-1"> 1.邀请好友一起砍价，砍到0元即可免费领取优惠券；</span>
        <span class="p-1"> 2.对于同一个砍价，您只能帮助砍价一次；</span>
        <span class="p-1"> 3.每个砍价您只能成功砍价一次；</span>
        <span class="p-1"> 4.您每天最多可以帮助3位好友砍价；</span>
        <span class="p-1"> 5.您每天最多可以参与3次砍价活动；</span>
        <span class="p-1"> 6.除优惠券（代金券）之外，实物商品是给在校大学生的福利，需要凭借学生证领取；</span>
        <span class="p-1"> 7.实物商品砍单成功后，请您及时更新收货信息，确保地址，联系方式无误。</span>
        <span class="p-1"> 8.好友帮砍途中，如想要商品砍价库存耗尽，视为砍价失败，大额商品，我司将在"同玩卡包"公众号公布砍单成功名单，请您及时关注！</span>
        <span class="p-1"> 9.主办方可以根据本活动的实际情况对活动规则进行变动或调整；</span>
      </div>
    </div>
  </div>
</template>
<script>
  import MyService from '../../common/service/service'
  import wxapi from '../../../api/wxapi.js'
  import countDown from '../../common/countDown'
  import formatSearch from '../../common/formatSearch'
  export default {
    mixins: [wxapi],
    components: {
      countDown
    },
    data () {
      return {
        sharePopupVisible: false,
        popupVisible: false,
        startPopupVisible: false,//弹出选择框
        canBuyNow: false,//是否可以立即购买
        pressBarShow: false,
        isSelect: 'goods',
        baseInfo: {
          goods: {
            thumbnail: '',
            goodsName: '',
            goodsDes: '',
            currentPrice: '',
            shop: {
              address: ''
            }
          }
        },
        barProgress: '0%',
        capsule: '0%',
        cutDownId: this.$route.params.id,
        wxUserInfo: {},
        cutDownInfo: {
          body: {
            popupVisible: ''
          }
        },
        userCutDownId: '',
        helpInfo: {},
        state: -1,//-1未登录；0新创建砍价成功；1已经参与砍价（是本人）；2帮别人砍价成功；3创建砍价不成功；4砍价结束；5已结参与成功
        btnMsg: "我要砍价",
        msg: '',
        goAction: '',
        helperInfo: {
          total: 0,
          records: []
        },//帮砍信息
        helpCut: 0,
        goodsAttrImgs: [],
        goodsAttrInfos: [
          {
            name: '',
            goodsAttrs: []
          },
          {
            name: '',
            goodsAttrs: []
          }
        ],
        selectType1: '1',
        selectType2: '1',
        selectType1Con: '',//已选中上部
        selectType2Con: '',//已选中下部
        mainName: '',//主属性名
        minorName: '',//次属性名
        floorPrice: 0,//商品底价
        goodsTypeImg: '',//商品选择展示图
        skuList: [],//sku列信息
        noSpecification: false,//有无规格可选
        skuId: '',//所选商品的skuId
        showMsg: false,
        goodsInfo: {},
        bool: false
      }
    },
    mounted () {
      this.getBaseInfo();
      if(this.$route.query.userCutDownId){
        this.userCutDownId = this.$route.query.userCutDownId;
        let that = this;
        setTimeout(function () {
          that.bool = true;
        }, 1000);
        window.addEventListener('popstate', function (e) {
          let uri = {name: 'cutdown'};
          that.$router.push(uri);
        });
        this.pushHistory();
      }
      var that = this;
      if (localStorage.getItem('user')) {
        this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
        this.queryGoodsById ();
      } else {
        window.addEventListener("setItemEvent", function (e) {
          if(e.newValue.indexOf('wxUser')> -1){
            that.wxUserInfo = JSON.parse(e.newValue).body.wxUser;
            that.queryGoodsById ();
          }
        });
      }
    },
    methods: {
      //选择分类
      selectNav (type) {
        this.isSelect = type;
      },
      //添加新的历史返回页面
      pushHistory() {
        var state = {
          title: "同玩商城",
          url: "https://wapt.tongyuenet.com/cutdown"
        };
        window.history.pushState(state, "同玩商城", "https://wapt.tongyuenet.com/cutdown");
      },
      //获取店铺或者商品的基本信息
      getBaseInfo () {

        var promise = MyService.queryCutDownDetail({id: this.$route.params.id});
        promise.then(res => {
          if (res && res.data && res.data.body ){
            this.baseInfo = res.data.body;
            if(!this.baseInfo.cutingCount){
              this.baseInfo.cutingCount = '0'
            }
            wxapi.wxRegister(this.wxRegCallback)
          }
        })
      },
      createCutDown (skuId) {
        var params = {
          userId: this.wxUserInfo.userId,
          nickName: this.wxUserInfo.nickname,
          headImgUrl: this.wxUserInfo.headImgUrl,
          cutDownId: this.cutDownId,
          skuId: skuId
        };
        var promise = MyService.createCutDown(params);
        promise.then(res => {
          if (res && res.data) {
            if (res.data.body && res.data.body.endTime) {
              this.countDownTime = res.data.body.endTime;
            }
            this.popupVisible = true;
            this.canBuyNow = true;
            this.pressBarShow = true;
            this.startPopupVisible = false;
            this.userCutDownId =res.data.body.id;
              let reCode = res.data.code;
            if (reCode === '0') {
              this.cutDownInfo = res.data;
              this.state = 0;
              this.btnMsg = '喊好友砍一砍';
              this.msg = res.data.msg;
              this.queryHelpers({userCutDownId: this.userCutDownId});
            }
            if (reCode === '1') {
              this.cutDownInfo = res.data;
              this.state = 1;
              this.msg = '砍价进行中';
              this.btnMsg = '喊好友砍一砍'
              this.queryHelpers({userCutDownId: this.userCutDownId});
            }
            if (reCode === '2') {
              this.cutDownInfo = res.data;
              this.state = 3;
              this.btnMsg = '我的砍价';
              this.msg = res.data.msg;
              this.goAction = '/myinfo'
            }
            if (reCode === '3') {
              this.cutDownInfo = res.data;
              this.state = 4;
              this.btnMsg = '重砍一个'
              this.msg = res.data.msg;
            }
            if (reCode === '4') {
              this.cutDownInfo = res.data;
              this.state = 4;
              this.btnMsg = '重砍一个';
              this.msg = res.data.msg;
              this.queryHelpers({userCutDownId: this.userCutDownId});
            }
            if (reCode === '5') {
              this.cutDownInfo = res.data;
              this.state = 5;
              this.btnMsg = '重砍一个';
              this.msg = res.data.msg;
              this.queryHelpers({userCutDownId: this.userCutDownId});
            }
            this.helpCut = (this.cutDownInfo.body.amount - this.cutDownInfo.body.lastmount).toFixed(2) || 0;
            this.barProgress = (this.helpCut / this.cutDownInfo.body.amount) * 100 + '%';
            this.capsule = (this.helpCut / this.cutDownInfo.body.amount) * 67 + '%';
          }
        })
      },
      helpCutDown () {
        var params = {
          userCutDownId: this.userCutDownId,
          userId: this.wxUserInfo.userId,
          nickName: this.wxUserInfo.nickname,
          headImgUrl: this.wxUserInfo.headImgUrl,
        };
        var promise = MyService.helpCutDown(params);
        promise.then(res => {
          if(res && res.data && res.data.success) {
            this.userCutDownId =res.data.body.id;
            this.popupVisible = true;
            this.helpInfo = res.data;
            let reCode = res.data.code;
            if (reCode === '3') {
              this.cutDownInfo = res.data;
              this.state = 0;
              this.btnMsg = '喊好友砍一砍';
              this.state = 1;
              this.msg = '砍价进行中';
              this.helpInfo.msg = '成功砍掉' + '' + '元'
              this.queryHelpers({userCutDownId: this.userCutDownId});
            }else if (reCode === '6' || reCode === '1' || reCode === '2' || reCode === '4' || reCode === '5' || reCode === '9') {
              /*6.你已经砍过啦,
                5.网络波动，同学再试一次！
                2.砍价时间已过，早点帮同学砍呀！
                1.已经有人快你一步砍完了！
                3.一天只能帮助（N）同学砍价哦！
                7.砍价已结束，砍价失败
                8.砍价成功,重砍一个怎么样？
                9.点进自己分享的链接
              */
              this.cutDownInfo = res.data;
              this.state = 2;
              this.btnMsg = '我也要砍';//?userCutDownId=1014086467007340545
              this.goAction = '/cutdown';
              this.msg = res.data.msg;
              this.helpInfo.msg = '成功砍掉' + '' + '元'
            } else if (reCode === '0') {
              this.cutDownInfo = res.data;
              this.wxUserInfo = res.data.body.wxUser;
              this.state = 2;
              this.msg = res.data.msg;
              this.btnMsg = '我也要砍';
              this.queryHelpers({userCutDownId: this.userCutDownId});
            } else if (reCode === '7') {
              this.cutDownInfo = res.data;
              this.goAction = '/cutdown';
              this.wxUserInfo = res.data.body.wxUser;
              this.state = 4;
              this.msg = res.data.msg;
              this.btnMsg = '重砍一个';
              this.queryHelpers({userCutDownId: this.userCutDownId});
            } else if (reCode === '8') {
              this.cutDownInfo = res.data;
              this.wxUserInfo = res.data.body.wxUser;
              this.state = 5;
              this.msg = res.data.msg;
              this.btnMsg = '重砍一个';
              this.queryHelpers({userCutDownId: this.userCutDownId});
            }
            this.helpCut = (this.helpInfo.body.amount - this.helpInfo.body.lastmount).toFixed(2) || 0;
            this.barProgress = (this.helpCut / this.helpInfo.body.amount) * 100 + '%';
            this.capsule = (this.helpCut / this.helpInfo.body.amount) * 67 + '%';

          }
        })
      },
      wxRegCallback () {
        this.wxShareTimeline()
      },
      wxShareTimeline () {
        var that = this;
        let opstion = {
          title: '快来帮我砍一刀', // 分享标题
          link: 'https://wapt.tongyuenet.com/cutdown?id='+ this.$route.params.id +'&userCutDownId=' + this.userCutDownId + '&userId=' + this.wxUserInfo.userId,      // 分享链接
          desc: '我参加了同玩的砍价活动，快来帮我砍一刀！',
          imgUrl: this.baseInfo.goods.thumbnail || '',// 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            that.sharePopupVisible = false;
          },
          error: function () {
            that.sharePopupVisible = false;
          }
        }
        // 将配置注入通用方法
        wxapi.ShareTimeline(opstion)
      },
      shareToFrienf () {
        // wxapi.wxRegister(this.wxRegCallback);
        this.popupVisible = false;
        if (this.state === 0 || this.state === 1) {
          this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
          this.sharePopupVisible = !this.sharePopupVisible;
          wxapi.wxRegister(this.wxRegCallback)
        } else if (this.state === 3) {
          //我的砍单
          let uri = {name:'myCutDownList', path: '/mycutlist'}
          this.$router.push(uri)
        } else if (this.state === 4 || this.state === 5 || this.state === 2) {
          //跳到砍单列表
          let uri = {name: 'cutdown', path: '/cutdown'}
          this.$router.push(uri)
        }
      },
      queryHelpers (param) {
        let params = param;
        let promise = MyService.queryHelper(params);
        promise.then(res => {
          if(res && res.data && res.data.body) {
            this.helperInfo = res.data.body;
          }
        })
      },
      queryGoodsById () {
        let params = {
          goodsId: this.$route.params.id
        };
        let promise = MyService.queryGoodsById(params);
        promise.then(res => {
          if (res && res.data &&res.data.body) {
            let goodsInfo = this.goodsInfo = res.data.body;
            this.goodsAttrImgs = goodsInfo.goodsAttrImgs;
            this.goodsAttrInfos = goodsInfo.goodsAttrInfos;
            this.skuList = goodsInfo.skuList;
            this.floorPrice = goodsInfo.currentPrice
            let that = this;
            if(Array.isArray(this.goodsAttrInfos) && this.goodsAttrInfos.length > 0){
              this.goodsAttrInfos.forEach(function (item) {
                if(item.isMain){
                  that.mainName = item.name;
                  that.selectType1 = item.goodsAttrs[0].id;
                } else {
                  that.minorName = item.name;
                  that.selectType2 = item.goodsAttrs[0].id
                }
              })
              this.checkCutDownInfo();
            } else {
              if(this.skuList.length == 1) {
                this.noSpecification = true;
                this.skuId = this.skuList[0].skuId;
                this.checkCutDownInfo(this.skuId);
              } else {
                this.checkCutDownInfo();
              }
            }

          }
        })
      },
      checkCutDownInfo (skuId) {
        let params = {
          cutDownId: this.$route.params.id,
          // userId: this.wxUserInfo.userId
        };
        if(window.location.search.indexOf('userId') > -1) {
          let userId = formatSearch(window.location.search).userId;
          params.userId = userId;
        } else {
          params.userId = this.wxUserInfo.userId;
        }
        let promise = MyService.qureyCutDownInfo(params);
        promise.then(res => {
          if(res && res.data) {
            let cutDownInfo = res.data;
            let mySkuId = skuId || cutDownInfo.body.skuId;
            if (cutDownInfo.code === '1') {
              this.popupVisible = true;
              this.canBuyNow = true;
              this.pressBarShow = true;
              if (cutDownInfo.body && cutDownInfo.body.endTime) {
                this.countDownTime = cutDownInfo.body.endTime;
              }
              if (this.userCutDownId) {
                this.helpCutDown ()
              } else {
                this.createCutDown(mySkuId);
              }
            } else {
              if (this.userCutDownId) {
                this.popupVisible = true;
                this.createCutDown(mySkuId);
              }
              // else {
              //   this.createCutDown(mySkuId);
              // }
            }
          }
        })
      },
      startCutDown () {
        if (!this.noSpecification) {
          this.startPopupVisible = true;
          this.chooseType ();
        } else {
          this.createCutDown(this.skuId);
        }

      },
      buyNow () {
        let promise = MyService.createOrderNum();
        promise.then(res => {
          if (res && res.data && res.data.body) {
            let orderNum = res.data.body;
            let uri = {name: 'createOrder', query: {orderId: orderNum, cutDownId: this.$route.params.id}};
            this.$router.push(uri);
          }
        })
      },
      selectTypeOne (type) {
        this.selectType1 = type.id;
        this.selectType1Con = type.value;
        this.changeImg(this.selectType1Con, this.selectType2Con)
      },
      selectTypeTwo (type) {
        this.selectType2 = type.id;
        this.selectType2Con = type.value
        this.changeImg(this.selectType1Con, this.selectType2Con)
      },
      closeChoiceBar () {
        this.startPopupVisible = false;
      },
      chooseType () {
        this.startPopupVisible = true;
        let that = this;
        this.goodsAttrInfos.forEach(function (item) {
          if (item.isMain) {
            that.selectType1Con = item.goodsAttrs[0].value;
          } else {
            that.selectType2Con = item.goodsAttrs[0].value;
          }
        });
        this.noSpecification = true;
        this.changeImg(this.selectType1Con, this.selectType2Con)
      },
      changeImg (type1, type2) {
        self = this;
        this.skuList.forEach(function (item) {
          if(type1 === item.mainAttrValue && type2 === item.secondAttrValue) {
            self.floorPrice = item.cutDownMinPrice;
            self.goodsTypeImg = item.thumbnail;
            self.skuId = item.skuId;
          }
        })
      },
      cativeNeedKnow () {
        this.showMsg = !this.showMsg;
      }
    }
  }
</script>
