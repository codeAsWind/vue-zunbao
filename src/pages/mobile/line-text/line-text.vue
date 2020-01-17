<template>
  <div class="line-text">
    <v-header :data="headData" @leftIconClick="back"></v-header>
    <site-map></site-map>
  </div>
</template>

<script>
  import siteMap from '@/pages/site-map/site-map'

  export default {
    data() {
      return {
        headData: {
          title: '线路测试',
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
    components: {siteMap}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .line-text
    mobile-wrapper()
    padding-bottom 50px
</style>