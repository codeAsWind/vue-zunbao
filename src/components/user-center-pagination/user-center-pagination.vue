<template>
  <div>
    <div class="table">
      <el-table
          stripe
          border
          :data="pagination.pageContents"
          style="width: 100%">

        <el-table-column
            v-for="item in headList"
            :prop="item.prop"
            :label="item.label">
        </el-table-column>

        <!--救援金-->
        <el-table-column
            v-if="paginationMark === config.paginationMark.rescueMoney"
            prop=""
            label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === '未领取'" @click="getLosePromo(scope.row.pno)" type="text" size="small">
              领取
            </el-button>
            <el-button v-if="scope.row.status === '未领取'" @click="cancelLosePromo(scope.row.pno)" type="text"
                       size="small">取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span class="split"></span>
    <el-pagination class="center"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagination.pageIndex"
                   :page-sizes="[10,15,20]"
                   :page-size="pagination.size"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pagination.totalRecords">
    </el-pagination>
  </div>
</template>

<script>
  import config from '@/common/js/config'

  export default {
    data() {
      return {
        config
      }
    },
    props: {
      headList: {
        type: Array,
        default: []
      },
      pagination: {
        type: Object,
        default: {}
      },
      apiFun: {
        type: Function,
        default: function () {
        }
      },
      number: {
        type: Number,
        default: 0
      },
      typeList: {
        type: Object,
        default: {}
      },
      timer: {
        type: Array,
        default: []
      },
      paginationMark: {
        type: String,
        default: ''
      },
      platform: {
        type: String,
        default: ''
      },
      loginname: {
        type: String,
        default: ''
      },
      proposalType: {
        type: String,
        default: ''
      },
      tail: {
        type: String,
        default: ''
      }
    },
    computed: {},
    created() {
      this._getPagination()
    },
    methods: {
      // 领取救援金
      getLosePromo(pno) {
        this.$emit('getLosePromo', pno)
      },
      // 取消救援金
      cancelLosePromo(pno) {
        this.$emit('cancelLosePromo', pno)
      },
      //获取数据
      _getPagination() {
        //获取参数
        let reqData = this._getParams()
        let paginationMark = this.paginationMark
        let {offlineMembers} = config.paginationMark
        this.apiFun(reqData).then((res) => {
          if (this.ERR_OK === res.code) {
            if (paginationMark === offlineMembers) {
              this.pagination.pageContents = this._sortData(res.data.page.pageContents)
              this.pagination.totalRecords = res.data.page.totalRecords
            } else {
              this.pagination.pageContents = this._sortData(res.data.pageContents)
              this.pagination.totalRecords = res.data.totalRecords
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
            this.pagination.pageContents = []
          }
        })
      },
      // 获取参数
      _getParams() {
        let reqData = {
          pageIndex: this.pagination.pageIndex,
          size: this.pagination.size
        }
        //时间参数
        if (this.timer && this.timer.length) {
          reqData.starttime = this.timer[0].format('yyyy-MM-dd hh:mm:ss')
          reqData.endtime = this.timer[1].format('yyyy-MM-dd hh:mm:ss')
        }

        // 代理中心会员账务
        let paginationMark = this.paginationMark
        let {searchagprofit, searchsubuserProposal, withdraw, vipBackwater, vipPromo} = config.paginationMark
        //会员输赢
        if (paginationMark === searchagprofit) {
          reqData.loginname = this.loginname
          reqData.platform = this.platform
        }
        if (paginationMark === searchsubuserProposal || paginationMark === withdraw || paginationMark === vipBackwater || paginationMark === vipPromo) {
          reqData.proposalType = this.proposalType
          reqData.loginname = this.loginname
        }
        if (paginationMark === withdraw || paginationMark === vipBackwater || paginationMark === vipPromo) {
          reqData.tail = this.tail
        }
        return reqData
      },
      handleSizeChange(size) {
        this.pagination.size = size
        this._getPagination()
      },
      handleCurrentChange(pageIndex) {
        this.pagination.pageIndex = pageIndex
        this._getPagination()
      },
      //参数重置并刷新数据
      refresh() {
        this.pagination.pageIndex = 1
        this.pagination.size = 10
        this.pagination.pageContents = []
        this._getPagination()
      },
      //处理数据
      _sortData(data) {
        data.forEach((item, idx) => {
          item.order = idx + 1
        })
        let paginationMark = this.paginationMark
        let {rescueMoney, searchPtCommissions, offlineMembers} = config.paginationMark
        //手工存款记录状态
        if (this.number === this.typeList.cashinRecords || this.number === this.typeList.withdrawRecords) {
          data.forEach((item) => {
            item.flag = getFlag(item.flag)
          })

          function getFlag(flag) {
            switch (flag) {
              case 0:
                return '待审核'
              case 1:
                return '已审核'
              case 2:
                return '已执行'
              case -1:
                return '已取消'
            }
            return flag
          }
        }
        //附言存款记录状态
        if (this.number === this.typeList.depositOrderRecord) {
          data.forEach((item) => {
            item.status = getStatus(item.status)
          })

          function getStatus(status) {
            switch (status) {
              case 0:
                return '待处理'
              case 1:
                return '成功'
              case 2:
                return '废弃订单'
            }
            return status
          }
        }
        //救援金
        if (paginationMark === rescueMoney) {
          data.forEach((item) => {
            item.status = getStatusJYJ(item.status)
          })

          function getStatusJYJ(status) {
            switch (status) {
              case '0':
                return '未领取'
              case '1':
                return '已领取'
              case '2':
                return '已领取'
              case '3':
                return '已取消'
            }
            return status
          }
        }
        //代理日结佣金
        if (paginationMark === searchPtCommissions) {
          data.forEach((item) => {
            item.platform = getPlatform(item.id.platform)
            item.agent = item.id.agent
            item.createdate = new Date(item.id.createdate).format()
            item.flag = getFlagAgent(item.flag)
          })

          function getFlagAgent(flag) {
            switch (flag) {
              case 0:
                return '未派发'
              case 1:
                return '已派发'
            }
            return flag
          }

          function getPlatform(platform) {
            switch (platform) {
              case 'slotmachine':
                return '老虎机佣金'
              case 'liveall':
                return '其他佣金'
            }
            return platform
          }
        }

        //下线会员
        if (paginationMark === offlineMembers) {
          data.forEach((item) => {
            item.flag = getFlagoffline(item.flag)
          })

          function getFlagoffline(flag) {
            switch (flag) {
              case 0:
                return '启用'
              case 1:
                return '禁用'
            }
            return flag
          }
        }

        return data
      },
    },
    watch: {
      apiFun() {
        this.refresh()
      }
    },
    components: {}

  }
</script>

<style lang="stylus" scoped>

</style>