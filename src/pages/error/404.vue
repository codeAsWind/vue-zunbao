<template>
  <div class="error-main" @click="goBackIndex">
  </div>
</template>
<script>
  export default {
    methods:{
      goBackIndex(){
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="stylus">
  .error-main
    height 100vh
    background url("./img/404.jpg") no-repeat center
    background-size cover
    cursor pointer
</style>