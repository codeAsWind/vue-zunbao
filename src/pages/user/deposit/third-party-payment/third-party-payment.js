import payWayTab from '@/components/pay-way-tab/pay-way-tab'
import accountSelectTab from '@/components/account-select-tab/account-select-tab'
import JuanUet from '../../juan-uet/juan-uet'
import JuanQrcode from '@/components/juan-qrcode/juan-qrcode'
import {mapGetters} from 'vuex'
import api from '@/api/user'
import config from '@/common/js/config'
import validtorReg from '@/common/js/validtor'
import {getUserBalance} from '@/common/js/mixin'
import {getUrlParams, setUrlParams, getHtml} from '@/common/js/util'
import Clipboard from 'clipboard'

export default {
  mixins: [getUserBalance],
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      config,
      commonAccountList: [50, 100, 200, 500, 1000, 2000, 3000, null],
    }
  },
  props: {
    obj: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'uetAmount', 'juanTokenData'])
  },
  created() {
  },
  methods: {
    // 第三方支付存款
    commonDeposit(currentPayWay) {
      let reqData = {}
      let depositMoney = this.obj.depositMoney
      reqData = {
        platformId: currentPayWay.id,
        orderAmount: depositMoney,
        loginName: this.userInfo.loginname,
        payUrl: currentPayWay.payCenterUrl,
        usetype: 2,
        // bank_code: "ZF_WX",
        bankCode: '',
        bankcard: '',
        bankname: '',
        phoneNumber: '',

      }
      //是否需要支付银行
      if (this.obj.currentPayBank) {
        reqData.bankCode = this.obj.currentPayBank.bankCode
      }

      if (!validtorReg.intNumReg.test(depositMoney)) {
        this.$message({
          type: 'warning',
          message: `请输入整数金额`
        })
        return
      }
      if (depositMoney < currentPayWay.minPay || depositMoney > currentPayWay.maxPay) {
        this.$message({
          type: 'warning',
          message: `请输入${currentPayWay.minPay}至${currentPayWay.maxPay}之间的金额`
        })
        return
      }

      // console.log(reqData)

      //久安定制逻辑
      if (currentPayWay.payWay === config.PAYWAY.jiuAnDZ) {

        //判断余额
        if (depositMoney * 100 > this.uetAmount) {
          this.$msgbox({
            title: '温馨提示',
            type: 'info',
            message: '余额不足，前往久安大厅充值'
          }).then((action) => {
            if (action === 'confirm') {
              window.open(this.juanTokenData.juanDT)
            }
          }).catch(e => e)
          return
        }

        // 存款
        api.recharge(reqData).then((res) => {
          if (this.ERR_OK_OTHER === res.code) {
            if (res.data === 'ok') {
              this.$message({
                type: 'success',
                message: '您的存款已经到账，如有疑问请联系客服!'
              })
              this.getUserBalance()
            } else {
              this.$message({
                type: 'info',
                message: res.data.data
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

        return

      }

      //其他第三方
      let tempWindow = window.open(`${this.baseUrl}loading.html`)
      api.commonDeposit(reqData).then((res) => {
        if (this.ERR_OK === res.code) {
          //type 1.跳第三方页面 url 2. 二维码 data
          let url = res.data.url
          let data = res.data.data
          if (url) {//跳第三方页面
            // 链接跳转
            // tempWindow.location = setUrlParams(url,res.data.params)
            // 表单提交
            // tempWindow.document.write(getHtml(url, 'post', res.data.params))
            tempWindow.location = `${this.baseUrl}thirdPay.html?query=${JSON.stringify(res.data)}`
          } else if (data) {//生成二维码
            tempWindow.location = `${this.baseUrl}pay-code.html?query=${data}`
          } else {
            tempWindow.close()
            this.$msgbox({
              type: 'warning',
              title: '温馨提示',
              message: '跳转第三方失败'
            }).catch(e => e)
          }
        } else {
          tempWindow.close()
          this.$msgbox({
            type: 'warning',
            title: '温馨提示',
            message: res.message
          }).catch(e => e)

        }
      })
    },
    // 秒存
    secondsDeposit(currentPayWay, {repeat, deleteLastOneOrder}) {//秒存
      let banktype = currentPayWay.value
      let uaccountname = this.obj.depositName
      let amount = this.obj.depositMoney
      let ubankname = '' //超级转账 -- 银行名
      let force = null //是否作废上一笔订单
      let ubankno = ''//未知
      let depositId = ''//重新获取新的收款账户

      let reqData = {
        banktype,
        uaccountname,
        amount,
        ubankname,
        force,
        ubankno,
        depositId
      }

      //超级转账添加银行名称
      if (banktype === 7) {
        if (this.obj.payWayType === config.PAYWAY.phoneWYPay) {
          ubankname = 'BANK_ICBC'
        }
        if (this.obj.payWayType === config.PAYWAY.zfbTransformPay) {
          ubankname = 'ZFB_ABC'
        }
        if (this.obj.payWayType === config.PAYWAY.wxzzPay) {
          ubankname = 'WX_CCB'
        }
        reqData.ubankname = ubankname
      }
      // 未知???
      if (banktype === 5) {
        let _card = ''
        reqData['ubankno'] = _card
      }


      //作废上一笔订单
      if (deleteLastOneOrder) {
        reqData.force = true
      }

      //重新获取新的收款账户
      if (repeat) {
        reqData.force = true
        reqData.depositId = this.obj.depositInfo.depositId
      }

      if (!validtorReg.chineseReg.test(uaccountname)) {
        this.$message({
          type: 'warning',
          message: '请输入真实姓名'
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

      if (amount < currentPayWay.minPay || amount > currentPayWay.maxPay) {
        this.$message({
          type: 'warning',
          message: `请输入${currentPayWay.minPay}至${currentPayWay.maxPay}之间的金额`
        })
        return
      }

      // console.log(reqData)

      api.getNewdeposit(reqData).then((res) => {
        if (this.ERR_OK === res.code) {
          if (!res.data.massage) {//无障碍直接存款
            // 打开确认信息页面
            this._openDepositInfo(res.data, banktype, repeat)
          } else {
            if (res.data.force) {//上一笔订单未支付
              //弹出确认框...
              this.$msgbox({
                title: '温馨提示',
                confirmButtonText: '作废上笔订单，生成新订单',
                cancelButtonText: '取消',
                showCancelButton: true,
                type: 'warning',
                message: '您上一笔订单未支付，可点击作废订单，系统将生成新的存款信息，按存款信息存款即可到账。',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    //重新请求
                    this.secondsDeposit(currentPayWay, {deleteLastOneOrder: true})
                  }
                  done()
                }
              }).catch(e => e)
            } else { //存款银行关闭
              this.$message({
                type: 'warning',
                message: res.data.massage
              })
            }
          }
        } else {
          this.$message({
            type: 'warning',
            message: '系统故障'
          })
        }
      })

    },
    // 重新获取新的的收款账户
    reSecondsDeposit(currentPayWay, repeat) {
      this.$msgbox({
        title: '温馨提示',
        confirmButtonText: '换卡',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        message: '此操作将作废当前订单，页面会获取新的银行卡，请重新存款。',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.secondsDeposit(currentPayWay, {repeat})
          }
          done()
        }
      })
    },
    // 关闭确认存款页面
    closeConfirmPage() {
      this.obj.state = false
    },
    // 关闭带小数点限额提示页面
    closeConfirmQuotaPage() {
      if (this.obj.agree && this.obj.reAgree) {
        this.obj.stateSub = false
      } else {
        this.$message({
          type: 'warning',
          message: '请您勾选确认须知！'
        })
      }
    },
    // 金额切换
    amountSelect(idx, depositMoney) {
      this.obj.accountCurrentIdx = idx
      this.obj.depositMoney = depositMoney
    },
    amountChange(amount) {
      this.obj.depositMoney = amount
    },
    // 支付通道切换
    payWaySelect(idx, item) {
      this.obj.payWayCurrentIdx = idx
      this.obj.currentPayWay = item
      this.obj.range = {
        min: item.minPay,
        max: item.maxPay
      }
    },
    // 支付银行切换
    payBankSelect(idx, item) {
      this.obj.payBankCurrentIdx = idx
      this.obj.currentPayBank = item
    },
    // 复制功能
    copy() {
      let clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$message({
          type: 'success',
          message: '复制成功'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    // 计算优惠及手续费
    _calcActualAmount(discount, account) {
      //fee 为手续费
      let fee = this.obj.currentPayWay.fee
      if (fee) {
        account = Number(account) || 0
        let result = account * (1 - fee / 100)
        return Number(result.toFixed(2))
      } else {
        account = Number(account) || 0
        discount = Number(discount)
        let prom = account * discount > 500 ? 500 : account * discount
        return Number((account + prom).toFixed(2))
      }
    },
    // 打开存款确认页
    _openDepositInfo(data, _bankType, repeat) {
      this.obj.depositInfo = data
      //展示带小数点限额提示页面 && 不是在换卡
      if ((this.obj.depositInfo.amount != this.obj.depositMoney) && !repeat) {
        this.$set(this.obj, 'stateSub', true)
        this.$set(this.obj, 'agree', false)
        this.$set(this.obj, 'reAgree', false)
      }
      //展示页面
      this.obj.state = true
      // if (done) {
      //   done()
      //   instance.confirmButtonLoading = false
      // }
      // // 指定通道需要获取存款小数点限额
      // if (_bankType === 4 || _bankType === 6 || _bankType === 7 || _bankType === 66) {
      //   api.getWxZzQuota({amount: 150}).then((res) => {
      //     if (this.ERR_OK === res.code) {
      //       //改写金额
      //       this.obj.depositInfo.amount = res.data.amount
      //       //展示页面
      //       this.obj.state = true
      //       if (done) {
      //         done()
      //         instance.confirmButtonLoading = false
      //       }
      //
      //     }
      //   })
      // } else {
      //   //展示页面
      //   this.obj.state = true
      //   if (done) {
      //     done()
      //     instance.confirmButtonLoading = false
      //   }
      //
      // }

    },
  },
  watch: {},
  components: {
    payWayTab, accountSelectTab, JuanUet, JuanQrcode
  }

}