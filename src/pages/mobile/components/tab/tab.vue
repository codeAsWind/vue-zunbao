<template>
  <div class="tab">
    <router-link :to="{path:item.path}" tag="div" v-for="item in tabList" class="tab-item">
      <i :class="getIcon(item)"></i>
      <span class="tab-link">{{item.text}}</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [
          {
            text: '首页',
            icon: 'shouye',
            path:'/mobile/index'
          },
          {
            text: '活动中心',
            icon: 'huodongzhongxin1',
            path:'/mobile/activity'
          },
          {
            text: '积分商城',
            icon: 'jinbi',
            path:'/mobile/integral'
          },
          {
            text: '我的尊宝',
            icon: 'xiazai',
            path:'/mobile/user'
          },
        ]
      }
    },
    computed: {

    },
    methods:{
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .tab
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    background: $color-primary-mobile
    display: flex
    font-size: $font-size-medium
    height: 56px
    .tab-item
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      color: $color-light
      &.active
        background: $color-blue-mobile
      .tab-link
        padding-top: 5px
      .iconfont
        font-size: 20px
</style>
