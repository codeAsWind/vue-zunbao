const BADGE = require('./img/zhi.png')
import TabTitle from '@/components/tab-title/tab-title.vue'
import payWayTypeTab from '@/components/pay-way-type-tab/pay-way-type-tab.vue'
import thirdPartyPayment from './third-party-payment/third-party-payment.vue'
import {mapGetters} from 'vuex'
import api from '@/api/user'
import config from '@/common/js/config'
import {ajaxRequst} from '@/common/js/util'

export default {
  data() {
    return {
      config,
      currentId: '',//显示当前存款title
      payWay: [],// 所有存款通道
      //第三方支付没有depositName属性
      depositTypes: {//存款类型
        jadzTitle: { //久安定制title
          currentType: config.PAYWAY.jiuAnDZ,
          list: [
            {
              type: 'jiuAnDZ',
              // icon: BADGE,
              title: '久安定制',
              describe: '稳定，资金安全无风险',
              fz: require('./img/add-token.png'),
              payWayType: config.PAYWAY.jiuAnDZ,
              payWayItem: {//久安定制
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0.015,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.jiuAnDZ,
                payWayList: [],
                tooltip: {
                  title: '久安钱包充值说明',
                  items: [
                    {
                      text: '<span class="red">人民币兑换UET币比例为1(RMB):100(UET)</span>',
                    },
                    {
                      text: '使用前请先下载<a href="https://9anwallet.com/newActivity" class="link" target="_blank">久安钱包APP</a>，下载完成后使用扫一扫即可支付成功。',
                    }, {
                      text: '使用久安钱包进行充值的好处：',
                      sub: [
                        {
                          text: '注册用户匿名资金流向安全，不受第三方监控，100%玩家与玩家之间用户交易',
                        },
                        {
                          text: '无需任何手续费用，平台承担您全部的手续费',
                        },
                      ]
                    },
                  ]
                }
              }
            }
          ],
          forTitle: {
            id: config.PAYWAY.jiuAnDZ.toString(),
            text: '久安定制',
            icon: 'jiuan',
            badge: BADGE,
            includes: [config.PAYWAY.jiuAnDZ]
          },
        },
        bankCardTitle: {//银行卡title
          currentType: config.PAYWAY.yinLian,
          list: [
            {
              payWayType: config.PAYWAY.yinLian,
              type: 'ylsm',
              icon: BADGE,
              title: '银联扫码',
              describe: '银联APP，云闪付扫码',
              payWayItem: { //银联扫码
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.yinLian,
                payWayList: [],
                tooltip: {
                  title: '银联扫码充值说明',
                  items: [
                    {
                      text: '银联扫码，可使用任意银联APP或云闪付APP扫码支付。',
                    },
                  ]
                }
              }
            },
            {
              payWayType: config.PAYWAY.phoneWYPay,
              type: 'wyzz',
              icon: BADGE,
              title: '手机/网银转账',
              describe: '推荐已开通网银的用户使用',
              payWayItem: {//手机、网银转账 - 秒存
                depositName: '',
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0.01,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.phoneWYPay,
                payWayList: [
                  {
                    showName: '通道1',
                    value: 1,
                    minPay: 1,
                    maxPay: 3000000
                  },
                  {
                    showName: '通道2',
                    value: 7,
                    minPay: 1,
                    maxPay: 3000000
                  },
                ],
                tooltip: {
                  title: '手机/网银转账充值说明',
                  items: [
                    {
                      text: '手机/网银转账每日23:30-02:00左右有延迟到帐现象，若转账状态成功后仍未到账，请咨询客服。',
                    },
                  ]
                }
              },
            },
            {
              payWayType: config.PAYWAY.online,
              type: 'onlinePay',
              icon: BADGE,
              title: '在线支付',
              describe: '推荐已开通网银的用户使用',
              payWayItem: { //在线支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.online,
                payWayList: [],
                //支付银行
                payBankList: [],
                payBankCurrentIdx: 0,
                currentPayBank: {},
                tooltip: {
                  title: '在线充值说明',
                  items: [
                    {
                      text: '最低存款额度为20元，最高50000元。',
                    },
                    {
                      text: '在线支付需要承担手续费，手续费由第三方收取。',
                    },
                    {
                      text: '您存款成功后，请您记住跳转出来的支付单号。如果您出现掉单，请您联系在线客服提供您的支付单号，我们将第一时间为您处理。',
                    },
                  ]
                }
              },
            },
            {
              payWayType: config.PAYWAY.fastPay,
              type: 'fastPay',
              icon: BADGE,
              title: '快捷支付',
              describe: '验证身份证号、短信即可使用',
              payWayItem: {//快捷支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.fastPay,
                payWayList: [],
              },
            }
          ],
          forTitle: {
            id: config.PAYWAY.yinLian.toString(),
            text: '银行卡',
            icon: 'shuaqiaqiapianyinhangqia',
            badge: BADGE,
            includes: [config.PAYWAY.yinLian, config.PAYWAY.online, config.PAYWAY.fastPay, config.PAYWAY.phoneWYPay]
          },
        },
        zfbTitle: {//支付宝title
          currentType: config.PAYWAY.zfbSM,
          list: [
            {
              payWayType: config.PAYWAY.zfbTransformPay,
              type: 'zfbzz',
              icon: BADGE,
              title: '支付宝转账',
              describe: '稳定，单笔上限300万',
              payWayItem: {//支付宝转账 - 秒存
                depositName: '',
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0.01,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.zfbTransformPay,
                payWayList: [
                  {
                    showName: '通道1',
                    value: 66,
                    minPay: 1,
                    maxPay: 3000000
                  }
                ],
                tooltip: {
                  title: '支付宝充值说明',
                  items: [
                    {
                      text: '支付宝转账每日23:20-01:00左右有延迟到帐现象，若转账状态显示“成功到账”后仍未到账，请咨询客服。',
                    },
                    {
                      text: '请务必保存存款成功截图，未到账时可提供给官网客服。',
                    },
                    {
                      text: `若遇到收款账户异常，或其他异常情况，导致交易被中断无法完成支付，请提供截图联系客服。<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },

            },
            {
              payWayType: config.PAYWAY.zfbSM,
              type: 'zfbsm',
              icon: BADGE,
              title: '支付宝扫码',
              describe: '便捷，适合小额存款',
              payWayItem: {
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.zfbSM,
                payWayList: [],
                tooltip: {
                  title: '支付宝充值说明',
                  items: [
                    {
                      text: '支付宝扫码通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: '请务必保存存款成功截图，未到账时可提供给官网客服。',
                    },
                    {
                      text: `若如果您的款项10分钟未能到账，请联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },
            },
          ],
          forTitle: {
            id: config.PAYWAY.zfbSM.toString(),
            text: '支付宝',
            icon: 'zhifubao1',
            badge: BADGE,
            includes: [config.PAYWAY.zfbSM, config.PAYWAY.zfbTransformPay]
          },
        },
        wxTitle: {//微信title
          currentType: config.PAYWAY.wxSM,
          list: [
            {
              payWayType: config.PAYWAY.wxSM,
              type: 'wxsm',
              icon: BADGE,
              title: '微信扫码支付',
              describe: '便捷，适合小额存款',
              payWayItem: {//微信扫码
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.wxSM,
                payWayList: [],
                tooltip: {
                  title: '微信充值说明',
                  items: [
                    {
                      text: '微信支付通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: '请按照系统指示的最低和最高金额进行充值，以免给您带来不便。',
                    },
                    {
                      text: `若如果您的款项10分钟未能到账，请联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },
            },
            // {
            //   payWayType: config.PAYWAY.wxzzPay,
            //   type: 'wxzz',
            //   icon: BADGE,
            //   title: '微信转账',
            //   describe: '稳定，单笔上限300万',
            //   payWayItem: {//微信转账 - 秒存
            //     depositName: '',
            //     payWayCurrentIdx: 0,
            //     depositMoney: null,
            //     discount: 0.01,
            //     accountCurrentIdx: -1,
            //     currentPayWay: {},
            //     payWayType: config.PAYWAY.wxzzPay,
            //     payWayList: [
            //       {
            //         showName: '通道1',
            //         value: 4,
            //         minPay: 1,
            //         maxPay: 3000000
            //       },
            //       // {
            //       //   showName: '通道2',
            //       //   value: 7,
            //       //   minPay:1,
            //       //   maxPay:3000000
            //       // }
            //     ],
            //   },
            // },

          ],
          forTitle: {
            id: config.PAYWAY.wxSM.toString(),
            text: '微信支付',
            icon: 'weixin1',
            badge: BADGE,
            includes: [config.PAYWAY.wxSM, config.PAYWAY.wxzzPay]
          },
        },
        jdTitle: {//京东美团title
          currentType: config.PAYWAY.jD,
          list: [
            {
              payWayType: config.PAYWAY.jD,
              type: 'jdPay',
              icon: BADGE,
              title: '京东支付',
              describe: '便捷，最高上限3000',
              payWayItem: {//京东支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.jD,
                payWayList: [],
              },
            },
            {
              payWayType: config.PAYWAY.meiTuan,
              type: 'mtPay',
              icon: BADGE,
              title: '美团支付',
              describe: '便捷，最高上限3000',
              payWayItem: {//美团支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.meiTuan,
                payWayList: [],
              },
            },
          ],
          forTitle: {
            id: config.PAYWAY.meiTuan.toString(),
            text: '京东美团',
            icon: 'jd',
            includes: [config.PAYWAY.meiTuan, config.PAYWAY.jD]
          },
        },
        qqTitle: {//京东美团title
          currentType: config.PAYWAY.qq,
          list: [
            {
              payWayType: config.PAYWAY.qq,
              type: 'qqPay',
              icon: BADGE,
              title: 'QQ支付',
              describe: '便捷，最高上限3000',
              payWayItem: {//京东支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.qq,
                payWayList: [],
                tooltip: {
                  title: 'QQ扫描充值说明',
                  items: [
                    {
                      text: '请按照系统指示的最低和最高金额进行充值，以免给您带来不便。',
                    },
                    {
                      text: 'QQ扫码通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: `存款过程中如有任何问题，请及时联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              }
            }
          ],
          forTitle: {
            id: config.PAYWAY.qq.toString(),
            text: 'QQ钱包',
            icon: 'QQ',
            includes: [config.PAYWAY.qq]
          },
        },
      }
    }
  },
  computed: {
    //存款标题计算 隐藏通道处理等
    tabTitleList() {
      let res = []
      Object.keys(this.depositTypes).forEach((item) => {
        res.push(this.depositTypes[item].forTitle)
      })
      // 接口获取的通道集
      let payWayS = this.payWay.map((obj) => {
        return obj.payWay
      })
      // 秒存通道集
      let secondPayWays = []
      Object.keys(config.PAYWAY).forEach((item) => {
        let obj = config.PAYWAY[item]
        if (typeof obj === 'string') {
          secondPayWays.push(obj)
        }
      })
      //隐藏未开启的通道,秒存无法判断是否关闭,故默认一直开启
      res = res.filter((item) => {
        return this._checkArr(item.includes, secondPayWays) || this._checkArr(item.includes, payWayS)
      })
      //默认展示第一个存款类型
      res[0] && (this.currentId = res[0].id)
      return res
    },
    ...mapGetters(['isLogin', 'userInfo'])
  },
  created() {
    this._msgBox() //弹框提示
    this._getPayWay()
    this._getPayBankList()
  },
  methods: {
    //存款标题切换
    selectItem(idx, item) {
      this.currentId = item.id
    },
    // 支付类型切换
    payWayTypeSelect(item, type) {
      this.depositTypes[type].currentType = item.payWayType
    },
    // 获取所有通道
    _getPayWay() {
      api.getPayWay({usetype: 2}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.payWay = res.data
          //初始化支付通道
          this._initPayWayInfo()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 获取在线支付银行
    _getPayBankList() {
      let url = 'http://220.241.124.160:15002/api/pay/thirdPaymentBank/list'
      ajaxRequst(url, 'POST', {payType: "dbonline_pay"}).then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.depositTypes.bankCardTitle.list.forEach((item) => {
            if (item.payWayItem.payBankList) {
              item.payWayItem.payBankList = res.data
            }
          })
          //初始化支付银行
          this._initPayBankInfo()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 初始化支付银行
    _initPayBankInfo() {
      Object.keys(this.depositTypes).forEach((item) => {
        let obj = this.depositTypes[item]
        obj.list.forEach((payWayItem) => {
          payWayItem = payWayItem.payWayItem
          // 默认第一个支付通道
          if (payWayItem.currentPayBank) {
            payWayItem.currentPayBank = payWayItem.payBankList[0]
          }
        })
      })
    },
    // 初始化支付通道
    _initPayWayInfo() {
      let payWayS = this.payWay.map((obj) => {
        return obj.payWay
      })
      Object.keys(this.depositTypes).forEach((item) => {
        let obj = this.depositTypes[item]
        obj.list.forEach((payWayItem) => {
          payWayItem = payWayItem.payWayItem
          // 是否为第三方支付存款
          let isThirdPartyPay = !('depositName' in payWayItem)
          this.$set(payWayItem, 'isThirdPartyPay', isThirdPartyPay)
          // 默认第一个支付通道 && 存款值范围
          if (isThirdPartyPay) { //第三方存款
            payWayItem.payWayList = this._calcPayWay(payWayItem.payWayType)
            payWayItem.currentPayWay = payWayItem.payWayList[0]
          } else { //秒存
            payWayItem.currentPayWay = payWayItem.payWayList[0]
            //设置确认存款信息页面显示状态
            this.$set(payWayItem, 'state', false)
            this.$set(payWayItem, 'depositInfo', {})
          }
          // 存款值范围
          if (payWayItem.currentPayWay) {
            payWayItem.range = {
              min: payWayItem.currentPayWay.minPay,
              max: payWayItem.currentPayWay.maxPay,
            }
          }
        })
        // 隐藏关闭的通道
        obj.list = obj.list.filter((payWayItem) => {
          payWayItem = payWayItem.payWayItem
          let res = payWayS.includes(payWayItem.payWayType) || !payWayItem.isThirdPartyPay
          if (res) {//如果开启则return出去展示
            return res
          }
        })
        //展示第一个选项
        if (obj.list[0]) {
          obj.currentType = obj.list[0].payWayType
        }
      })


    },
    // 获取对应支付通道
    _calcPayWay(payWay) {
      return this.payWay.filter((item) => {
        return item.payWay === payWay
      })
    },
    // 判断两个数组是否包含相同成员
    _checkArr(arr1, arr2) {
      let rs = false
      arr1.forEach((item) => {
        arr2.forEach((item2) => {
          if (item === item2) {
            rs = true
            return rs
          }
        })
      })
      return rs
    },
    //弹框提示
    _msgBox() {
      const h = this.$createElement
      this.$msgbox({
        title: '温馨提示',
        message: h('div', null, [
          h('p', {style: 'color:red'}, '1.使用【久安定制】充值秒到账更安全，笔笔交易高额赠币！'),
          h('p', null, '2.支付宝秒存每日23:20-01:00左右有延迟到帐的情况，若转账状态显示“成功到账”后仍未到账，请咨询在线客服。'),
        ]),
        center:true
      }).catch(e => e)

    }
  },
  watch: {},
  components: {
    TabTitle, payWayTypeTab, thirdPartyPayment
  }

}