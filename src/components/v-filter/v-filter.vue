<template>
  <div>
    <div v-if="item.list[category] && item.list[category].length" v-for="item in filterTypeList" class="filter-type">
      <span>{{item.title}}：</span>
      <div class="types">
        <span @click="search(obj,item)" :class="{active: obj.value === item.active}"
              v-for="(obj) in item.list[category]">{{obj.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {gameFilter} from '@/common/js/mixin'
  export default {
    mixins:[gameFilter],
    components: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .filter-type
    display flex
    align-items center
    margin-bottom 10px
    .types
      line-height 24px
      span
        margin 0 5px
        padding 5px 10px
        border-radius 5px
        cursor pointer
        &.active
          background $color-primary
          color #fff

</style>