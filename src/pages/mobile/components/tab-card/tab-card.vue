<template>
  <div class="tab-card">
    <span :style="styleObj" @click="selectTabItem(idx,item)" v-for="(item,idx) in list"
          :class="{active:idx === currentIdx}">{{item.text}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      currentIdx: {
        type: Number,
        default: 0
      },
      width: {
        type: String,
        default: '50%'
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
    },
    methods: {
      selectTabItem(idx, item) {
        this.$emit('selectTabItem', idx, item)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .tab-card
    clearfix()
    span
      float left
      line-height 32px
      background #eee
      color $color-text
      text-align center
      border-radius 20px
      transition all .3s ease-in
      margin-bottom 10px
      &.active
        background $color-blue-mobile
        color $color-light
</style>