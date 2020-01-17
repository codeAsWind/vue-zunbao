<template>
  <div>
    <div v-if="isShow" class="mask" @click="closeMenu"></div>
    <transition name="slider-left">
      <div v-if="isShow" class="menu-wrapper">
        <i @click="closeMenu" class="iconfont icon-2guanbi icon-close"></i>
        <div class="header">
          <div v-if="isLogin">
            <img :src="levelImage" alt="">
            <p>会员账号：{{userInfo.loginname}}</p>
            <p>会员等级：{{userInfo.level | level}}</p>
            <p>会员余额：{{userInfo.credit}}</p>
          </div>
          <div v-if="!isLogin">
            <p style="padding :20px 0">尊敬的用户，您好，请先登录</p>
          </div>
        </div>
        <div class="main">
          <ul>
            <li @click="selectItem(item)" v-for="item in filterList">
              <i :class="getIcon(item)"></i>
              <span>{{item.text}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {levelImage, logOut} from '@/common/js/mixin'

  export default {
    mixins: [levelImage, logOut],
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menuList: [
          {
            text: '登录账户',
            icon: 'denglu',
            id: 'login',
            show: 'logOut'
          },
          {
            text: '注册账户',
            icon: 'zhuce1',
            id: 'register',
            show: 'logOut'
          },
          {
            text: '安全退出',
            icon: 'tuichu',
            id: 'logout',
            show: 'isLogin'
          },
          {
            text: '关于我们',
            icon: 'guanyuwomen1',
            id: 'aboutUs',
            show: 'isLogin&logOut'
          },
          {
            text: '自助中心',
            icon: 'zizhu',
            id: 'helpSelf',
            show: 'isLogin&logOut'
          },
          {
            text: '线路测试',
            icon: 'xianlu',
            id: 'lineText',
            show: 'isLogin&logOut'
          },
        ]
      }
    },
    computed: {
      filterList() {
        if (this.isLogin) {
          return this.menuList.filter(item => item.show.includes('isLogin'))
        } else {
          return this.menuList.filter(item => item.show.includes('logOut'))
        }
      },
      ...mapGetters(['isLogin'])
    },
    created() {

    },
    methods: {
      selectItem(item) {
        this.closeMenu()
        // 退出
        if (item.id === 'logout') {
          this.logOut()
        }
        // 登录
        if (item.id === 'login') {
          this.$router.push('/mobile/login')
        }

        // 注册
        if (item.id === 'register') {
          this.$router.push('/mobile/register')
        }

        // 关于我们
        if (item.id === 'aboutUs') {
          this.$router.push('/mobile/about-us')
        }

        // 自助中心
        if (item.id === 'helpSelf') {
          this.$router.push('/mobile/help-self')
        }

        // 线路测试
        if (item.id === 'lineText') {
          this.$router.push('/mobile/line-test')
        }
      },
      closeMenu() {
        this.$emit('closeMenu')
      },
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      }
    }
  }
</script>

<style lang="stylus" src="./menu.styl" scoped></style>
