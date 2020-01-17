<template>
  <div>
    <!--<h2 class="title">本月投注额</h2>-->
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div style="margin-top:20px" class="table">
      <el-table
          stripe
          border
          :data="tableData"
          style="width: 100%">
        <el-table-column
            v-for="item in headList"
            :prop="item.prop"
            :label="item.label">
        </el-table-column>
      </el-table>
    </div>
    <p class="center" style="margin-top:20px">
      <el-button @click="watchPromtedRule" type="danger">查看晋级标准</el-button>
      <el-button @click="checkUpgrade" type="danger">立即晋级</el-button>
    </p>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import api from '@/api/discount'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '本月投注额'
          }
        ],
        currentIdx: 0,
        headList: [
          {
            label: '序号',
            prop: 'order'
          },
          {
            label: '游戏平台',
            prop: 'platform'
          },
          {
            label: '投注额',
            prop: 'bet'
          }
        ],
        tableData: [],
      }
    },
    computed: {},
    created() {
      this._queryBetOfPlatform()
    },
    methods: {
      //去查看晋级标准
      watchPromtedRule() {
        this.$router.push('/activity/vip')
      },
      // 检查升级
      checkUpgrade() {
        this.$msgbox({
          title: '温馨提示',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          message: '您若按下确定检测后，若符合将自动晋级成当前最高等级！请审慎考虑'
        }).then((action) => {
          if (action === 'confirm') {
            api.checkUpgrade({type: 'month'}).then((res) => {
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
          }
        })

      },
      //本月投注额
      _queryBetOfPlatform() {
        api.queryBetOfPlatform({type: 'month'}).then((res) => {
          if (this.ERR_OK === res.code) {
            //拼表格数据
            let result = res.data[0]
            result.order = 1
            this.tableData.push(result)
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
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .title
    font-size 18px
    font-weight: 600
    color $color-primary
    margin-bottom 15px
</style>