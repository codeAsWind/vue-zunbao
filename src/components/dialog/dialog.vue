<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
      <transition name="scale">
        <div :style="styleObj" class="dialog-content" v-if="isShow">
          <p class="dialog-close" @click="closeMyself">&times;</p>
          <slot>empty</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 500
      }
    },
    data() {
      return {}
    },
    computed: {
      styleObj() {
        return {
          width: `${this.width}px`,
          'max-height': `${this.height}px`,
          margin:`-${this.height/2}px 0 0 -${this.width/2}px`
        }
      }
    },
    methods: {
      closeMyself() {
        this.$emit('on-close')
      }
    }
  }
</script>

<style scoped>
  .scale-enter-active, .scale-leave-active {
    transition: all .5s ease;
  }

  .scale-enter, .scale-leave-to {
    transform: translate3d(0, -500px, 0);
  }

  /*.dialog-wrap {*/
    /*position: fixed;*/
    /*z-index: 999;*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/

  .dialog-cover {
    background: #000;
    opacity: .5;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .dialog-content {
    position: fixed;
    overflow: auto;
    background: #eee;
    z-index: 10;
    line-height: 1.6;
    top: 50%;
    left:50%;
    min-height:200px
  }

  .dialog-close {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    cursor: pointer;
    font-size: 30px;
    color: #fff;
    line-height: 50px;
    padding: 0 12px;
  }

  .dialog-close:hover {
    color: #4fc08d;
  }

  .dialog-header {
    background: #3e4883;
    color: #fff;
    line-height: 50px;
    text-align: center
  }

  .dialog-body {
    padding: 2%

  }

</style>
