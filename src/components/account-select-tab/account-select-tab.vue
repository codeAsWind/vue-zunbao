<template>
  <div class="account-select-tab">
    <div v-if="item>=range.min || !item" @click="select(idx,item)" class="item" :class="{active:currentIdx === idx}"
         v-for="(item,idx) in list">
      {{item || ''}}
      <!--<i v-if="currentIdx === idx" class="iconfont icon-ziyuan"></i>-->
      <input :placeholder="`请输入${range.min}-${range.max}之间的值`" v-if="!item" v-model="amount" type="text">元
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        amount: parseInt(this.depositMoney) || null
      }
    },
    computed: {},
    props: {
      list: {
        type: Array,
        default: []
      },
      currentIdx: {
        type: Number,
        default: -1
      },
      depositMoney: {
        type: Number,
        default: 0
      },
      range: {
        type: Object,
        default: {
          min: 1,
          max: 3000
        }
      }
    },
    created() {
    },
    methods: {
      select(idx, item) {
        this.amount = item
        this.$emit('selectAmount', idx, Number(this.amount) || 0)
      }
    },
    watch: {
      amount(newVal) {
        this.$emit('amountChang', Number(newVal) || 0)
      }
    },
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .account-select-tab
    .item
      float: left
      position: relative
      border: 1px solid #efefef
      color: #707077
      cursor: pointer
      text-align: center
      font-size: 14px
      width: 84px
      line-height: 40px
      border-radius: 5px
      margin: 4px
      background $color-gray-background
      &.active
        border-color $color-primary
        color $color-light
        background $color-primary
      &:last-child
        width 290px
      i
        position absolute
        right 0
        top 0
    input
      float left
      margin-top 3px
      margin-left 10px


</style>