<template>
  <div>
    <div class="banner"></div>
    <div class="wrapper safe-center-wrapper">
      <div class="tab">
        <a :class="{active:currentIdx===idx}" @click="select(idx)" v-for="(item,idx) in tabs" href="javascript:;">{{item.text}}</a>
      </div>
      <div class="tab-content">
        <div v-if="currentIdx===0">
          <div class="item" v-for="item in forgetPwd">
            <div class="sub">
              <i class="iconfont icon-user"></i>
              <div>
                <h4>{{item.title}}</h4>
                <p>{{item.text}}</p>
              </div>
            </div>
            <el-button type="primary" @click="getBackFunc(item.attr)">立即找回</el-button>
          </div>
        </div>
        <div v-if="currentIdx==1">
          <div class="item" v-for="item in forgetUserName">
            <div class="sub">
              <i class="iconfont icon-user"></i>
              <div>
                <h4>{{item.title}}</h4>
                <p>{{item.text}}</p>
              </div>
            </div>
            <el-button type="primary" @click="getBackFunc(item.attr)">立即找回</el-button>
          </div>
        </div>
        <!--自助解冻账号-->
        <div v-if="currentIdx===2">
          <div class="input-group">
            <label for=""></label>
            <div class="tit">
              <h3><span>确认帐号信息，解除冻结</span></h3>
              <p class="color-intersperse">解除冻结后，可正常登录，管理资金进入和帐号信息</p>
            </div>
          </div>
          <div class="input-group">
            <label for="unfreezeUsername">游戏账号：</label>
            <input v-model="unlockAccountByInfoData.loginName" id="unfreezeUsername" type="text">
          </div>
          <div class="input-group">
            <label for="registerName">注册姓名：</label>
            <input v-model="unlockAccountByInfoData.accountName" id="registerName" type="text">
          </div>
          <div class="input-group">
            <label for="registerPhone">注册手机号：</label>
            <input v-model="unlockAccountByInfoData.phone" id="registerPhone" type="text">
          </div>
          <div class="input-group">
            <label for="registerEmail">注册邮箱：</label>
            <input v-model="unlockAccountByInfoData.email" id="registerEmail" type="text">
          </div>
          <div class="input-group">
            <label></label>
            <div>
              <el-button type="primary" @click="unlockAccountByInfo">去解冻</el-button>
              <p><a class="link" :href="config.serviceLink" target="_blank">记不清了？请联系在线客服</a></p>
            </div>
          </div>


        </div>
        <div v-if="currentIdx===3">
          <div class="input-group">
            <label></label>
            <div class="tit">
              <h3><span>请确认输入已绑定过的卡号</span></h3>
            </div>
          </div>

          <div class="input-group">
            <label for="unBandBank">解绑银行卡号：</label>
            <input v-model="unBindBankinfoData.bankno" id="unBandBank" type="text">
          </div>
          <div class="input-group">
            <label></label>
            <div>
              <el-button type="primary" @click="unBindBankinfo">去解绑</el-button>
              <p><a class="link" :href="config.serviceLink" target="_blank">记不清了？请联系在线客服</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--短信找回密码弹框-->
    <v-dialog @on-close="closeDialog('isShowGetBackPwdByDxDialog')" :is-show="isShowGetBackPwdByDxDialog">
      <div>
        <div class="dialog-header">
          <h3>短信找回登录密码</h3>
        </div>
        <div class="dialog-body">

          <div class="input-group">
            <label for="name">游戏账号：</label>
            <input v-model="getbackPwdByDxData.name" id="name" type="text">
          </div>

          <div class="input-group">
            <label for="phone">注册手机号：</label>
            <input v-model="getbackPwdByDxData.phone" id="phone" type="number">
          </div>

          <div class="input-group">
            <label></label>
            <el-button type="primary" @click="getbackPwdByDx">确定</el-button>
            <p></p>
          </div>

        </div>
      </div>
    </v-dialog>
    <!--邮箱找回密码弹框-->
    <v-dialog @on-close="closeDialog('isShowGetBackPwdByEmailDialog')" :is-show="isShowGetBackPwdByEmailDialog">
      <div class="dialog-header">
        <h3>邮箱找回登录密码</h3>
      </div>
      <div class="dialog-body">
        <div class="input-group">
          <label for="name">游戏账号：</label>
          <input v-model="getbackPwdByEmailData.name" id="username" type="text">
        </div>

        <div class="input-group">
          <label for="phone">注册邮箱：</label>
          <input v-model="getbackPwdByEmailData.email" id="email" type="text">
        </div>

        <div class="input-group">
          <label for="code">验证码：</label>
          <input v-model="getbackPwdByEmailData.code" id="code" type="text">
          <img class="codeImage" @click="changeCode" :src="validateCodeForIndex" alt="">
        </div>

        <div class="input-group">
          <label></label>
          <el-button type="primary" @click="getbackPwdByEmail">确定</el-button>
          <p></p>
        </div>

      </div>
    </v-dialog>

    <!--短信找回账号弹框-->
    <v-dialog @on-close="closeDialog('isShowGetForgetAccbySmsDialog')" :is-show="isShowGetForgetAccbySmsDialog">
      <div>
        <div class="dialog-header">
          <h3>短信找回登录帐号</h3>
        </div>
        <div class="dialog-body">

          <div class="input-group">
            <label for="">注册手机号：</label>
            <input v-model="getForgetAccbySmsData.phone" id="" type="text">
          </div>

          <div class="input-group">
            <label for="usernameCode">验证码：</label>
            <input v-model="getForgetAccbySmsData.code" id="usernameCode" type="text">
            <img class="codeImage" @click="changeCode" :src="validateCodeForIndex" alt="">
          </div>

          <div class="input-group">
            <label></label>
            <el-button type="primary" @click="getForgetAccbySms">确定</el-button>
            <p></p>
          </div>

        </div>
      </div>
    </v-dialog>
    <!--邮箱找回账号弹框-->
    <v-dialog @on-close="closeDialog('isShowGetForgetAccbyEmailDialog')" :is-show="isShowGetForgetAccbyEmailDialog">
      <div class="dialog-header">
        <h3>邮箱找回登录账号</h3>
      </div>
      <div class="dialog-body">

        <div class="input-group">
          <label>注册邮箱：</label>
          <input v-model="getForgetAccbyEmailData.email" type="text">
        </div>

        <div class="input-group">
          <label for="usernameEmailCode">验证码：</label>
          <input v-model="getForgetAccbyEmailData.code" id="usernameEmailCode" type="text">
          <img class="codeImage" @click="changeCode" :src="validateCodeForIndex" alt="">
        </div>

        <div class="input-group">
          <label></label>
          <el-button type="primary" @click="getForgetAccbyEmail">确定</el-button>
          <p></p>
        </div>

      </div>
    </v-dialog>

  </div>
</template>

<script src="./safe-center.js"></script>

<style lang="stylus" src="./safe-center.styl" scoped></style>
<style lang="stylus">
  .dialog-wrap
    .input-group
      padding-left 0
</style>