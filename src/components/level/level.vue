<template>
  <div class="title">
    <div class="line"></div>
    <div class="line current-line" :style="styleObject"></div>
    <div class="items">
      <div v-for="item in levelList" class="item">
        <div class="level-img-wrapper"><img class="level-img" :src="item.img" alt=""></div>
        <span :class="{active:userInfo.level>=item.level}" class="dot"></span>
        <span v-if="userInfo.level==item.level" class="tit">您当前为{{item.title}}</span>
        <div v-if="item.sub" class="sub">
          <p>{{item.title}}</p>
          <p>升级礼金：{{item.sub.levelHandsel}}元</p>
          <p>免费筹码：{{item.sub.freeChips}}元</p>
          <p>生日礼金：{{item.sub.birthdayHandsel}}元</p>
          <p>签到礼金：{{item.sub.signHandsel}}元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        levelList: [
          {
            title: '新会员',
            img: require('@/common/image/level/0.png'),
            level: 0
          },
          {
            title: '青铜vip',
            img: require('@/common/image/level/1.png'),
            level: 1,
            sub: {
              levelHandsel: 88,
              freeChips:18,
              birthdayHandsel:188,
              signHandsel:10
            }
          },
          {
            title: '白银vip',
            img: require('@/common/image/level/2.png'),
            level: 2,
            sub: {
              levelHandsel: 188,
              freeChips:58,
              birthdayHandsel:288,
              signHandsel:12
            }
          },
          {
            title: '黄金vip',
            img: require('@/common/image/level/3.png'),
            level: 3,
            sub: {
              levelHandsel: 388,
              freeChips:88,
              birthdayHandsel:388,
              signHandsel:14
            }
          },
          {
            title: '白金vip',
            img: require('@/common/image/level/4.png'),
            level: 4,
            sub: {
              levelHandsel: 588,
              freeChips:188,
              birthdayHandsel:588,
              signHandsel:16
            }
          },
          {
            title: '钻石vip',
            img: require('@/common/image/level/5.png'),
            level: 5,
            sub: {
              levelHandsel: 888,
              freeChips:588,
              birthdayHandsel:888,
              signHandsel:18
            }
          },
          {
            title: '王者vip',
            img: require('@/common/image/level/6.png'),
            level: 6,
            sub: {
              levelHandsel: 1888,
              freeChips:1288,
              birthdayHandsel:1888,
              signHandsel:20
            }
          }
        ],
      }
    },
    computed: {
      styleObject() {
        return {
          width: this.userInfo.level * 130 + 'px'
        }
      },
      ...mapGetters([
        'isLogin',
        'userInfo'
      ]),
    },
    created() {
    },
    methods: {},
    watch: {},
    components: {}
  }
</script>

<style src="./level.styl" lang="stylus" scoped>

</style>