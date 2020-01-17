<template>
  <div class="app-handsel">
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <div class="box">
        <h1 class="red">下载app即送8-88彩金</h1>

        <div class="clearfix">
          <div class="item" v-for="(item,idx) in list">
            <p class="red"><i :class="item.icon"></i><span>{{item.title}}</span></p>
            <p>
              下载方法【{{idx+1}}】<br>
              使用手机二维码扫描软件扫码下载
            </p>
            <img :src="config.zbAppEwm" alt="">
          </div>
        </div>

        <p class="red">
          苹果app下载温馨提示：手机APP安装出现未信任软件，请您进入手机设置--通用--设备设置--golden
          skydragonmarket点击手中弹出窗口，点击信任就可以了。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import config from '@/common/js/config'

  export default {
    data() {
      return {
        config,
        tabTitleList: [
          {
            text: 'APP彩金'
          }
        ],
        currentIdx: 0,
        list: [
          {
            icon: 'iconfont icon-ios',
            title: 'IOS系统下载',
          },
          {
            icon: 'iconfont icon-android',
            title: 'Android系统下载',
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
    },
    watch: {},
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .app-handsel
    .box
      width 90%
      margin 0 auto
      line-height 30px
      h1
        font-size 22px
        text-align center
        margin-bottom 10px
    .clearfix
      display flex
      justify-content space-between
      text-align center
      i.iconfont
        font-size 20px
        margin-right 5px


</style>