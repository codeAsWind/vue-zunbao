<template>
  <div class="sub-page">
    <div class="form content">

      <div class="mobile-input-group">
        <label>解绑银行卡号</label>
        <input v-model="unBindBankinfoData.bankno" type="text">
      </div>

      <div class="center">
        <mt-button @click="unBindBankinfo" size="small" type="danger">去解绑</mt-button>
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