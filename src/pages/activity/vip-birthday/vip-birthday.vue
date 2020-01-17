<template>
  <div class="vip-birthday">
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
  .vip-birthday
    .main
      height 2055px
      background url('./img/vip-birthday.jpg') no-repeat center top
</style>