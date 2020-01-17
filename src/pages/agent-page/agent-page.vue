<template>
  <div class="agent">
    <!--banner-->
    <el-carousel :interval="3000" height="480px">
      <el-carousel-item :label="item.title" :style="_bannerImage(item.src)" v-for="item in slides" :key="item.title">
        <div class="caption">
          <h1>{{item.title}}</h1>
          <h3>{{item.text.describe}}</h3>
          <el-button @click="joinUs" type="primary">加入尊宝</el-button>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!--主体布局-->
    <div class="wrapper agent-page-wrapper">
      <v-wrapper>
        <div slot="tab-wrapper">
          <tab-menu @selectItem="selectItem" :menuList="menuList" :currentIdx="currentIdx"></tab-menu>
        </div>
        <div slot="right-wrapper" class="tab-content compose">
          <!--关于我们-->
          <div v-show="currentIdx === 0">
            <tab-title @selectItem="selectTabTitleItem" :tab-title-list="tabTitleList.aboutUs"
                       :currentIdx="currentTabTitleIdx"></tab-title>
            <div class="border-content agent-content">
              <h3>品牌介绍</h3>
              <p>
                尊宝国际创建2015年，隶属于总公司LUCKY STAR ENTERTAINMENT LIMITED， 总公司注册创立于2005年，
                2009年获得Firstcagayan正规博彩牌照NO.020-A，公司历经10年之久，全球领先秒提技术迅速占领亚洲市场份额，凭其雄厚的实力及业界优质关系网，致力打造亚洲最佳在线娱乐平台。
                尊宝国际拥有目前最火热的老虎机游戏PT、MG/TTG、NT等知名平台的新线路，保证了线路的稳定性。
              </p>
              <h3>公司文化</h3>
              <p>
                尊宝国际城秉承以小赌怡情、以小博大的宗旨，科技立身为宗旨，为业界研发打造10秒到账「秒提」「秒存」技术，致力为博弈界打造提款最迅速的游戏平台。
              </p>
              <p>
              </p>
              <h3>品牌优势</h3>
              <p>
                1、提款：20万以下提款10秒到账，全球首发。<br>
                2、服务：7x24小时在线服务，提供优质服务。<br>
                3、 安全：采用128位ssl高标准加密技术。<br>
                4、 佣金结算：采用全球最优质的结算方式日结佣金。<br>
                5、产品丰富：PT、DT、MG、PNG、TTG、NT、QT、AG、沙巴体育、N2。<br>
                6、强大的品牌优势：多年业界运营实践经验，咨询丰富。<br>
                7、平台自动化：自助优惠，自助洗码，独立研发。
              </p>
              <h3>我们承诺</h3>
              <p>
                免费：加入尊宝国际，不需要您有任何的费用承担。<br>

                稳定：只要有固定的网络客户资源或者现实客户资源，都可以稳定的收入。<br>

                日结：无需再等待周期，只要大于100就可以随时提款。
              </p>

            </div>
          </div>
          <!--代理政策-->
          <div v-show="currentIdx === 1">
            <tab-title @selectItem="selectTabTitleItem" :tab-title-list="tabTitleList.scheme"
                       :currentIdx="currentTabTitleIdx"></tab-title>
            <div class="border-content">
              <h3>加入尊宝的优势</h3>
              <p>
                超强实力--- 尊宝做为博彩界最有实力财团公司旗下的品牌，立志打造最有影响力的品牌。<br>

                超高技术--- 全自动化优惠，全自动化秒提，7X24小时在线客服，超强的用户体验，不会流失您的客户。<br>

                最先进的日结模式---尊宝采用全球最先进的日结模式，规避风险，保证您的资金无忧。<br>

                超高的佣金----尊宝代理佣金最高可达50%，让您轻松做老板。
              </p>
              <h3>操作流程</h3>
              <p>
                1.首先您需要注册我们的合作代理，务必填写真实，否则审核不通过。<br>

                2.注册完毕我们将在24小时内与您取得联系并核实信息。<br>

                3.在代理中心找到您的推广链接，发展下线玩家。<br>

                4.佣金每日18:00会发放您的代理账号，请注意查收(周日除外)。
              </p>

              <h3>佣金结算</h3>
              <p>
                每日我们会根据您的下线净盈利来自动计算您的佣金，系统最低计算为30% 若一个月后您达到40%的标准，我们将在下个月6号给您补发剩余的10%佣金给您。
              </p>
              <div class="table">
                <table class="agent-table">
                  <thead>
                  <tr>
                    <td>等级</td>
                    <td>活跃玩家</td>
                    <td>当月净利润（RMB）</td>
                    <td>佣金比例</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>≥3</td>
                    <td>0-250000</td>
                    <td>30%</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>≥10</td>
                    <td>250001-600000</td>
                    <td>35%</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>≥30</td>
                    <td>600001-1200000</td>
                    <td>40%</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>≥50</td>
                    <td>1200001-2000000</td>
                    <td>45%</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>≥90</td>
                    <td>2000000</td>
                    <td>50%</td>
                  </tr>
                  <tr>
                    <td>结算方式</td>
                    <td colspan="3">佣金计算</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td>日结佣金</td>
                    <td colspan="3" style="text-align: left">
                      老虎机佣金（PT/DT/MG/PNG/TTG/NT/QT/AG老虎机/AGIN捕鱼平台输赢*85％-返水-优惠）*佣金比例 <br>
                      其他平台佣金:(AG/SB/N2等其他平台输赢X90%-返水-优惠）*佣金比例
                    </td>
                  </tr>
                  </tfoot>
                </table>
              </div>
              <h3>佣金日结标准</h3>
              提款要求：代理账户老虎机平台佣金额度≥100元即可提款。<br>

              备注: 1-5号此时间段佣金不更新，于6号统一执行！<br>

              <span class="red">注：享受日结的代理如果连续两个月没有新增一位活跃会员，将在第三个月的时候取消其日结模式，如果在第三个月有开发会员，在次月开启日结。</span><br>


              其他类：AG真人/Ebet真人/沙巴体育 <br>

              其他类计算公式：(平台输赢x90%-优惠-反水）= 纯利润， 纯利润x佣金比例=佣金。 <br>

              老代理：历史佣金累计15万以上，且连续6个月有佣金记录，可升级为VIP代理，享有佣金日结。<br>

              新代理：累计佣金30万以上，每月满足活跃会员要求，才能晋级VIP代理，享有日结佣金。<br>

              提款要求：每月月初1-5号为提款时间，请在这个时间段内申请其它平台的佣金额度，如果规定时间内未提款，佣金将累计至下月。<br>

              <span class="red">注：最终综合评定方可晋级，佣金负值累计。若合作伙伴自己的游戏账号注册 到自己代理下线，取消代理资格，佣金不予发放。</span><br>


              玩家输赢里面包含了平台给玩家的所有优惠红利 以及公司向平台方支付的平台费用，尊宝国际合作伙伴需共同承担相应比例的费用包括：<br>

              （1）优惠——尊宝国际给予玩家的现金红利都计算在输赢里面。<br>

              （2）反水——尊宝国际每日会给玩家相应的反水，反水计算在玩家输赢里面。<br>

              （3）平台费用——尊宝国际需提款游戏平台供应商10%~15%的平台费用。<br>

              合作伙伴必须严格遵守尊宝国际相关条款条例，以免造成不必要的误会。<br>


              <h3>佣金计算标准</h3>
              <p>
                1. 针对其他类佣金发放日为每月1—5号。(结算时间为自然月：上月1号：00:00点至本月1号00:00)。<br>

                2. 当月达到3位有效会员且佣金大于100元。<br>

                3. 有效会员标准，当月存款大于500元，投注额大于1000元。<br>

                4. 若当月未达到发放标准，佣金会累计至某月达到要求后一起发放。<br>

                5. 若当月代理佣金为负值，会累计至下月，等至累计正数且要求达到后佣金发放。<br>

                6. 若合作伙伴自己的游戏账号注册到自己代理下线，取消代理资格，佣金不予发放。
              </p>
              <p class="red">
                再次申明：合作代理本人的游戏账号禁止注册到自己的代理线下。
              </p>
            </div>
          </div>
          <!--立即注册-->
          <div v-show="currentIdx === 2">
            <tab-title @selectItem="selectTabTitleItem" :tab-title-list="tabTitleList.register"
                       :currentIdx="currentTabTitleIdx"></tab-title>
            <div class="border-content register-content">
              <div class="header">
                <h2>申请加盟</h2>
                <p>
                  <span>温馨提示：</span>（请详细填写以下表格，带 * 项目为必填项目）
                </p>
              </div>

              <div class="form account-info">
                <div class="input-group">
                  <label class="label" for="loginname">
                    <span>*</span>用户名
                  </label>
                  <div>
                    <input v-model="registerData.loginName" id="loginname" type="text">
                  </div>
                  <span>账号以a_ 开头（a后面是下划线_），由3-15个数字或英文字母组成</span>
                </div>
                <div class="input-group">
                  <label class="label" for="password">
                    <span>*</span>密码
                  </label>
                  <div>
                    <input v-model="registerData.password" id="password" type="password">
                  </div>
                  <span>密码长度为6-16个字符,以及必须含有字母和数字的组合</span>
                </div>
                <div class="input-group">
                  <label class="label" for="rePwd">
                    <span>*</span>确认密码
                  </label>
                  <div>
                    <input v-model="registerData.rePwd" id="rePwd" type="password">
                  </div>
                  <span>请重复您的密码</span>
                </div>

                <div class="input-group">
                  <label class="label" for="accountName">
                    <span>*</span>真实姓名
                  </label>
                  <div>
                    <input type="text" v-model="registerData.accountName" id="accountName">

                  </div>
                  <span>必须与你的银行账户名称相同，否则不能出款</span>
                </div>

                <div class="input-group">
                  <label class="label" for="phone">
                    <span>*</span>手机号
                  </label>
                  <div>
                    <input type="text" v-model="registerData.phone" id="phone">
                  </div>
                  <span>请确保电话真实畅通，以便电话核实为您开通</span>
                </div>

                <div class="input-group">
                  <label class="label" for="qq">
                    <span>*</span>QQ/Skype
                  </label>
                  <div>
                    <input type="text" v-model="registerData.qq" id="qq">
                  </div>
                  <span>玩家注册时必须填写QQ或skype账户</span>
                </div>

                <div class="input-group">
                  <label class="label" for="email">
                    <span>*</span>邮箱
                  </label>
                  <div>
                    <input type="text" v-model="registerData.email" id="email">
                  </div>
                  <span>请输入您的邮箱，建议@google.com</span>
                </div>

                <div class="input-group">
                  <label class="label" for="microchannel">
                    微信
                  </label>
                  <div>
                    <input type="text" v-model="registerData.microchannel" id="microchannel">
                  </div>
                  <span>请输入微信号</span>
                </div>


                <div class="input-group">
                  <label class="label" for="partner">
                    代理审核码
                  </label>
                  <div>
                    <input type="text" v-model="registerData.partner" id="partner">
                  </div>
                  <span>没有审核码可以不用填写</span>
                </div>

                <div class="input-group">
                  <label class="label" for="validateCode">
                    <span>*</span>验证码
                  </label>
                  <div>
                    <input type="text" v-model="registerData.validateCode" id="validateCode">
                  </div>
                  <span>
                    <img @click="changeCode" :src="validateCodeForIndex" alt="" height="30">
                  </span>
                </div>

                <!--<div class="input-group">-->
                <!--<label for="sms"></label>-->
                <!--<div>-->
                <!--<input type="checkbox" v-model="registerData.sms" id="sms">-->
                <!--<label for="sms">我要接收会员通讯及最新优惠计划.</label>-->
                <!--</div>-->
                <!--</div>-->

                <div class="input-group ">
                  <label class="label" for="agree"></label>
                  <div class="agree-special">
                    <input type="checkbox" v-model="registerData.agree" id="agree">
                    <p><label for="agree">本人已经超过合法年龄以及本人在此网站的所有活动并没有抵触本人 所身在的国家所管辖的法律，并同时接受《尊宝娱乐城合作协议》</label></p>
                  </div>
                </div>

                <div class="input-group ">
                  <label class="label"></label>
                  <div>
                    <el-button @click="registerSubmit" type="primary">立即注册</el-button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!--联系我们-->
          <div v-show="currentIdx === 3">
            <tab-title @selectItem="selectTabTitleItem" :tab-title-list="tabTitleList.contact"
                       :currentIdx="currentTabTitleIdx"></tab-title>
            <div class="border-content contact-content">
              <h3>联系我们</h3>
              <div class="contact">
                <p>
                  <span>QQ：</span>
                  <span class="qq" v-for="item in config.qq">{{item}}</span>
                </p>
                <p>
                  <span>skype：</span>
                  <span>{{config.Skype}}</span>
                </p>
                <p>
                  <span>邮箱：</span>
                  <span>{{config.agentEmail}}</span>
                </p>
              </div>


              <h3>常见问题</h3>
              <p class="question" v-for="(item,idx) in question">
                <span>{{(idx+1) + '、' +item.q}}</span><br>
                <span>
                  A：{{item.a}}
                </span>
              </p>
            </div>
          </div>
        </div>
      </v-wrapper>
    </div>

  </div>
</template>

<script src="./agent-page.js"></script>

<style lang="stylus" src="./agent-page.styl">

</style>