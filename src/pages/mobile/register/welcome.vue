<template>
  <div class="welcome">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <h3 class="red tit center">
        恭喜您！您的帐号注册成功啦
        <br>
        您可以享受以下优惠！
      </h3>

      <div class="adv">
        <div v-for="item in list" class="item">
          <div class="text">
            <h3 class="red">{{item.title}}</h3>
            <p>{{item.text}}</p>
          </div>
          <span class="btn" @click="selectItem(item)">
            {{item.btnText}}
          </span>
        </div>
      </div>

      <div class="center">
        <mt-button @click="goToIndex" type="primary">确定</mt-button>
      </div>

      <div class="tip">
        <h3 class="red">温馨提示：</h3>
        <p>
          苹果手机下载APP，下载之后会提示手机安装APP出现未信任软件，请进入手机设置-通用-设备设置-goldenskydragonmarket点击手中弹出窗口，点击信任就可以了
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headData: {
          title: '注册成功',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
        list: [
          {
            title: '首存100%',
            text: '充值10元送10元，100送100元',
            btnText: '立即充值',
            id: 'shoucun'
          },
          {
            title: '下载APP',
            text: '下载APP送8-88元不等随机派送',
            btnText: '立即下载',
            id: 'download'
          },
          {
            title: '每日签到',
            text: '无需存款，每日签到送4元，单月120元',
            btnText: '立即签到',
            id: 'sign'
          },
          {
            title: '限时存送',
            text: '只限APP领取，每日30%-100%存送优惠',
            btnText: '立即下载',
            id: 'limit'
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectItem(item) {
        if (item.id === 'download' || item.id === 'limit') {
          window.location.href = 'https://www.qnappzb.com/web/app.html'
        }

        if (item.id === 'shoucun') {
          this.$router.push('/mobile/user/deposit')
        }

        if (item.id === 'sign') {
          this.$router.push('/mobile/user/sign')
        }

      },
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/service')
      },
      goToIndex() {
        this.$router.push('/mobile')
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .welcome
    mobile-wrapper()
    .content
      padding 20px 10px
      .tit
        font-size 18px
        line-height 28px

    .adv
      margin 15px 0
      .item
        display flex
        line-height 21px
        margin-bottom 15px
        .text
          background $color-gray-background
          padding 10px
          flex 1
          border-radius 5px
          h3
            font-size 16px

        span.btn
          background $color-blue-mobile
          color $color-light
          flex 0 0 62px
          text-align center
          padding 8px 15px
          border-radius 5px

    .tip
      margin-top 10px
      line-height 21px
      h3
        font-weight 600
        margin-bottom 5px
</style>