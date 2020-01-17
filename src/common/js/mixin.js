import {mapMutations, mapGetters} from 'vuex'
import api from '@/api/user'
import config from '@/common/js/config'
import validtorReg from '@/common/js/validtor'
import {getMobilePlatform, isMobilePlatform} from '@/common/js/util'
import {checkAgentURLogin, getAppVersionCustomInfo} from '@/api/mobile'
import apiGame from '@/api/game'
import {ajaxRequst} from '@/common/js/util'

const isMobile = isMobilePlatform()
const path = isMobile ? '/mobile' : ''

// 检查登录状态
export const checkLogin = {
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      api.checkLogin().then((res) => {
        if (res.code === this.ERR_OK) {
          if (res.data) {
            //获取用户信息
            api.getUser().then((res) => {
              if (res.code === this.ERR_OK) {
                // 设置用户信息
                this.SET_USERINFO(res.data)

                //设置代理登录状态
                let result = this.userInfo.role !== config.role
                this.SET_AGENT_LOGIN(result)
                //如果为代理登录 则获取代理老虎机账户余额
                if (result) {
                  api.getUserStatus().then((res) => {
                    if (this.ERR_OK === res.code) {
                      this.SET_SLOT_AMOUNT(res.data)
                    } else {
                      this.$message({
                        type: 'warning',
                        message: res.message
                      })
                    }
                  })
                }
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
          }
          // 设置登录状态
          this.SET_LOGIN(res.data)
          // 设置代理状态
          !res.data && this.SET_AGENT_LOGIN(res.data)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_LOGIN',
      'SET_USERINFO',
      'SET_AGENT_LOGIN',
      'SET_SLOT_AMOUNT',
    ])
  }
}
// 登录
export const login = {
  data() {
    return {
      userFormData: {
        loginName: '',
        passWord: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    login() {
      if (!this.userFormData.loginName) {
        this.$message({
          type: 'warning',
          message: '请输入账号'
        })
        return
      }
      if (!this.userFormData.passWord) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }
      api.login(this.userFormData).then((res) => {
        if (res.code === this.ERR_OK) {
          // 设置登录状态
          this.SET_LOGIN(true)
          // 查询用户数据
          api.getUser().then((res) => {
            if (res.code === this.ERR_OK) {
              // 移动端
              if (isMobile) {
                this.$router.push('/mobile')
              }
              // 设置用户数据
              this.SET_USERINFO(res.data)

              //设置代理登录状态
              let result = this.userInfo.role !== config.role
              this.SET_AGENT_LOGIN(result)
              //如果为代理登录 则获取代理老虎机账户余额
              if (result) {
                api.getUserStatus().then((res) => {
                  if (this.ERR_OK === res.code) {
                    this.SET_SLOT_AMOUNT(res.data)
                  } else {
                    this.$message({
                      type: 'warning',
                      message: res.message
                    })
                  }
                })
              }
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_LOGIN',
      'SET_USERINFO',
      'SET_AGENT_LOGIN',
      'SET_SLOT_AMOUNT'
    ])

  }

}
// 退出
export const logOut = {
  methods: {
    logOut() {
      api.logOut().then((res) => {
        if (res.code === this.ERR_OK) {
          // 初始化用户信息
          this.SET_USERINFO(config.userInfo)
          // 初始化登录状态
          this.SET_LOGIN(false)
          //设置代理登录状态
          this.SET_AGENT_LOGIN(false)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_LOGIN',
      'SET_USERINFO',
      'SET_AGENT_LOGIN'
    ])
  }
}
// 游戏
export const playGame = {
  props: {
    factoryFun: {
      type: Function,
      default: function ({}) {
      }
    },
    reqData: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'isAgent'])
  },
  methods: {
    playGame(apiFun, reqData) {
      if (this.isLogin) {
        if (this.isAgent) {//代理登录
          this.$message({
            type: 'warning',
            message: '代理登录不能进行游戏！'
          })
        } else {
          let tempWindow = window.open(`${process.env.BASE_URL}loading.html`)
          apiFun(reqData).then((res) => {
            if (this.ERR_OK === res.code) {
              tempWindow.location = res.data
            } else {
              tempWindow.close()
              this.$msgbox({
                title: '温馨提示',
                confirmButtonText: '知道了',
                message: '进入游戏失败'
              }).catch(e => e)
            }
          })
        }
      } else {
        this.$msgbox({
          title: '温馨提示',
          confirmButtonText: '知道了',
          message: '请先登录！'
        }).catch(e => e)
      }
    }
  }
}
// 提款
export const withdrawal = {
  data() {
    return {
      withdrawalData: {
        password: '',
        bank: '',
        accountNo: '',
        bankAddress: '',
        amount: '',
        agree: true
      },
      bankList: []
    }
  },
  // 每次激活重新调用
  activated() {
    this._getBankInfoList()
  },
  methods: {
    // 解绑银行卡
    unBindBank() {
      this.$prompt('解绑银行卡号：', '解绑银行卡', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: validtorReg.bankReg,
        inputErrorMessage: '银行卡格式不正确',
        center: true
      }).then(({value}) => {
        api.unBindBankinfo({bankno: value}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
            //解绑成功后刷新
            this._getBankInfoList()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch((e) => {
        console.log(e)
      })

    },
    //获取已绑定的银行卡
    _getBankInfoList() {
      api.getBankInfoList().then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.bankList = res.data || []
          if (!this.bankList.length) {
            this.$msgbox({
              type: 'warning',
              title: '温馨提示',
              message: '请先绑定银行卡',
              lockScroll: false
            }).catch(e => {
              console.log(e)
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
  },
  watch: {
    'withdrawalData.bank'(val) {
      if (!val) return
      if (this.bankList.length) {
        this.bankList.forEach((item) => {
          if (item.bankname === val) {
            this.withdrawalData.accountNo = item.bankno
            this.withdrawalData.bankAddress = item.bankaddress
            return
          }
        })
      }
    },
  }
}
// uet
export const getUserBalance = {
  methods: {
    //获取uet余额
    getUserBalance() {
      api.getUserBalance().then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.SET_UET_AMOUNT(res.data.balance)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_UET_AMOUNT'
    ])
  }
}
// 跳久安
export const redirectUrl = {
  methods: {
    //mode:1、大厅 2.存款 3.提款 4.活动
    redirectUrl(mode) {
      let tempWindow = window.open(`${process.env.BASE_URL}loading.html`)
      api.redirectUrl({mode}).then((res) => {
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
    }
  }
}
// 主账户查询
export const getGameMoney = {
  data() {
    return {
      balance: 0
    }
  },
  methods: {
    //主账户余额查询
    getGameMoney() {
      api.getGameMoney({gameCode: 'self'}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.balance = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  }
}
// 登录框控制
export const loginDialog = {
  computed: {
    ...mapGetters([
      'isLogin',
      'isShowLoginDialog'
    ])
  },
  methods: {
    openLoginDialog() {
      if (!this.isLogin && !this.isShowLoginDialog) {
        this.SET_IS_SHOW_LOGIN_DIALOG(true)
      }
    },
    closeLoginDialog() {
      if (this.isShowLoginDialog) {
        this.SET_IS_SHOW_LOGIN_DIALOG(false)
      }
    },
    ...mapMutations([
      'SET_IS_SHOW_LOGIN_DIALOG'
    ])
  }
}
// 等级图
export const levelImage = {
  computed: {
    levelImage() {
      return this.userInfo.level && require(`@/common/image/level/${this.userInfo.level}.png`)
    },
    ...mapGetters([
      'userInfo'
    ])
  },
}
// 积分商城属性计算
export const property = {
  methods: {
    _property(flag, item) {
      let property = ''
      if (flag === 1) {//抽奖记录
        property = this._filterAttrVal(item.luckyDrawPresentType, item.property)
        if (item.luckyDrawPresentType === 'money' || item.luckyDrawPresentType === 'phoneFee' || item.luckyDrawPresentType === 'phoneData') {
          property = ''
        }
      } else {
        property = this._filterAttrVal(item.type, item.property)
      }
      return property
    },
    _filterAttrVal(type, remark) {
      let resultProperty = ''
      if (type === 'coupon') {
        let res = remark.split('-')
        let title = res[0].toLocaleUpperCase()
        if ('SLOT' === res[0].toLocaleUpperCase()) {
          title = 'SLOT' || '综合老虎机'
        }
        resultProperty = title + ' ' + res[1] + '%' + ' 存送优惠券'
      } else if (type === 'phoneData') {
        resultProperty = remark + 'M'
      } else if (type === 'phoneFee' || type === 'money') {
        resultProperty = remark + '元'
      } else {
        resultProperty = remark
      }
      return resultProperty
    },
  }
}
// 积分查询
export const queryPoints = {
  computed: {
    ...mapGetters(['points'])
  },
  methods: {
    _queryPoints() {
      api.queryPoints().then((res) => {
        if (this.ERR_OK === res.code) {
          this.SET_POINTS(parseInt(res.data))
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations(['SET_POINTS'])
  }
}
// 积分兑换成功提示
export const openSuccessTip = {
  methods: {
    openSuccessTip(name, action, type) {
      let cancelButtonText = ''
      let tips = ''
      let {phoneFee, phoneData, coupon, money} = config.integral
      if (type === coupon) {
        cancelButtonText = '再去逛逛商城'
      }
      if (type === money) {
        tips = '，请刷新余额查看'
      } else if (type === phoneFee || type === phoneData) {
        tips = '，请稍后在手机上查收'
      } else if (type === coupon) {
        tips = '，请查看站内信。'
      } else {
        tips = '，发货时会以站内信通知，将于一周内发货，请注意查收。'
      }
      let temp = `
                  <div>您成功${action}了 <span class="red">${name}</span>${tips}</div>
                  `
      this.$msgbox({
        title: '温馨提示',
        type: 'success',
        message: temp,
        showCancelButton: cancelButtonText,
        confirmButtonText: '再去逛逛商城',
        cancelButtonText: '去站内信查看',
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true
      }).then(() => {
        this.$router.push('/integral')
      }).catch((dialogAction) => {
        if (dialogAction === 'cancel') {
          this.$router.push('/user/letter')
        }
      })

    }
  }
}

// 电话回拨
export const makeCall = {
  data() {
    return {
      number: '',
    }
  },
  methods: {
    makeCall() {
      if (!validtorReg.phoneReg.test(this.number)) {
        this.$message({
          type: 'warning',
          message: '请输入正确的手机号！'
        })
        return
      }
      api.makeCall({phone: this.number}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'success',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  },

}

// 客服二维码
export const queryQrcode = {
  data() {
    return {
      vipEWM: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this._isLoginChangeCallback()//初始化加载项
  },
  methods: {
    //初始化加载项
    _isLoginChangeCallback() {
      if (this.isLogin) {
        this._queryQrcode()//客服二维码
      }
    },
    //查询客服二维码
    _queryQrcode() {
      api.queryQrcode().then((res) => {
        if (this.ERR_OK === res.code) {
          this.vipEWM = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  },
  watch: {
    isLogin() {
      this._isLoginChangeCallback()
    }
  },
}

// 自助安全中心
export const safeCenter = {
  data() {
    return {
      //短信找回密码
      getbackPwdByDxData: {
        name: '',
        phone: '',
        check_address: 0,
        check_key: 0,
        sid: 0
      },
      //邮箱找回密码
      getbackPwdByEmailData: {
        name: '',
        email: '',
        code: ''
      },

      //短信找回账号
      getForgetAccbySmsData: {
        phone: '',
        code: ''
      },

      //邮箱找回账号
      getForgetAccbyEmailData: {
        email: '',
        code: ''
      },

      //自助解冻账号
      unlockAccountByInfoData: {
        loginName: '',
        accountName: '',
        phone: '',
        email: ''
      },

      //解绑银行卡
      unBindBankinfoData: {
        bankno: ''
      },

      //验证码
      validateCodeForIndex: '',
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.changeCode()
  },
  methods: {
    //短信找回登录密码
    getbackPwdByDx() {
      let {name, phone} = this.getbackPwdByDxData
      if (!name) {
        this.$message({
          type: 'warning',
          message: '请输入游戏账号'
        })
        return
      }
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机格式输入有误'
        })
        return
      }

      api.getbackPwdByDx(this.getbackPwdByDxData).then((res) => {
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

    //邮箱找回密码
    getbackPwdByEmail() {
      let {name, email, code} = this.getbackPwdByEmailData
      if (!name) {
        this.$message({
          type: 'warning',
          message: '请输入游戏账号'
        })
        return
      }
      if (!validtorReg.emailReg.test(email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式输入有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(code)) {
        this.$message({
          type: 'warning',
          message: '验证码输入有误'
        })
        return
      }
      api.getbackPwdByEmail(this.getbackPwdByEmailData).then((res) => {
        this.changeCode()
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

    //短信找回账号
    getForgetAccbySms() {
      let {phone, code} = this.getForgetAccbySmsData
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机格式输入有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(code)) {
        this.$message({
          type: 'warning',
          message: '验证码输入有误'
        })
        return
      }
      api.getForgetAccbySms(this.getForgetAccbySmsData).then((res) => {
        this.changeCode()
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

    //邮箱找回账号
    getForgetAccbyEmail() {
      let {email, code} = this.getForgetAccbyEmailData
      if (!validtorReg.emailReg.test(email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式输入有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(code)) {
        this.$message({
          type: 'warning',
          message: '验证码输入有误'
        })
        return
      }
      api.getForgetAccbyEmail(this.getForgetAccbyEmailData).then((res) => {
        this.changeCode()
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

    //自助解冻账号
    unlockAccountByInfo() {

      let {loginName, accountName, phone, email} = this.unlockAccountByInfoData
      if (!loginName) {
        this.$message({
          type: 'warning',
          message: '请输入游戏账号'
        })
        return
      }
      if (!validtorReg.chineseReg.test(accountName)) {
        this.$message({
          type: 'warning',
          message: '注册姓名只能是中文'
        })
        return
      }
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机号输入有误'
        })
        return
      }

      if (!validtorReg.emailReg.test(email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式输入有误'
        })
        return
      }

      api.unlockAccountByInfo(this.unlockAccountByInfoData).then((res) => {
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

    //解绑银行卡
    unBindBankinfo() {
      if (!this.isLogin) {
        this.$msgbox({
          title: '温馨提示',
          type: 'warning',
          message: '请先登录账号'
        })
        return
      }
      if (!validtorReg.bankReg.test(this.unBindBankinfoData.bankno)) {
        this.$message({
          type: 'warning',
          message: '银行卡输入有误'
        })
        return
      }


      api.unBindBankinfo(this.unBindBankinfoData).then((res) => {
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

    // 切换验证码
    changeCode() {
      this.validateCodeForIndex = `/1.0/validateCodeForIndex?r=${Math.random().toFixed(5)}`
    },
  }
}

// 注册
export const register = {
  data() {
    return {
      registerData: {
        loginName: '',
        password: '',
        rePwd: '',
        email: '',
        phone: '',
        qq: '',
        validateCode: '',
      },
      agree: true,
      validateCodeForIndex: '/1.0/validateCodeForIndex',
    }
  },
  methods: {
    changeCode() {
      this.validateCodeForIndex = this.validateCodeForIndex + `?r=${Math.random().toFixed(5)}`
    },
    submitRegister() {
      if (!validtorReg.usernameReg.test(this.registerData.loginName)) {
        this.$message({
          type: 'warning',
          message: '登入账号只允许小写字母与数字的组合，字母开头，6-11字符之间,不能包含特殊字符'
        })
        return
      }
      if (!validtorReg.passwordReg.test(this.registerData.password)) {
        this.$message({
          type: 'warning',
          message: '密码长度为6-16个字符,以及必须含有字母和数字的组合'
        })
        return
      }
      if (!(this.registerData.rePwd === this.registerData.password)) {
        this.$message({
          type: 'warning',
          message: '两次密码请保持一致'
        })
        return
      }
      if (!validtorReg.emailReg.test(this.registerData.email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式有误'
        })
        return
      }
      if (!validtorReg.phoneReg.test(this.registerData.phone)) {
        this.$message({
          type: 'warning',
          message: '密码长度为6-16个字符,以及必须含有字母和数字的组合'
        })
        return
      }
      if (!validtorReg.qqReg.test(this.registerData.qq)) {
        this.$message({
          type: 'warning',
          message: 'qq号码有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(this.registerData.validateCode)) {
        this.$message({
          type: 'warning',
          message: '验证码有误'
        })
        return
      }

      if (!this.agree) {
        this.$message({
          type: 'warning',
          message: '请选中用户协议'
        })
        return
      }

      api.register(this.registerData).then((res) => {
        this.changeCode()
        if (this.ERR_OK === res.code) {
          this.registerData = {
            loginName: '',
            password: '',
            rePwd: '',
            email: '',
            phone: '',
            qq: '',
            validateCode: '',
          }
          this.checkLogin()
          if (isMobile) {
            this.$router.push('/mobile/welcome')
          } else {
            this.$router.push('/welcome')
          }

        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }

      })
    }
  }
}

// 游戏大厅
export const gameLobby = {
  data() {
    return {
      //奖池
      jackpotList: [{},
        {
          startNum: 301518148,//开始数
          endNum: 30151814800000,//结束数
          stepNum: 0.01,//每次增加
          step: 50,//变频
          styleObj: {
            fontSize: '28px',
            color: '#fff',
            fontWeight: 600
          },
          title: 'DT老虎机总奖池'
        }
      ],
      allGameList: [],//所有游戏
      filterList: [],//过滤后的游戏
      filter: { //过滤条件
        gameLine: '', // 赔付线数
        gameType: '', //游戏类型
        gameStyle: ''//游戏风格
      },
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'favoriteGameList'
    ])
  },
  created() {
    //获取所有游戏并渲染游戏
    this._getAllGames()
    this._getDtJackpot()
  },
  methods: {
    //获取dt奖池金额
    _getDtJackpot() {
      apiGame.getDtJackpot().then((res) => {
        if (this.ERR_OK === res.code) {
          this.jackpotList[1].startNum = parseFloat(res.data.pot) || 10000
          this.jackpotList[1].endNum = this.jackpotList[1].startNum * 10000
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //游戏过滤搜索
    _search(value, filter) {
      if (filter) this.filter[filter] = value
      let {gameLine, gameType, gameStyle} = this.filter
      this.filterList = this.allGameList.filter((item) => {
        return (item.gameCategory.toLowerCase() === this.$route.params.type)
          && (gameLine === '' || item.gameLine.includes(gameLine))
          && (gameType === '' || item.gameType.includes(gameType))
          && (gameStyle === '' || item.gameStyle.includes(gameStyle))
      })
    },
    //搜索框查询
    _searchInput(query) {
      if (!query) return
      this.filterList = this.allGameList.filter((item) => {
        return item.gameCName.includes(query) || item.gameEName.toLowerCase().includes(query)
      })
    },
    //获取所有游戏并渲染游戏
    _getAllGames() {
      let url = 'http://220.241.124.160:15002/api/game/gameConfig/list'
      let gameTerminal = isMobile ? 'MOBILE' : 'PC'
      ajaxRequst(url, 'POST', {gameTerminal}).then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.allGameList = res.data
          //过滤渲染
          this._search()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //获取收藏游戏列表
    getFavoriteGameList() {
      if (!this.isLogin) {
        this.$msgbox({
          title: '温馨提示',
          type: 'warning',
          message: '请先登录账号'
        }).catch((e) => {
          console.log(e)
        })
        return
      }
      this.filterList = this.favoriteGameList
    }
  },
  watch: {
    $route() {
      this._search()
    },
  },
}

// 游戏列表
export const gameList = {
  mixins: [playGame],
  props: {
    filterList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'isAgent',
      'userInfo',
      'favoriteGameList',
    ])
  },
  created() {
    if (this.isLogin) {
      this._updateFavoriteGameList()
    }
  },
  methods: {
    // 试玩
    tryGame(item) {
      // if (item.gameStatus === '2') {
      //   this.$message({
      //     type: 'warning',
      //     message: '此游戏不支持试玩'
      //   })
      //   return
      // }
      let url = ''
      let fromApp = item.gameTerminal === 'FLASH' ? 1 : 0 //游戏终端
      let mode = 'fun'
      switch (item.gameCategory) {
        case 'PT':
          url = `http://cachedownload.goldenrose88.com/casinoclient.html?language=zh-cn&game=${item.gameId}&mode=offline`
          break
        case 'QT':
          this._openTryGame(apiGame.gameQTForTp, {
            gameCode: item.gameId,
            mode,
            fromApp
          })
          break
        case 'NT':
          if (item.gameCName === '群狼会') {
            url = 'https://cecom-static.casinomodule.com/games/wolfcub-client/game/wolfcub-client.xhtml?gameName=wolf-cub.desktop&staticServer=https%3A%2F%2Fcecom-static.casinomodule.com%2F&targetElement=gameContainer&casinoId=mrsmithcasino&allowFullScreen=false&mobileParams.lobbyURL=https%3A%2F%2Fbaidu.com&gameId=wolfcub_not_mobile_sw&server=https%3A%2F%2Fcecom-game.casinomodule.com%2F&lang=cn&sessId=DEMO-USD&operatorId=unbranded'
          } else if (item.gameCName === '吸血鬼2') {
            url = 'https://cecom-static.casinomodule.com/games/bloodsuckers2_mobile_html/game/bloodsuckers2_mobile_html.xhtml?gameName=blood-suckers-2.desktop&staticServer=https%3A%2F%2Fcecom-static.casinomodule.com%2F&targetElement=gameContainer&casinoId=mrsmithcasino&allowFullScreen=false&mobileParams.lobbyURL=https%3A%2F%2Fm.richslots.it&gameId=bloodsuckers2_not_mobile_sw&server=https%3A%2F%2Fcecom-game.casinomodule.com%2F&lang=cn&sessId=DEMO-2564448594028&operatorId=touch'
          } else if (item.gameCName === '宝莱坞故事H5') {
            url = 'https://comeon-static.casinomodule.com/games/bollywoodstory_mobile_html/game/bollywoodstory_mobile_html.xhtml?server=https%3A%2F%2Fcomeon-game.casinomodule.com%2F&lang=en&sessId=DEMO-6d1712751da635-GBP&gameId=bollywoodstory_not_mobile_sw&operatorId=default&staticsharedurl=http%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent'
          } else if (item.gameCName === '符号星球') {
            url = 'http://load.sdjdlc.com/disk2/netent/demo.html?game=emoji_not_mobile&language=cn'
          } else {
            url = `http://load.sdjdlc.com/disk2/netent/demo.html?game=${item.gameId}&language=en`
          }
          break
        case 'DT':
          url = `http://play.dreamtech8.com/playSlot.aspx?gameCode=${item.gameId}&isfun=1&type=dt&language=zh_CN`
          break
        case 'MG':

          if (item.gameTerminal === 'MOBILE') {
            url = `https://mobile22.gameassists.co.uk/MobileWebServices_40/casino/game/launch/UFAcom/${item.gameId}/zh?loginType=VanguardSessionToken&isPracticePlay=true&casinoId=2712&isRGI=true&authToken=&lobbyurl=/slots/mg`
          } else if (item.gameIs3RD == '3RD') {
            url = `https://redirector3.valueactive.eu/Casino/Default.aspx?serverid=1866&applicationID=7217&ModuleID=19493&ul=zh&siteID=TNG&playmode=demo&gameid=${item.gameId}&clientid=50300&productid=6`
          } else {
            url = `http://redirector3.valueactive.eu/Casino/Default.aspx?applicationid=1024&theme=quickfire&usertype=5&sext1=demo&sext2=demo&csid=2712&serverid=2712&variant=TNG&ul=zh&gameid=${item.gameId}`
          }
          break
        case "PNG":
          this._openTryGame(apiGame.gamePNGFlashForTp, {
            gameCode: item.gameId,
            practice: 1,
            mode,
            fromApp
          })
          break
        case 'SW':
          this._openTryGame(apiGame.gameLoginPtSky, {
            gameCode: item.gameId,
            lobby: '/slots/sw',
            mode,
            fromApp
          })
          break
      }
      if (!url) {
        return
      }
      window.open(url)
    },
    // 真钱
    playTrueGame(item) {
      // if (item.gameStatus === '1') {
      //   this.$message({
      //     type: 'warning',
      //     message: '此游戏只能试玩'
      //   })
      //   return
      // }
      let fromApp = item.gameTerminal === 'FLASH' ? 1 : 0 //游戏终端
      let mode = 'real'
      switch (item.gameCategory) {
        case 'PT':
          this._openPTGame(item)
          break
        case 'QT':
          this.playGame(apiGame.gameQTForTp, {
            gameCode: item.gameId,
            mode,
            fromApp
          })
          break
        case 'NT':
          this.playGame(apiGame.loginNT, {
            gameCode: item.gameId,
            mode,
          })
          break
        case 'TTG':
          this.playGame(apiGame.ttLogin, {
            gameCode: item.gameId,
            gameName: item.gameCName,
            mode,
            lang: 'zh-cn'
          })
          break
        case 'DT':
          this.playGame(apiGame.gameLoginDT, {
            gameCode: item.gameId,
            mode,
            lang: 'zh-cn',
            clientType: 0
          })
          break
        case 'MG':
          if (item.gameIs3RD) { //是否为3RD游戏
            this.playGame(apiGame.gameMGS43RD, {
              gameCode: item.gameId,
              clientid: 50300, // mobile端为 40300
              productid: 6,
              mode,
            })
          } else {
            this.playGame(apiGame.gameMGS, {
              gameCode: item.gameId,
              mode,
            })
          }
          break;
        case 'PNG':
          this.playGame(apiGame.gamePNGFlashForTp, {
            gameCode: item.gameId,
            practice: 0,
            mode,
            fromApp
          })
          break
        case 'SW':
          this.playGame(apiGame.gameLoginPtSky, {
            gameCode: item.gameId,
            lobby: '/slots/sw',
            mode,
          })
          break
      }

    },
    // 更新当前游戏收藏状态
    toggleFavorite(item) {
      if (!this.isLogin) {
        this.$msgbox({
          title: '温馨提示',
          confirmButtonText: '知道了',
          message: '请先登录！'
        })
        return
      }
      let gameList = [...this.favoriteGameList]

      let idx = gameList.findIndex((obj) => {
        return obj.gameId === item.gameId
      })
      //如果检测到删除，否则添加
      if (idx > -1) {//检测到了
        gameList.splice(idx, 1)
      } else {
        gameList.push(item)
      }

      apiGame.saveOrUpdateGameStatus({gameList: gameList}).then((res) => {
        if (this.ERR_OK === res.code) {
          //更新游戏收藏列表
          this.SET_FAVORITE_GAME_LIST(gameList)
          // 如果在收藏列表内操作
          //  ...
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 获取当前游戏收藏状态icon
    getFavoriteIcon(currentGame) {
      if (this._isFavorite(currentGame)) {
        return `<i class="iconfont icon-shoucang1"></i> 已收藏`
      }
      return `<i class="iconfont icon-shoucang"></i> 收藏 `
    },
    // 打开试玩窗口
    _openTryGame(apiFunc, reqData) {
      let tempWindow = window.open(`${process.env.BASE_URL}loading.html`)
      apiFunc(reqData).then((res) => {
        if (this.ERR_OK === res.code) {
          if (res.data.url) {
            tempWindow.location = res.data.url
          } else {
            tempWindow.location = res.data
          }
        } else {
          tempWindow.close()
          this.$msgbox({
            title: '温馨提示',
            confirmButtonText: '知道了',
            message: '进入游戏失败'
          }).catch(e => e)
        }
      })
    },
    // 打开pt游戏
    _openPTGame(item) {
      if (!this.isLogin) {
        this.$msgbox({
          title: '温馨提示',
          confirmButtonText: '知道了',
          message: '请先登录！'
        })
        return
      }
      if (this.isAgent) {
        this.$message({
          type: 'warning',
          message: '代理登录不能进行游戏！'
        })
        return
      }
      let tempWindow = window.open(`${process.env.BASE_URL}loading.html`)
      //获取密码并跳转
      apiGame.loginGame({gameCode: item.gameId}).then((res) => {
        if (this.ERR_OK === res.code) {
          tempWindow.location = `http://i5g20f3as-31g4s.com/goldenrose/ptforward.jsp?loginname=ZB${this.userInfo.loginname}&password=${res.data}&ptgamecode=${item.gameId}&language=ZH-CN&ptlobby=${window.location.href}`
        } else {
          tempWindow.close()
          this.$msgbox({
            title: '温馨提示',
            confirmButtonText: '知道了',
            message: '进入游戏失败'
          }).catch(e => e)
        }
      })
    },
    // 更新游戏收藏列表
    _updateFavoriteGameList() {
      apiGame.queryGameStatus().then((res) => {
        if (this.ERR_OK === res.code) {
          if (res.data.gameList && res.data.gameList.length) {
            let gameList = JSON.parse(res.data.gameList)
            //更新游戏收藏列表
            this.SET_FAVORITE_GAME_LIST(gameList)
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 判断当前游戏是否为收藏状态
    _isFavorite(currentGame) {
      return this.favoriteGameList.find((item) => {
        return item.gameId === currentGame.gameId
      })
    },
    // 更新游戏收藏列表
    ...mapMutations([
      'SET_FAVORITE_GAME_LIST'
    ])
  },
  watch: {
    isLogin(val) {
      if (val) {
        this._updateFavoriteGameList()
      } else {
        //更新游戏收藏列表
        this.SET_FAVORITE_GAME_LIST([])
      }
    }
  },
}

// 游戏分类
export const gameFilter = {
  data() {
    return {
      filterTypeList: [
        {
          title: '游戏类型',
          filter: 'gameType',
          active: '',
          list: {
            'pt': [
              {name: "全部", value: ""},
              {name: "经典", value: "CLA"},
              {name: "电动", value: "SLO"},
              {name: "视频扑克", value: "POK"},
              {name: "街机", value: "STR"}
            ],
            'sw': [
              {name: "全部", value: ""},
              {name: "热门", value: "HOT"},
              {name: "中奖率排行", value: "CF"},
              {name: "流水排行", value: "LS"},
            ],
            'dt': [
              {name: "全部", value: ""},
              {name: "经典", value: "CLA"},
              {name: "电动", value: "SLO"}
            ],
            'mg': [
              {name: "全部", value: ""},
              {name: "经典", value: "CLA"},
              {name: "电动", value: "SLO"}
            ],
            'png': [
              {name: "全部", value: ""},
              {name: "最新", value: "NEW"},
              {name: "热门", value: "HOT"},
              {name: "经典", value: "CLA"},
              {name: "奖池", value: "AMA"}
            ],
            'nt': [
              {name: "全部", value: ""},
              {name: "经典", value: "CLA"},
              {name: "电动", value: "SLO"},
              {name: "迷你", value: "MIN"}
            ],
            'qt': [
              {name: "新游戏", value: "NEW"},
              {name: "经典", value: "CLA"},
              {name: "电动", value: "SLO"}
            ]
          }
        },
        {
          title: '赔付线数',
          filter: 'gameLine',
          active: '',
          list: {
            "pt": config.COMMON_GAME_LINE,
            "mg": config.COMMON_GAME_LINE,
            "dt": config.COMMON_GAME_LINE,
            "sw": config.COMMON_GAME_LINE,
            "qt": config.COMMON_GAME_LINE,
            "png": config.COMMON_GAME_LINE,
            "nt": config.COMMON_GAME_LINE
          }
        },
      ]
    }
  },
  computed: {
    category() {
      return this.$route.params.type
    }
  },
  created() {
  },
  methods: {
    search(obj, item) {
      //设置当前选中状态
      item.active = obj.value
      this.$emit('search', obj.value, item.filter)
    },
    // 重置筛选
    reset() {
      this.filterTypeList.forEach((item) => {
        item.active = ''
        this.$emit('search', '', item.filter)
      })
    }
  },
  watch: {
    $route() {
      this.reset()
    }
  },
}

// 活动优惠
export const promotion = {
  data() {
    return {
      menuList: [
        {
          text: '全部优惠',
          icon: 'weibiaoti2fuzhi02'
        },
        {
          text: '老虎机优惠',
          icon: 'game'
        },
        {
          text: '真人优惠',
          icon: 'nvren'
        },
        {
          text: '手机优惠',
          icon: 'shouji'
        },
        // {
        //   text: '过期优惠',
        //   icon: 'xiaolian'
        // },
        // {
        //   text: '体育优惠',
        //   icon: 'tiyu'
        // },
      ],
      currentIdx: 0,
      filterList: [],
      time: config.promotion.TIME,
      allItems: [
        {
          id: 'national',
          title: '国庆存送230%',
          content: '国庆7天限时翻倍送 每日存送230%',
          time: '详情见专题内',
          img: require('@/common/image/promotion/oct-d-youhui.png'),
          link: path + "/activity/national",
          type: []
        },
        {
          id: 'bbin',
          title: 'BBIN百家长红一路发',
          content: 'BBIN百家长红一路发',
          time: '详情见专题内',
          img: require('@/common/image/promotion/s-bbin-youhui.png'),
          link: path + "/activity/bbin",
          type: []
        },
        {
          id: 'casino',
          title: 'AG赌神赛',
          content: 'AG赌神赛，总奖金2,000,000人民币',
          time: '详情见专题内',
          img: require('@/common/image/promotion/aug-ag-youhui.png'),
          link: path + "/activity/casino",
          type: []
        },
        {
          id: 'dtWinner',
          title: 'DT全面争霸',
          content: 'DT全面争霸',
          time: '详情见专题内',
          img: require('@/common/image/promotion/sep-dt-youhui.png'),
          link: "http://play.dreamtech8.com/dta.aspx?http://dtshow.vip",
          type: []
        },
        {
          id: 'shoucun',
          title: '尊宝新100%首次存送',
          content: '尊宝首存再次升级 , 业界最高-史无前例 ! 老虎机最高存送128% ，AG真人首存优惠等着您！',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/shoucun.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'upgrade',
          title: '存款升级领奖励',
          content: '每日存款记得打卡拿彩金哦！',
          time: '2018年03月01日起',
          img: require('@/common/image/promotion/aug-sign-youhui.png'),
          link: path + "/activity/upgrade",
          type: []
        },
        {
          id: 'movie',
          title: '尊宝电影院',
          content: '最新最热的电影这里都能免费看！',
          time: '1月5号正式上线',
          img: require('@/common/image/promotion/zb-movie-youhui.png'),
          link: path + "/activity/movie",
          type: []
        },
        {
          id: 'vipBirthday',
          title: '尊宝会员日',
          content: '尊宝会员周年日，属于您自己的节日！',
          time: '长期有效',
          img: require('@/common/image/promotion/vipday.png'),
          link: path + "/activity/vip-birthday",
          type: []
        },
        {
          id: 'ckms',
          title: '存款秒送VIP+礼包 ',
          content: '存款就送VIP！让您走上人生高端路，玩游戏享VIP！做人生大赢家！',
          time: '长期有效',
          img: require('@/common/image/promotion/upgradevip.png'),
          state: false,
          type: []
        },
        {
          id: 'fanzeng',
          title: ' 秒存返赠立即送1%',
          content: '秒存返赠立即送1%，不需要申请，使用就能自动添立即到账，最高500元。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/miaocun3.png'),
          state: false,
          type: []
        },
        {
          id: 'handsel',
          title: 'app彩金下载送8-88',
          content: '只要您下载尊宝手机APP，无需联系客服，即可自助领取8-88元彩金。彩金无需流水，达到388元即可提款。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/register.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'ccc',
          title: '老虎机次次存送最高25%',
          content: '最高红利可达5888元，人人有份，尊宝优惠天天送。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/ccc.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'jyj',
          title: '尊宝救援金，让您无后顾之忧',
          content: '尊宝救援金 不需要向客服人员申请，可自己自助领取救援金，最高救援10%。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/jyj.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'sign',
          title: '每日签到送彩金',
          content: '新会员每日签到送4元，单月120元，无需存款可签到，VIP玩家最高签到每日高达20元。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/meiriqd.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'fanshui',
          title: ' 尊宝返水最高可达1.1%',
          content: '无需申请，人人有份，游戏投注就可以享受此优惠，返水额度无上限，可自助领取优惠，无需等待。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/fanshui.jpg'),
          state: false,
          type: []
        },
        {
          id: 'limitTime',
          title: '尊宝限时30%-100%存送',
          content: '在特定的时间尊宝会开放30%-100%存送优惠活动，请您关注好尊宝微信公众号，或者下载尊宝APP，掌握最新优惠资讯。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/limit-time.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_PHONE
          ]
        }
      ],
    }
  },
  created() {
    this.filterList = this.allItems
  },
  methods: {
    //打开优惠详情
    goToThisPromotion(item) {
      if (!item.link) { //本地打开
        item.state = !item.state
        return
      }
      if (this._isHttpUrl(item.link)) {
        window.open(item.link)
      } else {
        this.$router.push(item.link)
      }
    },
    togglePanel(item) {
      item.state = !item.state
    },
    selectItem(idx) {
      let {TYPE_ALL, TYPE_SLOT, TYPE_REAL, TYPE_SPORT, TYPE_PHONE, TYPE_OLD} = config.promotion
      this.currentIdx = idx
      switch (idx) {
        case 0 :
          idx = TYPE_ALL
          break
        case 1 :
          idx = TYPE_SLOT
          break
        case 2 :
          idx = TYPE_REAL
          break
        case 3 :
          idx = TYPE_PHONE
          break
        case 4 :
          idx = TYPE_OLD
          break
        case 5 :
          idx = TYPE_SPORT
      }
      this._searchCategory(idx)
    },
    _searchCategory(type) {
      if (!type) {
        return this.filterList = this.allItems
      }
      this.filterList = this.allItems.filter((item) => {
        return item.type.indexOf(type) !== -1
      })
    },
    _isHttpUrl(string) {
      return /^http/.test(string)
    },
  }
}


// =============手机端===================

// 菜单
export const menu = {
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.body = document.querySelector('body')
    })
  },
  methods: {
    openMenu() {
      this.isShow = true
      this.body.style.overflow = 'hidden'
    },
    closeMenu() {
      this.isShow = false
      this.body.style.overflow = 'auto'
    },
  }
}

// app下载
export const appDownLoad = {
  methods: {
    appDownLoad() {
      let isEmpty = 0
      let version = getMobilePlatform().toUpperCase()
      let appDownloadUrl = 'https://www.qnappzb.com/web/app.html'
      // step 1
      if (version === 'OTHER') {
        this.$toast('请用安卓或者苹果设备打开！！')
        return
      }
      //step 2 判断代理域名
      checkAgentURLogin().then((res) => {

        if (this.ERR_OK === res.code) {

          // 如果为代理域名
          if (!res.data) {
            // step 3 获取代理包
            getAppVersionCustomInfo().then((res) => {

              if (this.ERR_OK === res.code) {

                //代理域名有代理包
                if (res.data.length) {

                  res.data.forEach((obj) => {
                    //根据移动平台获取下载链接
                    if (obj.plat.toUpperCase() === version) {
                      if (!obj.packageUrl) {
                        isEmpty = 0 //已登录
                        window.location.href = obj.packageUrl
                        return false
                      } else {
                        isEmpty = 1 //未登录
                      }
                    } else {
                      isEmpty = 1 //未登录
                    }
                  })
                  // 未登录
                  if (isEmpty === 1) {
                    this.$toast('您好，请先登录游戏账号')
                    return false
                  }

                } else {
                  // step 4 代理域名无代理包
                  if (!this.isLogin) {
                    this.$toast('您好，请先登录游戏账号')
                  } else {
                    window.location.href = appDownloadUrl
                  }
                }

              } else {

                this.$toast(res.message)

              }

            })
          } else {
            window.location.href = appDownloadUrl
          }

        } else {

          this.$toast(res.message)

        }
      })

    }
  }
}

// 返回
export const commonBack = {
  methods: {
    commonBack() {
      if (window.location.href.includes('openMobile')) {
        this.$router.back()
      } else {// 返回app
        window.location.href = 'zunbaowebapp://Home'
      }
    }
  }
}
