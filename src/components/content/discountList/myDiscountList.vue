<template>
  <div id="myDiscountList" class="content">
    <div class="discount-list active-bar flex-row">
      <nav class="all-type" v-for="(list, index) in navList" @click="selectNav(list.id)"
      v-bind:class="{barActive : isSelect === list.id}">{{list.text}}</nav>
    </div>
    <div class="my-list"v-infinite-scroll="getList"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div  v-for="(list, index) in useList" class="can-use-content m10 flex-column">
        <div class="list-up flex-row-sb">
          <div class="can-use-card flex-row"  @click="create2Code(list)">
            <div class="card-header activeSchool font-3-5">
              10优惠券
            </div>
            <div class="card-content flex-column">
              <span class="font-3-5">{{list.title}}</span>
              <span class="font-3-5 font-color-666">商家：{{list.goods.shop.name}}</span>
              <span class="font-3-5 font-color-666">地址：{{list.goods.shop.address}}</span>
              <span class="font-3-5 font-color-666">有效期：{{list.endTimeStr}}</span>
            </div>
            <div class="card-footer iconfont icon-two-dimension-code font10"></div>
          </div>
        </div>
        <div v-show="isSelect === 'haveUse'" class="iconfont icon-have-used have-used"></div>
        <div v-show="isSelect === 'missed'" class="iconfont icon-have-missed have-used"></div>
        <div class="list-down font-3-5 font-color-666">
          使用方法：出示相应优惠券二维码
        </div>
      </div>
      <no-data v-show="useList.length === 0"></no-data>
      <no-more-data v-show="useList.length > 0"></no-more-data>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="right" class="body-width h100 ticket-bg">
      <div class="ticket-content mt40 pb5"  @click="closeTicket">
        <div class="ticket-header flex-column">
          <div class="ticket-title">{{title}}</div>
          <div class="ticket-title">{{shopName}}</div>
        </div>
        <div class="printOrder">
          <barcode :value="code" :options="barcode_option" tag="svg" ></barcode>
        </div>
        <div id="qrcode"></div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import MyService from '../../common/service/service'
  import QRCode from 'qrcodejs2'
  import unique from '../../common/uni'
  import noData from '../../common/noData'
  import noMoreData from '../../common/noMoreData'
  export default {
    components: {
      noData,
      noMoreData
    },
    data () {
      return {
        code: '',
        title: '',
        shopName: '',
        params: {
          limit:10,
          start: 1,
          status: 0,
          userId: '1011450596001071106'
        },
        popupVisible: false,
        navList: [
          {
            id: 'canUse',
            text: '可使用'
          },
          {
            id: 'haveUse',
            text: '已使用'
          },
          {
            id: 'missed',
            text: '已过期'
          },
        ],
        isSelect: 'canUse',
        useList: [],
        barcode_option:{
          displayValue: true, //是否默认显示条形码数据
          textPosition  :'top', //条形码数据显示的位置
          background: '#fff', //条形码背景颜色
          valid: function (valid) {
            console.log(valid)
          },
          width:'2px',
          height: '100px',
          fontSize: '20px', //字体大小
        },
        list:[{barcodes:'56663159'}],
        qrcode: ''
      }
    },
    beforeMount () {
      this.getList ()
    },
    methods: {
      selectNav (id) {
        this.useList = [];
        this.isSelect = id;
        if(this.isSelect === 'haveUse') {
          this.params.status = 1;
        } else if(this.isSelect === 'canUse') {
          this.params.status = 0;
        } else if(this.isSelect === 'missed') {
          this.params.status = 2;
        };
        this.getList ();
      },
      getList () {
        let params = this.params;
        let that = this;
        let promise = MyService.queryDiscountList(params);
        promise.then(res => {
          if (res && res.data && res.data.body && res.data.body.records) {
            // this.useList = res.data.body.records;
            let useLists = [];
            if(res.data.body.records === this.params.limit){
              this.params.start++;
            }
            useLists.push(res.data.body);
            unique(useLists, 'current').forEach(function (item) {
              that.useList = that.useList.concat(item.records)
            });
            that.useList = unique(that.useList, 'id')
          }
        })
      },
      create2Code (list) {
        if (this.isSelect === 'haveUse' || this.isSelect === 'missed') {
          return;
        }
        this.code = list.code;
        this.title = list.title;
        this.shopName = list.goods.shop.name;
        this.popupVisible = true;
        this.qrcode = new QRCode('qrcode', {
          width: 300,
          height: 300, // 高度
          text: this.code // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        console.log(this.qrcode)
      },
      closeTicket () {
        this.popupVisible = !this.popupVisible
        this.qrcode._el.innerHTML = '';
      }
    }
  }
</script>
