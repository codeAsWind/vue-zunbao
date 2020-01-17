<template>
  <div>
    <div class="search-filter">
      <div class="input-group">
        <span class="label">选择时段：</span>
        <el-date-picker
            :clearable="false"
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="input-group">
        <span class="label">会员账号：</span>
        <input v-model="loginname" type="text">
      </div>
      <div class="input-group">
        <span class="label"></span>
        <el-button @click="searchData" type="primary">搜索</el-button>
      </div>
    </div>

    <user-center-pagination
        ref="pagination"
        :headList="headList"
        :pagination="pagination"
        :apiFun="apiFun"
        :paginationMark="config.paginationMark.withdraw"
        :loginname="loginname"
        :proposalType="proposalType"
        tail="tk"
        :timer="timer">
    </user-center-pagination>
  </div>
</template>

<script>
  import {getMonthFirstDay} from '@/common/js/util'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import api from '@/api/agent'
  import config from '@/common/js/config'

  export default {
    data() {
      return {
        config,
        timer: [],
        loginname: '',
        proposalType: 503,
        headList:[
          {
            label: '序号',
            prop: 'order'
          },
          {
            label: '会员账号',
            prop: 'loginname'
          },
          {
            label: '提款时间',
            prop: 'tempCreateTime'
          },
          {
            label: '提款额度',
            prop: 'amount'
          },
          {
            label: '提款类型',
            prop: 'type'
          }
        ],
        apiFun: api.searchsubuserProposal,
        pagination: {
          pageIndex: 1,
          size: 10,
          pageContents: [],
          totalRecords: 10
        },
      }
    },
    computed: {},
    created() {
      //初始化日期
      this.timer = [new Date(getMonthFirstDay()), new Date()]
    },
    methods: {
      searchData(){
        this.$refs.pagination.refresh()
      }
    },
    watch: {},
    components: {userCenterPagination}

  }
</script>

<style lang="stylus" scoped>

</style>