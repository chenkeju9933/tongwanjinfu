<template>
  <div id="discounts" class="content">
    <nav class="active-bar flex-row-sb bor-bot bar-position-top bg-white">
      <div class="action-region flex-row-center" @click="selectCity">
        <span>{{cityInfo.city}}</span>
        <span class="iconfont icon-down"></span>
      </div>
      <div class="action-type flex-row-sb">
        <nav v-for="(actType, index) in actionTypes" :key="index" @click="selectNav(actType.text, actType.num)"
             class="all-type" v-bind:class="{barActive : isSelect === actType.num}">{{actType.text}}</nav>
      </div>
      <div class="action-more iconfont icon-more-type flex-row" @click="selectSchool"></div>
    </nav>
    <div  class="content discount-content">
      <Merchant v-infinite-scroll="getMerchant"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
      </Merchant>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="body-width">
      <div >
        <mt-button @click="cityConcel" class="cancel" >取消</mt-button>
        <mt-button @click="cityConfirm" class="confirm" >确定</mt-button>
      </div>
      <mt-picker class="slots" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-popup
      v-model="popupRightVisible"
      position="right" class="body-width h100">
        <div class="flex-row-sb padding-l-r-20 lh10 grid-bg">
          <div>请选择学校</div>
          <div @click="cityConcel" class="iconfont icon-cancel "></div>
        </div>
        <div class="flex-row">
          <div class="half-width h90 bor-right">
            <div class="iconfont select-region h15 lh5 p5 flex-row-sb bor-left-1"
                 v-for="(region, index) in schoolInfo.region"
                  v-bind:class="{activeRegion:selectRegionId === region.id}" @click="selectRegion(region.id)">
              <span>{{region.name}}</span>
              <span class="iconfont icon-goright"></span>
            </div>
          </div>
          <div class="half-width h90">
            <div class="activeSchool p5" @click="getSchoolAround()">全部</div>
            <div class="school-scroll h80">
              <div class="p5" @click="getSchoolAround(school.id)" v-for="school in schoolInfo.schools">{{school.name}}</div>
            </div>
          </div>
        </div>
    </mt-popup>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import Merchant from '../../common/merchant'
  import LocalStorage from '../../common/localStorage'
  import MyService from '../../common/service/service'
  export default {
    data () {
      return {
        popupVisible: false,
        popupRightVisible: false,
        slots: [{
          flex: 1,
          values: ['杭州市', '温州市'],
          className: 'slot1',
          textAlign: 'center'
        }],
        isSelect: '',
        actionTypes: [{
          id: 'all',
          num: '',
          text: '全部'
        },
          {
            id: 'fruit',
            num: 1,
            text: '水果'
          },
          {
            id: 'hairdressing',
            num: 2,
            text: '美发'
          },
          {
            id: 'catering',
            num: 3,
            text: '餐饮'
          },
          {
            id: 'markets',
            num: 4,
            text: '商超'
          }
        ],
        cityList: {
          '杭州市':2,
          '温州市':4
        },
        cityInfo: {
          city: '杭州',
          cityId: 2,
          latitude: '',
          longitude: ''
        },
        schoolInfo: {
          region: [],
          schools: []
        },
        selectRegionId: 99999,
        newCity: '',
        params: {
          type: 'active',
          start: 1,
          shopType: '',
          cityId: 2,
        },
        locationStatu: false,
        temp: ''
      }
    },
    created () {
      this.isSelect = '';
      this.merchant.homeMerchantList = [];
      this.merchant.merchantList = [];
      this.getLocation()
    },
    methods: {
      //选择城市，弹出选择页面
      selectCity () {
        this.popupVisible = true
      },
      //进入选择学校
      selectSchool () {
        this.selectRegionId = 99999;
        this.popupRightVisible = true;
        let param = {
          pId: this.cityInfo.cityId,
          type: 4
        };
        let promise = MyService.queryLocationTree(param);
        // this.$http.get('/cms/dict/location/selectLocationTree', {pId: this.cityInfo.cityId,type: 4}).then(res => {
        promise.then(res => {
          if(res && res.data) {
            this.schoolInfo.region = res.data || [];
            this.schoolInfo.region.unshift({name: '全部',id: 99999});
            this.getSchoolInfo ()
          }
        })
      },
      //选择学校区域
      selectRegion (id) {
        this.merchant.homeMerchantList = [];
        this.merchant.merchantList = [];
        this.schoolInfo.schools = []
        this.selectRegionId = id;
        this.getSchoolInfo (id)
      },
      //获取学校信息
      getSchoolInfo (id) {
        let params = {
          cityId: this.cityInfo.cityId,
        };
        if(id && id !== 99999){
          params.areaId = String(id);
        }
        let promise = MyService.querySchool(params);
        // this.$http.post('/cms/dict/location/selectSchools', params).then( res => {
        promise.then( res => {
          if(res.data) {
            this.schoolInfo.schools = res.data
          }
        })
      },
      //获取学校周边优惠信息
      getSchoolAround (id) {
        this.merchant.homeMerchantList = [];
        this.merchant.merchantList = [];
        if(id){
          this.params.schoolId = id;
        } else {
          if (this.params.schoolId) {
            delete this.params.schoolId;
          }
        }
        this.params.start = 0;
        this.$store.dispatch('getData', this.params);
        this.popupRightVisible = false;
      },
      //选择优惠种类导航
      selectNav (text, num) {
        this.merchant.homeMerchantList = [];
        this.merchant.merchantList = [];
        this.params.cityId = LocalStorage.get('cityId');
        this.params.start = 0;
        this.isSelect = num;
        this.params.shopType = num;
        this.$store.dispatch('getData', this.params)
        // this[GET_MERCHANT](this.params)
      },
      //获取列表数据
      getMerchant () {
        this.params.cityId = LocalStorage.get('cityId');
        this.$store.dispatch('getData', this.params)
      },
      //下方城市改变触发
      onValuesChange (pick, values) {
        this.newCity = values[0]
      },
      //城市确定选择
      cityConfirm () {
        this.merchant.homeMerchantList = [];
        this.merchant.merchantList = [];
        this.cityInfo.city = this.newCity;
        this.cityInfo.cityId = this.cityList[this.newCity];
        this.popupVisible = false;
        this.params.cityId = this.cityInfo.cityId;
        this.params.start = 1;
        if (this.params.schoolId) {
          delete this.params.schoolId
        }
        this.$store.dispatch('changeCity', this.cityInfo);
        this.$store.dispatch('getData', this.params);
        LocalStorage.set('city', this.cityInfo.city);
        LocalStorage.set('cityId', this.cityInfo.cityId);
      },
      //城市取消选择
      cityConcel () {
        this.popupVisible = false;
        this.popupRightVisible = false;
      },
      //获取当前坐标经纬度
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          this.getLocalLocation ();
          this.locationStatu = true;
        }
        if(!this.locationStatu) {
          this.getLocalLocation ();
          this.locationStatu = true;
        }
      },
      getLocalLocation () {
        if(LocalStorage.get('city')){
          this.cityInfo.city = LocalStorage.get('city');
          this.cityInfo.cityId = LocalStorage.get('cityId')
        } else {
          this.cityInfo.city = '杭州';
          this.cityInfo.cityId = 2;
        }
      },
      showPosition (position) {
        this.cityInfo.latitude = position.coords.latitude || '';
        this.cityInfo.longitude = position.coords.longitude || '';
        let self = this;
        if (this.cityInfo.latitude && this.cityInfo.longitude) {
          let myLatlng = new qq.maps.LatLng(this.cityInfo.latitude, this.cityInfo.longitude);
          let citylocation = new qq.maps.CityService({
            complete: function(results){
              self.temp = results.detail.detail;
              let localDetail = results.detail.detail;
              let localArr = localDetail.split(',')
              localArr = localArr.reverse();
              for (let i = 0; i < localArr.length; i++) {
                if (localArr[i].indexOf('市') > -1) {
                  let city = localArr[i];
                  if(self.cityList[city]) {
                    self.cityInfo.city = city;
                    self.cityInfo.cityId = self.cityList[city];
                  } else {
                    self.cityInfo.city = '杭州';
                    self.cityInfo.cityId = 2;
                  }
                  LocalStorage.set('city', this.cityInfo.city);
                  LocalStorage.set('cityId', this.cityInfo.cityId);
                  break;
                }
              }
            }
          });
          citylocation.searchCityByLatLng(myLatlng);
        } else {
          this.getLocalLocation ()
        }
        this.locationStatu = true;
      }
    },
    computed: {
      ...mapState(['merchant'])
    },
    components: {
      Merchant
    },
  }
</script>
