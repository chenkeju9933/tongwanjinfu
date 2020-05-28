<template>
    <div id="noMoreData">
      <span class="iconfont font-color-666 icon-no-more-data">没有更多数据了</span>
    </div>
</template>

<script>
    export default {
        name: "noMoreData"
    }
</script>

<style scoped>
  #noMoreData {
    font-size: 5vw;
    width: 100%;
    text-align: center;
  }
  #noMoreData span:before {
    font-size: 7vw;
  }
</style>
