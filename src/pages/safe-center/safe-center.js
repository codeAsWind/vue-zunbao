import VDialog from '@/components/dialog/dialog'
import config from '@/common/js/config'
import {safeCenter} from '@/common/js/mixin'

export default {
  mixins: [safeCenter],
  data() {
    return {
      config,
      tabs: [
        {
          text: '忘记登录密码'
        },
        {
          text: '忘记登录账号'
        },
        {
          text: '自助解冻账号'
        },
        {
          text: '解绑银行卡'
        }
      ],
      forgetPwd: [
        {
          title: '通过短信找回密码',
          text: '如果你的手机号还在正常使用，请选择此方式',
          attr: 'isShowGetBackPwdByDxDialog'
        },
        {
          title: '通过邮件找回密码',
          text: '如果你的邮箱还在正常使用，请选择此方式',
          attr: 'isShowGetBackPwdByEmailDialog'
        },
        {
          title: '通过客服找回密码',
          text: '联系在线客服验证信息，立即找回密码',
          attr: ''
        },
      ],
      forgetUserName: [
        {
          title: '通过短信找回账号',
          text: '如果你的手机号还在正常使用，请选择此方式',
          attr: 'isShowGetForgetAccbySmsDialog'
        },
        {
          title: '通过邮件找回账号',
          text: '如果你的邮箱还在正常使用，请选择此方式',
          attr: 'isShowGetForgetAccbyEmailDialog'
        },
        {
          title: '通过客服找回账号',
          text: '联系在线客服验证信息，立即找回密码',
          attr: ''
        },
      ],
      currentIdx: 0,
      isShowGetBackPwdByDxDialog: false,
      isShowGetBackPwdByEmailDialog: false,
      isShowGetForgetAccbySmsDialog: false,
      isShowGetForgetAccbyEmailDialog: false,
      currentUnLockIdx: 0,

    }
  },
  computed: {},
  created() {
  },
  methods: {
    //立即找回
    getBackFunc(attr) {
      if (!attr) {
        window.open(config.serviceLink)
      } else {
        this.openDialog(attr)
      }
    },

    closeDialog(attr) {
      this[attr] = false
    },
    openDialog(attr) {
      this[attr] = true
    },
    select(idx) {
      this.currentIdx = idx
    },
    selectItem(idx) {
      this.currentUnLockIdx = idx
    }
  },
  watch: {
    //重新请求二维码
    isShowGetBackPwdByDxDialog() {
      this.changeCode()
    },
    isShowGetBackPwdByEmailDialog() {
      this.changeCode()
    },
    isShowGetForgetAccbySmsDialog() {
      this.changeCode()
    },
    isShowGetForgetAccbyEmailDialog() {
      this.changeCode()
    },
  }
  ,
  components: {
    VDialog
  }

}