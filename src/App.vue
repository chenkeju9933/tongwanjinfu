<template>
  <div id="app">
    <!--<Header v-if="false"></Header>-->
    <router-view/>
    <Footer v-show="footerShow"></Footer>
  </div>
</template>

<script>
  // import Header from './components/common/header.vue'
  import Footer from './components/common/footer.vue'
  export default {
    name: 'App',
    data () {
      return {
        footerShow: true,
        headerShow: true
      }
    },
    components: {
      // Header,
      Footer
    },
    methods: {
      footerChange (path) {
        if (path.indexOf('home') > -1 || path.indexOf('cutdown') > -1 || path.indexOf('myinfo') > -1 ) {
          this.footerShow = true;
        } else {
          this.footerShow = false;
        }
      },
      headerChange (path) {
        if (path.indexOf('addaddress')) {
          this.headerShow = false;
        } else {
          this.headerShow = true;
        }
      }
    },
    mounted(){
      var path=this.$route.path.substring(1);
      // this.headerChange(path);
      this.footerChange(path);
    },
    watch:{
      $route(to){
        var path=to.path.substring(1);
        // this.headerChange(path);
        this.footerChange(path);
        this.headerChange (path)
      }
    },
  }
</script>

<style>

</style>
