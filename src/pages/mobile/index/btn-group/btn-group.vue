<template>
  <div>
    <!--登录注册-->
    <div class="login-register">
      <div @click="selectItem(item)" v-for="item in filterList">
        <i :class="getIcon(item)"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        list:[
          {
            text:'注册账户',
            icon:'zhuce1',
            id:'register',
            show:'logOut'
          },
          {
            text:'登录账户',
            icon:'denglu',
            id:'login',
            show:'logOut'
          },
          {
            text:'我要存款',
            icon:'chongzhi0101',
            id:'deposit',
            show:'isLogin'
          },
          {
            text:'签到送彩金',
            icon:'bianji',
            id:'sign',
            show:'isLogin'
          },
        ]
      }
    },
    props:{
      isLogin:{
        type:Boolean,
        default:false
      }
    },
    computed: {
      filterList(){
        if(this.isLogin){
          return this.list.filter(item => item.show.includes('isLogin'))
        }else{
          return this.list.filter(item => item.show.includes('logOut'))
        }

      }
    },
    created() {
    },
    methods: {
      getIcon(item){
        return `iconfont icon-${item.icon}`
      },
      selectItem(item){
        if(item.id === 'register'){
          this.$router.push('/mobile/register')
        }
        if(item.id === 'login'){
          this.$router.push('/mobile/login')
        }
        if(item.id === 'deposit'){
          this.$router.push('/mobile/user/deposit')
        }
        if(item.id === 'sign'){
          this.$router.push('/mobile/user/sign')
        }

      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .login-register
    display flex
    line-height 48px
    div
      flex 1
      background $color-blue-mobile
      text-align center
      font-size 16px
      color $color-light
      &:last-child
        background $color-danger
      i
        font-size 22px
        margin-right 5px
        vertical-align middle

</style>