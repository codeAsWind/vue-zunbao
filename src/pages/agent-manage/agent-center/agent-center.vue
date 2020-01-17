<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <div class="link-list">
        <p v-for="(item,idx) in linkList">
          <span>推荐链接{{idx+1}}：</span><a :href="item" target="_blank">{{item}}</a>
        </p>
      </div>

      <div class="table my-table">
        <table>
          <thead>
          <tr>
            <th>代理等级</th>
            <th>累计佣金</th>
            <th>代理福利</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>普通代理</td>
            <td>3000</td>
            <td>
              <table>
                <tr>
                  <td rowspan="5">生日彩金</td>
                  <td>生日彩金</td>
                  <td>佣金累计标准</td>
                </tr>
                <tr>
                  <td>满3000元</td>
                  <td>58元</td>
                </tr>
                <tr>
                  <td>满10000元</td>
                  <td>88元</td>
                </tr>
                <tr>
                  <td>满30000元</td>
                  <td>188元</td>
                </tr>
                <tr>
                  <td>满5万元以上</td>
                  <td>588元</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>尊贵VIP</td>
            <td>50,000-150,000</td>
            <td>生日礼金,春节礼品</td>
          </tr>
          <tr>
            <td>特级VIP</td>
            <td>150,001-1,000,000</td>
            <td>生日礼金,节日礼金，春节礼品</td>
          </tr>
          <tr>
            <td>特邀合伙人</td>
            <td>佣金累积100万</td>
            <td>生日礼物，节日礼品，出国游，年底分红</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tips">
        <h3>温馨提示：</h3>
        <p>
          1.生日礼金，以合作代理身份证出生日期为准

          <br>2.佣金累计：佣金正负将一直累计

          <br>3.尊贵VIP代理以上级别如果连续两月未发展一位有效客户，代理将不享有礼品。

          <br>4.申请流程：编辑邮件“申请代理生日彩金”，提供“代理账号+本人游戏账号+身份证正反面照片”，发送到：aff@zb970.com，并联系代理专员。
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import api from '@/api/agent'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '代理中心'
          }
        ],
        currentIdx: 0,
        linkList: [],
      }
    },
    computed: {},
    created() {
      this._getAgentExpandSite()
    },
    methods: {
      _getAgentExpandSite() {
        api.getAgentExpandSite().then((res) => {
          if (this.ERR_OK === res.code) {
            this.linkList = res.data
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
    components: {tabTitle}

  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .link-list
    background $color-gray-background
    border $color-border-gray
    padding 20px
    line-height 30px
    margin-bottom 20px
    a:hover
      text-decoration underline
</style>