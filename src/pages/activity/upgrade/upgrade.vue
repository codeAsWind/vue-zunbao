<template>
  <div class="upgrade">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
      <div class="content">

        <div class="info" @click="doSignClockRecord">
          <div id="feb-sign">
            <img src="./img/s-btn-check.png" alt="">
          </div>
        </div>

        <div class="sign-bar">
          <div id="dates" class="dates">
            <div class="date data-1"><img src="./img/d-1.png" alt=""></div>
            <div class="date data-2"><img src="./img/d-2.png" alt=""></div>
            <div class="date data-3"><img src="./img/d-3.png" alt=""></div>
            <div class="date data-4"><img src="./img/d-4.png" alt=""></div>
            <div class="date data-5"><img src="./img/d-5.png" alt=""></div>
            <div class="date data-6"><img src="./img/d-6.png" alt=""></div>
            <div class="date data-7"><img src="./img/d-7.png" alt=""></div>
            <div class="date data-8"><img src="./img/d-8.png" alt=""></div>
            <div class="date data-9"><img src="./img/d-9.png" alt=""></div>
            <div class="date data-10"><img src="./img/d-10.png" alt=""></div>
            <div class="date data-11"><img src="./img/d-11.png" alt=""></div>
            <div class="date data-12"><img src="./img/d-12.png" alt=""></div>
            <div class="date data-13"><img src="./img/d-13.png" alt=""></div>
            <div class="date data-14"><img src="./img/d-14.png" alt=""></div>
            <div class="date data-15"><img src="./img/d-15.png" alt=""></div>
            <div class="date data-16"><img src="./img/d-16.png" alt=""></div>
            <div class="date data-17"><img src="./img/d-17.png" alt=""></div>
            <div class="date data-18"><img src="./img/d-18.png" alt=""></div>
            <div class="date data-19"><img src="./img/d-19.png" alt=""></div>
            <div class="date data-20"><img src="./img/d-20.png" alt=""></div>
            <div class="date data-21"><img src="./img/d-21.png" alt=""></div>
            <div class="date data-22"><img src="./img/d-22.png" alt=""></div>
            <div class="date data-23"><img src="./img/d-23.png" alt=""></div>
            <div class="date data-24"><img src="./img/d-24.png" alt=""></div>
            <div class="date data-25"><img src="./img/d-25.png" alt=""></div>
          </div>
        </div>

        <div class="ct">
          <img src="./img/t-1.png" alt="">
          <p>尊宝国际网站所有会员活动期间内，每日打卡存款<span class="c-yel">300元</span>以上，达到指定日期即可领取存款全勤彩金！</p>
          <div class="table-bar">
            <table class="table">
              <thead>
              <tr>
                <th>会员等级</th>
                <th>累积存款3天</th>
                <th>累积存款11天</th>
                <th>累积存款15天</th>
                <th>累积存款25天</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>普通会员</td>
                <td>18</td>
                <td>38</td>
                <td>68</td>
                <td>188</td>
              </tr>
              <tr>
                <td>青铜VIP</td>
                <td>28</td>
                <td>58</td>
                <td>88</td>
                <td>208</td>
              </tr>
              <tr>
                <td>白银VIP</td>
                <td>38</td>
                <td>68</td>
                <td>128</td>
                <td>288</td>
              </tr>
              <tr>
                <td>黄金VIP</td>
                <td>58</td>
                <td>88</td>
                <td>158</td>
                <td>318</td>
              </tr>
              <tr>
                <td>铂金VIP</td>
                <td>88</td>
                <td>188</td>
                <td>358</td>
                <td>428</td>
              </tr>
              <tr>
                <td>钻石VIP</td>
                <td>158</td>
                <td>238</td>
                <td>588</td>
                <td>888</td>
              </tr>
              </tbody>
            </table>
            <img src="./img/c-1.png" alt="">
            <p>点击个人中心---点击转账---来源账户：选择“存款全勤奖账户”---即可选择游戏平台进行转账</p>
          </div>
        </div>
      </div>
      <div class="rule-bar">
        <div class="rule">
          <img src="./img/t-2.png" alt="">
          <p>1、活动投注范围限于尊宝国际网站（包括PC网页版、手机网页版及手机APP版）内的老虎机游戏。</p>
          <p>2、活动每位玩家每月可参与一次，喻：按一个月<span class="c-yel">30天</span>来计算，玩家可在当月内完成任意<span class="c-yel">25天</span>的累计存款（允许当月里期间可中断隔天打卡签到存款等情况），但存款记录不可能累积到下月，每月月底进行刷新记录玩家每月都可参与此活动。
          </p>
          <p>3、符合条件的玩家领取彩金后可在“户内转账”账户里选择存款全勤账户查询余额进行转账到相对游戏平台。</p>
          <p>4、此活动彩金只需要在老虎机平台里完成<span class="c-yel">15倍</span>流水即可提款。</p>
          <p>5、活动秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，账号及所有户内余额将被取消。</p>
        </div>
        <p class="bot c-yel">•尊宝国际享有修订权和最终解释权•</p>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import api from '@/api/activity'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
      if (this.isLogin) {
        this._findSignClockRecord()
      }
    },
    methods: {
      //查询打卡记录
      _findSignClockRecord() {
        api.findSignClockRecord().then((res) => {
          if (this.ERR_OK === res.code) {
            if (res.data.length) {
              //dom渲染成功后操作dom
              this.$nextTick(() => {
                let dates = document.querySelectorAll('#dates .date')
                res.data.forEach((item, idx) => {
                  dates[idx].classList.add('active')
                })
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      doSignClockRecord() {
        if (!this.isLogin) {
          this.$refs.nav.openDialog('isShowLoginDialog')
          return
        }
        api.doSignClockRecord().then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data.message //开发待处理
            })
            this._findSignClockRecord()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }
    },
    watch: {
      isLogin(val) {
        if (val) {
          this._findSignClockRecord()
        }
      }
    },
    components: {commonNav, commonFooter}

  }
</script>

<style lang="stylus" src="./baccarat.styl" scoped></style>