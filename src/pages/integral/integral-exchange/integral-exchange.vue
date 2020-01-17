<template>
  <div>
    <div class="exchangePage wrapper">
      <div class="header">
        <router-link to="/integral">积分商城</router-link> &gt; <span class="red">{{itemData.name}}</span>
      </div>
      <div class="main">
        <div class="address-wrapper">
          <h3>选择地址</h3>
          <div class="address-list">
            <div ref="addrList" @click="selectItem(item,idx)" class="item" v-for="(item,idx) in addrList">
              <div class="tit">
                <i class="iconfont icon-gerenzhongxin"></i>
                {{item.name}} 收
              </div>
              <div class="body">
                <i class="iconfont icon-weibiaoti-"></i>
                <p>{{item.area+' '+item.address}}</p>
              </div>
              <div class="bottom">
                <i class="iconfont icon-shouji"></i>
                <span>{{item.phone}}</span>
                <a href="javascript:;" @click.stop="openAddrModule(3,item)">修改</a>
              </div>
              <i @click.stop="deleteAddress(item,idx)" class="iconfont icon-2guanbi delete"></i>
            </div>
            <div class="add-addr" @click="openAddrModule(1)">
              <i class="iconfont icon-icon02"></i>
              <span>新增收货地址</span>
            </div>
          </div>
        </div>
        <div class="exchangeProductInfo">
          <h3>确认兑换商品信息</h3>
          <div>
            <!--来自详情页-->
            <table v-if="isComeFromDetail" class="table">
              <thead>
              <tr>
                <th>兑换商品</th>
                <th>兑换积分</th>
                <th>优惠方式</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><img class="thumb" :src="itemData.imageUrl" alt=""></td>
                <td><span class="red">{{itemData.point}}</span></td>
                <td>
                  <div>
                    <!--<p>{{itemData.vipSave*10 == 10?'新会员暂无优惠（等级不够）':'享受'+itemData.vipSave*10+'折优惠'}} （{{userInfo.level | level}}）</p>-->
                    <p><span>商品积分：</span><span>{{itemData.oldPoint}} 分</span></p>
                    <p><span>活动优惠：</span><span>0 分</span></p>
                    <p><span>VIP优惠：</span><span>{{itemData.promotion}} 分</span></p>
                  </div>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="2">
                  <p>温馨提示：发货时以站内信通知您，将于一周内发货，收货信息经确认无法修改</p>
                </td>
                <td>
                  兑换积分合计：<span class="red">{{itemData.point}}</span> 分
                </td>
              </tr>
              </tfoot>
            </table>
            <!--来自抽奖-->
            <table v-if="isComeFromLuckyLottery" class="table">
              <thead>
              <tr>
                <th>领取商品</th>
                <th>获得方式</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <img class="thumb" :src="itemData.imageUrl" alt="">
                  <span>{{itemData.name}}</span>
                </td>
                <td>
                  抽奖获得
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="2">
                  <p>温馨提示：发货时以站内信通知您，将于一周内发货，收货信息经确认无法修改</p>
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
          <div style="text-align: right; margin-top:15px">
            <el-button @click="exchangePhysical" type="danger">{{isComeFromDetail?'立即兑换':'立即领取'}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <v-dialog :height="600" @on-close="closeDialog('isShowAddressDialog')" :is-show="isShowAddressDialog">
      <div class="address-dialog">
        <div class="dialog-header">
          <h3>{{title}}</h3>
        </div>
        <div class="dialog-body">
          <div class="input-group">
            <span class="label">所在地区</span>
            <div>
              <region-picker
                  :province="region.province"
                  :city="region.city"
                  :district="region.district"
                  @onchange="change">
              </region-picker>
            </div>
          </div>

          <div class="input-group">
            <span class="label">详细地址</span>
            <div>
              <textarea v-model="address" minlength="3" maxlength="50"></textarea>
            </div>
          </div>

          <div class="input-group">
            <span class="label">收款人姓名</span>
            <div>
              <input v-model="name" type="text">
            </div>
          </div>

          <div class="input-group">
            <span class="label">手机号</span>
            <div>
              <input v-model="phone" type="text" maxlength="11">
            </div>
          </div>

          <div class="input-group">
            <span class="label"></span>
            <div>
              <input v-model="flag" id="flag" type="checkbox">
              <label for="flag"><b> 设置为默认收货地址</b></label>
            </div>
          </div>

          <div class="input-group">
            <span class="label"></span>
            <div>
              <el-button @click="saveAddr" type="primary">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import RegionPicker from 'vue-region-picker'
  import CHINA_REGION from 'china-area-data'
  import api from '@/api/integral'
  import VDialog from '@/components/dialog/dialog'
  import {mapGetters} from 'vuex'
  import validtorReg from '@/common/js/validtor'
  import {openSuccessTip} from '@/common/js/mixin'

  Vue.use(RegionPicker, {
    region: CHINA_REGION,
    vueVersion: 2
  })

  export default {
    mixins: [openSuccessTip],
    data() {
      return {
        addrList: [],
        flagAddrIndex: -1,//没有默认地址
        isShowAddressDialog: false,
        region: {
          province: '', //
          city: '', //
          district: '' //
        },
        title: '创建地址',
        address: '',
        name: '',
        phone: '',
        flag: false,
        state: 1,//创建地址
        //已保存的地址对象
        addressItem: {}
      }
    },
    computed: {
      isComeFromDetail() {
        return this.$route.query.comeFrom === 'detail'
      },
      isComeFromLuckyLottery() {
        return this.$route.query.comeFrom === 'luckyLottery'
      },
      itemData() {
        return JSON.parse(this.$route.query.itemData || '{}')
      },
      ...mapGetters(['userInfo'])
    },
    created() {
      this.addrListDom = null
      if (!this.isComeFromDetail && !this.isComeFromLuckyLottery && this.itemData.id) {
        this.$router.push('/integral')
      }
      this._handleAddress()
    },
    // 每次进来重置领取状态 -- 钩子
    activated() {
      this.mark = null
    },
    methods: {
      setActiveClass() {
        this.$nextTick(() => {
          this.addrListDom = this.$refs.addrList
          this.addrListDom.forEach((item) => {
            item.classList.remove('active')
          })
          if (this.flagAddrIndex > -1) {
            this.addrListDom[this.flagAddrIndex].classList.add('active')
          }
        })
      },
      selectItem(item, idx) {
        this.addrListDom.forEach((item) => {
          item.classList.remove('active')
        })
        this.addrListDom[idx].classList.add('active')

        this.addressItem = item
      },
      closeDialog(attr) {
        this[attr] = false
      },
      openDialog(attr) {
        this[attr] = true
      },
      //兑换实物奖品
      exchangePhysical() {
        if (this.mark) {
          this.$message({
            type: 'info',
            message: '已经兑换完成，请勿重复操作!'
          })
          return
        }
        let addressItem = this.addressItem

        if (!addressItem.id) {
          this.$message({
            type: 'warning',
            message: '请选择地址'
          })
          return
        }

        let action = ''
        let exchangeApi = null
        if (this.isComeFromDetail) {
          action = '兑换'
          exchangeApi = api.pointsExchange
        } else {
          action = '领取'
          exchangeApi = api.completeLuckyDrawRecord
        }
        let temp = `
                    <div>
                      <p>您即将${action} <span class="red">${this.itemData.name}</span>，将于一周内发货，收货信息无法修改，请确认如下：</p>
                      <p><span>姓名：</span><span class="red">${addressItem.name}</span></p>
                      <p><span>手机：</span><span class="red">${addressItem.phone}</span></p>
                      <p><span>地址：</span><span class="red">${addressItem.area + addressItem.address}</span></p>
                    </div>
                    `

        this.$msgbox({
          type: 'info',
          title: '温馨提示',
          dangerouslyUseHTMLString: true,
          message: temp,
        }).then((actionDialog) => {
          if (actionDialog === 'confirm') {
            let reqData = {
              json: JSON.stringify({
                id: this.itemData.id,
                phone: addressItem.phone,
                property: this.itemData.property
              }),
              addressId: addressItem.id,
              token: ''
            }

            exchangeApi(reqData).then((res) => {
              if (this.ERR_OK === res.code) {
                //只可领取一次
                this.mark = true
                if (res.data === 'SUCCESS') {
                  this.openSuccessTip(this.itemData.name, action, this.itemData.type)
                } else {
                  this.$message({
                    type: 'info',
                    message: res.data
                  })
                }
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })

          }
        }).catch(e => e)

      },
      //打开地址管理弹框
      openAddrModule(state, item) {
        this.state = state
        this.addressItem = item

        // 计算标题
        if (state === 1) {
          this.title = '创建地址'
        }
        if (state === 3) {
          this.title = '修改地址'
        }
        // 如果是修改地址
        if (state === 3) {
          let {province, city, district, flag, name, phone, address} = item
          this.region = {province, city, district}
          this.address = address
          this.name = name
          this.phone = phone
          this.flag = flag === 1 ? true : false
        } else {
          this.region = {}
          this.address = ''
          this.name = ''
          this.phone = ''
          this.flag = ''
        }

        this.openDialog('isShowAddressDialog')
      },
      //创建、修改、保存地址
      saveAddr() {
        // 请求参数
        let {province, city, district} = this.region
        let area = province + city + district
        let address = this.address
        let flag = this.flag ? 1 : 0
        let name = this.name
        let phone = this.phone
        let state = this.state
        let reqData = {
          state,
          id: '',
          province,
          city,
          district,
          area,
          address,
          flag,
          name,
          phone,
        }

        if (state === 3) {
          reqData.id = this.addressItem.id
        }

        // 验证
        if (!province || !city || !district || !address) {
          this.$message({
            type: 'warning',
            message: '请完善地址信息'
          })
          return
        }

        if (!name) {
          this.$message({
            type: 'warning',
            message: '请填写收款人姓名'
          })
          return
        }

        if (!validtorReg.phoneReg.test(phone)) {
          this.$message({
            type: 'warning',
            message: '手机格式有误'
          })
          return
        }

        api.handleAddress(reqData).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'success',
              message: res.data
            })
            this._handleAddress()
            this.closeDialog('isShowAddressDialog')
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      },
      // 删除地址
      deleteAddress(addressItem, idx) {
        this.$msgbox({
          type: 'warning',
          title: '温馨提示',
          showCancelButton: true,
          message: '您将永久删除该地址信息，您确定了？'
        }).then((actionDialog) => {
          if (actionDialog === 'confirm') {
            let reqData = {
              state: 2,
              id: addressItem.id,
              province: '',
              city: '',
              district: '',
              area: '',
              address: '',
              flag: '',
              name: '',
              phone: '',
            }
            api.handleAddress(reqData).then((res) => {
              if (this.ERR_OK === res.code) {
                this.$message({
                  type: 'success',
                  message: res.data
                })
                this.addrList.splice(idx, 1)
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
          }
        }).catch(e => e)
      },
      // 地址选择
      change(item) {
        this.region = item
      },
      _handleAddress() {
        api.handleAddress({
          state: 4,
          id: '',
          province: '',
          city: '',
          district: '',
          area: '',
          address: '',
          flag: '',
          name: '',
          phone: '',
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.addrList = res.data
            this.flagAddrIndex = this.addrList.findIndex((item) => item.flag)
            this.addressItem = this.addrList[this.flagAddrIndex] || {}
            this.setActiveClass()
          }
        })
      },
    },
    watch: {},
    components: {VDialog}

  }
</script>

<style lang="stylus" src="./integral-exchange.styl" scoped></style>