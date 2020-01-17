<template>
  <div class="content">
    <div class="tab-wrapper">
      <slot name="tab-wrapper"></slot>
    </div>
    <div class="right-wrapper">
      <slot name="right-wrapper"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .content
    padding 25px
    margin 20px auto
    clearfix()
    background #fff
    .tab-wrapper
      float left
      width 190px
      margin-right 30px
    .right-wrapper
      float: right
      width 930px
</style>