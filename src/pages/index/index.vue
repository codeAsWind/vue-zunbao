<template>
  <div class="index-wrapper">
    <!--banner-->
    <div class="banner-wrapper">
      <el-carousel :interval="4000" height="520px">
        <el-carousel-item :style="_bannerImage(item.src)" v-for="item in slides" :key="item.title">
          <router-link v-if="item.href && !_isHttpUrl(item.href)" class="banner-link" :to="{path:item.href}"></router-link>
          <a v-if="item.href && _isHttpUrl(item.href)" :href="item.href" class="banner-link" target="_blank"></a>
        </el-carousel-item>
      </el-carousel>

      <!--游戏下载-->
      <div class="sidebar-wrapper">
        <router-link to="/download">
          <div class="duck"></div>
        </router-link>
        <div class="text-link">
          <p>
            <span>NEW</span>
            <router-link to="/welfare">福利中心</router-link>
          </p>
          <p>
            <span>
              <b>HOT</b>
            </span>
            <a @click="goToJiuAn" href="javascript:;">久安大厅</a>
          </p>
        </div>
      </div>

    </div>
    <div class="wrapper main-index-wrapper">

      <!--奖池-->
      <div class="jackpot-wrapper">
        <img src="./img/jackpot.png" alt="">
        <v-jackpot :options="options"></v-jackpot>
      </div>
      <div class="main-block">

        <div class="left-nav-block">
          <router-link v-if="item.path.includes('/')" v-for="item in navItems" :to="{path:item.path}">
            <i v-if="item.new" class="iconfont icon-iconfontzhizuobiaozhun023113 icon-badge"></i>
            <i :class="_getIconClass(item.icon)" class="iconfont icon"></i>
            <span>{{item.text}}</span>
          </router-link>
          <a v-for="item in navItems" v-if="!item.path.includes('/')" :href="item.path">
            <i v-if="item.new" class="iconfont icon-iconfontzhizuobiaozhun023113 icon-badge"></i>
            <i :class="_getIconClass(item.icon)" class="iconfont icon"></i>
            <span>{{item.text}}</span>
          </a>
          <div class="zb-app-download">
            <img src="./img/icat.jpg" alt="">
            <!--<img :src="config.zbAppEwm" alt="">-->
            <!--<p>扫描下载APP</p>-->
          </div>

        </div>

        <div class="right-game-block">
          <div class="item">
            <div class="big-box">
              <div class="big">
                <img src="./img/p-ag.jpg" alt="">
                <div class="mask">
                  <img src="./img/i-ag.png" alt="">
                  <div class="text">
                    <p>亚洲最新的游戏平台</p>
                    <p>极致画面的震撼</p>
                  </div>
                  <game-api :factoryFun="apiGame.gameAginRedirect">
                    <el-button type="warning">立即投注</el-button>
                  </game-api>
                </div>
              </div>
              <div class="big">
                <img src="./img/p-sport.jpg" alt="">
                <div class="mask">
                  <img src="./img/i-sport.png" alt="">
                  <div class="text">
                    <p>推荐赛事</p>
                    <p>{{sbData.gameTime}}</p>
                    <p>{{sbData.name1}} VS {{sbData.name2}} </p>
                  </div>
                  <p class="sb-p">全场单双 {{sbData.odds}}</p>
                  <game-api :factoryFun="apiGame.sbLogin">
                    <el-button type="warning">立即投注</el-button>
                  </game-api>
                </div>
              </div>
            </div>
            <div class="small-box">

              <div class="small-item">
                <img src="./img/p-fish.jpg" alt="">
                <div class="mask">
                  <h3>捕鱼游戏</h3>

                  <router-link class="light" to="/fish-classify">
                    <el-button type="warning">立即游戏</el-button>
                  </router-link>

                </div>
              </div>

              <div class="small-item">
                <img src="./img/p-card.jpg" alt="">
                <div class="mask">
                  <h3>棋牌游戏</h3>
                  <router-link class="light" to="/chess">
                    <el-button type="warning">立即游戏</el-button>
                  </router-link>
                </div>
              </div>

            </div>
          </div>
          <div class="item item-02">
            <div v-for="item in slotList" class="small-item">
              <img :src="item.icon" alt="">
              <div class="mask">
                <h3><img :src="item.img" alt=""></h3>

                <router-link :to="{path:item.path}">
                  <el-button type="warning">立即游戏</el-button>
                </router-link>

              </div>
            </div>

            <div class="small-item">
              <img src="./img/p-more.jpg" alt="">
              <div class="mask">
                <h3>更多游戏</h3>
                <router-link to="/slots/pt">
                  <el-button type="warning">立即游戏</el-button>
                </router-link>
              </div>
            </div>

          </div>
        </div>


      </div>

      <!--推荐游戏-->
      <div class="recommend-game">
        <div class="title">
          <h3>
            <img src="./img/recommend.png" alt="">
          </h3>
          <router-link class="more" to="/slots">
            <i class="iconfont icon-gengduomore12"></i><span>更多</span>
          </router-link>
        </div>
        <div class="game-list-wrapper">
          <game-list :filterList="filterList"></game-list>
        </div>

      </div>
    </div>
    <!--优势-->
    <div class="advantage" @click="isShowAdvantage = true">
      <img class="arrow" src="./img/bot-click.png" alt="">

      <transition name="opacity">
        <el-carousel v-if="isShowAdvantage" :interval="400000" height="416px">
          <el-carousel-item :style="_bannerImage(item.src)" v-for="item in advantageList" :key="item.title" :label="item.title">
            <router-link v-if="item.href && !_isHttpUrl(item.href)" class="banner-link" :to="{path:item.href}"></router-link>
            <a v-if="item.href && _isHttpUrl(item.href)" :href="item.href" class="banner-link" target="_blank"></a>
          </el-carousel-item>
        </el-carousel>
      </transition>

    </div>


    <!--首页弹框-->
    <transition name="opacity">
      <div v-if="isShowIndexAlertDialog" class="index-alert-mask">
        <div class="index-alert-wrapper">
          <div class="index-alert-content">
            <div class="index-alert-msg-box">
              <p v-html="indexAlertData.list"></p>
            </div>
            <div class="index-alert-tips">
              <!--<marquee onmouseover="this.stop()" onmouseout="this.start()" scrollamount="3" behavior="" direction="up">-->
              <div v-html="indexAlertData.tips"></div>
              <!--</marquee>-->
            </div>
          </div>
          <i @click="isShowIndexAlertDialog = false" class="iconfont icon-2guanbi close-btn"></i>
        </div>
      </div>
    </transition>


  </div>

</template>

<script src="./index.js"></script>
<style lang="stylus" src="./index.styl"></style>