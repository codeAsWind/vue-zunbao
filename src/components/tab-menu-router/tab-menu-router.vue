<template>
  <div class="tab">
    <router-link :style="styleObj(item.backgroundColor)" v-for="item in menuList" :to="{path:item.router}">
      <i :class="iconClass(item)"></i>
      {{item.text}}
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      menuList: {
        type: Array,
        default: []
      }
    },
    methods: {
      iconClass(item) {
        return item.icon ? `iconfont icon-${item.icon}` : ''
      },
      styleObj(color) {
        if (!color) return
        return {
          background: color,
          color: '#fff'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .tab
    border 1px solid $color-primary
    a
      display flex
      align-items center
      height: 50px
      line-height: 50px
      padding-left 25px
      cursor: pointer
      transition all .3s ease-in
      border-bottom 1px solid $color-primary
      font-size 14px
      &:before
        color $color-primary
        transition all .3s ease-in
      &.active, &:hover
        &:before
          color $color-light
        background: $color-primary
        color: $color-light
        i
          color $color-light
      &:last-child
        border 0
      .txt
        margin-left 8px
      i
        font-size 20px
        margin-right 5px
        color $color-intersperse
        transition all .3s ease-in
</style>