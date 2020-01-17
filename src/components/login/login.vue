<template>
  <div>
    <v-dialog :is-show="isShowLoginDialog"
              @on-close="closeDialog">
      <div class="login-dialog">
        <div class="dialog-header">
          <h3>会员登录</h3>
        </div>
        <div class="dialog-body">
          <form>
            <div class="input-group">
              <label class="label" for="username"><span>*</span>用户名</label>
              <div>
                <input v-model="userFormData.loginName" id="username" type="text">
              </div>
            </div>
            <div class="input-group">
              <label class="label" for="password"><span>*</span>密码</label>
              <div>
                <input v-model="userFormData.passWord" id="password" type="password">
              </div>
            </div>
            <div class="input-group">
              <label class="label"></label>
              <div>
                <el-button type="danger" @click="login">确定</el-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import {login} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [login],
    data() {
      return {
        userFormData: {
          loginName: '',
          passWord: ''
        }
      }
    },
    props: {
      isShowLoginDialog: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
    },
    watch: {
      isLogin(val){
        if(val){
          this.closeDialog()
        }
      }
    },
    components: {
      VDialog
    }

  }
</script>

<style lang="stylus" scoped></style>