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
        <span class="label">平台类型：</span>
        <select v-model="platform">
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
        :paginationMark="config.paginationMark.searchagprofit"
        :loginname="loginname"
        :platform="platform"
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
        platform: '',
        list: [
          {
            value: '',
            text: '全部'
          },
          {
            value: 'newpt',
            text: 'PT账户'
          },
          {
            value: 'nt',
            text: 'NT'
          },
          {
            value: 'qt',
            text: 'QT'
          },
          {
            value: 'dt',
            text: 'DT'
          },
          {
            value: 'png',
            text: 'PNG'
          },
          {
            value: 'mg',
            text: 'MG'
          },
          {
            value: 'ag',
            text: 'AG'
          },
          {
            value: 'agin',
            text: 'AG真人'
          },
          {
            value: 'aginslot',
            text: 'AG老虎机'
          },
          {
            value: 'ptsky',
            text: 'PTSW'
          },
          {
            value: 'ebetapp',
            text: 'EBET'
          },
          {
            value: 'sba',
            text: 'SBA'
          },
        ],
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
            label: '创建时间',
            prop: 'tempCreateTime'
          },
          {
            label: '平台',
            prop: 'platform'
          },
          {
            label: '投注总额',
            prop: 'bettotal'
          },
          {
            label: '输赢值',
            prop: 'amount'
          },
        ],
        apiFun: api.searchagprofit,
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
      this._initTimer()
    },
    methods: {
      searchData(){
        this.$refs.pagination.refresh()
      },
      _initTimer() {
        this.timer = [new Date(getMonthFirstDay()), new Date()]
      },
    },
    watch: {},
    components: {userCenterPagination}

  }
</script>

<style lang="stylus" scoped>

</style>