<template>
  <div class="common-discounts">
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <!--自助存送-->
      <deposit-send v-if="currentIdx===0"></deposit-send>
      <!--自助返水-->
      <backwater v-if="currentIdx===1"></backwater>
      <!--救援金-->
      <rescue-money v-if="currentIdx===2"></rescue-money>
      <!--优惠券-->
      <coupon v-if="currentIdx===3"></coupon>
      <!--免费筹码-->
      <free-chip v-if="currentIdx===4"></free-chip>
      <!--自助晋级-->
      <promoted v-if="currentIdx===5"></promoted>
      <!--生日礼金-->
      <birthday v-if="currentIdx===6"></birthday>

    </div>
  </div>
</template>

<script src="./discounts.js">

</script>

<style lang="stylus" scoped>

</style>