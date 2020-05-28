<template>
  <div class="bargain-list ">
    <article class="flex-row-sb activeActical bor-bot" v-for="(barMock, index) in bargainMocks" :key="index">
      <div class="flex-column">
        <img class="list-image img-border" src="https://src.tongyuenet.com/djq/hsd.png" alt="">
      </div>
      <div class="flex-column act-msg">
        <span class="title-font">{{barMock.title}}</span>
        <span>
              <span class="current-price">{{barMock.nowPrice}}</span>
              <span class="original-price">{{barMock.orginalPrice}}</span>
            </span>
        <span><span class="to-bargain">{{barMock.toBargain}}</span></span>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    computed: {

    }
  }
</script>
