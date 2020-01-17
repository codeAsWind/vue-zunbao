<template>
  <div class="national">
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
.national
  .main
    height 2130px
    background url('./img/national.jpg') no-repeat center top
</style>