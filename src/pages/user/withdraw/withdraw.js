import tabTitle from '@/components/tab-title/tab-title.vue'
import JuanUet from '../juan-uet/juan-uet.vue'
import JuanDialogTips from './juan-dialog-tips'
import api from '@/api/user'
import validtorReg from '@/common/js/validtor'
import {withdrawal, redirectUrl, getGameMoney} from '@/common/js/mixin'
import {mapGetters} from 'vuex'
import {formatStr} from '@/common/js/util'


export default {
  mixins: [withdrawal, redirectUrl, getGameMoney],
  data() {
    return {
      tabTitleList: [
        {
          text: '银行卡提款'
        },
        {
          text: '久安定制提款',
          badge: require('./img/ad-token.png')
        },
      ],
      currentIdx: 0,
      //主账户余额
      balance: 0,
      //银行卡提款
      withdrawalData: {
        password: '',
        bank: '',
        accountNo: '',
        bankAddress: '',
        amount: '',
        agree: true,
        //公共部分
        bankCardName: '',
        tkType: '',
      },
      //久安提款
      JuanWithdrawData: {
        bank: '久安定制版',
        bankCardName: '',
        password: '',
        accountNo: '',
        amount: '',
        agree: true,
        // 公共部分
        bankAddress: '',
        tkType: '',
      },
      bankList: [],//已绑定的银行卡
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  // 第一次反问组件调用
  created() {
    this.flag = null
    this._msgBox()
    this.getGameMoney()
  },
  methods: {
    formatStr,
    //标题选择
    selectItem(idx) {
      this.currentIdx = idx
    },
    // 去绑定银行卡
    goToBindBank() {
      this.$router.push('/user/account-settings?query=bindBankCard')
    },
    //银行卡提款
    withdrawSubmit() {
      let {password, bank, amount, agree} = this.withdrawalData
      if (!password) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }

      if (!bank) {
        this.$message({
          type: 'warning',
          message: '请选择提款银行'
        })
        return
      }

      if (!validtorReg.intNumReg.test(amount)) {
        this.$message({
          type: 'warning',
          message: '请输入整数金额'
        })
        return
      }

      if (amount < 100) {
        this.$message({
          type: 'warning',
          message: '提款金额最低为100元'
        })
        return
      }

      if (!agree) {
        this.$message({
          type: 'warning',
          message: '请勾选提款须知'
        })
        return
      }

      const h = this.$createElement

      this.$msgbox({
        title: '收款人资料',
        message: h('div', null, [
          h('p', {'class': {left: true}}, `账户姓名：${this.userInfo.accountName}`),
          h('p', {'class': {left: true}}, `银行名称：${this.withdrawalData.bank}`),
          h('p', {'class': {left: true}}, `银行账号：${formatStr(this.withdrawalData.accountNo, 4, 4, 6)}`),
          h('p', {'class': {left: true}}, `金额：${this.withdrawalData.amount}`),
          h('p', {'class': {left: true, red: true}}, `温馨提示：如您的注册姓名与您的收款账户姓名不一致,将导致提款失败!请您联系在线客服!`),
        ]),
        confirmButtonText: '提交',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            //取款提交
            api.withdrawTwo(this.withdrawalData).then((res) => {
              done()
              if (this.ERR_OK === res.code) {
                this.$message({
                  type: 'info',
                  message: res.data
                })
                //清空信息
                this.withdrawalData = {
                  password: '',
                  bank: '',
                  accountNo: '',
                  bankAddress: '',
                  amount: '',
                  agree: true,
                  //公共部分
                  bankCardName: '',
                  tkType: '',
                }

              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
          } else {
            done()
          }
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    //久安提款
    JanWithdrawSubmit() {
      let {amount, bankCardName, password, agree, accountNo} = this.JuanWithdrawData
      if (amount < 100) {
        this.$message({
          type: 'warning',
          message: '提款金额最低为100元',
        })
        return
      }


      if (!bankCardName) {
        this.$message({
          type: 'warning',
          message: '请选择提款银行'
        })
        return
      }

      if (!password) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }

      if (!agree) {
        this.$message({
          type: 'warning',
          message: '请勾选提款须知'
        })
        return
      }

      //取款提交
      let tempWindow = window.open(`${process.env.BASE_URL}loading.html`)
      api.withdrawTwo(this.JuanWithdrawData).then((res) => {
        if (this.ERR_OK === res.code) {

          //清空提交信息
          this.JuanWithdrawData = {
            bank: '久安定制版',
            bankCardName: '',
            password: '',
            accountNo: '',
            amount: '',
            agree: true,
            // 公共部分
            bankAddress: '',
            tkType: '',
          }

          let result = {}
          try {
            result = JSON.parse(res.data)
          } catch (e) {
            result = res.data
          }
          console.log(result)
          if (result.message === '成功') {
            this.$message({
              type: 'success',
              message: '您的提款已经成功提交，如有疑问请联系客服！'
            })
            // 跳久安
            api.redirectUrl({
              amount,
              bankNo: accountNo,
              withdraw: 'true',
              backURL: window.location.href,
              merchantOrderId: result.data
            }).then((res) => {
              if (this.ERR_OK === res.code) {
                tempWindow.location = res.data
              } else {
                tempWindow.close()
                this.$msgbox({
                  title: '温馨提示',
                  confirmButtonText: '知道了',
                  message: res.message
                }).catch(e => e)
              }
            })
          } else {
            tempWindow.close()
            this.$msgbox({
              title: '温馨提示',
              confirmButtonText: '知道了',
              message: res.data
            }).catch(e => e)
          }

        } else {
          tempWindow.close()
          this.$msgbox({
            title: '温馨提示',
            type: 'warning',
            confirmButtonText: '知道了',
            message: res.message
          }).catch(e => e)
        }
      })

    },
    //弹框提示
    _msgBox() {
      let h = this.$createElement
      this.$msgbox({
        title: '温馨提示',
        message: h(JuanDialogTips)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  watch: {
    'JuanWithdrawData.bankCardName'(val) {
      if (!val) return
      if (this.bankList.length) {
        this.bankList.forEach((item) => {
          if (item.bankname === val) {
            this.JuanWithdrawData.accountNo = item.bankno
            return
          }
        })
      }
    },
    //没什么鸡吧卵用的代码
    currentIdx(val) {
      if (val && !this.flag) {
        let fuckTheCode = (() => {
          let bankname = '久安定制版'
          this.flag = true
          api.getWithDrawBankStatus({bankname}).then((res) => {
            if (this.ERR_OK === res.code) {
              //维护中
              if (res.data === 'MAINTENANCE') {
                this.$message({
                  type: 'warning',
                  message: '银行系统维护中,请选择其他银行或稍后再试'
                })
                return
              }

              api.searchBankno({bankname}).then((res) => {
                if (this.ERR_OK === res.code) {
                  if (res.data == 1) {
                    this.$message({
                      type: 'warning',
                      message: '银行系统维护中，请选择其他银行或者稍后再试'
                    })
                  } else if (res.data == 2) {
                    this.$message({
                      type: 'warning',
                      message: "您没有绑定" + bankname + "卡号!请选择其他银行!"
                    })
                  } else {
                    let result = res.data.split('|||')
                    if (result[0].length <= 30) {
                      //...
                    }
                  }
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.message
                  })
                }

              })


            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        })
        // fuckTheCode()
      }
    }
  },
  components: {tabTitle, JuanUet}
}