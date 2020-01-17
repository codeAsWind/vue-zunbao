<template>
  <div>
    <div class="user-info">
      <h3 class="title">尊宝积分商城</h3>
      <div v-if="!isLogin" class="is-logOut">
        <div class="avator">
          <i class="iconfont icon-xiazai"></i>
        </div>
        <p>登录后可查看会员详细信息</p>
        <el-button class="small-btn" size="small" @click="openLoginDialog" type="primary">马上登录</el-button>
      </div>
      <div v-if="isLogin" class="is-login">
        <div class="avator">
          <img :src="levelImage" alt="">
          <span>{{userInfo.loginname}}</span>
        </div>
        <p class="points">我的积分：<span class="red">{{points}}</span> 分</p>
        <el-button @click="openDialog('isShowRecordDialog')" class="small-btn" size="small" type="primary">积分兑换记录
        </el-button>
      </div>
      <div class="bottom">
        <div class="tit">
          <h3>会员权益</h3>
          <a @click="openRules" class="link" href="javascript:;">规则</a>
        </div>
        <div class="welfare">
          <div class="item">
            <i class="iconfont icon-duihuan"></i>
            <span>兑一送一</span>
          </div>
          <div class="item">
            <i class="iconfont icon-jifen"></i>
            <span>双倍积分</span>
          </div>
          <div class="item">
            <i class="iconfont icon-weibiaoti2fuzhi02"></i>
            <span>兑换折扣</span>
          </div>
        </div>
      </div>
    </div>

    <!--兑换弹框记录-->
    <lottery-records
        @closeDialog="closeDialog('isShowRecordDialog')"
        :isShowRecordDialog="isShowRecordDialog"
        :flag="2">
    </lottery-records>
  </div>
</template>

<script>
  import {levelImage, loginDialog} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  import LotteryRecords from '@/pages/integral/lottery-records/lottery-records'

  export default {
    mixins: [levelImage, loginDialog],
    data() {
      return {
        isShowRecordDialog: false
      }
    },
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['points', 'userInfo'])
    },
    created() {
    },
    methods: {
      closeDialog(attr) {
        this[attr] = false
      },
      openDialog(attr) {
        this[attr] = true
      },
      openRules() {
        let h = this.$createElement
        this.$msgbox({
          title: '温馨提示',
          message: h('div', null, [
            h('p', null, '兑一送一：青铜及以上VIP会员，指定日期开启兑换'),
            h('p', null, '双倍积分：全员可享受，指定日期开启存款送双倍积分'),
            h('p', null, '兑换折扣：根据会员等级，享受不同比例折扣，等级越高折扣越高'),
            h('p', {style: 'opacity:.7;margin-top:10px'}, '注：后期会开放更多会员权益，请多多关注'),
          ]),
          center:false
        }).catch(e => e)
      }
    },
    watch: {},
    components: {LotteryRecords}
  }
</script>

<style src="./user-info.styl" lang="stylus" scoped></style>