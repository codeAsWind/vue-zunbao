<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">

      <div class="input-group">
        <span class="label">来源账户</span>
        <div>
          <select @change="_getGameMoney(1)" v-model="transformIn" name="">
            <option v-for="item in transformInAccountList" :value="item.value">{{item.text}}</option>
          </select>
        </div>
        <span class="red">{{transformInBalance}}</span>
      </div>

      <div class="input-group">
        <span class="label">目标账户</span>
        <div>
          <select @change="_getGameMoney(2)" v-model="transformOut" name="">
            <option v-for="item in transformOutAccountList" :value="item.value">{{item.text}}</option>
          </select>
        </div>
        <span class="red">{{transformOutBalance}} 元</span>
      </div>

      <div class="input-group">
        <span class="label">转账金额</span>
        <div>
          <input v-model="amount" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <el-button @click="transformMoney" type="danger">执行转账</el-button>
        </div>
      </div>

      <!--分割线-->
      <div class="input-group split" v-for="item in [1,2]"></div>
      <!--分割线-->

      <div class="input-group">
        <span class="label">好友账户</span>
        <div>
          <input v-model="friendAccount" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label">转账金额</span>
        <div>
          <input v-model="friendTransformAmount" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <el-button @click="transferInforRedRaintoUser" type="danger">转给好友</el-button>
        </div>
      </div>

      <div class="tips">
        <h3>
          温馨提示：
        </h3>
        <p>
          1、红包账户可转入游戏平台，达到流水即可提款。

          <br>2、转给好友需输入完整帐号，若因自身原因转错产生的一切纠纷，恕无法处理。
        </p>
      </div>


    </div>
  </div>
</template>

<script src="./redPacket-transform.js"></script>

<style lang="stylus" scoped>

</style>