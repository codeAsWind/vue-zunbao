<template>
  <div class="about-us">
    <v-header :data="headData" @leftIconClick="back"></v-header>
    <div class="content">
      <p>
        尊宝娱乐隶属于—PIONEER SOLUTIONS TECHNOLOGY DEVELOPMENT LIMITED。

        <br>注册于菲律宾，并持有菲律宾PAGCOR合法博彩牌照。

        <br>公司已有10年历史。我们于2005年成功打入互联网博彩市场，公司总部设在菲律宾马尼拉。

        <br>尊宝娱乐与世界领先合法博彩娱乐PT平台，MG平台，NT平台及QT平台系统商进行技术上合作。

        <br>提供有亚洲最多元，专业，顶尖，公正，安全的线上娱乐产品服务。 尊宝娱乐提供给玩家的娱乐产品丰富多样化，有多种特色老虎机任您选择。

        <br>加入尊宝娱乐，畅享无与伦比的游戏体验。选择尊宝娱乐，绝对是您最明智的选择!
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headData: {
          title: '关于我们',
          leftIcon: 'arrowr'
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .about-us
    mobile-wrapper()
    m-wrapper()
    .content
      padding 20px
      margin-bottom: 2rem
      margin-top 10px
      border: .2rem solid #c8c8c8
      border-radius: .5rem
      background: url(./contentBg.png) bottom repeat, #fff
      line-height 22px
</style>