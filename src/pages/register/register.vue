<template>
  <div class="register wrapper">

    <div class="header">
      <h2>注册尊宝国际账户</h2>
      <p>注册尊宝国际账户，您将会领略到前所未有的博彩体验。</p>
      <p>
        <span>温馨提示：</span>（请详细填写以下表格，带 * 项目为必填项目）
      </p>
    </div>

    <!--账户资料-->
    <div class="form account-info">
      <h3>账户资料</h3>
      <div class="input-group">
        <label class="label" for="loginname">
          <span>*</span>会员账号
        </label>
        <input v-model="registerData.loginName" id="loginname" type="text">
        <span>请输入6-11个字符, 仅可输入英文字母以及数字的组合</span>
      </div>
      <div class="input-group">
        <label class="label" for="password">
          <span>*</span>密码
        </label>
        <input  v-model="registerData.password" id="password" type="password">
        <span>密码长度为6-16个字符,以及必须含有字母和数字的组合</span>
      </div>
      <div class="input-group">
        <label class="label" for="rePwd">
          <span>*</span>确认密码
        </label>
        <input  v-model="registerData.rePwd" id="rePwd" type="password">
        <span>请重复您的密码</span>
      </div>
    </div>

    <!--个人资料-->
    <div class="form">
      <h3>个人资料</h3>
      <div class="input-group">
        <label class="label" for="email">
          <span>*</span>邮箱地址
        </label>
        <input v-model="registerData.email" id="email" type="text">
        <span class="danger">用于找回密码，请务必输入真实有效的邮箱地址</span>
      </div>
      <div class="input-group">
        <label class="label" for="phone">
          <span>*</span>手机号码
        </label>
        <input v-model="registerData.phone" maxlength="11" id="phone" type="text">
        <span>请务必填写有效的中国大陆手机号码，以方便您找回密码</span>
      </div>

      <div class="input-group">
        <label class="label" for="qq">
          <span>*</span>QQ号码
        </label>
        <input v-model="registerData.qq" maxlength="11" id="qq" type="text">
      </div>

      <div class="input-group">
        <label class="label" for="validateCode">
          <span>*</span>验证码
        </label>
        <input v-model="registerData.validateCode" maxlength="11" id="validateCode" type="text">
        <img :src="validateCodeForIndex" @click="changeCode" height="30" alt="">
      </div>

      <div class="input-group">
        <label class="label"></label>
        <div class="checkbox" style="margin:0">
          <input v-model="agree" type="checkbox" style="margin:8px 5px 0 15px">
          <p>
            同意接收最新优惠并愿意遵守尊宝国际 《用户协议》和 《隐私条款》请使用真实信息注册<br>
            如果注册信息不正确导致您无法提款等后果尊宝国际概不负责！感谢您理解！
          </p>
        </div>
      </div>
      <div class="input-group">
        <label class="label"></label>
        <div>
          <el-button @click="submitRegister" type="primary">立刻注册</el-button>
        </div>
      </div>

    </div>

    <img class="app-adv" src="./img/register-app-download.jpg" alt="">

  </div>
</template>
<script src="./register.js"></script>
<style lang="stylus" scoped src="./register.styl"></style>