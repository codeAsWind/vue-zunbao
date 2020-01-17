<template>
  <div>
    <user-center-pagination
        @getLosePromo="openGetLosePromoDialog"
        @cancelLosePromo="cancelLosePromo"
        :headList="headList"
        :pagination="pagination"
        :apiFun="apiFun"
        :paginationMark="config.paginationMark.rescueMoney"
        :number="999">
    </user-center-pagination>
    <div class="tips">
      <h3>
        温馨提示：
      </h3>
      <p>
        1.请您确认“领取”或“取消”，点击取消救援金将无法补回。

        <br>2.救援金有效时间为60天（从派发当天开始计算），规定时间内未领取会自动取消。

        <br>3.计算公式：救援金=（会员PT/NT/QT/DT/MG平台负盈利 — 红利）*会员对应比例。
      </p>
    </div>

    <!--领取救援金-->
    <v-dialog @on-close="closeDialog('isShowGetLosePromoDialog')" :is-show="isShowGetLosePromoDialog">
      <div>
        <div class="dialog-header">
          <h3>选择老虎机平台</h3>
        </div>
        <div class="dialog-body">
          <p class="red">请选择您喜欢的老虎机平台, 确定后我们不接受任何重新转至其他老虎机平台的申请</p>
          <div class="options">
            <span v-for="item in options">
              <input type="radio" :id="item.value" :value="item.value" v-model="platform">
              <label :for="item.value">{{item.text}}</label>
            </span>
          </div>
          <p class="center">
            <el-button @click="optLosePromo" type="danger">确定</el-button>
          </p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination'
  import api from '@/api/discount'
  import config from '@/common/js/config'
  export default {
    data() {
      return {
        config,
        headList: [
          {
            label: '编号',
            prop: 'pno'
          },
          {
            label: '金额',
            prop: 'promo'
          },
          {
            label: '状态',
            prop: 'status'
          },
          {
            label: '发放时间',
            prop: 'tempCreateTime'
          },
          {
            label: '备注',
            prop: 'remark'
          },

        ],
        apiFun: api.queryPTLosePromoReccords,
        pagination: {
          pageIndex: 1,
          size: 10,
          pageContents: [],
          totalRecords: 0,
        },
        isShowGetLosePromoDialog: false,
        platform: 'pttiger',
        options: [
          {
            text: 'PT老虎机',
            value: 'pttiger'
          },
          {
            text: '老虎机钱包帐户',
            value: 'slot'
          },
        ],
        jobPno: '',
      }
    },
    computed: {},
    created() {},
    methods: {
      //取消救援金
      cancelLosePromo(pno) {
        this.$msgbox({
          title: '温馨提示',
          message: '是否确定取消该笔返赠？',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then((action) => {
          if (action === 'confirm') {
            this.jobPno = pno
            api.optLosePromo({
              jobPno: this.jobPno,
              proposalFlag: -1,
              platform: ''
            }).then((res) => {
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
      //领取救援金
      optLosePromo() {
        api.optLosePromo({
          jobPno: this.jobPno,
          proposalFlag: 2,
          platform: this.platform
        }).then((res) => {
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
      // 打开领取救援金弹框
      openGetLosePromoDialog(pno) {
        this.jobPno = pno
        this.openDialog('isShowGetLosePromoDialog')
      },
      closeDialog(attr) {
        this[attr] = false
      },
      openDialog(attr) {
        this[attr] = true
      },
    },
    watch: {},
    components: {userCenterPagination, VDialog}

  }
</script>

<style lang="stylus" scoped>
  .my-pagination
    margin 20px 0
    text-align center

  .options
    margin 15px 0
    text-align center
    span
      margin-right 15px
      vertical-align middle
      input
        margin-right 4px
</style>