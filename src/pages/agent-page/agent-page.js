import VWrapper from '@/components/wrapper/wrapper'
import TabMenu from '@/components/tab-menu/tab-menu'
import TabTitle from '@/components/tab-title/tab-title'
import api from '@/api/index'
import validtorReg from '@/common/js/validtor'
import config from '@/common/js/config'

export default {
  data() {
    return {
      config,
      currentIdx: 0,
      menuList: [
        {
          text: '关于我们',
          icon: 'guanyuwomen'
        },
        {
          text: '代理政策',
          icon: 'zhaoshangdaili'
        },
        {
          text: '立即注册',
          icon: 'xiazai'
        },
        {
          text: '联系我们',
          icon: 'dianhua'
        }
      ],
      slides: [
        {
          src: require("./img/1.jpg"),
          title: "日结佣金",
          text: {
            title: '日结佣金',
            describe: '业界首创，日结佣金，助你走向巅峰'
          }
        },
        {
          src: require("./img/2.jpg"),
          title: "自助优惠",
          text: {
            title: '自助优惠',
            describe: '体验尊宝自助优惠的便捷'
          }
        },
        {
          src: require("./img/3.jpg"),
          title: "实力强大",
          text: {
            title: '实力强大',
            describe: '菲律宾拥有实体赌场 资金雄厚'
          }
        },
        {
          src: require("./img/4.jpg"),
          title: "秒提技术",
          text: {
            title: '秒提技术',
            describe: '尊宝秒存秒提，无需等待'
          }
        }
      ],

      tabTitleList: {
        aboutUs: [
          {
            text: '关于我们'
          },
        ],
        scheme: [
          {
            text: '代理政策'
          }
        ],
        register: [
          {
            text: '立即注册'
          }
        ],
        contact: [
          {
            text: '联系我们'
          }
        ]
      },
      currentTabTitleIdx: 0,
      //注册信息
      registerData: {
        loginName: '',
        password: '',
        rePwd: '',
        accountName: '',//真实姓名
        email: '',
        phone: '',
        qq: '',
        microchannel: '',//微信
        sms: 0,//短信 0表示勾选，1未勾选
        validateCode: '',
        partner: '',//代理审核码
        agree: true, //接受协议
        referWebsite: '',//没用
      },
      validateCodeForIndex: '/1.0/validateCodeForIndex',
      question: [
        {
          q: '怎样注册代理？',
          a: '登陆代理页面即可看到“申请加盟”字样，点击即可来到注册页面，注册的时候，请仔细阅读我们的代理合作协议说明书。'
        },
        {
          q: '合营代理有任何费用吗？',
          a: '这是零投资的赚钱方式，您是无需花费任何费用开始，仅仅只需点击“立即注册”，注册后您将拥有一个独一无二的合营官网链接，然后便能开始向您的会员宣传推广而赚取佣金了。'
        },
        {
          q: '怎样赚取佣金？支付佣金是怎么样的？',
          a: '只要您注册了代理账号之后，会生成一个您独立的连接，然后您可以推广自己的连接，让其他人在您的连接注册并且游戏。然后他们产生负盈利的话，你就有佣金了。我们会按照日结累计，只要您满足佣金累计到了100以上就可以随时提款。'
        },
        {
          q: '我怎么能知道我一个月挣了多少钱？',
          a: '尊宝国际拥有强大的技术团队，所有合营人员都可以自己登陆自己的账号查看到自己下线的输赢情况（登陆账号——点击账户管理——佣金明细）。'
        },
        {
          q: '我如何知道注册的会员是不是在我的下线？',
          a: '如果您推荐的会员有注册成功，那么您直接可以在自己的后台看到他的情况。（登陆账号——点击账户管理——下线会员)。'
        },
        {
          q: '如何能保证我的佣金可以结算给我？',
          a: '尊宝国际所有的结算系统都是采用了强大技术创造的全自动结算模式。只要您下线会员有产生负盈利，那么系统会自动结算完毕，添加到合营账户中，您只需要申请提款即可。'
        },

        {
          q: '下线会员无法打开连接怎么处理？',
          a: '尊宝国际是属于菲律宾正规博弈老虎机娱乐城，国内一些具有拦截性质的浏览器会产生一些影响，建议会员使用谷歌浏览器进入，您也可以联系我们的在线客服索要备用网址。'
        },
        {
          q: '下线会员的情况我可以看到吗？',
          a: '合营人员可以在自己的合营账号看到下线会员所有的存款、提款、输赢等信息！所有的信息都在账户管理可以看到的哦！'
        },
        {
          q: '合营连接是否可以修改？',
          a: '如果您需要修改您的合营链接，那么您可以联系我们的市场部门专员，提供您的注册信息，进行修改您自己熟悉的链接哦！'
        },
        {
          q: '长时间没有登录忘记了密码，或者输入5次错误密码被冻结怎么办？',
          a: '如果忘记密码或者账号被锁定，您可以直接点击“登入”后面的“忘记密码”使用邮箱或者电话进行重置，重置成功之后账号自动恢复正常的哦!'
        },
        {
          q: '日结佣金需要达到一个什么样的条件？',
          a: '所有代理无需申请，自动日结不需要任何条件！'
        },
        {
          q: '我可以自己注册到自己的下线游戏吗？',
          a: '尊宝国际绝对禁止此类事件，具体的相关条例，请参照我们代理合作协议的责任与条款！'
        },
      ]
    }
  },
  computed: {},
  created() {
  },
  methods: {
    changeCode() {
      this.validateCodeForIndex = this.validateCodeForIndex + `?r=${Math.random().toFixed(5)}`
    },
    registerSubmit() {

      if (!validtorReg.agentAccountReg.test(this.registerData.loginName)) {
        this.$message({
          type: 'warning',
          message: '账号以a_ 开头（a后面是下划线_），由3-15个数字或英文字母组成'
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

      if (this.registerData.rePwd !== this.registerData.password) {
        this.$message({
          type: 'warning',
          message: '两次密码请保持一致'
        })
        return
      }

      if (!validtorReg.chineseReg.test(this.registerData.accountName)) {
        this.$message({
          type: 'warning',
          message: '真实姓名必须与你的银行账户名称相同，否则不能出款'
        })
        return
      }

      if (!validtorReg.phoneReg.test(this.registerData.phone)) {
        this.$message({
          type: 'warning',
          message: '请输入正确有效的手机号码'
        })
        return
      }

      if (!this.registerData.qq) {
        this.$message({
          type: 'warning',
          message: '玩家注册时必须填写QQ或skype账户'
        })
        return
      }

      if (!validtorReg.emailReg.test(this.registerData.email)) {
        this.$message({
          type: 'warning',
          message: '请输入正确有效的邮箱'
        })
        return
      }

      if (!validtorReg.codeReg.test(this.registerData.validateCode)) {
        this.$message({
          type: 'warning',
          message: '请输入正确的验证码'
        })
        return
      }
      if (!this.registerData.agree) {
        this.$message({
          type: 'warning',
          message: '请勾选确认用户协议'
        })
        return
      }

      this.$confirm('请确认资料是否填写正确，如有乱填将不审核，此账号不能进行游戏，确认提交后，我们的市场专员会24小时内会联系您。, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.addAgent(this.registerData).then((res) => {
          this.changeCode()

          if (this.ERR_OK === res.code) {
            //清空信息
            this.registerData = {
              loginName: '',
              password: '',
              rePwd: '',
              accountName: '',//真实姓名
              email: '',
              phone: '',
              qq: '',
              microchannel: '',//微信
              sms: 0,//短信 0表示勾选，1未勾选
              validateCode: '',
              partner: '',//代理审核码
              agree: true, //接受协议
              referWebsite: '',//没用
            }
            if (res.data == "帐号已禁用 :联系市场部门！") {
              this.$alert('代理账号审核中...', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            } else if (res.data == "SUCCESS") {
              this.$alert('恭喜您注册成功！', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })

            } else {//已注册等等...
              this.$alert(res.data, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
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
      }).catch((e) => {
        console.log(e)
      })

    },
    joinUs() {
      this.currentIdx = 2
    },
    selectItem(idx) {
      this.currentIdx = idx
    },
    _bannerImage(src) {
      return {
        background: `url(${src}) center`,
        backgroundSize: 'cover'
      }
    },
  },
  watch: {
    'registerData.loginName'(val) {
      if (val.length < 2) {
        this.registerData.loginName = 'a_'
      }
    },
    currentIdx(val) {
      //防止验证码过期
      if (val === 2) {
        this.changeCode()
      }
    }
  },
  components: {
    VWrapper,
    TabMenu,
    TabTitle
  }

}