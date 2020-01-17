<template>
  <div class="download">
    <div class="wrapper">
      <div class="top-part">
        <p>
          <img src="./img/dl-topic.png" alt="">
        </p>
        <p class="zb-app">
          <img src="./img/dl-code.jpg" alt="">
        </p>
      </div>
      <div class="item-list">
        <div :class="{active:currentIdx === idx}" class="item" v-for="(item,idx) in dataList">
          <div class="title-bar">
            <img @click="selectItem(idx)" :src="item.titleImg" alt="">
          </div>
          <div class="sub">
            <div class="wr">
              <h3>{{item.title}}</h3>
              <p class="download-text">
                下载方式：请扫描二维码下载
              </p>
              <div class="ewm">
                <div v-if="item.androidEwm" class="android">
                  <img class="ewm-img" width="150" :src="item.androidEwm" alt="">
                  <p>安卓二维码</p>
                </div>
                <div v-if="item.iosEwm" class="ios">
                  <img class="ewm-img" width="150" :src="item.iosEwm" alt="">
                  <p>苹果二维码</p>
                </div>
                <div v-if="item.btnLink">
                  <a :href="item.btnLink">
                    <el-button type="warning">{{item.btnText}}</el-button>
                  </a>
                  <p>↑点击即可下载电脑版客户端</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentIdx: 0,
        dataList: [
          {
            titleImg: require('./img/dl-ag-live1.jpg'),
            title: 'AG客户端下载 ／ 支持安卓系统手机',
            androidEwm: require('./img/ag-ewm.png'),
            btnText: 'AG客户端',
            btnLink: 'http://agmbet.com',
          },
          {
            titleImg: require('./img/dl-ag-fish1.jpg'),
            title: 'AG捕鱼客户端下载 ／ 支持安卓系统手机',
            androidEwm: require('./img/ag2-android.png'),
          },
          {
            titleImg: require('./img/dl-ebet1.jpg'),
            title: 'EBET客户端 ／ 支持安卓系统手机',
            androidEwm: require('./img/ebetad2wm.png'),
          },
          {
            titleImg: require('./img/dl-pt1.jpg'),
            title: 'PT客户端需要在帐号前面加上"ZB"',
            androidEwm: require('./img/pt-android.png'),
            btnText: 'PT电脑客户端',
            btnLink: 'http://cdn.sunrise8888.com/zunbao/setupglx.exe',
          },
          {
            titleImg: require('./img/dl-dt1.jpg'),
            title: 'DT老虎机APP下载 ／ 支持苹果、安卓系统手机',
            androidEwm: require('./img/dt-android.png'),
            iosEwm: require('./img/dt-ios.png'),
          },
          {
            titleImg: require('./img/dl-dt-fish1.jpg'),
            title: '钱来捕鱼客户端下载 ／ 支持苹果、安卓系统手机',
            androidEwm: require('./img/dt-fish-a.png'),
            iosEwm: require('./img/dt-fish-i.png'),
          },
          {
            titleImg: require('./img/dl-mwg1.jpg'),
            title: 'MWG客户端下载 ／ 支持安卓系统手机',
            androidEwm: require('./img/mwg-a.png'),
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
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" src="./download.styl" scoped></style>