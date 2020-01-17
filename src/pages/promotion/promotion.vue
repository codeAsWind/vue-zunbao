<template>
  <div class="main-wrapper">
    <div class="banner"></div>
    <div class="wrapper">
      <v-wrapper>
        <div slot="tab-wrapper">
          <tab-menu @selectItem="selectItem" :menuList="menuList" :currentIdx="currentIdx"></tab-menu>
        </div>
        <div slot="right-wrapper">
          <div class="promotions">
            <div v-if="filterList.length" class="item" v-for="item in filterList">
              <div class="thumb" @click="goToThisPromotion(item)">
                <div class="pic">
                  <img v-lazy="item.img" alt="">
                </div>
                <div class="text">
                  <h3>{{item.title}}</h3>
                  <p>活动内容：<span class="opacity">{{item.content}}</span></p>
                  <p>活动时间：<span class="opacity">{{item.time}}</span></p>
                  <p class="detail-button">
                    <el-button type="primary">显示详情</el-button>
                  </p>
                </div>
              </div>

              <promotion-detail @click="togglePanel" :item="item"></promotion-detail>

            </div>
            <no-result v-if="!filterList.length"></no-result>
          </div>
        </div>
      </v-wrapper>
    </div>
  </div>
</template>

<script>

  import VWrapper from '@/components/wrapper/wrapper'
  import TabMenu from '@/components/tab-menu/tab-menu'
  import NoResult from '@/components/no-result/no-result'
  import promotionDetail from '@/components/promotion-detail/promotion-detail'
  import {promotion} from '@/common/js/mixin'

  export default {
    mixins: [promotion],
    activated() {
      this._goToThisPosition()
    },
    methods: {
      //滚动到指定位置
      _goToThisPosition() {
        setTimeout(() => {
          let query = this.$route.query.query
          if (query) {
            let needOpenOne = this.filterList.find((item) => {
              return item.id === query
            })
            needOpenOne.state = !needOpenOne.state
            this.$nextTick(() => {
              let needMoveDistance = document.querySelector(`.item .detail.${query}`).offsetTop
              window.scrollTo(0, needMoveDistance - 240)
            })
          }
        }, 20)
      },
    },
    components: {
      VWrapper,
      TabMenu,
      NoResult,
      promotionDetail
    }
  }
</script>

<style src="./promotion.styl" lang="stylus"></style>
