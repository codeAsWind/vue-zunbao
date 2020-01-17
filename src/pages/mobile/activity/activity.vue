<template>
  <div class="activity">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="tab-wrapper">
      <tab-border @selectTabItem="selectItem" :list="menuList" :currentIdx="currentIdx"></tab-border>
    </div>
    <div class="tab-content promotions">
      <div @click="goToThisPromotion(item)" v-if="filterList.length" class="item" v-for="item in filterList">

        <div class="thumb">
          <div class="pic">
            <img v-lazy="item.img" alt="">
          </div>
          <div class="bottom">
            <p>幸运大转盘</p>
            <mt-button size="small" type="primary">
              <i class="iconfont icon-sousuo"></i>
              点击详情
            </mt-button>
          </div>
        </div>

        <promotion-detail @click="togglePanel" :item="item"></promotion-detail>

      </div>
      <no-result v-if="!filterList.length"></no-result>
    </div>
  </div>
</template>

<script>
  import tabBorder from 'MComponents/tab-border/tab-border.vue'
  import promotionDetail from '@/components/promotion-detail/promotion-detail'
  import NoResult from '@/components/no-result/no-result'
  import {promotion} from '@/common/js/mixin'

  export default {
    mixins: [promotion],
    data() {
      return {
        headData: {
          title: '活动中心',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/service')
      },
    },
    watch: {},
    components: {tabBorder,promotionDetail,NoResult}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .activity
    mobile-wrapper()
  .tab-wrapper
    position fixed
    left 0
    top 50px
    width 100%
    z-index 999
    background $color-light
  .promotions.tab-content
    padding-top 60px
    m-wrapper()
    .item
      margin-bottom 15px
      border-radius 15px
    .thumb
      position relative
    .pic
      img
        width 100%
    .bottom
      position absolute
      bottom 0
      left 0
      width 100%
      display flex
      justify-content space-between
      align-items center
      background rgba(0,0,0,.6)
      color $color-light
      border-radius 5px
      p
        padding-left 10px

</style>