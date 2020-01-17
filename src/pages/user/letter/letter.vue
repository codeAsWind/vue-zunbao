<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <div v-if="currentIdx===0">
        <div class="item-list" v-if="pagination.pageContents.length">
          <div @click="readMsg(item)" class="item" v-for="item in pagination.pageContents">
            <p>
              <span class="title">{{item.title}}</span>
              <span v-if="!item.read" class="red">(未读)</span>
              <span v-if="item.read" class="already">(已读)</span>
            </p>
            <p><span>{{item.createDate}}</span></p>
          </div>
        </div>
        <no-result v-if="!pagination.pageContents.length"></no-result>

        <!--分页-->
        <el-pagination class="my-pagination"
                       background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pagination.pageIndex"
                       :page-sizes="[10,15,20]"
                       :page-size="pagination.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pagination.totalRecords">
        </el-pagination>
      </div>

      <div v-if="currentIdx===1">

        <div class="input-group">
          <span class="label">标题</span>
          <div>
            <input v-model="sendData.title" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">内容</span>
          <div>
            <textarea v-model="sendData.content"></textarea>
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="saveBookDate" type="danger">发送</el-button>
          </div>
        </div>

      </div>
    </div>

    <!--信件详情-->
    <v-dialog @on-close="closeDialog('isShowLetterDialog')" :isShow="isShowLetterDialog">
      <div class="letter-dialog">
        <div class="dialog-header">
          <h3>{{letterDetail.title}}</h3>
        </div>
        <div class="dialog-body">
          <p class="timer">时间：{{letterDetail.createDate}}</p>
          <p>
            {{letterDetail.content}}
          </p>
        </div>
      </div>

    </v-dialog>
  </div>
</template>

<script>
  import api from '@/api/user'
  import tabTitle from '@/components/tab-title/tab-title'
  import VDialog from '@/components/dialog/dialog'
  import NoResult from '@/components/no-result/no-result'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '收箱件'
          },
          {
            text: '发件箱'
          },
        ],
        currentIdx: 0,
        pagination: {
          pageIndex: 1,
          size: 10,
          totalRecords: 0,
          pageContents: []
        },
        isShowLetterDialog: false,
        letterDetail: {},
        sendData: {
          title: '',
          content: ''
        }
      }
    },
    computed: {},
    created() {
      this._getMessageByUser()
    },
    methods: {
      closeDialog(attr) {
        this[attr] = false
      },
      selectItem(idx) {
        this.currentIdx = idx
      },
      handleSizeChange(size) {
        this.pagination.size = size
        console.log(size)
        this._getMessageByUser()
      },
      handleCurrentChange(pageIndex) {
        this.pagination.pageIndex = pageIndex
        this._getMessageByUser()
      },
      //发信件
      saveBookDate() {
        let {title, content} = this.sendData
        if (!title) {
          this.$message({
            type: 'warning',
            message: '请填写标题'
          })
          return
        }
        if (!content) {
          this.$message({
            type: 'warning',
            message: '请填写内容'
          })
          return
        }
        api.saveBookDate(this.sendData).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
            this.pagination.pageIndex = 1
            this.pagination.size = 10
            this._getMessageByUser()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //信件详情
      readMsg(item) {
        api.readMsg({
          msgID: item.id
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.letterDetail = res.data
            item.read = true
            this.isShowLetterDialog = true
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //获取站内信信件
      _getMessageByUser() {
        api.getMessageByUser({
          pageIndex: this.pagination.pageIndex,
          size: this.pagination.size
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.pagination.pageContents = res.data.pageContents
            this.pagination.totalRecords = res.data.totalRecords
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
    components: {tabTitle, VDialog, NoResult}

  }
</script>

<style lang="stylus" scoped>
  .item-list
    line-height 40px
    .item
      display flex
      justify-content space-between
      border-bottom 1px solid #ddd
      cursor pointer
      transition .3s all ease-in
      padding 0 15px
      &:hover
        background #eee
      .title
        margin-right 6px
      .already
        opacity .7

  .letter-dialog
    line-height 30px
    .timer
      opacity .7

</style>