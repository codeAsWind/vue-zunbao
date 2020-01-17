<template>
  <div>
    <div class="integral-detail wrapper">
      <div class="header">
        <router-link to="/integral">积分商城</router-link> &gt; <span class="red">{{itemData.name}}</span>
      </div>
      <div class="product-wrapper">
        <div class="big-img">
          <img :src="itemData.imageUrl" alt="">
        </div>
        <div class="detail-info">
          <h3>{{itemData.name}} <span v-if="itemData.summary">({{itemData.summary}})</span></h3>

          <div class="level">
            <img :src="levelImage" alt="">
            <span class="level-text">{{userInfo.level | level}}</span>
            <span class="my-points">当前可用 <span>{{points}}</span> 积分</span>
          </div>

          <div class="promo-point">
            <p>所需积分：<span class="red need-point">{{currentPoint}}分</span><span class="old">{{currentPoint*itemData.vipSave}}分</span>
            </p>
            <div class="promo">
              <!--<span>{{itemData.vipSave*10 == 10?'暂无优惠（等级不够）':'享受'+itemData.vipSave*10+'折优惠'}}</span>-->
              <!--<div class="promo-list">-->
              <!--<span>不同等级会员享受不同优惠</span>-->
              <!--<div>-->
              <!--<p v-for="item in promoList">-->
              <!--<span>{{item.note}}</span>-->
              <!--<span>{{item.value / 10 === 10 ? '无折扣' : item.value / 10 + '折'}}</span>-->
              <!--</p>-->
              <!--</div>-->
              <!--</div>-->

              <span>暂无优惠</span>
            </div>
          </div>


          <p><span class="same-width">有效期</span>{{itemData.startTime && itemData.startTime.split(' ')[0]}} 至
            {{itemData.endTime && itemData.endTime.split(' ')[0]}}
          </p>
          <div class="type">
            <span class="same-width">选择类型</span>
            <div class="property-list">
              <a :class="{active:currentProperty===item.property}" @click="selectItem(item,idx)"
                 v-for="(item,idx) in itemData.property" href="javascript:;">{{_filterAttrVal(itemData.type,
                item.property)}}</a>
            </div>
          </div>
          <div class="btn-wrapper">
            <span class="same-width"></span>
            <el-button type="danger" @click="pointsExchange">立即兑换</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--手机兑换-->
    <el-dialog
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhone"
        width="30%">
      <div>
        <h3>请输入您将要充值的的手机号</h3>
        <div>手机号：<input maxlength="11" v-model="dialogData.userInput.phone" type="text"/></div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pointsExchangePhone(dialogData.item)">兑换</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import api from '@/api/integral'
  import {mapGetters, mapMutations} from 'vuex'
  import {property, levelImage, loginDialog, queryPoints, openSuccessTip} from '@/common/js/mixin'
  import validtorReg from '@/common/js/validtor'
  import config from '@/common/js/config'


  export default {
    mixins: [property, levelImage, loginDialog, queryPoints, openSuccessTip],
    data() {
      return {
        promoList: [],
        currentIdx: 0,
        dialogData: {
          dialogVisiblePhone: false,
          userInput: {
            phone: ''
          },
          item: {}
        }
      }
    },
    computed: {
      itemData() {
        let res = JSON.parse(this.$route.query.item || '{}')
        if (res.property) {
          res.property = JSON.parse(res.property || '[]')
        }
        return res
      },
      currentPoint() {
        let res = this.itemData.property
        return res && res[this.currentIdx].point * this.itemData.vipSave
      },
      oldCurrentPoint() {
        let res = this.itemData.property
        return res && res[this.currentIdx].point
      },
      currentProperty() {
        let res = this.itemData.property
        return res && res[this.currentIdx].property
      },
      ...mapGetters(['points', 'userInfo', 'isLogin'])
    },
    created() {
      if (!this.itemData.name) {
        this.$router.push('/integral')
      }
      //优惠列表
      // this._getLevelSave()
    },
    methods: {
      //兑换手机
      pointsExchangePhone(item) {
        let phone = this.dialogData.userInput.phone
        if (!validtorReg.phoneReg.test(phone)) {
          this.$message({
            type: 'warning',
            message: '手机格式有误'
          })
          return
        }
        console.log(this.currentProperty)
        let reqData = {
          json: JSON.stringify({
            id: item.id,
            type: item.type,
            property: this.currentProperty,
            phone
          }),
          addressId: ''
        }
        this._requestPointsExchangeApi(reqData, item.name, '兑换', item.type)

      },
      //兑换
      pointsExchange() {

        if (!this.isLogin) {
          this.openLoginDialog()
          return
        }
        //积分不够
        if (this.currentPoint > this.points) {
          this.$msgbox({
            title: '温馨提示',
            confirmButtonText: '充值赚积分',
            message: '积分不够啦，快去充值赚积分吧',
          }).then((action) => {
            if (action === 'confirm') {
              this.$router.push('/user/deposit')
            }
          }).catch(e => e)
          return
        }

        this.dialogData.item = this.itemData

        let {type, imageUrl, id, vipSave, name} = this.itemData
        let {phoneFee, phoneData, physical} = config.integral
        if (type === physical) {
          let property = this.currentProperty
          let oldPoint = this.oldCurrentPoint
          let point = this.currentPoint
          let promotion = oldPoint - point
          let item = {
            imageUrl,
            promotion,
            property,
            point,
            oldPoint,
            id,
            vipSave,
            name,
            type
          }
          this.$router.push({
            path: '/integral/exchangePage',
            query: {
              itemData: JSON.stringify(item),
              comeFrom: 'detail'
            }
          })
        } else if (type === phoneData || type === phoneFee) {
          this.openDialog('dialogVisiblePhone')
        } else { //彩金、优惠券
          let reqData = {
            json: JSON.stringify({
              id,
              type,
              property: this.currentProperty,
            }),
            addressId: ''
          }
          this._requestPointsExchangeApi(reqData, name, '兑换', type)
        }
      },
      selectItem(item, idx) {
        this.currentIdx = idx
      },
      openDialog(attr) {
        this.dialogData[attr] = true
      },
      closeDialog(attr) {
        this.dialogData[attr] = false
      },
      //请求兑换接口
      _requestPointsExchangeApi(reqData, name, action, type) {
        api.pointsExchange(reqData).then((res) => {
          if (this.ERR_OK === res.code) {

            //关闭手机输入弹框
            let {phoneFee, phoneData} = config.integral
            if (type === phoneFee || type === phoneData) {
              this.closeDialog('dialogVisiblePhone')
            }
            //刷新积分
            this._queryPoints()
            this.openSuccessTip(name, action, type)

          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //获取等级优惠
      _getLevelSave() {
        api.getLevelSave().then((res) => {
          if (this.ERR_OK === res.code) {
            this.promoList = res.data
          }
        })
      },

    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped src="./integral-detail.styl"></style>