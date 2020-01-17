<template>
  <div>
    <!--===========支付选项页面==========-->
    <div class="pay-options-page">
      <!--久安定制-->
      <juan-uet :mode="2" v-if="obj.payWayType === config.PAYWAY.jiuAnDZ"></juan-uet>

      <!--支付通道-->
      <div class="input-group">
        <span class="label">支付通道</span>
        <div>
          <pay-way-tab
              @selectPayWay="payWaySelect"
              :list="obj.payWayList"
              :currentIdx="obj.payWayCurrentIdx">
          </pay-way-tab>
        </div>
      </div>
      <div class="input-group">
        <span class="label"></span>
        <div>
          若选择的通道无法存款，请点选其他支付通道
        </div>
      </div>

      <!--存款姓名-->
      <div v-if="!obj.isThirdPartyPay" class="input-group">
        <span class="label">存款姓名</span>
        <div>
          <input v-model="obj.depositName" placeholder="请输入转账的真实姓名" type="text">
        </div>
      </div>
      <!--存款金额-->
      <div class="input-group">
        <span class="label">存款金额</span>
        <div :class="{limitWidth:obj.payWayType === config.PAYWAY.jiuAnDZ}">
          <account-select-tab
              @selectAmount="amountSelect"
              @amountChang="amountChange"
              :range="obj.range"
              :depositMoney="obj.depositMoney"
              :currentIdx="obj.accountCurrentIdx"
              :list="commonAccountList">
          </account-select-tab>
        </div>
      </div>
      <!--实际到账-->
      <div class="input-group">
        <span class="label">实际到账</span>
        <div>
          <span class="red">{{ _calcActualAmount(obj.discount,obj.depositMoney) || 0}} 元</span>
        </div>
      </div>
      <!--支付银行-->
      <div v-if="obj.payBankList" class="input-group">
        <span class="label">支付银行</span>
        <div>
          <pay-way-tab
              @selectPayWay="payBankSelect"
              :list="obj.payBankList"
              :currentIdx="obj.payBankCurrentIdx">
          </pay-way-tab>
        </div>
      </div>

      <!--账户余额-->
      <div class="input-group">
        <span class="label"></span>
        <div class="actual-account">
          <p class="red">
            当前账户余额 {{userInfo.credit}} 元
          </p>
          <p class="red">
            充值后账户余额 {{(userInfo.credit+_calcActualAmount(obj.discount,obj.depositMoney)).toString().$toFixed(2)}} 元，您将获得
            {{obj.depositMoney}} 积分
          </p>
        </div>
      </div>
      <!--支付按钮-->
      <div class="input-group">
        <span class="label"></span>
        <div class="actual-account">
          <el-button v-if="obj.isThirdPartyPay" type="danger" @click="commonDeposit(obj.currentPayWay)">立即充值</el-button>
          <el-button v-if="!obj.isThirdPartyPay" type="danger" @click="secondsDeposit(obj.currentPayWay,{})">
            立即充值
          </el-button>
        </div>
      </div>

      <!--温馨提示-->
      <div v-if="obj.tooltip" class="tips">
        <h3>{{obj.tooltip.title}}</h3>
        <div v-for="(item,idx) in obj.tooltip.items">
          <p>
            {{(idx+1)}}、<span v-html="item.text"></span>
          </p>
          <p v-if="item.sub" v-for="(itemSub,index) in item.sub">
            ({{(index+1)}}) <span v-html="itemSub.text"></span>
          </p>
        </div>
      </div>

      <!--指定支付页面添加指定内容-->
      <!--久安定制二维码-->
      <div class="jadz-code-wrapper" v-if="obj.payWayType === config.PAYWAY.jiuAnDZ">
        <juan-qrcode></juan-qrcode>
      </div>

    </div>

    <!--===========确认存款信息页面==========-->
    <div v-if="obj.state" class="confirm-deposit">
      <!--带小数点限额提示页面-->
      <div v-if="obj.stateSub" class="confirm-quota-page">
        <div class="red confirm-quota-tit">
          <p>您需要存入金额：</p>
          <p>{{obj.depositInfo.amount}}</p>
          <p>温馨提示：请您存入该金额，否则存款无法到账
            本订单有效时间为2小时</p>
        </div>
        <div class="confirm-checkbox">
          <p>
            <label for="agree">
              <input v-model="obj.agree" id="agree" type="checkbox">
              我已明白需要转账 <span class="red">{{obj.depositInfo.amount}}</span> 元
            </label>
          </p>
          <p>
            <label for="reAgree">
              <input v-model="obj.reAgree" id="reAgree" type="checkbox">
              本人已同意，如未转账 <span class="red">{{obj.depositInfo.amount}}</span> 元，导致系统无法匹配存款，尊宝国际概不负责！
            </label>
          </p>
          <p>
            实际到账金额：<span class="red">{{obj.depositInfo.amount}}</span> 元
          </p>
        </div>
        <div class="center">
          <el-button @click="closeConfirmQuotaPage" type="danger">下一步</el-button>
        </div>
      </div>
      <!--确认存款信息页面-->
      <div class="confirm-deposit-page">
        <h3 class="confirm-title">请确认收款信息，并完成存款</h3>
        <div class="input-group">
          <span class="label">收款银行：</span>
          <div>{{obj.depositInfo.bankname}}</div>
        </div>
        <div class="input-group">
          <span class="label">收款卡号：</span>
          <div>{{obj.depositInfo.accountno}}
            <el-button type="danger"
                       @click="copy"
                       size="small"
                       class="tag-read"
                       :data-clipboard-text="obj.depositInfo.accountno">
              复制
            </el-button>
          </div>
        </div>
        <div class="input-group">
          <span class="label">收款姓名：</span>
          <div>{{obj.depositInfo.username}}</div>
        </div>
        <div class="input-group">
          <span class="label">附言：</span>
          <div>{{obj.depositInfo.depositId}}</div>
        </div>
        <div class="input-group">
          <span class="label">存款金额：</span>
          <div><span class="red">{{obj.depositInfo.amount}}</span>元</div>
        </div>
        <div class="confirm-foot">
          <p>
            仅本次有效，下次存款请重新获取 <br>
            请务必保存存款成功截图，未到账可提供给在线客服
          </p>
          <div>
            <el-button @click="closeConfirmPage()">返回修改</el-button>
            <el-button @click="closeConfirmPage()" type="danger">我已成功转账</el-button>
            <el-button @click="reSecondsDeposit(obj.currentPayWay,true)" type="danger">存款失败，重新获取新的收款账户
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./third-party-payment.js"></script>
<style lang="stylus"></style>