<template>
  <div class="jackpot">
    <img :src="jackpotData.imgUrl" alt="">
    <div class="jackpot-num-wrapper">
      <jackpot-num :num="jackpotData.num"></jackpot-num>
    </div>
  </div>
</template>

<script>
  import JackpotNum from './jackpot-num.vue'
  export default {
    data() {
      return {}
    },
    props:{
      jackpotData:{
        type:Object,
        default:{
          imgUrl:'',
          num:0
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {
      JackpotNum
    }

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .jackpot
    height 140px
    background #cacdd7
    display flex
    justify-content space-between
    align-items  center
    padding 0 30px

</style>