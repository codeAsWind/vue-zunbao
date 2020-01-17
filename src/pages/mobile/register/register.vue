<template>
  <div class="register">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div v-for="(item,idx) in list" class="mobile-input-group">
        <label>
          <span class="red">*</span>{{item.label}}
        </label>
        <input :placeholder="item.placeholder" v-model="registerData[item.inputData]" type="text">
      </div>

      <div class="mobile-input-group">
        <label>
          <span class="red">*</span>验证码
        </label>
        <div class="code">
          <input placeholder="输入正确的验证码" v-model="registerData.validateCode" type="text">
          <img @click="changeCode" :src="validateCodeForIndex" alt="">
        </div>
      </div>


      <mt-button @click="submitRegister" size="large" type="danger">立即注册</mt-button>

    </div>
  </div>
</template>

<script>
  import {register} from '@/common/js/mixin'

  export default {
    mixins: [register],
    data() {
      return {
        headData: {
          title: '会员注册',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
        list: []
      }
    },
    computed: {},
    created() {
      this.list = [
        {
          label: '账号',
          inputData:'loginName',
          placeholder: '请输入6-11个字母加数字'
        },
        {
          label: '密码',
          inputData: 'password',
          placeholder: '6-16位数字或英文字母'
        },
        {
          label: '确认密码',
          inputData: 'rePwd',
          placeholder: '两次密码请保持一致'
        },
        {
          label: '邮箱',
          inputData:'email',
          placeholder: '找回密码时使用'
        },
        {
          label: '手机号',
          inputData: 'phone',
          placeholder: '两次密码请保持一致'
        },
        {
          label: 'QQ',
          inputData: 'qq',
          placeholder: '6-16位数字或英文字母'
        },
      ]
    },
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/service')
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .register
    mobile-wrapper()
    .content
      m-wrapper()
      margin-top 20px

</style>