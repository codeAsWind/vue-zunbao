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
        <span class="label">优惠类型：</span>
        <select v-model="proposalType">
          <option v-for="item in list" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      <div class="input-group">
        <span class="label"></span>
        <el-button @click="searchData" type="primary">搜索</el-button>
      </div>
    </div>

    <user-center-pagination class="center"
        ref="pagination"
        :headList="headList"
        :pagination="pagination"
        :apiFun="apiFun"
        :paginationMark="config.paginationMark.vipPromo"
        :loginname="loginname"
        :proposalType="proposalType"
        tail="yh"
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
        proposalType: 506,
        list: [
          {
            text: '幸运抽奖',
            value: 506
          },
          {
            text: '生日礼金',
            value: 513
          }
        ],
        headList: [
          {
            label: '序号',
            prop: 'order'
          },
          {
            label: '会员账号',
            prop: 'loginname'
          },
          {
            label: '申请时间',
            prop: 'tempCreateTime'
          },
          {
            label: '优惠',
            prop: 'promo'
          },
          {
            label: '申请类型',
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
      searchData() {
        this.$refs.pagination.refresh()
      }
    },
    watch: {},
    components: {userCenterPagination}

  }
</script>

<style lang="stylus" scoped>

</style>