<template>
  <div class="jiu-an">
    <common-nav></common-nav>
    <div class="main"></div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  export default {
    data() {
      return {}
    },
    computed: {},
    created() {},
    methods: {},
    watch: {},
    components: {commonNav,commonFooter}

  }
</script>

<style lang="stylus" scoped>
  .jiu-an
    .main
      height 852px
      background url('./img/jiuan.jpg') no-repeat center top
</style>