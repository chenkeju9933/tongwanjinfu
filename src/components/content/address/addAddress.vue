<template>
  <div id="addAddress" class="">
    <mt-header v-bind:title="title" v-show="headerShow">
      <router-link to="/myaddress" slot="left" >
        <mt-button icon="back" >返回</mt-button>
      </router-link>
      <mt-button  slot="right" @click="saveAddress">保存</mt-button>
    </mt-header>
    <mt-field label="收货人" placeholder="请输入收货人姓名" v-model="username"></mt-field>
    <mt-field label="联系电话"  placeholder="请输入联系电话" v-model="yourPhone"></mt-field>
    <mt-field label="邮政编码"  placeholder="请输入邮政编码" v-model="postalCode"></mt-field>
    <mt-field label="所在地区" placeholder="" disabled class="bg-white">
      <div class="input-d"  @click="chooseRegion" v-model="Region">{{Region}}</div>
    </mt-field>

    <mt-field label="" placeholder="请输入详细地址" type="textarea" rows="2" v-model="detailInfo"></mt-field>


    <mt-popup
      v-model="popupBottomVisible"
      position="bottom" class="body-width h50">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import address from '../../common/service/address'
  import MyService from '../../common/service/service'
  export default {
      data () {
        return {
          title: '增加收获地址',
          headerShow: true,
          username:'',
          yourPhone: '',
          postalCode: '',
          detailInfo: '',
          Region: '',
          provinceName: '',
          cityName: '',
          countyName: '',
          popupBottomVisible: false,
          message: '',
          params: {},
          wxUserInfo: '',
          slots: [
            {
              flex: 1,
              values: [],
              className: 'sheng',
            },
            {
              flex: 1,
              values: [],
              className: 'sheng1',
            },
            {
              flex: 1,
              values: [],
              className: 'sheng2',
            }
          ]
        }
      },
    mounted () {
        let province = [];
        address.forEach(function (item) {
          province.push(item.name)
        });
        this.slots[0].values = province;
      this.wxUserInfo = JSON.parse(localStorage.getItem('user')).body.wxUser;
    },
    watch: {
      $route(to){
        var path=to.path.substring(1);
        this.headerChange (path)
      }
    },
    methods: {
      chooseRegion () {
        this.popupBottomVisible = true;
      },
      onValuesChange (picker, values) {
        console.log(picker, values)
        let citys = [];
        address.forEach(item => {
          if(item.name === values[0]){
            item.city.forEach(data => {
              citys.push(data.name);
            });
            picker.setSlotValues(1, citys);
            item.city.forEach(temp => {
              if (temp.name === values[1]) {
                picker.setSlotValues(2, temp.area);
              }
            })
          }
        });
        if (values[0] === values[1]) {
          if(values[2] === '其他') {
            this.Region =values[0] + ' ' + values[1] + ' ';
          } else {
            this.Region =values[0] + ' ' + values[1] + ' ' + values[2];
            this.countyName = values[2]
          }
          this.cityName = values[1];
        } else {
          if (values[1] === '其他') {
            this.Region =values[0]
          } else if(values[2] === '其他') {
            this.Region = values[0] + ' ' + values[1] + ' '
            this.cityName = values[1];
          } else {
            this.Region = values[0] + ' ' + values[1] + ' ' + values[2];
            this.cityName = values[1];
            this.countyName = values[2]
          }
        }
        this.provinceName = values[0]
      },
      headerChange (path) {
        if (path.indexOf('addaddress')) {
          this.headerShow = true;
        } else {
          this.headerShow = false;
        }
      },
      saveAddress () {
        let params = {
          nikeName: this.username,
          phone: this.yourPhone,
          provinceName: this.provinceName,
          detailInfo: this.detailInfo,
          cityName: this.cityName,
          countyName: this.countyName,
          postalCode: this.postalCode,
          userId: this.wxUserInfo.userId
        };
        switch (params) {
          case params.nikeName === '':

            break;
          case params.phone === '':

            break;
          case params.postalCode === '':
            this.message = '邮政编码不能为空';
            this.showMsg ();
            break;
          case params.provinceName === '':
            this.message = '地区不能为空';
            this.showMsg ();
            break;
          case params.detailInfo === '':
            this.message = '请输入详细地址';
            this.showMsg ();
            break;
        }
        if (params.nikeName === '') {
          this.message = '收货人姓名不能为空';
          this.showMsg ();
        } else if (params.phone === '') {
          this.message = '电话不能为空';
          this.showMsg ();
        } else if (params.postalCode === '') {
          this.message = '邮政编码不能为空';
          this.showMsg ();
        } else if (params.provinceName === '') {
          this.message = '地区不能为空';
          this.showMsg ();
        } else if (params.detailInfo === '') {
          this.message = '请输入详细地址';
          this.showMsg ();
        } else {
          this.$indicator.open({
            text: '保存中...',
            spinnerType: 'fading-circle'
          });
          let promise = MyService.insertAddress(params);
          promise.then(res => {
            this.message = '保存成功';
            setTimeout(() => {
              this.$indicator.close();
              let uri = {name: 'myAddress'};
              this.$router.push(uri);
              this.headerShow = false;
            }, 2000)
          })
        }

      },
      showMsg () {
        this.$toast({
          message: this.message,
          duration: 2000
        })
      }
    }
  }
</script>

