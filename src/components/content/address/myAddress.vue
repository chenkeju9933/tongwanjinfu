<template>
  <div id="myAddress" class="content">
    <div class="m10 flex-column shop-name" @click="changeOrderAddress(address)" v-for="(address, index) in addressList">
      <div class="flex-row-start lh8">
        <span>{{address.nikeName || '--'}}</span>
        <span>，</span>
        <span>{{address.phone || '--'}}</span>
      </div>
      <div class="flex-row-start lh8">
        <span>{{address.provinceName || '--'}}</span>
        <span>{{address.cityName || '--'}}</span>
        <span>{{address.countyName || '--'}}</span>
        <span>{{address.detailInfo || '--'}}</span>
      </div>
      <div class="flex-row-sb font-color-666 lh8">
        <span v-show="address.isDef === 0" @click.stop="changeDefAddress(address.id)" class="iconfont icon-choose shop-name">已设为默认</span>
        <span @click.stop="changeDefAddress(address.id)" v-show="address.isDef === 1" class="iconfont icon-no-choose shop-name">设为默认</span>
        <span class="iconfont icon-delete" @click.stop="deleteAddress(address.id)"></span>
      </div>
      <div class="address-space-line" v-show="index < addressList.length-1"></div>
    </div>
    <div @click="goAddAddr" class="add-address iconfont icon-add shop-name bor-top bg-white">增加新地址</div>
  </div>
</template>
<script>
  import MyService from '../../common/service/service'
  import FormatSearch from '../../common/formatSearch'
  export default {
    data () {
      return {
        addressList: [],
        options: [
          {
            label: '设为默认',
            value: '设为默认'
          }
        ],
        value: ['设为默认']
      }
    },
    beforeMount () {
      this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
      this.getSddress ();
    },
    methods: {
      getSddress () {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let params = {
          userId: this.wxUserInfo.userId,
        };
        let promise = MyService.queryAddress(params);
        promise.then(res => {
          this.$indicator.close();
          if(res && res.data && res.data.body) {
            this.addressList = res.data.body;
          }
        })
      },
      changeDefAddress (id) {
        this.$indicator.open({
          text: '更新中...',
          spinnerType: 'fading-circle'
        });
        let params = {
          id: id,
          userId: this.wxUserInfo.userId
        };
        let promise = MyService.setDefaultAddress(params);
        promise.then(res => {
          if (res) {
            this.$indicator.close();
            this.getSddress ()
          }
        })
      },
      deleteAddress (id) {
        this.$indicator.open({
          text: '删除中...',
          spinnerType: 'fading-circle'
        });
        let params = {
          id: id,
          userId: this.wxUserInfo.userId
        };
        let promise = MyService.delAddress(params);
        promise.then(res => {
          if (res) {
            this.$indicator.close();
            this.getSddress ()
          }
        })
      },
      goAddAddr () {
        let uri = ({name: 'addAddress'})
        this.$router.push(uri);
      },
      changeOrderAddress (param) {
        if (window.location.search.indexOf('orderId') === -1) {
          return;
        }
        let params = param || {};
        this.$store.dispatch('setAddress', params);
        let searchParam = FormatSearch(window.location.search);
        searchParam.address = 'reset';
        this.$router.push({name: 'createOrder', query:searchParam});
      }
    }
  }
</script>
