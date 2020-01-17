<template>
  <div class="common-account-list">
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <user-center-pagination
          :headList="paginationData.headList"
          :pagination="pagination"
          :apiFun="paginationData.apiFun"
          :typeList="typeList"
          :number="currentIdx">
      </user-center-pagination>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import api from '@/api/accountList'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '在线存款记录'
          },
          {
            text: '手工存款记录'
          },
          {
            text: '附言存款记录'
          },
          {
            text: '提款记录'
          },
          {
            text: '户内转账记录'
          },
          {
            text: '优惠记录'
          },
          {
            text: '自助返水记录'
          },
          {
            text: '存送优惠记录'
          },
        ],
        currentIdx: 0,
        pagination: {
          pageIndex: 1,
          size: 10,
          pageContents: [],
          totalRecords: 0,
        },
        typeList: {//账号清单
          depositRecords: 0,
          cashinRecords: 1,
          depositOrderRecord: 2,
          withdrawRecords: 3,
          transferRecords: 4,
          consRecords: 5,
          searchXima: 6,
          couponRecords: 7,
        }
      }
    },
    computed: {
      paginationData() {
        let headList = null
        let apiFun = null
        let {
          depositRecords,
          cashinRecords,
          depositOrderRecord,
          withdrawRecords,
          transferRecords,
          consRecords,
          searchXima,
          couponRecords
        } = this.typeList
        switch (this.currentIdx) {
          case depositRecords:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '编号',
                prop: 'billno'
              },
              {
                label: '存款金额',
                prop: 'money'
              },
              {
                label: '存款时间',
                prop: 'tempCreateTime'
              }
            ]
            apiFun = api.depositRecords
            break
          case cashinRecords:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '编号',
                prop: 'pno'
              },
              {
                label: '存款金额',
                prop: 'amount'
              },
              {
                label: '存款时间',
                prop: 'tempCreateTime'
              },
              {
                label: '状态',
                prop: 'flag'
              },
              {
                label: '备注',
                prop: 'remark'
              },
            ]
            apiFun = api.cashinRecords
            break
          case depositOrderRecord:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '附言',
                prop: 'depositId'
              },
              {
                label: '银行',
                prop: 'bankname'
              },
              {
                label: '账号名',
                prop: 'accountname'
              },
              {
                label: '备注',
                prop: 'remark'
              },
              {
                label: '创建时间',
                prop: 'tempCreateTime'
              },
              {
                label: '状态',
                prop: 'status'
              },
            ]
            apiFun = api.depositOrderRecord
            break
          case withdrawRecords:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '编号',
                prop: 'pno'
              },
              {
                label: '提款金额',
                prop: 'amount'
              },
              {
                label: '提款时间',
                prop: 'tempCreateTime'
              },
              {
                label: '状态',
                prop: 'flag'
              }
            ]
            apiFun = api.withdrawRecords
            break
          case transferRecords:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '编号',
                prop: 'id'
              },
              {
                label: '转账金额',
                prop: 'remit'
              },
              {
                label: '转账时间',
                prop: 'tempCreateTime'
              },
              {
                label: '转账类型',
                prop: 'source'
              }
            ]
            apiFun = api.transferRecords
            break
          case consRecords:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '编号',
                prop: 'pno'
              },
              {
                label: '优惠类型',
                prop: 'typeValue'
              },
              {
                label: '赠送金额',
                prop: 'amount'
              },
              {
                label: '时间',
                prop: 'tempCreateTime'
              },
              {
                label: '备注',
                prop: 'remark'
              },
            ]
            apiFun = api.consRecords
            break
          case searchXima:
            headList = [
              {
                label: '序号',
                prop: 'order'
              },
              {
                label: '编号',
                prop: 'pno'
              },
              {
                label: '统计时段',
                prop: 'statisticsTimeRange'
              },
              {
                label: '有效投注额',
                prop: 'validAmount'
              },
              {
                label: '结算金额',
                prop: 'ximaAmount'
              },
              {
                label: '洗码类型',
                prop: 'ximaType'
              },
              {
                label: '洗码率',
                prop: 'rate'
              },
              {
                label: '状态',
                prop: 'ximaStatus'
              },
            ]
            apiFun = api.searchXima
            break
          case couponRecords:
            headList = [
              {
                label: '编号',
                prop: 'pno'
              },
              {
                label: '类型',
                prop: 'typeValue'
              },
              {
                label: '存款金额',
                prop: 'amount'
              },
              {
                label: '赠送金额',
                prop: 'gifTamount'
              },
              {
                label: '投注倍数',
                prop: 'betMultiples'
              },
              {
                label: '红利代码',
                prop: 'shippingCode'
              },
              {
                label: '转账类型',
                prop: 'remark'
              },
              {
                label: '执行时间',
                prop: 'tempCreateTime'
              },
            ]
            apiFun = api.couponRecords
            break
        }
        return {headList, apiFun}
      }
    },
    created() {},
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
    },
    watch: {},
    components: {tabTitle, userCenterPagination}
  }
</script>

<style lang="stylus">
  .common-account-list
    .tab-title a
      padding 0 10px
</style>