<template>
  <div class="common-transform">
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">

      <div class="input-group">
        <span class="label">来源账户</span>
        <div>
          <select @change="_getGameMoney(1)" v-model="transformIn" name="">
            <option v-for="item in config.accountList" :value="item.value">{{item.text}}</option>
          </select>
        </div>
        <span class="red">{{transformInBalance}}</span>
      </div>

      <div class="input-group">
        <span class="label">目标账户</span>
        <div>
          <select @change="_getGameMoney(2)" v-model="transformOut" name="">
            <option v-for="item in config.accountList" :value="item.value">{{item.text}}</option>
          </select>
        </div>
        <span class="red">{{transformOutBalance}}</span>
      </div>

      <div class="input-group">
        <span class="label">转账金额</span>
        <div>
          <input v-model="amount" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <el-button @click="updateGameMoney" style="width:140px" type="danger">提交</el-button>
          <el-button @click="oneKeyGameMoney" type="danger">一键额度回归</el-button>
        </div>
      </div>

      <div class="tips">
        <h3>
          温馨提示：
        </h3>
        <p>
          1、"老虎机钱包账户"支持DT、MG、QT、NT、PNG、SW，若要游玩以上平台请将额度转入"老虎机钱包账户"即可。<br>

          2、请在户内转账前进行平台激活方可转账成功。<br>

          3、户内转账只支持整数转账。<br>

          4、进行户内转账时，请先关闭正在进行的游戏页面，避免出现错误。
        </p>
      </div>



    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import config from '@/common/js/config'
  import api from '@/api/user'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        config,
        tabTitleList: [
          {
            text: '转账'
          }
        ],
        currentIdx: 0,
        transformIn: 'self',//来源账户
        transformOut: 'self',//目标账户
        transformInBalance: 0,
        transformOutBalance: 0,
        amount: ''
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted() {
      this._getGameMoney(1) //来源账户
      this._getGameMoney(2) //目标账户
    },
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
      //一键回归
      oneKeyGameMoney(){
        api.oneKeyGameMoney().then((res)=>{
          if(this.ERR_OK === res.code){
            this.$message({
              type:'info',
              message:res.data
            })
            this._getGameMoney(1) //来源账户
            this._getGameMoney(2) //目标账户
          }else{
            this.$message({
              type:'warning',
              message:res.message
            })
          }
        })
      },
      // 转账
      updateGameMoney(){
        if(this.transformIn === this.transformOut){
          this.$message({
            type: 'warning',
            message: '相同账户之间无法转账！'
          })
          return
        }

        if(!this.amount){
          this.$message({
            type: 'warning',
            message: '请输入转账金额！'
          })
          return
        }

        api.updateGameMoney({
          transferGameOut:this.transformIn,
          transferGameIn:this.transformOut,
          transferGameMoney:this.amount
        }).then((res)=>{
          if(this.ERR_OK === res.code){
            this.$message({
              type:'info',
              message:res.data
            })
            this._getGameMoney(1) //来源账户
            this._getGameMoney(2) //目标账户
          }else{
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      _getGameMoney(mode) {
        let gameCode = mode === 1 ? this.transformIn : this.transformOut
        api.getGameMoney({gameCode}).then((res) => {
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
          }
        })
      }
    },
    watch: {},
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped>

</style>