<template>
  <div :style="styleObj" class="search-box">
    <input v-model="query" type="text" placeholder="请输入游戏名称">
    <span @click="search" class="search-btn"><i class="iconfont icon-sousuo"></i></span>
  </div>
</template>

<script>
  import {debounce} from '@/common/js/util'

  export default {
    data() {
      return {
        query: ''
      }
    },
    props: {
      width: {
        type: String,
        default: '196px'
      }
    },
    computed: {
      styleObj() {
        return {
          width: this.width
        }
      }
    },
    created() {
      // this.$watch('query', debounce((newQuery) => {
      //   this.$emit('search', newQuery)
      // }, 200))
    },
    methods: {
      search() {
        this.$emit('search', this.query)
      }
    },
    watch: {
      query(newQuery) {
        (debounce(() => {
          this.$emit('search', newQuery)
        }, 200))()
      }
    },
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .search-box
    position relative
    input
      width 100%
    .search-btn
      position absolute
      right 0
      top 0
      padding 0 10px
      line-height 32px
      cursor pointer


</style>