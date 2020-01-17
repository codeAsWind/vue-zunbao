<template>
  <div>
    <div class="table">
      <el-table
          stripe
          border
          :span-method="arraySpanMethod"
          :data="backwater.tableData"
          style="width: 100%">
        <el-table-column
            v-for="item in backwater.headList"
            :prop="item.prop"
            :label="item.label">
        </el-table-column>
      </el-table>
    </div>
    <p style="margin-top:20px">
      <el-button type="danger" @click="oneKeyXimaNew">一键返水</el-button>
    </p>
    <div class="tips">
      <h3>
        温馨提示：
      </h3>
      <p>
        1.自助反水最低金额为1元（如没有达到自助反水最低金额是不能自助返水的）。

        <br>2.每天00:00-03:00为系统结算时间，暂不能用使用自助返水，每日可自助返水的时间为昨天0点到23:59:59,每个平台自助结算的是有效投注额，未自助返水的系统会进行系统结算。

        <br>3.自助返水无限次数，自助返水申请后，会在5分钟内通过审核，反水金额会自动添加到。
      </p>
    </div>
  </div>
</template>

<script>
  import api from '@/api/discount'

  export default {
    data() {
      return {
        //自助返水
        backwater: {
          headList: [
            {
              label: '游戏平台',
              prop: 'gameType'
            },
            {
              label: '有效投注额',
              prop: 'bet'
            },
            {
              label: '起始时间',
              prop: 'startTime'
            },
            {
              label: '截止时间',
              prop: 'endTime'
            },
            {
              label: '返水比例',
              prop: 'scale'
            },
            {
              label: '返水金额',
              prop: 'amount'
            },
          ],
          tableData: [],
          totalXimaAmount: 10,
        },
      }
    },
    computed: {},
    created() {
      this._getOnekeyData()
    },
    methods: {
      //列合并
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (rowIndex === (this.backwater.tableData.length - 1)) {
          return [1, 6]
        }
      },
      //一键返水
      oneKeyXimaNew() {
        api.oneKeyXimaNew().then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      // 数据查询
      _getOnekeyData() {
        api.getOnekeyData().then((res) => {
          if (this.ERR_OK === res.code) {
            let data = res.data
            if (!(data instanceof Array)) {
              data = JSON.parse(data) || [{}]
            }
            this.backwater.totalXimaAmount = data[0].totalXimaAmount
            this._trimData(data[0].tiggerAndEA)
          }
        })
      },
      _trimData(data) {
        let result = []
        for (let key in data) {
          let obj = {}
          let item = data[key]
          obj.gameType = key
          obj.bet = item.validAmount
          obj.startTime = item.startTimeStr
          obj.endTime = item.endTimeStr
          obj.scale = item.rate
          obj.amount = item.ximaAmount
          result.push(obj)
        }
        //合计
        result.push({
          'gameType': '返水总金额约：' + this.backwater.totalXimaAmount
        })
        this.backwater.tableData = result
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>

</style>