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
          :apiFun="apiFun"
          :timer="timer">
      </user-center-pagination>


    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import {getMonthFirstDay} from "@/common/js/util"
  import api from '@/api/agent'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '额度记录'
          }
        ],
        currentIdx: 0,
        timer: [],//时间
        headList: [
          {
            label: '序号',
            prop: 'order'
          },
          {
            label: '操作类型',
            prop: 'type'
          },
          {
            label: '额度变量',
            prop: 'remit'
          },
          {
            label: '改变前额度',
            prop: 'credit'
          },
          {
            label: '改变后额度',
            prop: 'newCredit'
          },
          {
            label: '加入时间',
            prop: 'tempCreateTime'
          }
        ],
        apiFun: api.searchCreditlogs,
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
      this.timer = [new Date(getMonthFirstDay()), new Date()]
    },
    methods: {
      searchData() {
        this.$refs.pagination.refresh()
      },
      selectItem(idx) {
        this.currentIdx = idx
      }
    }
    ,
    watch: {}
    ,
    components: {
      tabTitle, userCenterPagination
    }

  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .search-filter
    margin-bottom 20px
</style>