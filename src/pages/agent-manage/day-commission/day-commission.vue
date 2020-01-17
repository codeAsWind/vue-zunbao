<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">

      <div class="search-filter">
        <span>选择时段：</span>
        <el-date-picker
            :clearable="false"
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button @click="searchData" type="primary" style="margin-left:10px">提交</el-button>
      </div>

      <user-center-pagination class="center"
                              ref="pagination"
                              :headList="headList"
                              :pagination="pagination"
                              :paginationMark="config.paginationMark.searchPtCommissions"
                              :apiFun="apiFun"
                              :timer="timer">
      </user-center-pagination>


    </div>
  </div>
</template>

<script>
  import {getMonthFirstDay} from '@/common/js/util'
  import tabTitle from '@/components/tab-title/tab-title'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import api from '@/api/agent'
  import config from '@/common/js/config'

  export default {
    data() {
      return {
        config,
        tabTitleList: [
          {
            text: '日结佣金'
          }
        ],
        currentIdx: 0,
        timer: [],//时间
        headList: [
          {
            label: '代理账号',
            prop: 'agent'
          },
          {
            label: '平台',
            prop: 'platform'
          },
          {
            label: '数据日期',
            prop: 'createdate'
          },
          {
            label: '输赢额度',
            prop: 'profitall'
          },
          {
            label: '优惠额度',
            prop: 'couponfee'
          },
          {
            label: '洗码额度',
            prop: 'ximafee'
          },
          {
            label: '日佣金',
            prop: 'amount'
          },
          {
            label: '是否派发',
            prop: 'flag'
          },
          {
            label: '创建时间',
            prop: 'tempExcuteTime'
          },
        ],
        apiFun: api.searchPtCommissions,
        pagination: {
          pageIndex: 1,
          size: 10,
          pageContents: [],
          totalRecords: 10
        }
      }
    },
    computed: {},
    created() {
      //初始化日期
      this._initTimer()
    },
    methods: {
      searchData() {
        this.$refs.pagination.refresh()
      },
      _initTimer() {
        this.timer = [new Date(getMonthFirstDay()), new Date()]
      },
      // 获得当月第一天
      _getNowDateOne() {
        let d = new Date()
        let vYear = d.getFullYear()
        let vMon = d.getMonth() + 1
        return vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-01 00:00:00"
      },
      selectItem(idx) {
        this.currentIdx = idx
      }
    },
    watch: {},
    components: {tabTitle, userCenterPagination}

  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .search-filter
    margin-bottom 20px
</style>