import tabTitle from '@/components/tab-title/tab-title'
import api from '@/api/user'

export default {
  data() {
    return {
      tabTitleList: [
        {
          text: '转账'
        }
      ],
      currentIdx: 0,
      transformIn: 'self',//来源账户
      transformOut: '',//目标账户
      transformInBalance: 0,
      transformOutBalance: 0,
      transformInAccountList: [
        {
          text: '尊宝账户',
          value: 'self'
        },
        {
          text: '红包账户',
          value: 'redrain'
        }
      ],//来源账户列表
      transformOutAccountList: [
        {
          text: '请选择目标账户',
          value: ''
        },
        {
          text: '红包账户',
          value: 'redrain'
        }
      ],//目标账户列表
      amount: '',

      //转账给好友
      friendTransformAmount: '',
      friendAccount: ''
    }
  },
  computed: {},
  created() {
    this._getGameMoney(1) //来源账户
    this._getGameMoney(2) //目标账户
  },
  methods: {
    selectItem(idx) {
      this.currentIdx = idx
    },
    // 红包转账
    transformMoney() {
      if (!this.transformIn) {
        this.$message({
          type: 'warning',
          message: '请选择来源账户'
        })
        return
      }

      if (!this.transformOut) {
        this.$message({
          type: 'warning',
          message: '请选择目标账户'
        })
        return
      }

      if (!this.amount) {
        this.$message({
          type: 'warning',
          message: '请输入转账金额'
        })
        return
      }

      if (this.transformIn === 'self') {
        // 主账户转入红包账户
        api.updateGameMoney({
          transferGameOut: this.transformIn,//来源账户
          transferGameIn: this.transformOut,//目标账户
          transferGameMoney: this.amount
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
            //刷新账户
            this._getGameMoney(1) //来源账户
            this._getGameMoney(2) //目标账户
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      } else if (this.transformIn === 'redrain') {
        // 红包账户转入游戏账户
        api.transferInforRedRain({
          // transformIn: this.transformIn,
          // transformOut: this.transformOut,//目标账户
          signType: this.transformOut,//目标账户
          redRainRemit: this.amount
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
            //刷新账户
            this._getGameMoney(1) //来源账户
            this._getGameMoney(2) //目标账户
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }
    },

    //好友转账
    transferInforRedRaintoUser() {
      if (!this.friendAccount) {
        this.$message({
          type: 'warning',
          message: '请输入好友账户'
        })
        return
      }
      if (!this.friendTransformAmount) {
        this.$message({
          type: 'warning',
          message: '请输入转账金额'
        })
        return
      }
      api.transferInforRedRaintoUser({
        loginName: this.friendAccount,
        redRainRemit: this.friendTransformAmount
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
          //刷新账户
          this._getGameMoney(1) //来源账户
          this._getGameMoney(2) //目标账户
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //账户余额查询
    _getGameMoney(mode) {
      let gameCode = mode === 1 ? this.transformIn : this.transformOut
      if (!gameCode) return
      let apiFun = null
      if (gameCode === 'redrain') {
        apiFun = api.queryRedRainMoney
      } else {
        apiFun = api.getGameMoney
      }
      apiFun({gameCode}).then((res) => {
        if (this.ERR_OK === res.code) {
          if (mode === 1) {
            this.transformInBalance = res.data
          } else {
            this.transformOutBalance = res.data
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
          if (mode === 1) {
            this.transformInBalance = 0
          } else {
            this.transformOutBalance = 0
          }


        }
      })
    }
  },
  watch: {
    transformIn(val) {
      if (val === 'self') {
        this.transformOutAccountList = [
          {
            text: '请选择目标账户',
            value: ''
          },
          {
            text: '红包账户',
            value: 'redrain'
          }
        ]
      } else if (val === 'redrain') {
        this.transformOutAccountList = [
          {
            text: '请选择目标账户',
            value: ''
          },
          {
            text: 'PT账户',
            value: 'newpt'
          },
          {
            text: '老虎机钱包账户',
            value: 'slot'
          },
        ]
      }
      this.transformOut = this.transformOutAccountList[0].value
    }
  },
  components: {tabTitle}

}