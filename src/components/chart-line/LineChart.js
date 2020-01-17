import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: {
        "tiKuan": 0.0,
        "touZhu": 0.0,
        "yingLi": 0.0,
        "cunKuan": 5.0
      }
    }
  },
  methods: {
    _initChart() {
      this.renderChart({
        labels: ['盈利', '存款', '提款', '投注'],
        datasets: [
          {
            label: '单位（元）',
            backgroundColor: 'rgb(41, 165, 244)',
            data: [this.chartData.yingLi, this.chartData.cunKuan,this.chartData.tiKuan, this.chartData.touZhu]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  },
  mounted() {
    this._initChart()
  },
  watch: {
    chartData() {
      this._initChart()
    }
  }
}
