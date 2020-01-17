<template>
  <div class="sub-page">
    <div class="form content">
      <div class="mobile-input-group">
        <label>游戏账号</label>
        <input v-model="unlockAccountByInfoData.loginName" type="text">
      </div>

      <div class="mobile-input-group">
        <label>注册姓名</label>
        <input v-model="unlockAccountByInfoData.accountName" type="text">
      </div>

      <div class="mobile-input-group">
        <label>注册手机号</label>
        <input v-model="unlockAccountByInfoData.phone" type="text">
      </div>

      <div class="mobile-input-group">
        <label>注册邮箱</label>
        <input v-model="unlockAccountByInfoData.email" type="text">
      </div>

      <div class="center">
        <mt-button @click="unlockAccountByInfo" size="small" type="danger">去解冻</mt-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {safeCenter} from '@/common/js/mixin'

  export default {
    mixins: [safeCenter],
    data() {
      return {
        list: [
          {
            text: '短信找回',
          },
          {
            text: '邮箱找回',
          },
        ],
        currentIdx: 0
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectTabItem(idx) {
        this.currentIdx = idx
        this.changeCode()
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus">
  .sub-page
    .content
      padding 30px 0
</style>