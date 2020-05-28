<template>
  <div id="footer" class="table-bar-font">
    <div class="bor-top bg-white"  >
      <div class="flex-row">
        <div v-for="(nav, index) in tabList" @click="toPage(nav.id)"
             class="flex-column no-slected w25 text-center" v-bind:class="{isSelected:path.indexOf(nav.router) > -1}">
          <span class=" mt10" :class="nav.iconClass"/>
          <span class="mb10">{{nav.text}}</span>
        </div>
      </div>
      <!--<span id="market" v-bind:class="{isSelected:$route.path.indexOf('market') > -1,'no-slected':$route.path.indexOf('market') <= -1}">-->
        <!--<router-link to="/market" tag="div" class="flex-column">-->
          <!--<span class="iconfont icon-40kanjia mt10"/>-->
          <!--<span class="mt10">商城</span>-->
        <!--</router-link>-->
      <!--</span>-->
      <!--<span id="cutDown" v-bind:class="{isSelected:$route.path.indexOf('cutdown') > -1,'no-slected':$route.path.indexOf('cutdown') <= -1}">-->
        <!--<router-link to="/cutdown" tag="div" class="flex-column">-->
          <!--<span class="iconfont icon-40kanjia mt10"/>-->
          <!--<span class="mt10">砍单</span>-->
        <!--</router-link>-->
      <!--</span>-->
      <!--<span id="myInfo" v-bind:class="{isSelected:$route.path.indexOf('myinfo') > -1,'no-slected':$route.path.indexOf('myinfo') <= -1}">-->
        <!--<router-link to="/myinfo" tag="div" class="flex-column">-->
          <!--<span class="iconfont icon-40kanjia mt10"/>-->
          <!--<span class="mt10">我的</span>-->
        <!--</router-link>-->
      <!--</span>-->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        tabList: [
          {
            id: 'home',
            router: '/home',
            text: '首页',
            iconClass: 'iconfont icon-home'
          },
          {
            id: 'market',
            router: '/market',
            text: '商城',
            iconClass: 'iconfont icon-basket'
          },
          {
            id: 'cutdown',
            router: '/cutdown',
            text: '砍单',
            iconClass: 'iconfont icon-40kanjia'
          },
          {
            id: 'myInfo',
            router: '/myinfo',
            text: '我的',
            iconClass: 'iconfont icon-myinfo'
          }
        ],
        path: 'home'
      }
    },
    mounted () {
      this.$route.path.indexOf()
    },
    methods: {
      toPage (names) {
        let uri = {name: names};
        this.$router.push(uri);
      }
    },
    watch: {
      $route (to) {
        this.path = to.path;
        console.log('改变路由', to, this.path)

      },
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        console.log(val, this.$route.path)
      }
    }
  }
</script>
