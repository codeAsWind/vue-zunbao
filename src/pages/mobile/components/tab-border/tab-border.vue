<template>
  <div class="tab-border">
    <span @click="select(idx,item)" :class="{active:idx === currentIdx}" v-for="(item,idx) in list">{{item.text}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props:{
      list:{
        type:Array,
        default:[]
      },
      currentIdx:{
        type:Number,
        default:0
      }
    },
    computed: {},
    created() {
    },
    methods: {
      select(idx,item){
        this.$emit('selectTabItem',idx,item)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .tab-border
    height 40px
    line-height 40px
    display flex
    box-shadow: 0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.24)
    span
      flex 1
      text-align center
      font-size 16px
      transition all .3s ease-in
      &.active
        color $color-intersperse
        border-bottom 3px solid $color-intersperse

</style>