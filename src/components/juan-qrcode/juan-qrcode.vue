<template>
  <div class="qrcode-wrapper">
    <div class="tab">
      <a :class="{active:idx === currentIdx}" @click="selectItem(idx)" v-for="(item,idx) in tabList"
         href="javascript:;">
        {{item.text}}
      </a>
    </div>
    <div class="content">
      <div v-show="currentIdx===0">
        <p>扫描下载久安定制APP</p>
        <img src="./juan.png" alt="">
        <p>
          有问题请阅读 <a class="color-intersperse" href="https://www.9anwallet.com/helpCenter" target="_blank">久安操作手册</a>
        </p>
      </div>

      <div v-show="currentIdx===1" style="position: relative">
        <p>
          使用久安定制App扫码登录
        </p>
        <img class="icon" src="./ic_ju.png" alt="">
        <div id="QRCode" ref="QRCode"></div>
        <a @click="redirectUrl(1)" href="javascript:;" target="_blank">
          <el-button size="small" type="primary" class="small-btn">前往久安定制(久安)</el-button>
        </a>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {redirectUrl} from '@/common/js/mixin'
  export default {
    mixins:[redirectUrl],
    data() {
      return {
        tabList: [
          {
            text: '扫描下载'
          },
          {
            text: 'APP登录'
          },
        ],
        currentIdx: 0,
        baseUrl: process.env.BASE_URL,
      }
    },
    computed: {
      ...mapGetters([
        'juanTokenData'
      ])
    },
    created() {
      let body = document.querySelector('body')
      let script = document.createElement('script')
      script.src = `${this.baseUrl}qrcode.js`
      body.appendChild(script)
    },
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
      _createQrcode() {
        this.$nextTick(() => {
          //先清空
          this.$refs.QRCode.innerHTML = ''
          this.juanTokenData.qrCode && new QRCode(this.$refs.QRCode, {
            text: this.juanTokenData.qrCode,
            width: 180,
            height: 180
          })
        })
      }
    },
    watch: {
      juanTokenData(val) {
        if (val.qrCode) {
          this._createQrcode()
        }
      }
    },
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .qrcode-wrapper
    width 200px
    .tab
      display flex
      a
        flex 1
        border 1px solid $color-border-gray
        line-height 40px
        text-align center
        &.active
          border-color $color-danger
          background $color-danger
          color $color-light
    .content
      background $color-gray-background
      text-align center
      padding 20px 0
      img
        width 180px
        margin 10px 0
      .icon
        width 45px
        height 45px
        position absolute
        z-index 999
        left 50%
        top 50%
        margin -30px 0 0 -22px
        padding 3px
        border-radius 5px
        background $color-light

  #QRCode
    position relative
    margin 15px 10px


</style>