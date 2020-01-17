<template>
  <div>
    <div @click="select(item)" :class="{active:currentType === item.payWayType}"
         class="deposit-btn-type" v-for="(item) in list">
      <div class="wr">
        <!--<img :src="item.icon" alt="">-->
        <div class="text">
          <h3>{{item.title}} <img v-if="item.fz" :src="item.fz" alt=""></h3>
          <p>{{item.describe}}</p>
        </div>
      </div>
      <!--<i v-if="currentType === item.payWayType" class="iconfont icon-ziyuan"></i>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      currentType: {
        type: String,
        default: 0
      },
      list: {
        type: Array,
        default: []
      },
      type: {
        type: String,
        default: ''
      }
    },
    computed: {},
    created() {
    },
    methods: {
      select(item) {
        this.$emit('selectPayWayType', item, this.type)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .deposit-btn-type
    float left
    width 240px
    padding 6px 10px
    line-height 24px
    border 1px solid #ccc
    border-radius 5px
    position relative
    margin 5px 15px 5px 0
    background $color-gray-background
    cursor pointer
    transition all .3s ease-in
    &.active,&:hover
      border 1px solid $color-primary
      background $color-light
      background $color-primary
      color $color-light
      i
        color $color-light

    .wr
      display flex
      align-items center
    img
      margin-right 8px
    i
      position: absolute
      right -3px
      top -8px
      color $color-primary
    .text
      padding-left 15px
</style>