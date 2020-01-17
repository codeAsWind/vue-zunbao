<template>
  <div class="welcome wrapper">
    <div class="header">
      <h2>注册尊宝国际账户</h2>
      <p>欢迎加入尊宝国际，感谢您成为我们的尊贵会员。</p>
      <p>
        请尽快在个人中心完善个人的真实资料，务必填写真实有效的信息，我们提供安全快捷的存款方式，网页端手机端都可以申请。
      </p>
    </div>

    <div class="new-one">
      <h3>新人礼包</h3>
      <div class="item-list">
        <div class="item" v-for="item in giftList">
          <h3>{{item.title}}</h3>
          <p>{{item.describe}}</p>
          <router-link :to="{path:item.path}">
            <el-button type="primary">{{item.btnText}}</el-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="download">
      <div class="item">
        <h3>尊宝手机客户端下载</h3>
        <div class="ewm-box">
          <div>
            <p>
              <i class="iconfont icon-user"></i>
              苹果二维码
            </p>
            <img :src="config.zbAppEwm" alt="">
          </div>
          <div>
            <p>
              <i class="iconfont icon-user"></i>
              安卓二维码
            </p>
            <img :src="config.zbAppEwm" alt="">
          </div>
        </div>
      </div>
      <div class="item">
        <h3>PT电脑客户端下载</h3>
        <p class="official">
          官网下载
          <a href="http://cdn.sunrise8888.com/zunbao/setupglx.exe ">
            <el-button type="primary" size="small" class="small-btn">点击下载</el-button>
          </a>
        </p>
      </div>
      <div class="item">
        <h3>PT手机端下载（仅限安卓）</h3>
        <div class="ewm-box">
          <div>
            <p>
              <i class="iconfont icon-user"></i>
              安卓二维码
            </p>
            <img src="./img/pt-android.png" alt="">
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import config from '@/common/js/config'
  export default {
    data() {
      return {
        config,
        giftList:[
          {
            title:'下载app送彩金',
            describe:'人人有份',
            btnText:'立即领取',
            path:'/promotion?query=handsel'
          },
          {
            title:'首存即送100%',
            describe:'存10元送10元，存100送100',
            btnText:'立即存款',
            path:'/promotion?query=shoucun'
          },
          {
            title:'VIP升级送大礼',
            describe:'王者待遇',
            btnText:'立即查看',
            path:'/activity/vip'
          },
          {
            title:'每日签到',
            describe:'无需存款每日签到送4元，单月120元',
            btnText:'立即领取',
            path:'/promotion?query=sign'
          },
          {
            title:'次存优惠',
            describe:'最高25%',
            btnText:'立刻存款',
            path:'/promotion?query=ccc'
          },
          {
            title:'无上限返水',
            describe:'最高1.1%',
            btnText:'立即查看',
            path:'/promotion?query=fanshui'
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped src="./welcome.styl"></style>