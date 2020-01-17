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
                              :paginationMark="config.paginationMark.offlineMembers"
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
  import config from '@/common/js/config'

  export default {
    data() {
      return {
        config,
        tabTitleList: [
          {
            text: '下线会员'
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
            label: '会员账户',
            prop: 'loginname'
          },
          {
            label: '状态',
            prop: 'flag'
          },
          {
            label: '尊宝账户额度',
            prop: 'credit'
          },
          {
            label: '开户日期',
            prop: 'tempCreateTime'
          },
          {
            label: '来源网址',
            prop: 'howToKnow'
          }
        ],
        //活跃会员:${activeUsers}个 注册总量：${subUsers}个
        apiFun: api.queryAgentSubUserInfo,
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