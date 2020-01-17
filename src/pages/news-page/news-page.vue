<template>
  <div class="news-page">
    <div class="wrapper news-page-wrapper">
      <v-wrapper>
        <div slot="tab-wrapper">
          <tab-menu @selectItem="selectItem" :menuList="menuList" :currentIdx="currentIdx"></tab-menu>
        </div>
        <div slot="right-wrapper">
          <div v-if="currentIdx===0">
            <tab-title @selectItem="selectTabTitleItem" :tab-title-list="tabTitleList"
                       :currentIdx="currentTabTitleIdx"></tab-title>
            <div class="border-content">

              <div class="item-list">
                <div class="item" v-for="item in pagination.records">
                  <div class="tit">
                    <span class="title">{{item.title}}</span>
                    <span class="time">{{item.time}}</span>
                  </div>
                  <div class="wr">
                    {{item.content}}
                  </div>
                </div>
              </div>

              <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pagination.pageIndex"
                  :page-sizes="pageSizeList"
                  layout="total ,sizes, prev, pager, next, jumper"
                  :total="pagination.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </v-wrapper>
    </div>
  </div>
</template>

<script>
  import VWrapper from '@/components/wrapper/wrapper'
  import TabMenu from '@/components/tab-menu/tab-menu'
  import TabTitle from '@/components/tab-title/tab-title'
  import api from '@/api/user'

  export default {
    data() {
      return {
        //tab数据
        menuList: [
          {
            text: '新闻动态',
            icon: 'gengduomore12'
          }
        ],
        currentIdx: 0,
        currentTabTitleIdx: 0,
        tabTitleList: [
          {
            text: '新闻动态'
          }
        ],
        //分页数据
        pageSizeList: [10, 15, 20, 30],
        pagination: {
          records: [],
          pageIndex: 1,
          total: 0,
          pageSize: 10
        }
      }
    },
    computed: {},
    created() {
      this._getNotice()
    },
    methods: {
      handleSizeChange(val) {
        this.pagination.pageSize = val
        this._getNotice()
      },
      handleCurrentChange(val) {
        this.pagination.pageIndex = val
        this._getNotice()
      },
      selectItem(idx) {
        this.currentIdx = idx
      },
      selectTabTitleItem(idx) {
        this.currentTabTitleIdx = idx
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
    components: {
      VWrapper,
      TabMenu,
      TabTitle
    }

  }
</script>

<style lang="stylus" src="./news-page.styl" scoped></style>