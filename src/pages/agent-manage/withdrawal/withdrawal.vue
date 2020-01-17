<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <div class="input-group">
        <span class="label">密码：</span>
        <div>
          <input v-model="withdrawalData.password" type="password">
        </div>
      </div>

      <div class="input-group">
        <span class="label">银行名称：</span>
        <div>
          <select v-model="withdrawalData.bank">
            <option value="">请选择银行</option>
            <option v-for="item in bankList" :value="item.bankname">{{item.bankname}}</option>
          </select>
        </div>
        <el-button @click="goToBindBank" size="small" type="primary" class="small-btn">绑定银行卡</el-button>
        <el-button @click="unBindBank" size="small" type="primary" class="small-btn">解绑银行卡</el-button>
      </div>

      <div class="input-group">
        <span class="label">卡/折号</span>
        <div>
          <input readonly disabled :value="formatStr(withdrawalData.accountNo,4,4,6)" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label">提款类型</span>
        <div>
          <select v-model="withdrawalData.tkType">
            <option value="slotmachine">老虎机</option>
            <option value="liveall">其他</option>
          </select>
        </div>
      </div>

      <div class="input-group">
        <span class="label">提款金额</span>
        <div>
          <input @focus="agentWithdrawpz" v-model="withdrawalData.amount" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <p class="red">{{tipText}}</p>
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <p>
            <label for="isAgree">
              <input id="isAgree" type="checkbox" v-model="isAgree">
              我已读过《提款须知》，并已清楚了解其规则。
            </label>
          </p>
          <p style="margin-top:15px">
            <el-button @click="withdrawal" type="danger">提交</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/user'
  import apiAgent from '@/api/agent'
  import tabTitle from '@/components/tab-title/tab-title'
  import {mapGetters} from 'vuex'
  import {withdrawal} from '@/common/js/mixin'
  import {formatStr} from '@/common/js/util'

  export default {
    mixins: [withdrawal],
    data() {
      return {
        tabTitleList: [
          {
            text: '申请提款'
          }
        ],
        currentIdx: 0,
        withdrawalData: {
          password: '',
          bank: '',
          accountNo: '',
          bankAddress: '',
          amount: '',
          tkType: 'slotmachine',
        },
        isAgree: false,
        tipText: '',
        bankList: [],//已绑定的银行卡
      }
    },
    //test
    computed: {
      ...mapGetters([
        'userInfo',
        'slotAmount'
      ]),
      liveall() {
        return this.userInfo.credit
      },
      maxTkAmount() {
        return this.slotAmount + this.liveall
      },

    },
    created() {

    },
    methods: {
      formatStr,
      // 绑卡
      goToBindBank(){
        this.$router.push('/agent-manage/account-settings?query=bindBankCard')
      },
      //提款平账
      agentWithdrawpz() {
        apiAgent.agentWithdrawpz({
          tkType: this.withdrawalData.tkType,
          slotmachine: this.slotAmount,
          liveall: this.liveall
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.tkType = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //提款
      withdrawal() {
        let {password, bank, accountNo, bankAddress, amount, tkType} = this.withdrawalData
        if (!password) {
          this.$message({
            type: 'warning',
            message: '密码不可为空!'
          })
          return
        }
        if (!bank) {
          this.$message({
            type: 'warning',
            message: '请选择银行!'
          })
          return
        }
        if (!accountNo) {
          this.$message({
            type: 'warning',
            message: '卡折号不可为空!'
          })
          return
        }
        if (!bankAddress) {
          this.$message({
            type: 'warning',
            message: '开户网点不可为空!'
          })
          return
        }

        if (!tkType) {
          this.$message({
            type: 'warning',
            message: '提款类型不可为空!'
          })
          return
        }

        if (!amount) {
          this.$message({
            type: 'warning',
            message: '提款金额不可为空!'
          })
          return
        }

        if (this.maxTkAmount < 100) {
          this.$message({
            type: 'warning',
            message: '老虎机/其它类佣金综合余额不足100无法提款'
          })
          return
        }

        if ((tkType === 'slotmachine') && (amount > this.slotAmount)) {
          this.$message({
            type: 'warning',
            message: `最大提款金额为${this.slotAmount}元`
          })
          return
        }

        if (amount - this.maxTkAmount > 0) {
          this.$message({
            type: 'warning',
            message: `最大提款金额为${this.maxTkAmount}元`
          })
          return
        }

        if (amount < 100 || amount > 190000) {
          this.$message({
            type: 'warning',
            message: '单次提款金额只能在100至190000之间'
          })
          return
        }

        if (!this.isAgree) {
          this.$message({
            type: 'warning',
            message: '未选中提款须知'
          })
          return
        }

        api.withdrawTwo(this.withdrawalData).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      },
      //根据银行名称查绑定过的银行卡信息  暂时作废
      _searchBankno() {
        api.searchBankno({bankname: this.withdrawalData.bank}).then((res) => {
          if (this.ERR_OK === res.code) {
            let data = res.data.split('|||')
            this.withdrawalData.accountNo = data[0]
            this.withdrawalData.bankAddress = data[1]
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      selectItem(idx) {
        this.currentIdx = idx
      }
    },
    watch: {},
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped>

</style>