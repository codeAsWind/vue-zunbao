<template>
  <span @click="playGame(factoryFun,reqData)"><slot></slot></span>
</template>

<script>
  import {playGame} from '@/common/js/mixin'

  export default {
    mixins: [playGame],
  }
</script>
