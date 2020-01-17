<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <!--基本资料-->
      <div v-if="currentIdx===0">
        <div v-if="userInfo.accountName" class="input-group">
          <span class="label">真实姓名</span>
          <div>
            {{formatStr(userInfo.accountName,1,0,2)}}
          </div>
        </div>

        <div class="input-group">
          <span class="label">注册邮箱</span>
          <div>
            {{formatStr(userInfo.email,4,8,5)}}
          </div>
        </div>

        <div class="input-group">
          <span class="label">手机号码</span>
          <div>
            {{formatStr(userInfo.phone,3,4,4)}}
          </div>
        </div>

        <div class="input-group">
          <span class="label">生日</span>
          <div>
            <span v-if="userInfo.birthday">{{userInfo.birthday | Date('yyyy-MM-dd')}}</span>
            <el-date-picker v-if="!userInfo.birthday" type="date" placeholder="选择日期" v-model="baseInfo.birthday"
                            style="width: 100%;"></el-date-picker>
          </div>
        </div>


        <div class="input-group">
          <span class="label">QQ号码</span>
          <div>
            <input v-model="baseInfo.qq" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">用户昵称</span>
          <div>
            <input v-model="baseInfo.aliasName" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">微信</span>
          <div>
            <input v-model="baseInfo.microchannel" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="changeInfo" type="danger">提交</el-button>
          </div>
        </div>


      </div>

      <!--修改密码-->
      <div v-if="currentIdx===1">

        <div class="input-group">
          <span class="label">原密码</span>
          <div>
            <input v-model="pwd.oldPwd" type="password">
          </div>
        </div>

        <div class="input-group">
          <span class="label">新密码</span>
          <div>
            <input v-model="pwd.newPwd" type="password">
          </div>
        </div>

        <div class="input-group">
          <span class="label">确认新密码</span>
          <div>
            <input v-model="pwd.rePwd" type="password">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="changePwd" type="danger">提交</el-button>
          </div>
        </div>

        <div class="tips">
          <h3>
            温馨提示：
          </h3>
          <p>
            1. 修改密码请注意大小写。
          </p>
        </div>


      </div>


      <!--绑定银行卡-->
      <div v-if="currentIdx===2">
        <div class="input-group">
          <span class="label">卡/折号</span>
          <div>
            <input @change="getBankInfo" v-model="bankCard.bankno" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">银行账户</span>
          <div>
            <input readonly disabled :value="bankCard.bankname" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">登录密码</span>
          <div>
            <input v-model="bankCard.password" type="password">
          </div>
        </div>

        <div class="input-group">
          <span class="label">姓名</span>
          <div>
            <input v-if="userInfo.accountName" v-model="bankCard.xinMing" readonly disabled type="text">
            <input v-if="!userInfo.accountName" v-model="bankCard.xinMing" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="mainbandingBankno" type="danger">提交</el-button>
          </div>
        </div>

        <div class="tips">
          <h3>温馨提示</h3>
          <p>

            <span class="red"> 1. 请认真填写真实姓名，如有乱填写造成无法出款，尊宝概不负责。</span>

            <br>2. 绑定银行卡/折号，可以免去您重复输入卡/折号的繁琐步骤。

            <br>3. 如有疑问请直接联系在线客服。
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import {mapGetters} from 'vuex'
  import {formatStr} from '@/common/js/util'
  import api from '@/api/user'
  import validtorReg from '@/common/js/validtor'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '基本资料'
          },
          {
            text: '修改密码'
          },
          {
            text: '绑定银行卡'
          },
        ],
        currentIdx: 0,
        //基本资料
        baseInfo: {
          qq: '',
          microchannel: '',
          birthday: '',
          aliasName: ''
        },
        //修改密码
        pwd: {
          oldPwd: '',
          newPwd: '',
          rePwd: ''
        },
        bankCard: {
          bankno: '',
          bankname: '',
          password: '',
          xinMing: '',
          bankaddress: 'none'
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {
      //获取用户信息接口执行后
      this.baseInfo.qq = this.formatStr(this.userInfo.qq, 3, 0, 3)
      this.baseInfo.microchannel = this.formatStr(this.userInfo.microchannel, 3, 0, 3)
      this.baseInfo.aliasName = this.formatStr(this.userInfo.aliasName, 3, 0, 3)
      this.baseInfo.birthday = this.userInfo.birthday
      this.baseInfoOld = Object.assign({}, this.baseInfo)
      this.bankCard.xinMing = this.userInfo.accountName
    },
    // 每次激活重新调用
    activated() {
      if (this.$route.query.query === 'bindBankCard') {
        this.currentIdx = 2
      }
    },
    methods: {
      // 绑定银行卡
      mainbandingBankno() {
        let {bankno, bankname, password, xinMing} = this.bankCard
        if (!validtorReg.bankReg.test(bankno)) {
          this.$message({
            type: 'warning',
            message: '卡/折号格式输入有误'
          })
          return
        }

        if (!bankname) {
          this.$message({
            type: 'warning',
            message: '银行账户不能为空'
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

        if (!validtorReg.chineseReg.test(xinMing)) {
          this.$message({
            type: 'warning',
            message: '姓名只能为汉字'
          })
          return
        }

        api.mainbandingBankno(this.bankCard).then((res) => {
          if (this.ERR_OK === res.code) {
            //多余代码啊...
            if (res.data === 'SUCCESS') {
              this.$message({
                type: 'info',
                message: '成功'
              })
              return
            }
            this.$message({
              type: 'info',
              message: res.data
            })

            //清空信息
            this.bankCard = {
              bankno: '',
              bankname: '',
              password: '',
              xinMing: this.userInfo.accountName || '',
              bankaddress: 'none'
            }

          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }

        })
      },
      //获取银行卡信息
      getBankInfo() {
        api.getBankInfo({bankno: this.bankCard.bankno}).then((res) => {
          if (this.ERR_OK === res.code) {
            let bankName = res.data.issuebankname
            if (bankName) {
              this.bankCard.bankname = bankName
            } else {
              this.$message({
                type: 'info',
                message: res.data
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
      //修改密码
      changePwd() {
        api.changePwd(this.pwd).then((res) => {
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
      //修改信息
      changeInfo() {
        let {qq, microchannel, birthday, aliasName} = this.baseInfo
        if (!birthday) {
          this.$message({
            type: 'warning',
            message: '请输入生日信息'
          })
          return
        }
        if (!qq) {
          this.$message({
            type: 'warning',
            message: '请输入qq号'
          })
          return
        }
        if (!aliasName) {
          this.$message({
            type: 'warning',
            message: '请输入用户昵称'
          })
          return
        }
        if (!microchannel) {
          this.$message({
            type: 'warning',
            message: '请输入微信号'
          })
          return
        }
        let baseInfoOld = this.baseInfoOld
        if ((baseInfoOld.qq === qq) && (baseInfoOld.microchannel === microchannel) && (baseInfoOld.birthday === birthday) && (baseInfoOld.aliasName === aliasName)) {
          this.$message({
            type: 'warning',
            message: '资料没有异动'
          })
          return
        }

        //日期格式转换
        if (this.baseInfo.birthday.getTime) {
          this.baseInfo.birthday = this.baseInfo.birthday.format('yyyy-MM-dd')
        }

        api.changeInfo(this.baseInfo).then((res) => {
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
      formatStr,
      selectItem(idx) {
        this.currentIdx = idx
      },
    },
    watch: {},
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped></style>