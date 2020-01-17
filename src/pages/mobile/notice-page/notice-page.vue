<template>
  <div class="notice">
    <v-header @leftIconClick="back" :data="headData"></v-header>
    <ul class="news-list">
      <li :class="{active:idx === currentIdx}" v-for="(item,idx) in pagination.records" @click="toggleSlider(idx)">
        <div class="tit">
          <p>
            {{item.title}}
          </p>
          <p>
            <span class="opacity">{{item.time || new Date().format()}}</span>
            <i class="iconfont icon-arrow"></i>
          </p>
        </div>
        <transition name="slide-fade">
          <div ref="" v-show="idx === currentIdx" class="sub">
            {{item.content}}
          </div>
        </transition>
      </li>
    </ul>
    <el-pagination class="center"
                   small
                   background
                   @current-change="handleCurrentChange"
                   :current-page="pagination.pageIndex"
                   :page-size="pagination.pageSize"
                   :pager-count="5"
                   layout="prev, pager, next"
                   :total="pagination.total">
    </el-pagination>

  </div>
</template>

<script>
  import api from '@/api/user'

  export default {
    data() {
      return {
        headData:{
          title:'公告',
          leftIcon:'arrowr'
        },
        currentIdx: -1,
        //分页数据
        pagination: {
          records: [],
          pageIndex: 1,
          total: 0,
          pageSize: 5
        }
      }
    },
    computed: {},
    created() {
      this._getNotice()
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      toggleSlider(idx) {
        if(this.currentIdx === idx){
          this.currentIdx = -1
          return
        }
        this.currentIdx = idx
      },
      handleCurrentChange(val) {
        this.pagination.pageIndex = val
        this._getNotice()
      },
      _getNotice() {
        api.getNotice({
          pageIndex: this.pagination.pageIndex,
          pageSize: this.pagination.pageSize,
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.pagination = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .notice
    mobile-wrapper()

  .news-list
    m-wrapper()
    background $color-light
    margin-bottom 10px
    li
      &:last-child
        border-bottom 0
      &.active
        .icon-arrow
          transform rotate(90deg)
      .tit
        display flex
        justify-content space-between
        border-bottom 1px solid $color-border-gray
        line-height 44px
        .icon-arrow
          transition all .3s ease-in
          display inline-block
      .opacity
        opacity .7
      .sub
        padding 10px
        background $color-dark-gray
        line-height 21px
</style>