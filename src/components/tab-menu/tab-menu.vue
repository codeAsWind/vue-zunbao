<template>
  <div class="tab">
    <a @click="selectItem(idx)" :class="{active:idx === currentIdx}" v-for="(item,idx) in menuList" href="javascript:;">
      <i :class="iconClass(item)"></i>
      <span class="txt">{{item.text}}</span>
    </a>
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
      },
      currentIdx: {
        type: Number,
        default: 0
      }
    },
    computed: {},
    methods: {
      selectItem(idx) {
        this.$emit('selectItem', idx)
      },
      iconClass(item) {
        return item.icon ? `iconfont icon-${item.icon}` : ''
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
        i
          color $color-light
        &:before
          color $color-light
        background: $color-primary
        color: $color-light
      &:last-child
        border 0
      .txt
        margin-left 8px
      i
        font-size 20px
        color $color-intersperse
        transition all .3s ease-in

</style>