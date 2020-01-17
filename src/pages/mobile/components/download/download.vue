<template>
  <div>
    <transition name="height">
      <div class="download" v-if="isShow">
        <p class="red text">下载APP送12-88元，名额有限，先下先得。</p>
        <div class="box">
          <div @click="close">
            <i class="iconfont icon-guanbi"></i>
            <p>暂不下载</p>
          </div>
          <div @click="appDownLoad">
            <i class="iconfont icon-ios"></i>
            <p>立刻下载</p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import {appDownLoad} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins:[appDownLoad],
    data() {
      return {
        isShow: true
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      close() {
        this.isShow = false
        this.$emit('closeDownload')
      },
    },
    watch: {},
    components: {}
  }
</script>

<style lang="stylus" scoped>
  $height = 48px
  @import '~common/stylus/variable'
  .download
    height 80px
    p.text
      line-height 32px
      text-align center
      background $color-light
    .box
      height $height
      line-height $height
      display flex
      background $color-blue-mobile
      color $color-light
      div
        display flex
        flex 1
        text-align center
        &:last-child
          background $color-danger
        i
          height $height
          width $height
          flex 0 0 $height
          font-size 20px
          display inline-block
          background rgba(0, 0, 0, .5)
        p
          flex 1

  .height-enter-active, .height-leave-active
    transition all .3s ease-in

  .height-enter, .height-leave-to
    height 0

</style>