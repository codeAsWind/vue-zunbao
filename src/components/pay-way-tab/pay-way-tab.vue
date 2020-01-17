<template>
  <div>
    <div :class="{active:currentIdx===idx,bankBtn:item.bankENName}" class="payWay-btn"
         v-for="(item,idx) in list" @click="select(idx,item)">
      <i v-if="item.bankENName" class="bank-sprite" :class="item.bankENName"></i>
      {{item.showName || item.bankZHName}}
      <!--<i v-if="currentIdx===idx" class="iconfont icon-user selected"></i>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      currentIdx: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: []
      }
    },
    computed: {},
    created() {
    },
    methods: {
      select(idx, item) {
        this.$emit('selectPayWay', idx, item)
      },
      getIcon(name) {
        return `iconfont icon-${name}`
      }
    },

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .payWay-btn
    float left
    position: relative
    background: #f8f8f8
    color: #4c4c4c
    border: 1px solid #efefef
    cursor: pointer
    text-align: center
    font-size: 14px
    width: 130px
    line-height: 43px
    height 43px
    border-radius: 5px
    margin 5px 15px 5px 0
    transition all .3s ease-in
    &.bankBtn
      text-indent 20px
    &.active, &:hover
      border-color $color-primary
      background $color-primary
      color $color-light
    i.selected
      position absolute
      right 0
      top -20px


</style>
<style scoped>
  i.bank-sprite {
    background: url(./img/bank-sprites3.png) no-repeat top left;
    width: 28px;
    height: 28px;
    display: inline-block;
    position: absolute;
    left: 13px;
    top: 5px;
  }

  i.bank-sprite.CMBC {
    background-position: 0 -168px;
    width: 31px;
    height: 24px;
    top: 7px;
  }

  i.bank-sprite.ICBC {
    background-position: 0 0;
    width: 29px;
  }

  i.bank-sprite.CCB {
    background-position: 0 -33px;
    height: 29px;
  }

  i.bank-sprite.ABC {
    background-position: 0 -67px;
    width: 30px;
    height: 29px;
  }

  i.bank-sprite.BOC {
    background-position: 0 -101px;
    width: 29px;
    height: 29px;
  }

  i.bank-sprite.CMB {
    background-position: 0 -135px;
  }

  i.bank-sprite.CMBC {
    background-position: 0 -168px;
    width: 31px;
    height: 24px;
    top: 7px;
  }

  i.bank-sprite.PSBC {
    background-position: 0 -197px;
    height: 25px;
    top: 7px;
  }

  i.bank-sprite.SPDB {
    background-position: 0 -227px;
    height: 24px;
  }

  i.bank-sprite.ECITIC {
    background-position: 0 -256px;
    top: 6px;
  }

  i.bank-sprite.CIB {
    background-position: 0 -289px;
    width: 35px;
    height: 22px;
    top: 8px;
  }

  i.bank-sprite.BCOM {
    background-position: 0 -319px;
    top: 6px;
  }

  i.bank-sprite.CEBB {
    background-position: -1px -348px;
    height: 22px;
    width: 33px;
    top: 12px;
  }

  i.bank-sprite.SPABANK {
    background-position: 0 -370px;
    width: 35px;
    height: 15px;
    top: 13px;
  }

  i.bank-sprite.HXB {
    background-position: 0 -388px;
    width: 35px;
    height: 28px;
  }

  i.bank-sprite.GDB {
    background-position: 0 -417px;
    width: 35px;
    height: 30px;
  }

  i.bank-sprite.BOS {
    background-position: 0 -513px;
    width: 35px;
    height: 29px;
  }

  i.bank-sprite.SHRCB {
    background-position: 0 -448px;
    width: 35px;
    height: 30px;
    top: 4px;
  }

  i.bank-sprite.BCCB {
    background-position: 0 -478px;
    width: 35px;
    height: 33px;
    top: 4px;
  }

  i.bank-sprite.BJRCB {
    background-position: 0 -545px;
    width: 35px;
    height: 34px;
  }

</style>