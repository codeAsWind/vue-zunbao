<template>
  <div :class="{active:activeClass}" class="sidebar">
    <div class="bar" @click="toggleSidebar">
      <i class="iconfont icon-cc-arrow-right-circle"></i>
      <span>在线客服</span>
    </div>
    <div class="box">
      <div class="item">
        <a :href="config.serviceLink" target="_blank">
          <i class="iconfont icon-kefu"></i>
          <span>在线客服</span>
        </a>
      </div>
      <div class="item">
        <a @click="makeCall" href="javascript:;">
          <i class="iconfont icon-dianhua"></i>
          <span>免费回拨</span>
        </a>
      </div>
      <div class="item" @mouseover="emailToggle = true" @mouseout="emailToggle = false">
        <a v-if="!emailToggle" href="javascript:;">
          <i class="iconfont icon-mail"></i>
          <span>客服邮箱</span>
        </a>
        <a v-if="emailToggle" :href="`mailto:${config.serviceEmail}`">
          <span>{{config.serviceEmail}}</span>
        </a>
      </div>
      <div class="item ewm">
        <a v-if="!isLogin" href="javascript:;">
          <img width="120" :src="config.zbAppEwm" alt="">
          <div class="text">
            <p>扫描下载尊宝app</p>
            <p>
              支持：
              <i class="iconfont icon-android"></i>
              <i class="iconfont icon-ios"></i>
            </p>
          </div>
        </a>
        <a v-if="isLogin" href="javascript:;">
          <img width="120" :src="vipEWM" alt="">
          <div class="text">
            <p>客服上班时段：</p>
            <p>周一至周六</p>
            <p>上午10点-19点</p>
          </div>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <i style="transform: rotate(180deg)" class="iconfont icon-arrowdown"></i>
          <span>返回顶部</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/common/js/config'
  import MakeCall from './makeCall'
  import {mapGetters} from 'vuex'
  import {queryQrcode} from '@/common/js/mixin'

  export default {
    mixins: [queryQrcode],
    data() {
      return {
        config,
        activeClass: false,
        emailToggle: false
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      toggleSidebar() {
        this.activeClass = !this.activeClass
      },
      makeCall() {
        if (!this.isLogin) {
          this.$msgbox({
            title: '温馨提示',
            type: 'warning',
            message: '请先登录账号'
          }).catch((e) => {
            console.log(e)
          })
          return
        }
        const h = this.$createElement
        this.$msgbox({
          title: '免费热线拨打',
          customClass: 'make-dialog',
          message: h(MakeCall, {key: Math.random()})
        })
      },
    },
    watch: {},
    components: {
      MakeCall
    }
  }
</script>
<style lang="stylus">
  .make-dialog.el-message-box
    width 520px
</style>
<style src="./v-sidebar.styl" lang="stylus" scoped></style>