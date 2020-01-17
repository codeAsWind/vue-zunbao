<template>
  <span class="number-grow-warp">
    <span :style="options.styleObj" ref="numberGrow" class="number-grow">0</span>
  </span>
</template>

<script>
  export default {
    props: {
      options: {
        type: Object,
        default: {
          startNum: 301518148,//开始数
          endNum: 30151814800000,//结束数
          stepNum: .01,//每次增加
          step: 10,//变频
          styleObj:{}
        }
      }
    },
    methods: {
      numberGrow(ele) {
        let current = 0
        let t = setInterval(() => {
          let options = this.options
          options.startNum += options.stepNum
          if (options.startNum > options.endNum) {
            clearInterval(t)
            options.startNum = options.endNum
          }
          if (current === options.startNum) {
            return
          }
          current = options.startNum
          ele.innerHTML = this._toMoney(current)
        }, this.options.step)

      },
      //金额格式化
      _toMoney(num) {
        num = num.toFixed(2)
        num = parseFloat(num)
        num = num.toLocaleString()
        return num
      }
    },
    mounted() {
      this.numberGrow(this.$refs.numberGrow)
    },
    watch:{
      options(){
        this.numberGrow(this.$refs.numberGrow)
      }
    }
  }
</script>

<style>
  .number-grow-warp {
    transform: translateZ(0);
  }

  .number-grow {
    font-family: Arial-BoldMT;
    letter-spacing: 2.67px;
  }
</style>