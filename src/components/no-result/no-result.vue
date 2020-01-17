<template>
  <div class="no-result">
    <div>
      <p>
        <i class="iconfont icon-noresult"></i>
      </p>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      text: {
        type: String,
        default: '暂无搜索结果'
      }
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
  .no-result
    line-height 1
    text-align center
    min-height 200px
    display flex
    justify-content center
    align-items center
    background $color-light
    p
      margin-top 20px
      font-size 14px
  .icon-noresult
    font-size 100px
</style>