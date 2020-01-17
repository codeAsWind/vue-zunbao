<template>
  <div class="sub-page">
    <div class="tab-card-wrapper">
      <tab-card :list="list" :currentIdx="currentIdx" @selectTabItem="selectTabItem"></tab-card>
    </div>
    <div class="form">

      <div v-if="currentIdx === 0">
        <div class="mobile-input-group">
          <label>注册手机号</label>
          <input v-model="getForgetAccbySmsData.phone" type="text">
        </div>
        <div class="mobile-input-group">
          <label>验证码</label>
          <div class="code">
            <input v-model="getForgetAccbySmsData.code" type="text">
            <img @click="changeCode" :src="validateCodeForIndex" alt="">
          </div>
        </div>
        <div class="center">
          <mt-button @click="getForgetAccbySms" size="small" type="danger">找回账号</mt-button>
        </div>
      </div>

      <div v-if="currentIdx === 1">
        <div class="mobile-input-group">
          <label>注册邮箱</label>
          <input v-model="getForgetAccbyEmailData.email" type="text">
        </div>

        <div class="mobile-input-group">
          <label>验证码</label>
          <div class="code">
            <input v-model="getForgetAccbyEmailData.code" type="text">
            <img @click="changeCode" :src="validateCodeForIndex" alt="">
          </div>
        </div>

        <div class="center">
          <mt-button @click="getForgetAccbyEmail" size="small" type="danger">找回账号</mt-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TabCard from 'MComponents/tab-card/tab-card'
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
    components: {TabCard}

  }
</script>

<style lang="stylus">
  .tab-card-wrapper
    padding 30px 0
</style>