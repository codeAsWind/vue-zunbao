<template>
  <div class="welfare">
    <div class="wrapper wrapper-welfare">
      <div class="item-list">
        <div @click="openDialog(item.id)" :class="item.id" class="item" v-for="item in list"></div>
      </div>
    </div>

    <!--首存-->
    <v-dialog @on-close="closeDialog(TYPES.shoucun)" :isShow="shoucun">
      <div class="dialog-header">
        <h3>尊宝新128%首次存送</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>新注册玩家</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>首存申请金额</th>
              <th>优惠比例</th>
              <th>红利上限</th>
              <th>流水倍数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td rowspan="2">10元以上</td>
              <td>100%</td>
              <td>1288</td>
              <td>20倍</td>
            </tr>
            <tr>
              <td>128%</td>
              <td>128元</td>
              <td>25倍</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h3>申请方式：</h3>
        <p>
          1.会员先登录需要申请的平台进行激活，并且在指定的老虎机平台进行游戏。 <br>

          2.您在成功存款后点击【个人中心】->【自助优惠】->【自助存送】，选择老虎机/真人平台首存优惠即可申请。<br>

          <span class="red">（请注意：如果提前将资金转入到了游戏平台，那么将会认为是自动放弃首存权利）</span>
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/user/discounts')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>

    <!--每日签到-->
    <v-dialog @on-close="closeDialog(TYPES.sign)" :isShow="sign">
      <div class="dialog-header">
        <h3>免费签到领彩金4-20元</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>全体会员</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <p>
          每日登陆会员账号即可免费签到领彩金4-20元，月累计千元免费彩金不是梦！
        </p>
        <div class="table">
          <table>
            <thead>
            <tr>
              <th>等级</th>
              <th>每日签到</th>
              <th>激活要求</th>
              <th>签到金最高提款</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>普通会员</td>
              <td>4元</td>
              <td>240元</td>
              <td>588元</td>
            </tr>

            <tr>
              <td>青铜VIP</td>
              <td>10元</td>
              <td>600元</td>
              <td>3888元</td>
            </tr>
            <tr>
              <td>白银VIP</td>
              <td>12元</td>
              <td>700元</td>
              <td>5888元</td>
            </tr>
            <tr>
              <td>黄金VIP</td>
              <td>14元</td>
              <td>800元</td>
              <td>8888元</td>
            </tr>

            <tr>
              <td>白金VIP</td>
              <td>16元</td>
              <td>900元</td>
              <td>12888元</td>
            </tr>
            <tr>
              <td>钻石VIP</td>
              <td>18元</td>
              <td>1000元</td>
              <td>21888元</td>
            </tr>
            <tr>
              <td>王者VIP</td>
              <td>20元</td>
              <td>1200元</td>
              <td>38888</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h3>申请方式</h3>
        <p>
          电脑用户，点击右上角签到即可领取签到彩金 <br>

          手机用户，登录APP后，点击右下角的"账户中心"->"签到送彩金"，即可进入签到页面领取彩金。
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/user/sign-lottery')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>

    <!--vip-->
    <v-dialog @on-close="closeDialog(TYPES.vip)" :isShow="vip">
      <div class="dialog-header">
        <h3>终身VIP 永不掉级卡</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>全体会员</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <p>
          尊宝每月将特邀100名贵宾存款直接成为VIP会员。
        </p>
        <p>
          晋级方式分为单笔存款、周累积存款、月累积存款。
          <br>单笔存款就送VIP！让您走上人生高端路，玩游戏享VIP！做人生大赢家！
          <br>特邀VIP会员存款符合要求后，可直接派发领取免费筹码、晋级奖金和生日礼金以及享受VIP相应等级特权！
        </p>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>等级</th>
              <th>单笔存款条件</th>
              <th>周存款条件</th>
              <th>月累计存款</th>
              <th>流水倍数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>青铜VIP</td>
              <td>当日单笔存款1万</td>
              <td>持续一自然周每日累积存6000元</td>
              <td>月累计存款8万（平均日存2666）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>白银VIP</td>
              <td>当日单笔存款3万（可分批）</td>
              <td>持续一自然周每日累积存9000元</td>
              <td>月累计存款15万（平均日存5000）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>黄金VIP</td>
              <td>当日单笔存款5万（可分批）</td>
              <td>持续一自然周每日累积存12000元</td>
              <td>月累计存款25万（平均日存8333）</td>
              <td>5倍</td>
            </tr>

            <tr>
              <td>白金VIP</td>
              <td>当日单笔存款10万（可分批）</td>
              <td>持续一自然周每日累积存20000元</td>
              <td>月累计存款50万（平均日存16666）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>钻石VIP</td>
              <td>当日单笔存款20万（可分批）</td>
              <td>持续一自然周每日累积存50000元</td>
              <td>月累计存款88万（平均日存29629）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>王者VIP</td>
              <td>仅限邀请会员</td>
              <td>仅限邀请会员</td>
              <td>仅限邀请会员</td>
              <td>5倍</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h3>申请方式</h3>
        <p>
          电脑用户，点击右上角签到即可领取签到彩金 <br>

          手机用户，登录APP后，点击右下角的"账户中心"->"签到送彩金"，即可进入签到页面领取彩金。
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/activity/vip')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>

    <!--redPacket-->
    <v-dialog @on-close="closeDialog(TYPES.redPacket)" :isShow="redPacket">
      <div class="dialog-header">
        <h3>终身享受每日红包雨</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>新注册玩家</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <p>
          活动期间内，天天限时红包雨，达指定存款或投注额获得巨无霸红包
        </p>
        <h3>申请方式：</h3>
        <p>
          每日不定时开启，活动开启时，官网/手机网页专题页面或者APP首页就会有红包落下，您只需点击红包即可抢夺
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>

    <!--handsel-->
    <v-dialog @on-close="closeDialog(TYPES.handsel)" :isShow="handsel">
      <div class="dialog-header">
        <h3>12~88元免费彩金</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>全体会员</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <p>
          只要您下载尊宝手机APP，无需联系客服，即可自助领取12-88元彩金。彩金无需流水，达到388元即可提款。
        </p>

        <h3>申请方式：</h3>
        <p>
          登入APP->账户中心->APP下载彩金 即可领取。
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/download')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>

    <!--film-->
    <v-dialog @on-close="closeDialog(TYPES.film)" :isShow="film">
      <div class="dialog-header">
        <h3>你选电影 我买票</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>全体会员</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <p>
          尊宝国际为回馈广大会员的支持，福利再次来袭！不定期请您看国内外最新首映电影，尽享尊荣vip观影体验！
        </p>

        <h3>申请方式：</h3>
        <p>
          当日存款满500以上，每月仅限前100名申请，先申先得，次日系统将在申请名单里随机抽取。
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/activity/movie')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>

    <!--limitTime-->
    <v-dialog @on-close="closeDialog(TYPES.limitTime)" :isShow="limitTime">
      <div class="dialog-header">
        <h3>天天限时存送卡</h3>
      </div>
      <div class="dialog-body">
        <p>
          <span>活动时间：</span>
          <span>长期有效</span>
        </p>
        <p>
          <span>活动范围：</span>
          <span>全体会员</span>
        </p>
        <p>
          <span>活动详情：</span>
        </p>
        <p>
          在特定的指定时间尊宝会开放30-100%存送优惠活动，请您关注尊宝官网或者APP掌握最新资讯
        </p>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>存款要求</th>
              <th>优惠比例</th>
              <th>优惠最高金额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>存款10元以上</td>
              <td>100%</td>
              <td>1288</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h3>申请方式</h3>
        <p>
          登陆会员账号后点击"个人中心"->"自助优惠"->"自助存送"，选择您要申请的游戏平台后再选择您要申请的存送优惠即可申请成功 。
        </p>
        <p class="center center-btn">
          <el-button @click="goToUserCenter('/user/discounts')" type="warning">立即申请</el-button>
        </p>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  const TYPES = {
    shoucun: 'shoucun',
    sign: 'sign',
    intergal: 'intergal',
    vip: 'vip',
    redPacket: 'redPacket',
    handsel: 'handsel',
    film: 'film',
    limitTime: 'limitTime',
  }
  import VDialog from '@/components/dialog/dialog'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        TYPES,
        list: [
          {
            id: TYPES.shoucun,
          },
          {
            id: TYPES.sign,
          },
          {
            id: TYPES.intergal,
          }, {
            id: TYPES.vip,
          }, {
            id: TYPES.redPacket,
          }, {
            id: TYPES.handsel,
          }, {
            id: TYPES.film,
          }, {
            id: TYPES.limitTime,
          },

        ],
        //弹框状态
        shoucun: false,
        sign: false,
        intergal: false,
        vip: false,
        redPacket: false,
        handsel: false,
        film: false,
        limitTime: false,


      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      goToUserCenter(path) {
        if (!this.isLogin) {
          this.$message({
            type: 'warning',
            message: '请先登录游戏'
          })
          return
        }

        this.$router.push(path)
      },
      openDialog(id) {
        if (id === TYPES.intergal) {
          this.$message({
            type: 'success',
            message: '敬请期待'
          })
          return
        }
        this[id] = true
      },
      closeDialog(id) {
        this[id] = false
      }
    },
    watch: {},
    components: {
      VDialog
    }

  }
</script>

<style src="./welfare.styl" lang="stylus" scoped>

</style>