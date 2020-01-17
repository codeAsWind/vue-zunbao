<template>
  <div class="footer">
    <div class="partner wrapper">
      <span>合作伙伴：</span>
      <div>
        <img :src="item.imgUrl" v-for="item in imgList" alt="">
      </div>
    </div>
    <div class="bottom">
      <div class="wrapper bottom-wrapper">
        <div class="block">
          <span>监管机构：</span>
          <div>
            <p><img src="./img/sv-1.jpg" alt=""></p>
            <p><img src="./img/sv-2.jpg" alt=""></p>
            <p><img src="./img/sv-3.jpg" alt=""></p>
          </div>
        </div>
        <div class="block">
          <span>推荐浏览器：</span>
          <div>
            <p>
              <a href="javascript:;">
                <i class="iconfont icon-user"></i>
                谷歌浏览器
              </a>
            </p>
            <p>
              <a href="javascript:;">
                <i class="iconfont icon-user"></i>
                火狐浏览器
              </a>
            </p>
            <p>
              <a href="javascript:;">
                <i class="iconfont icon-user"></i>
                Flash插件下载
              </a>
            </p>
          </div>
        </div>
        <div class="contact">
          <span>联系我们</span>
          <div>
            <p>客服邮箱：{{config.serviceEmail}}</p>
            <p>代理邮箱：{{config.agentEmail}}</p>
            <p>投诉邮箱：{{config.complaintEmail}}</p>
            <p class="qq">
              <span>商务合作QQ：</span>
              <span>
                <span v-for="item in config.qq">
                  {{item}} <br>
                </span>
              </span>
            </p>
          </div>
        </div>
        <div class="ewm">
          <img id="foot" :src="config.zbOfficialWebsite" alt="">
        </div>
      </div>
    </div>
    <div class="copyright wrapper">
      <p>PT游戏是由PT TransPacific在 <img src="./img/i-pagcor.png" alt=""> 的授权下部署</p>
      <p class="link">
        <router-link to="/about?queryId=aboutUs">关于尊宝</router-link>
        <span>|</span>
        <router-link to="/about?queryId=agreement">用户协议</router-link>
        <span>|</span>
        <router-link to="/about?queryId=rule">服务条款</router-link>
        <span>|</span>
        <router-link to="/about?queryId=protect">隐私政策</router-link>
        <span>|</span>
        <router-link to="/agent">合作代理</router-link>
        <span>|</span>
        <router-link to="/about?queryId=aboutUs">招牌展示</router-link>
        <span>|</span>
        <router-link to="/about?queryId=contact">联系我们</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import config from '@/common/js/config'

  export default {
    data() {
      return {
        config,
        imgList: [
          {imgUrl: require('./img/partner/apr-1.jpg')},
          {imgUrl: require('./img/partner/apr-2.jpg')},
          {imgUrl: require('./img/partner/apr-3.jpg')},
          {imgUrl: require('./img/partner/apr-4.jpg')},
          {imgUrl: require('./img/partner/apr-5.jpg')},
          {imgUrl: require('./img/partner/apr-6.jpg')},
          {imgUrl: require('./img/partner/apr-7.jpg')},
        ]
      }
    }
  }
</script>

<style src="./v-footer.styl" lang="stylus" scoped></style>
