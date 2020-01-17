<template>
  <div>
    <line-chart :chartData="chartData" :height="350"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    props: {
      chartData: {
        type: Object,
        default: {}
      }
    },
    components: {
      LineChart
    }
  }
</script>

<style lang="stylus" scoped>

</style>