<template>
  <div class="m-list">
    <ul>
      <li :class="{active:idx === currentIdx}" v-for="(item,idx) in list">
        <div class="tit" @click="selectItem(item,idx)">
          <p>
            <i v-if="item.icon" class="icon-badge" :class="getIcon(item)"></i>
            <span>{{item.text}}</span>
          </p>
          <i class="iconfont icon-arrow"></i>
        </div>
        <transition name="slide-fade">
          <div v-if="idx === currentIdx && item.content" class="sub">

            <div class="center" v-if="item.id === 'wexin'">
              <img class="img" :src="item.content.img" alt="">
              <p class="text">{{item.content.text}}</p>
            </div>

            <div class="center" v-if="item.id === 'zs'">
              <p class="text red" style="margin-bottom:10px">{{item.content.text}}</p>
              <img class="img" :src="vipEWM" alt="">
            </div>

            <div v-if="item.id === 'phone'">
              <div class="mobile-input-group">
                <label for="phone">您的联系号码:</label>
                <input v-model="number" id="phone"/>
              </div>
              <mt-button size="small" @click="makeCall" type="primary">电话回拨</mt-button>
              <p style="margin-top:10px">{{item.content.text}}</p>
            </div>

            <div v-if="item.id=== 'email' || item.id=== 'ceo-email' ">
              <p>{{item.content.text}}</p>
            </div>

          </div>
        </transition>

      </li>
    </ul>
  </div>
</template>

<script>
  import {makeCall,queryQrcode} from '@/common/js/mixin'

  export default {
    mixins: [makeCall,queryQrcode],
    data() {
      return {}
    },
    props: {
      currentIdx: {
        type: Number,
        default: -1
      },
      list: {
        type: Array,
        default: []
      }
    },
    computed: {},
    created() {
    },
    methods: {
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      },
      selectItem(item, idx) {
        this.$emit('selectItem', item, idx)
      },
      toggleSlider(idx) {

      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .m-list
    li
      &.active
        .icon-arrow
          transform rotate(90deg)
      .tit
        display flex
        justify-content space-between
        align-items center
        line-height 40px
        m-wrapper()
        border-bottom 1px solid $color-border-gray
        .icon-badge
          display inline-block
          width 25px
          margin-right 5px
          font-size 20px
          vertical-align middle
          color $color-blue-mobile
        .icon-arrow
          transition all .3s ease-in

      .sub
        padding 20px
        background $color-dark-gray
        line-height 21px
        img
          max-width 100%
          margin-bottom 10px

</style>