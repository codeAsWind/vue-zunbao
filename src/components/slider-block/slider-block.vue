<template>
  <div class="accounts">
    <div @click="back" class="back">
      <i class="iconfont icon-user"></i>
    </div>
    <div class="account-list">
      <div ref="accountListWrapper">
        <div class="item" v-for="item in accountList">
          <span class="tit">{{item.text}}</span>
          <div class="mark">
            <p>{{item.text}}</p>
            <p>50元</p>
          </div>
        </div>
      </div>
    </div>
    <div @click="forward" class="forward">
      <i class="iconfont icon-user"></i>
    </div>
  </div>
</template>

<script>
  const minNums = 6 //单行显示6个账户
  const cellWidth = 120 //每次移动距离
  export default {
    data() {
      return {
        accountList: [
          {
            text: 'PT账户',
            value: 'newpt'
          },
          {
            text: 'TTG账户',
            value: 'ttg'
          },
          {
            text: '老虎机账户',
            value: 'slot'
          },
          {
            text: 'AG账户',
            value: 'agin'
          },
          {
            text: '沙巴体育账户',
            value: 'sba'
          },
          {
            text: 'N2账户',
            value: 'n2live'
          },
          {
            text: 'MW账户',
            value: 'mwg'
          },
          {
            text: '761账户',
            value: 'chess'
          },
          {
            text: '开元棋牌',
            value: 'kyqp'
          }, {
            text: 'VR彩票',
            value: 'vr'
          }, {
            text: '捕鱼账户',
            value: 'fish'
          },
          {
            text: '平博体育',
            value: 'pb'
          },
          {
            text: 'BBIN',
            value: 'bbin'
          },


        ]
      }
    },
    computed: {},
    created() {
      this.width = 0
    },
    methods: {
      back() {
        let dom = this.$refs.accountListWrapper
        let maxNums = dom.children.length
        let maxWidth = maxNums - minNums
        this.width -= cellWidth
        if (this.width < 0) {
          this.width = cellWidth * maxWidth
        }
        this._translate(dom, this.width)
      },
      forward() {
        let dom = this.$refs.accountListWrapper
        let maxNums = dom.children.length
        let maxWidth = maxNums - minNums
        this.width += cellWidth
        if (this.width > cellWidth * maxWidth) {
          this.width = 0
        }
        this._translate(dom, this.width)
      },
      _translate(dom, width) {
        dom.style.transform = `translate3d(-${width}px,0,0)`
        dom.style['-webkit-transform'] = `translate3d(-${width}px,0,0)`
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  .accounts
    margin-top 20px
    &>div
      float left
    .back,.forward
      width 40px
      height 60px
      background #ccc
      text-align center
      line-height 60px
      color #fff
      cursor pointer
    .back
      border-radius 10px 0 0 10px
    .forward
      border-radius 0 10px 10px 0
    .account-list
      width 720px
      overflow hidden
      &>div
        width 2000px
        transition all .3s ease-in
      .item
        float left
        width 110px
        height 60px
        text-align center
        background #ccc
        margin 0 5px
        cursor pointer
        position relative
        .tit
          line-height 60px
        &:hover .mark
          display block
        .mark
          display none
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background #ccc
          p
            height 30px
            line-height 30px
            background $color-primary
            color #fff
            &:last-child
              background $-color-light-bg




</style>