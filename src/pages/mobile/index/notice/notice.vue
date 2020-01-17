<template>
  <div class="notice m-wrapper">
    <i class="iconfont icon-gonggao"></i>
    <marquee loop="infinite" scrollamount="3">
      <router-link to="/mobile/notice-page" class="news" v-for="item in newsList">{{item.title}}</router-link>
    </marquee>
  </div>
</template>

<script>
  import api from '@/api/user'

  export default {
    data() {
      return {
        newsList: []
      }
    },
    computed: {},
    created() {
      this._getNotice()
    },
    methods: {
      _getNotice() {
        api.getNotice({
          pageIndex: 1,
          pageSize: 5,
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.newsList = res.data.records
          } else {
            this.$toast(res.message)
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
  .notice
    display flex
    line-height 38px
    background $color-dark-gray
    .news
      margin-right 13px
</style>