<template>
  <div class="activity-vip">
    <common-nav></common-nav>
    <div class="banner"></div>
    <div class="main wrapper">
      <div class="table">
        <el-table
            border
            stripe
            style="width:100%"
            :data="dataList">
          <el-table-column
              v-for="item in headList"
              :label="item.label"
              :prop="item.prop">
          </el-table-column>
        </el-table>
      </div>
      <h3 class="title">晋级条件</h3>
      <div class="my-table table">
        <table>
          <thead>
          <tr>
            <th>VIP等级</th>
            <th>晋级条件</th>
            <th>保级要求</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>青铜VIP</td>
            <td>
              <p>
                A.所有平台月投注额45万 <br>
                B.所有老虎机平台月投注额10万
              </p>
            </td>
            <td rowspan="6">
              无需要求
              <br>永久有效
            </td>
          </tr>
          <tr>
            <td>白银VIP</td>
            <td>
              <p>
                A.所有平台月投注额100万 <br>
                B.所有老虎机平台月投注额60万
              </p>
            </td>
          </tr>
          <tr>
            <td>黄金VIP</td>
            <td>
              <p>
                A.所有平台月投注额300万 <br>
                B.所有老虎机平台月投注额180万
              </p>
            </td>
          </tr>

          <tr>
            <td>白金VIP</td>
            <td>
              <p>
                A.所有平台月投注额500万 <br>
                B.所有老虎机平台月投注额300万
              </p>
            </td>
          </tr>

          <tr>
            <td>钻石VIP</td>
            <td>
              <p>
                A.所有平台月投注额800万 <br>
                B.所有老虎机平台月投注额500万
              </p>
            </td>
          </tr>

          <tr>
            <td>王者VIP</td>
            <td></td>
          </tr>

          </tbody>
        </table>
      </div>

      <div class="tips">
        <h3>温馨提示</h3>
        <p>
          1.每个月5号系统自动审核进行升级；系统以晋级条件中的A、B来进行升级。

          <br>2.会员有达到晋级条件中的A或B，可以进入“ 账户管理”——“自助晋级”自行操作。

          <br>3.会员每个月只享有一次晋级的机会， 且各等级晋级礼金每位玩家只可以获得一次。当月自助晋级之后，下个月系统晋级审核时将不再计算上个月的投注额。

          <br>4.尊宝国际拥有最终解释权和裁决权。

          <br>5.会员当月未收到免费筹码，需要在一个月内找在线客服申请，例:2月未收到需要在3月31日23:59:59前申请，逾时视同放弃。
        </p>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  export default {
    data() {
      return {
        headList: [
          {
            label: '优惠',
            prop: 'prom'
          },
          {
            label: '普通会员',
            prop: 'level0'
          },
          {
            label: '青铜VIP',
            prop: 'level1'
          },
          {
            label: '白银VIP',
            prop: 'level2'
          },
          {
            label: '黄金VIP',
            prop: 'level3'
          },
          {
            label: '白金VIP',
            prop: 'level4'
          },
          {
            label: '钻石VIP',
            prop: 'level5'
          },
          {
            label: '王者VIP',
            prop: 'level6'
          },
        ],
        dataList: [
          {
            prom: '流水兑积分',
            level0: '500/1',
            level1: '450/1',
            level2: '400/1',
            level3: '350/1',
            level4: '300/1',
            level5: '250/1',
            level6: '200/1',
          },
          {
            prom: '晋级礼金',
            level0: '',
            level1: '88',
            level2: '188',
            level3: '388',
            level4: '588',
            level5: '888',
            level6: '200/1',
          },
          {
            prom: '免费筹码',
            level0: '',
            level1: '18',
            level2: '58',
            level3: '88',
            level4: '188',
            level5: '588',
            level6: '1288',
          },
          {
            prom: '次次存送',
            level0: '15%',
            level1: '16%',
            level2: '17%',
            level3: '18%',
            level4: '19%',
            level5: '20%',
            level6: '25%',
          },
          {
            prom: '救援金',
            level0: '4%',
            level1: '5%',
            level2: '6%',
            level3: '7%',
            level4: '8%',
            level5: '9%',
            level6: '10%',
          },
          {
            prom: '返水',
            level0: '0.6%',
            level1: '0.7%',
            level2: '0.8%',
            level3: '0.9%',
            level4: '0.9%',
            level5: '1.0%',
            level6: '1.1%',
          },
          {
            prom: '生日礼金',
            level0: '',
            level1: '188',
            level2: '288',
            level3: '388',
            level4: '588',
            level5: '888',
            level6: '1888',
          },
          {
            prom: '秒提功能',
            level0: '',
            level1: '√',
            level2: '√',
            level3: '√',
            level4: '√',
            level5: '√',
            level6: '√',
          },
          {
            prom: '出国豪华游',
            level0: 'x',
            level1: 'x',
            level2: 'x',
            level3: 'x',
            level4: 'x',
            level5: '√',
            level6: '√',
          },
          {
            prom: '节日礼金',
            level0: 'x',
            level1: 'x',
            level2: '√',
            level3: '√',
            level4: '√',
            level5: '√',
            level6: '√',
          },
          {
            prom: '返水上限',
            level0: '18888',
            level1: '20000',
            level2: '25000',
            level3: '38000',
            level4: '50000',
            level5: '无上限',
            level6: '无上限',
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {commonNav,commonFooter}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .activity-vip
    .banner
      height 400px
      background url('./img/banner.jpg') no-repeat center
      background-size cover
    .main
      border 1px solid $color-border-gray
      padding 25px
      margin 25px auto
      background $color-light
    .title
      margin 30px 0 10px
      font-size 18px
      font-weight 600

</style>