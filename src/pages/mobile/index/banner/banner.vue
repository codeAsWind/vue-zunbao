<template>
  <div v-if="bannerList.length" class="banner-wrapper">
    <mt-swipe :auto="4000" style="height:220px">
      <mt-swipe-item :style="_bannerStyles(item.src)" v-for="item in bannerList">
        <router-link v-if="!_isHttpUrl(item.href)" class="link" :to="{path:item.href}"></router-link>
        <a v-if="_isHttpUrl(item.href)" class="link" :href="item.href"></a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Swipe, SwipeItem} from 'mint-ui'

  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  export default {
    data() {
      return {}
    },
    props: {
      bannerList: {
        type: Array,
        default: []
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectItem(item){

      },
      _bannerStyles(url) {
        return {
          background: `url(${url}) center center`,
          backgroundSize: 'cover'
        }
      },
      _isHttpUrl(string) {
        return /^http/.test(string)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  .banner-wrapper
    a.link
      display block
      height 100%
</style>