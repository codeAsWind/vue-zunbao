<template>
  <div class="makeCall">
    <div class="input-group">
      <input v-model="number" type="text"/>
      <span @click="makeCall" class="style-btn">号码回拨</span>
    </div>
    <div class="tips">
      <h3>温馨提示</h3>
      <p>
        1.若您注册时的电话可以使用,请您登陆账号后直接点击"号码回拨" <br>
        2.若您注册时的电话停止使用, 请输入您最新有效电话后,点击"号码回拨",谢谢!
      </p>
    </div>
  </div>
</template>

<script>
  import {makeCall} from '@/common/js/mixin'

  export default {
    mixins: [makeCall],
    computed: {},
    created() {},
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .input-group
    margin-bottom 20px
    input
      width 300px
      margin-right 10px

  .tips
    h3
      margin-bottom 5px
      color $color-intersperse
</style>