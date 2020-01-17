<template>
  <div class="service">
    <v-header :data="headData" @leftIconClick="back"></v-header>
    <div class="main">
      <m-list :list="filterList" :currentIdx="currentIdx" @selectItem="selectItem"></m-list>
    </div>
  </div>
</template>

<script>
  import MList from 'MComponents/m-list/m-list'
  import config from '@/common/js/config'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        headData: {
          title: '尊宝客服',
          leftIcon: 'arrowr'
        },
        list: [
          {
            icon: 'kefu',
            text: '在线客服',
            id: 'online',
            show:'all'
          },
          {
            icon: 'weixin1',
            text: '微信客服',
            id: 'wexin',
            content: {
              img: config.wxServiceEwm,
              text: '微信公众号：zunbaoguoji 关注即可咨询！'
            },
            show:'all'
          },
          {
            icon: 'weixin1',
            text: '专属客服',
            id: 'zs',
            content:{
              text:'周一至周六 10点-19点'
            },
            show:'isLogin'
          },
          {
            icon: 'dianhua',
            text: '电话客服',
            id: 'phone',
            content:{
              text:'回拨为注册电话，点击号码回拨即可，如果回拨不是注册电话，请输入最新电话 ，点击回拨'
            },
            show:'all'
          },
          {
            icon: 'youxiang',
            text: '客服邮箱',
            id: 'email',
            content:{
              text:`尊宝邮箱：${config.serviceEmail}`
            },
            show:'all'
          },
          {
            icon: 'youxiang',
            text: 'CEO投诉邮箱',
            id: 'ceo-email',
            content:{
              text:`CEO投诉邮箱：${config.complaintEmail}`
            },
            show:'all'
          },
        ],
        currentIdx: -1
      }
    },
    computed: {
      filterList(){
        if(this.isLogin){
          return this.list
        }else{
          return this.list.filter(item => !item.show.includes('isLogin'))
        }
      },
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      selectItem(item, idx) {
        // 在线客服
        if (item.id === 'online') {
          window.location.href = config.serviceLink
        } else {
          if (this.currentIdx === idx) {
            this.currentIdx = -1
            return
          }
          this.currentIdx = idx
        }
      }
    },
    watch: {},
    components: {MList}

  }
</script>

<style lang="stylus" src="./service.styl" scoped>

</style>