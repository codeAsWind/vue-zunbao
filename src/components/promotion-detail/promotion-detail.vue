<template>
  <div>
    <transition name="slide-fade">
      <!--首次存送-->
      <div v-if="item.id==='shoucun' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>针对所有首次进入尊宝游戏的玩家</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <p>活动① 尊宝老虎机开户首存 二选一</p>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>首存申请金额</th>
              <th>优惠比例</th>
              <th>红利上限</th>
              <th>流水倍数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td rowspan="2">10元以上</td>
              <td>100%</td>
              <td>1288</td>
              <td>20倍</td>
            </tr>
            <tr>
              <td>128%</td>
              <td>128元</td>
              <td>25倍</td>
            </tr>
            </tbody>
          </table>
        </div>
        <p>活动② 尊宝AG真人首存</p>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>首存申请金额</th>
              <th>优惠比例</th>
              <th>红利上限</th>
              <th>流水倍数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>300元以上</td>
              <td>20%</td>
              <td>2888</td>
              <td>30倍</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h3>申请方式</h3>
        <p>
          1.会员先登录需要申请的平台进行激活，并且在指定的老虎机平台进行游戏。 <br>

          2.您在成功存款后点击【个人中心】->【自助优惠】->【自助存送】，选择老虎机/真人平台首存优惠即可申请。<br>

          <span class="red">（请注意：如果提前将资金转入到了游戏平台，那么将会认为是自动放弃首存权利）</span>
        </p>

        <h3>活动规则</h3>
        <p>
          1.提款要求：（首存金额+首存红利）的20倍流水。

          <br> <span class="red">2.每位玩家仅限申请一次首存优惠 , 老虎机/真人各一次。</span>

          <br> <span class="red">3.活动①玩家必须在PT平台“经典老虎机”和“电动吃角子老虎”、MG、DT、NT、QT、PNG/SW平台游戏中进行投注。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏，所有Pontoon游戏，各种Craps游戏，赌场战争游戏，娱乐场Hold'em游戏，牌九游戏，老虎机奖金翻倍投注将不计算在内，如投注此类游戏将取消申领资格，扣除所有红利以及盈利。温馨提示：此优惠不能参与PT的《古怪猴子》《黄金之旅》《疯狂之七》以及MG平台的多旋转游戏！</span>

          <br>4.活动②玩家必须在AG真人视讯游戏，不支持捕鱼或者电子类游戏。若发现不正当投注，真人单边投注、倍投、刷流水行为!

          <br>5.以上优惠活动只针对娱乐性质的会员,禁止多帐号套利以及违规投注行为，如有发现同IP多帐号申请此优惠,我们将立即关闭帐号，请严格遵守尊宝条款条例，尊宝国际有权收回红利以及盈利！

          <br>6.本次优惠和返水共享，其他需要流水倍数的红利不能参加首存，若发现取消其红利。

          <br>7.尊宝国际对此活动的拥有最终解释权，可以在不通知的情况下修改或停止以上所有的活动。
        </p>
        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--存款秒送-->
      <div v-if="item.id==='ckms' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>针对所有首次进入尊宝游戏的玩家</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <p>
          公司每月将特邀100名贵宾存款直接成为VIP会员。<br>

          晋级方式分为单笔存款、周累积存款、月累积存款。<br>

          <span class="red">单笔存款就送VIP！让您走上人生高端路，玩游戏享VIP！做人生大赢家！</span><br>

          特邀VIP会员存款符合要求后，可直接派发领取免费筹码、晋级奖金和生日礼金以及享受VIP相应等级特权！
        </p>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>等级</th>
              <th>单笔存款条件</th>
              <th>周存款条件</th>
              <th>月累计存款</th>
              <th>流水倍数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>青铜VIP</td>
              <td>当日单笔存款1万</td>
              <td>持续一自然周每日累积存6000元</td>
              <td>月累计存款8万（平均日存2666）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>白银VIP</td>
              <td>当日单笔存款3万（可分批）</td>
              <td>持续一自然周每日累积存9000元</td>
              <td>月累计存款15万（平均日存5000）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>黄金VIP</td>
              <td>当日单笔存款5万（可分批）</td>
              <td>持续一自然周每日累积存12000元</td>
              <td>月累计存款25万（平均日存8333）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>白金VIP</td>
              <td>当日单笔存款10万（可分批）</td>
              <td>持续一自然周每日累积存20000元</td>
              <td>月累计存款50万（平均日存16666）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>钻石VIP</td>
              <td>当日单笔存款20万（可分批）</td>
              <td>持续一自然周每日累积存50000元</td>
              <td>月累计存款88万（平均日存29629）</td>
              <td>5倍</td>
            </tr>
            <tr>
              <td>王者VIP</td>
              <td>仅限邀请会员</td>
              <td>仅限邀请会员</td>
              <td>仅限邀请会员</td>
              <td>5倍</td>
            </tr>
            </tbody>
          </table>
        </div>


        <h3>活动规则</h3>
        <p>
          1、符合晋级条件的玩家请务必联系在线客服申请或发送邮件至kefu@zb970.com。<br>

          <span class="red">
                      申请格式 <br>

                      会员账号：XXXXXXXXX <br>

                      符合存款要求：XXXX元一天/一自然周/一自然月 <br>

                      申请晋级为：青铜、白银、黄金、铂金、钻石VIP <br>
                    </span>

          2、会员每个月只享有一次晋级的机会， 且各等级晋级礼金每位玩家每月只可以获得一次。

          <br><span class="red">如：玩家A李先生8月是尊宝青铜会员月初已领取了青铜VIP福利，月中已符合黄金VIP要求进行晋级是无法获得8月的黄金VIP福利的。</span>

          <br>3、VIP免费筹码、晋级礼金、生日礼金无需流水可直接提款！

          <br>4、活动投注范围限于尊宝国际网站（包括PC网页版、手机网页版及手机APP版）内的老虎机游戏。

          <br>5、周存款累积按自然周时间为准：（周一0：00:00—周日23:59:59）累积自然月时间为（X月1日0：00:00—此月最后一天23:59:59）

          <br>6、特邀存款VIP与网站常规VIP晋级条件不同，官网VIP待遇福利一致且两者每月免费筹码、生日礼金、晋级礼金只可以申请一次（如本月已申请官网vip晋级礼金，将无法申请特邀存款vip礼金）

          <br>7、尊宝国际享有修订权和最终解释权。
        </p>
        <h3>常见问题</h3>
        <p>
          <span class="red">我是尊宝黄金VIP，我能享用什么福利吗？有什么不同吗？</span>
        </p>
        <p>
          网站分普通会员和VIP会员,，一旦晋级进黄金VIP即可享有高比例次次存送每笔送18%、高额救援金返赠7%，返水比例提高至0.9%，生日礼金388元、免费筹码88元、晋级礼金388元等专属福利！
        </p>

        <p>
          <span class="red">俱乐部资格是否能够与其他玩家共享或转让？</span>
        </p>
        <p>
          俱乐部会员资格以及相应的优惠无法转让给他人。无论是个人或团体，如有任何威胁滥用尊宝娱乐优惠的行为，经相关部门查实，尊宝娱乐将保留和行使取消、扣除优惠及相关盈利等权利。
        </p>

        <p>
          <span class="red">如何获取晋级礼金？</span>
        </p>
        <p>
          俱乐部系统将在每月5号更新派发所有会员VIP等级。存款会员晋级后可直接联系在线客服领取晋级礼金，晋级礼金、生日礼金、免费筹码无需流水即可提款。每个级别的晋级礼金每月只能领取一次。
        </p>


        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--秒存返增-->
      <div v-if="item.id==='fanzeng' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>全体会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <p>
          次次使用秒存，赠送金额立即到帐，无需申请，使用手机网银，支付宝转账，网银转账即可获得1%返赠。
        </p>

        <h3>活动优势</h3>
        <p>
          1.无需手续费，还加送您1%额度，不限次数。<br>

          2.大额存款无忧，网银转账单笔轻松存入5W。
        </p>

        <h3>活动规则</h3>
        <p>
          1.本优惠无需找客服申请，系统自动添加，只限秒存加送1%，

          <br>2.秒存转账单日最高可享受500元的专享优惠。

          <br>3.优惠活动只针对娱乐性质会员，如有发现用户多个帐号，包含，同IP，同邮箱，同住址，同银行卡，同姓名，如发现玩家非法套利，尊宝国际有权扣除红利， 并且关闭帐号。

          <br>4.尊宝国际享有修订权和最终解释权。
        </p>
        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>
      </div>
      <!--app彩金-->
      <div v-if="item.id==='handsel' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>尊宝国际所有会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <p>
          只要您下载尊宝手机APP，无需联系客服，即可自助领取8-88元彩金。彩金无需流水，达到388元即可提款。
        </p>

        <h3>申请方式</h3>
        <p>
          下载手机APP-优惠领取-APP下载彩金
        </p>

        <h3>活动规则</h3>
        <p>
          1.此活动无需申请，凡是下载苹果或安卓APP即可自助领取APP彩金，系统8-88元随机派发，领取成功后奖金自动添加到您的账户上，打满388元即可提款，最高提款688元

          <br>2.APP彩金提款是会由电话客服进行核实正确就会进行出款，尊宝客服拨打两次电话，如果两次无人接听或者玩家非本人接听，我们将扣除红利及相关盈利，请保持电话畅通。

          <br>3.本活动仅限PT/MG/DT/QT/NT/PNG/SW中的老虎机类型游戏。其中PT平台老虎机奖金翻倍投注将不计算在内。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏及刮刮乐游戏，其他纸牌游戏，桌面游戏，电子扑克都不计算在内。若发现不正当投注尊宝有权收回红利和非法盈利额。

          <br>4.此项优惠活动只针对娱乐性质的会员，如发现用户拥有超过一个账号，包括同一姓名，同一邮件地址，同一注册电话，同一相似的IP地址，同一借记卡信用卡，系统将自动判定账号安全等级不足，将无法申请到此项优惠；

          <br>5.此活动与返水共享。

          <br>6.尊宝国际享有最终解释权
        </p>
        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--次次存送-->
      <div v-if="item.id==='ccc' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>尊宝所有会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动平台</h3>
        <p>尊宝PT平台的"经典老虎机"和"电动吃角子老虎机"、NT、QT、SW、DT或MG平台</p>

        <h3>活动内容</h3>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>会员等级</th>
              <th>最低存款要求</th>
              <th>笔笔送比例</th>
              <th>红利上限</th>
              <th>流水倍数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>普通会员</td>
              <td>10</td>
              <td>15%</td>
              <td>2888</td>
              <td>15</td>
            </tr>
            <tr>
              <td>青铜VIP</td>
              <td>10</td>
              <td>16%</td>
              <td>2888</td>
              <td>15</td>
            </tr>
            <tr>
              <td>白银VIP</td>
              <td>10</td>
              <td>17%</td>
              <td>2888</td>
              <td>15</td>
            </tr>
            <tr>
              <td>黄金VIP</td>
              <td>10</td>
              <td>18%</td>
              <td>2888</td>
              <td>15</td>
            </tr>
            <tr>
              <td>白金VIP</td>
              <td>10</td>
              <td>19%</td>
              <td>2888</td>
              <td>15</td>
            </tr>
            <tr>
              <td>钻石VIP</td>
              <td>10</td>
              <td>20%</td>
              <td>2888</td>
              <td>15</td>
            </tr>
            <tr>
              <td>王者VIP</td>
              <td>10</td>
              <td>25%</td>
              <td>5888</td>
              <td>20</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h3>申请方式</h3>
        <p>您在存款成功后，点击 <span class="red">"个人中心"——"自助存送----次存优惠"</span>，您就可以自行操作申请优惠，红利实时到账。</p>

        <h3>活动规则</h3>
        <p>
          1. 与返水优惠共享。

          <br>2. 每笔存款都可申请该活动，次数无限。

          <br>3.
          PT游戏只限经典老虎机、电动吃角子游戏。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏及刮刮乐游戏等，多旋转老虎机和老虎机奖金翻倍投注将不计算在内。MG、NT、QT、DT、SW、PNG游戏只限老虎机游戏，其他纸牌游戏，桌面游戏，电子扑克都不计算在内。次存活动禁止游戏多旋转老虎机(地妖之穴、海洋公主、三倍利润、热带滚筒和部落生活)，发现违规投注尊宝国际有权收回红利和非法盈利额。

          <br>4. 尊宝国际享有最终解释权。
        </p>


        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--救援金-->
      <div v-if="item.id==='jyj' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>尊宝所有会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动平台</h3>
        <p>尊宝PT平台的"经典老虎机"和"电动吃角子老虎机"、NT、QT、DT、SW、MG或PNG老虎机平台</p>

        <h3>活动内容</h3>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>会员等级</th>
              <th>申请门槛</th>
              <th>上限金额</th>
              <th>救援金比例</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>普通会员</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>4%</td>
            </tr>
            <tr>
              <td>青铜VIP</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>白银VIP</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>6%</td>
            </tr>
            <tr>
              <td>黄金VIP</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>7%</td>
            </tr>
            <tr>
              <td>白金VIP</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>8%</td>
            </tr>
            <tr>
              <td>钻石VIP</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>9%</td>
            </tr>
            <tr>
              <td>王者VIP</td>
              <td>存款100元负盈利50元及以上</td>
              <td>无上限</td>
              <td>10%</td>
            </tr>
            </tbody>
          </table>
        </div>


        <h3>活动规则</h3>
        <p>
          1. 奖金无需申请，每天8点之前统一派发到账（计算您昨天00：00：00到23：59：59的输赢）;您进入 “个人中心”——“自助优惠”——“救援金”自行领取。

          <br>2. 救援金计算方式： （会员PT、NT、QT、DT、MG、PNG、SW平台负盈利 — 红利）*会员对应比例。

          <span class="red">
                      <br>特别说明：计算会员PT平台、NT、QT、DT、MG、PNG、SW负盈利和红利的时间为昨天00:00:00到23:59:59;

                      <br>老虎机平台负盈利定义：尊宝会员在PT平台的“经典老虎机”和“电动吃角子老虎机”的输值、NT、QT、DT、MG、SW和PNG老虎机的输值。

                      <br>红利定义：全部平台的返水;全部平台优惠;红包

                      <br>举例说明：您当天存款100元，优惠10元，返水10元，玩老虎机输值100

                      <br>救援金=（100输值-10优惠红利-10返水红利）* 会员对应比例
                    </span>

          <br>3. 领取救援金时，对应的老虎机平台的余额必须小于5元。

          <br>4. 救援奖金需10倍流水即可提款。

          <br><span class="red">5. 救援金有效时间为60天（从派发当天开始计算），规定时间内未领取会自动取消。</span>

          <br>6. 此次优惠每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行帐户姓名及号码)

          <br>及IP地址只能享有一次优惠,一旦确认为套利玩家，立即没收盈利和本金。
          <br>7.
          救援金玩家必须在PT平台“经典老虎机”和“电动吃角子老虎”、SW、NT、QT、DT、MG或PNG老虎机平台游戏中进行投注。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏，所有Pontoon游戏，各种Craps游戏，赌场战争游戏，娱乐场Hold'em游戏，牌九游戏，多旋转老虎机(地妖之穴、海洋公主、三倍利润、热带滚筒和部落生活)和老虎机奖金翻倍投注将不计算在内，如投注此类游戏将取消申领资格，扣除所有红利以及盈利。

          <br>8. 尊宝国际拥有本次活动的最终解释权。
        </p>


        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--签到送彩金-->
      <div v-if="item.id==='sign' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>全体会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <p>
          每日签到每日送，新注册玩家都有送哦
        </p>


        <h3>活动规则</h3>
        <p>
          1，此次活动无需申请，每日签到最低有4元赠送，

          <br>2、所有签到奖金流水需要10倍。

          <br>3，每月激活要求需要达到后签到余额才可以转入游戏

          <br>4、提款金额不得超过最大提款的额度。

          <br>5、签到奖金每月最后一日的23:59:59秒自动清理，请及时进行游戏。

          <br>6，优惠活动只针对娱乐性质的会员，如发现用户拥有超过一个账户，包括同一姓名，同一邮箱，同一/相似IP地址，同一住址，同一银行卡，若发现玩家非法套利，尊宝国际有权将红利扣除并冻结账号。

          <br>7、尊宝国际享有修订权和最终解释权。
        </p>


        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--返水-->
      <div v-if="item.id==='fanshui' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>尊宝所有会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>等级</th>
              <th>老虎机</th>
              <th>PT其他</th>
              <th>真人娱乐</th>
              <th>体育</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>普通会员</td>
              <td>0.6%</td>
              <td>0.4%</td>
              <td>0.4%</td>
              <td>0.4%</td>
            </tr>
            <tr>
              <td>青铜VIP</td>
              <td>0.7%</td>
              <td>0.4%</td>
              <td>0.4%</td>
              <td>0.4%</td>
            </tr>
            <tr>
              <td>白银VIP</td>
              <td>0.8%</td>
              <td>0.4%</td>
              <td>0.5%</td>
              <td>0.4%</td>
            </tr>
            <tr>
              <td>黄金VIP</td>
              <td>0.9%</td>
              <td>0.4%</td>
              <td>0.6%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>白金VIP</td>
              <td>0.9%</td>
              <td>0.4%</td>
              <td>0.7%</td>
              <td>0.6%</td>
            </tr>
            <tr>
              <td>钻石VIP</td>
              <td>1.0%</td>
              <td>0.4%</td>
              <td>0.8%</td>
              <td>0.7%</td>
            </tr>
            <tr>
              <td>王者VIP</td>
              <td>1.1%</td>
              <td>0.4%</td>
              <td>1%</td>
              <td>0.8%</td>
            </tr>
            </tbody>
          </table>
        </div>


        <h3>活动规则</h3>
        <p>
          1.所有会员均可参加，无需报名。

          <br>2.返水当日有最高上限，钻石VIP和王者VIP为无上限。

          <br>3.系统派发返水时间：每天5：00-12:00为PT、SW、NT、QT、MG、DT、PNG、泛亚电竞平台有效投注额的返水,14:00-15:00为AG、BBIN平台有效投注额的返水时间,15:00-16:00为SB平台、平博平台有效投注额的返水，体育平台需等当日赛事全部结束后结算，并在结算后自动添加到会员账户。(上述为北京时间);

          <br>4.系统结算时间范围：AGIN、BBIN平台结算前一天中午12点到今天中午12点的有效投注额；体育平台结算前一天中午12点到今天中午12点的有效投注额，PT、SW、NT、QT、MG、DT、PNG、泛亚电竞结算前一天0点到23点59分59秒的有效投注额。
          (上述为北京时间)。

          <br>5.若会员出现对押等不正当投注，将被取消该活动参与资格，尊宝娱乐有权扣除账户款项并关闭账号

          <br>6.洗码优惠可与其他活动同时享尊宝所有。

          <br>7.Ebet、MW和捕鱼游戏不计算反水。

          <br>8.此活动最终解释权归尊宝所有。
        </p>


        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
      <!--限时存送-->
      <div v-if="item.id==='limitTime' && item.state" :class="item.id" class="detail">
        <h3>活动对象</h3>
        <p>尊宝所有活跃会员</p>

        <h3>活动时间</h3>
        <p>{{item.time}}</p>

        <h3>活动内容</h3>
        <div class="table my-table">
          <table>
            <thead>
            <tr>
              <th>存款要求</th>
              <th>优惠比例</th>
              <th>优惠最高金额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>存款10元以上</td>
              <td>100%</td>
              <td>1288</td>
            </tr>
            </tbody>
          </table>
        </div>


        <h3>活动规则</h3>
        <p>
          1.凡是申请限时存送优惠的活跃会员，必须在指定的老虎机平台完成流水要求。

          <br>2.优惠申请无需联系在线客服，个人中心——自助优惠——自助存送——选择限时存送 申请即可。

          <br>3.此优惠存款最低金额10元即可。

          <br>4.提款要求：（本金+优惠金额）* 20(流水倍数)。

          <br>5.PT游戏只限经典老虎机、电动吃角子游戏。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏及刮刮乐游戏等，多旋转老虎机和老虎机奖金翻倍投注将不计算在内。MG、NT、QT、DT、SW、PNG游戏只限老虎机游戏，其他纸牌游戏，桌面游戏，电子扑克都不计算在内。次存活动禁止游戏多旋转老虎机(地妖之穴、海洋公主、三倍利润、热带滚筒和部落生活)，发现违规投注尊宝国际有权收回红利和非法盈利额。

          <br>6.本次优惠和返水共享，其他需要流水倍数的红利不能参加次次存，若发现取消其红利。

          <br>7.尊宝拥有每次活动的最终解释权，可以在不通知的情况下修改或停止以上所有的活动。
        </p>


        <p class="back">
          <el-button @click.stop="togglePanel(item)" type="primary">返回</el-button>
        </p>


      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props:{
      item:{
        type:Object,
        default:{}
      }
    },
    computed: {},
    created() {
    },
    methods: {
      togglePanel(item){
        this.$emit('togglePanel',item)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .detail
    line-height 28px
    h3
      font-size: 18px
      font-weight: 600
      color: $color-intersperse
      margin-top: 10px
    p
      margin-bottom 10px
    .back
      margin-top 10px
      button
        display block
        width 100%
</style>