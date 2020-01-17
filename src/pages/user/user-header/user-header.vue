<template>
  <div class="header">
    <div class="avator">
      <img :src="levelImage" alt="">
    </div>
    <div class="user-info">
      <div class="column-wrapper">
        <div class="column">
          <p>
            <i class="iconfont icon-xiaolian"></i>
            <span>欢迎回来：</span><span class="color-intersperse">{{this.userInfo.loginname}}</span>
          </p>
          <p>
            <i class="iconfont icon-huangguan"></i>
            <span>会员等级：</span><span class="color-intersperse">{{this.userInfo.level | level}}</span>
          </p>
          <p>
            <i class="iconfont icon-qiandao"></i>
            <span>签到余额：</span><span class="color-intersperse">{{signAmount}}元</span>
          </p>
        </div>
        <div class="column">
          <p>
            <i class="iconfont icon-weibiaoti-"></i>
            <span>上次登录时间：</span><span class="color-intersperse">{{this.userInfo.tempLastLoginTime | Date('yyyy-MM-dd hh:mm:ss')}}</span>
          </p>
          <p>
            <i class="iconfont icon-xiaoxi"></i>
            <span>消息未读：</span><span class="color-intersperse">{{unReadMessageNum}}条</span>
          </p>
          <p>
            <i class="iconfont icon-jifen"></i>
            <span>积分：</span><span class="color-intersperse">{{points}}</span>
          </p>
        </div>
      </div>
      <div class="query-account">
        <select v-model="gameCode" @change="getGameMoney" name="" id="">
          <option value="">余额查询</option>
          <option v-for="item in config.accountList" :value="item.value">{{item.text}}</option>
        </select>
        <span class="color-intersperse">{{balance}}</span>
        <i @click="getGameMoney" class="iconfont icon-shuaxin refresh"></i>
      </div>
    </div>
    <div class="btn-group">
      <router-link to="/user/deposit">
        <el-button size="small" class="small-btn" type="danger"><i class="iconfont icon-chongzhi0101"></i>充值</el-button>
      </router-link>
      <router-link to="/user/withdraw">
        <el-button size="small" class="small-btn" type="warning"><i class="iconfont icon-icon-test"></i>提款</el-button>
      </router-link>
      <router-link to="/user/transform">
        <el-button size="small" class="small-btn" type="success"><i class="iconfont icon-zhuanzhang"></i>转账</el-button>
      </router-link>
      <el-button size="small" class="small-btn" type="info" @click="logOut"><i class="iconfont icon-tuichu"></i>退出账户
      </el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {logOut} from "@/common/js/mixin"
  import api from '@/api/user'
  import config from '@/common/js/config'

  export default {
    mixins: [logOut],
    data() {
      return {
        config,
        balance: '0元',
        gameCode: ''
      }
    },
    computed: {
      levelImage() {
        return require(`@/common/image/level/${this.userInfo.level || 0}.png`)
      },
      ...mapGetters([
        'isLogin',
        'userInfo',
        'signAmount',
        'unReadMessageNum',
        'points'
      ]),
    },
    created() {
    },
    methods: {
      getGameMoney() {
        if (!this.gameCode) {
          this.$message({
            type: 'warning',
            message: '请选择账户'
          })
          return
        }
        api.getGameMoney({gameCode: this.gameCode}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.balance = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }
    },
    watch: {},
    components: {}
  }
</script>

<style src="./user-header.styl" lang="stylus" scoped></style>