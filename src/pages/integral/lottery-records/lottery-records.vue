<template>
  <v-dialog :height="700" :width="800" @on-close="closeDialog" :is-show="isShowRecordDialog">
    <div class="record-dialog-wrapper">
      <div class="dialog-header">
        <h3>{{recordTitle}}</h3>
      </div>
      <div class="dialog-body">
        <div v-if="pageContents.length" class="table my-table">
          <table>
            <thead>
            <tr>
              <th>时间</th>
              <th>积分</th>
              <th>备注</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageContents">
              <td>{{item.createTime}}</td>
              <td><span class="red">{{item.points}}</span></td>
              <td>
                <div class="remark">
                  <p>
                    <span class="name">{{item.name}} </span>
                    <span class="property">{{_property(flag,item)}}</span>
                  </p>
                  <span v-if="item.status === '已抽奖'" class="getLotteryBtn status" @click="getLotteryPrize(item)">领取</span>
                  <span v-if="item.status !== '已抽奖'" class="status">{{ item.status === '已完成'?'已领取':item.status}}</span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <no-result v-if="!pageContents.length" style="margin-bottom:15px"></no-result>
        <div class="pagination center">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.pageIndex"
              :page-sizes="pagination.pageSizes"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import {getPageContents} from '@/common/js/util'
  import apiIntegral from '@/api/integral'
  import NoResult from '@/components/no-result/no-result'
  import {property} from '@/common/js/mixin'

  export default {
    mixins:[property],
    data() {
      return {
        allPointsRecord: [],//所有记录
        pageContents: [],//分页数据
        pagination: {
          pageSizes: [5, 8, 10],
          size: 10,
          pageIndex: 1,
          total: 0
        },
      }
    },
    props: {
      flag: {
        type: Number,
        default: 1
      },
      isShowRecordDialog: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      recordTitle() {
        return this.flag === 1 ? '我的抽奖记录' : '我的兑换记录'
      }
    },
    created() {
      // 请求一次接口
      this.mark = null
    },
    methods: {
      handleSizeChange(val) {
        this.pagination.size = val
        this.pageContents = getPageContents(this.allPointsRecord, val, this.pagination.pageIndex)
      },
      handleCurrentChange(val) {
        this.pagination.pageIndex = val
        this.pageContents = getPageContents(this.allPointsRecord, this.pagination.size, val)
      },
      closeDialog() {
        this.$emit('closeDialog')
      },
      lotteryRecords(flag) {
        if (this.flag !== flag) {//切换兑换记录处理
          this.pagination.pageIndex = 1
        }
        this.flag = flag
        apiIntegral.pointsRecord({flag}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.allPointsRecord = res.data
            this.pagination.total = this.allPointsRecord.length
            this.pageContents = getPageContents(this.allPointsRecord, this.pagination.size, this.pagination.pageIndex)
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      getLotteryPrize(item){
        this.$emit('getLotteryPrize',item.name,this._property(this.flag,item),item.luckyDrawPresentType,item.id,true,item.imageUrl )
      }
    },
    watch: {
      isShowRecordDialog(val) {
        if (val) {
          !this.mark && this.lotteryRecords(this.flag)
          this.mark = true
        }
      }
    },
    components: {VDialog,NoResult}
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  .record-dialog-wrapper
    .remark
      display flex
      justify-content space-between
      .getLotteryBtn
        background $color-danger
        padding 2px 10px
        border-radius 5px
        color $color-light
        cursor pointer
</style>