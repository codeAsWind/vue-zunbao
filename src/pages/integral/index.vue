<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {loginDialog} from '@/common/js/mixin'
  export default {
    mixins:[loginDialog],
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'isLogin',
      ])
    },
    created() {
      if (!this.isLogin) {
        //打开登录弹框
        this.openLoginDialog()
      }
    },
    methods: {},
    watch: {},

  }
</script>

<style lang="stylus" scoped>

</style>