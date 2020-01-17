<template>
  <div class="award-money">
    <div class="money-view">
      <span v-for="val in total">
        {{val}}
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        total: "",
        tickerStartTime: (new Date()).getTime(),
        startNum: 0,
        step: 10,
        interval: null
      }
    },
    props: {
      num: {
        type: Number,
        default: 0
      }
    },
    methods: {
      randomMoney() {
        let x = this.startNum * 1 + ((((new Date()).getTime() - this.tickerStartTime) / 2689) * this.step)
        this.total = x.toString().$toFixed().replace(new RegExp("(\\w)(?=(\\w{3})+(?!\\w))", 'g'), "$1,")
        this.interval = setTimeout(() => {
          this.randomMoney()
        }, 199)
      },
      getStartNumber(val, step) {
        this.startNum = this.num ? this.num : val
        this.step = step
        this.randomMoney()
      },
      getStarNumberInit() {
        let xmldoc = {}
        if (typeof(DOMParser) != "undefined") {
          var parser = new DOMParser()
          xmldoc = parser.parseFromString(xmlstring.jpxml, "text/xml")
        } else {
          try {
            xmldoc = new ActiveXObject("Microsoft.XMLDOM")
            xmldoc.async = false
            xmldoc.loadXML(xmlstring.jpxml)
          } catch (e) {
          }
        }

        var a = xmldoc.querySelector('amount[currency="cny"]')
        this.getStartNumber(a.firstChild.nodeValue, this.step || a.getAttribute("step"))
      }
    },
    computed: {},
    created() {
      this.getStarNumberInit()
    },
    destroyed() {
      clearTimeout(this.interval)
      this.interval = null
    },
    watch: {
      num() {
        this.getStarNumberInit()
      }
    }
  }
</script>
<style lang="stylus" spcode>
  @import '~common/stylus/variable'
  .money-view
    span
      display: inline-block
      line-height: 96px
      width: 50px
      text-align: center
      box-sizing: border-box
      color: $color-primary
      border-radius: 10px
      font-size: 90px


</style>
