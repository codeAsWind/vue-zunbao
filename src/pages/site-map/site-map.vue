<template>
  <div class="site-map">
    <div class="wrapper">
      <h2 class="center title">公认最具信誉平台</h2>
      <div class="btn-center">
        <el-button v-if="!isMobile" @click="updateNum" type="warning">刷新检测</el-button>
        <mt-button v-if="isMobile" @click="updateNum" type="danger">刷新检测</mt-button>
      </div>
      <div class="lines">
        <div class="item" v-for="(item,idx) in lineList">
          <a :href="'https://'+item.url">
            <p class="response">{{ randomNum }}s</p>
            <div class="circle">
              <span>{{'0'+(idx+1)}}</span><br> 线路
            </div>
            <span class="style-btn entry-btn">点击进入</span>
          </a>

        </div>
      </div>
      <div class="other">
        <a href="https://www.qnappzb.com/web/dns.rar"><img src="./img/dns.png" alt=""></a>
      </div>
    </div>
  </div>
</template>
<script>
  import VWrapper from '@/components/wrapper/wrapper'
  import TabMenu from '@/components/tab-menu/tab-menu'
  import {isMobilePlatform} from '@/common/js/util'

  export default {
    data() {
      return {
        lineList: [
          {
            url: 'www.zb11.com'
          },
          {
            url: 'www.zb231.com'
          },
          {
            url: 'www.zb129.com'
          },
          {
            url: 'www.zb152.com'
          },
          {
            url: 'www.zb153.com'
          },
          {
            url: 'www.zb182.com'
          }
        ],
        randomNum: this._getRandomNum(0.1, 0.6),
        isMobile:isMobilePlatform()
      }
    },
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
      updateNum() {
        this.randomNum = this._getRandomNum(0.1, 0.6)
      },
      _getRandomNum(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2)
      },
    },
    components: {
      VWrapper,
      TabMenu
    }
  }
</script>
<style lang="stylus" scoped src="./site-map.styl"></style>