<template>
  <div class="movie">
    <common-nav></common-nav>
    <div class="banner">
      <el-carousel :interval="4000" height="400px">
        <el-carousel-item :style="_bannerImage(item.src)" v-for="item in sliders" :key="item"></el-carousel-item>
      </el-carousel>
    </div>

    <div class="movie-wrapper">
      <div class="why-watch-movie center">
        <p><img src="./img/topic2.png" alt=""></p>
        <h2>透过电影，我们的人生延长了三倍《一一》里杨德昌的这句话 触动我至今</h2>
        <p>
          俗话说一场电影一场梦，看电影不是为了打发时间，而是去寻找自己！

          <br>现在越来越多的人遇到烂片会果断的中途退场，对于一场错误的感情，也是一样，及时离开便是对自己有限生命时间最好的珍惜·······

          <br>那么您还记得人生中看的第一部电影是什么吗？90年的香港恐怖片？僵尸片？还是00年崛起的青春文艺片？亦是当下流行的好莱坞科幻大片？

          <br><span class="red">尊宝国际为回馈广大会员的支持，福利再次来袭！不定期请您看国内外最新首映电影，尽享尊荣vip观影体验！</span>
        </p>
      </div>

      <div class="hot-movie common-list">
        <div class="wrapper">
          <h3 class="title">正在热映</h3>
          <div class="item-list">
            <div class="item" v-for="item in movieHotList">
              <div class="pic">
                <img :src="item.src" alt="">
              </div>
              <p class="name">{{item.name}}</p>
              <div class="bottom">
                <span class="point">{{item.point}}分</span>
                <el-button @click="getMoneyTime(item.name)" type="primary" size="small" class="small-btn">我要看
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="good-movie common-list">
        <div class="wrapper">
          <h3 class="title">经典电影</h3>
          <div class="item-list">
            <div class="item" v-for="item in movieGoodList">
              <div class="pic">
                <img :src="item.src" alt="">
              </div>
              <p class="name">{{item.name}}</p>
              <div class="bottom">
                <span class="point">{{item.point}}分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-tip wrapper">
        <p>
          <span class="red">如何申请：</span>当日存款满500元以上，每月仅限申请前100名，先申先得，次日系统将在申请名单里随机抽取

          <br><span class="red">申请举例：进入京东电影网之后点击影院，切换地址到您的住址即可查询到您身边可购票成功的电影院！</span>

          <br><span class="red">温馨提示：</span>

          <br>1.选购电影票只可选择当周周末（当周六或周日）观影，其他时段（周1-周5）恕不处理。必须在周五前完成预约申请，否则无法进行处理。

          <br>2.报名时请填写正确您选择电影院、联系方式、放映时间。

          <br>3.尊宝娱乐享有此优惠的最终解释权及修改权。
        </p>
      </div>
    </div>
    <common-footer></common-footer>
    <v-dialog :height="550" @on-close="closeDialog('isShowMovieState')" :is-show="isShowMovieState">
      <div>
        <div class="dialog-header">
          <h3>请完成您的确认单</h3>
        </div>
        <div class="dialog-body">
          <h3 class="movie-title">请先进入：<a href="https://movie.jd.com" target="_blank" class="red">movie.jd.com</a>
            选择您身边的电影院</h3>

          <div class="input-group">
            <span class="label">请输入城市地区</span>
            <div>
              <input v-model="movieData.cityName" type="text">
            </div>
          </div>
          <div class="input-group">
            <span class="label">请输入影院名称</span>
            <div>
              <input v-model="movieData.cinemaName" type="text">
            </div>
          </div>
          <div class="input-group">
            <span class="label">请选择观影日期</span>
            <div>
              <!--<input v-model="movieData.seeTime" type="text">-->
              <el-date-picker
                  v-model="movieData.seeTime"
                  type="date"
                  placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
          <div class="input-group">
            <span class="label">请选择放映时段</span>
            <div>
              <input v-model="movieData.seeTimeInterval" type="text">
            </div>
          </div>
          <div class="input-group">
            <span class="label">请输入手机号码</span>
            <div>
              <input maxlength="11" v-model="movieData.mobile" type="text">
            </div>
          </div>

          <div class="input-group">
            <span class="label"></span>
            <div>
              <el-button @click="addUserMovie" type="danger">提交申请</el-button>
            </div>
          </div>

          <div>
            <p>
              <span class="red">*</span>本活动指定平台京东电影，其他平台恕不受理。

              <br><span class="red">*</span>请准确无错字的输入进您查询到的电影院名称，并且输入进资料栏。
            </p>
          </div>

        </div>
      </div>
    </v-dialog>

  </div>
</template>

<script>
  import api from '@/api/index'
  import VDialog from '@/components/dialog/dialog'
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import {mapGetters} from 'vuex'
  import validtorReg from '@/common/js/validtor'

  export default {
    data() {
      return {
        sliders: [
          {
            src: require('./img/banner1.jpg')
          },
          {
            src: require('./img/banner2.jpg')
          },
          {
            src: require('./img/banner3.jpg')
          },
          {
            src: require('./img/banner4.jpg')
          },
          {
            src: require('./img/banner5.jpg')
          },
        ],
        movieHotList: [
          {
            src: require('./img/bsnlch.jpg'),
            name: '悲伤逆流成河',
            point: '9.7'
          },
          {
            src: require('./img/ftfb3.jpg'),
            name: '反贪风暴3',
            point: '8.0'
          },
          {
            src: require('./img/hjxd.jpg'),
            name: '黄金兄弟',
            point: '8.6'
          },
          {
            src: require('./img/ws.jpg'),
            name: '无双',
            point: '8.9'
          },
          {
            src: require('./img/y.jpg'),
            name: '影',
            point: '9.1'
          },

        ],
        movieGoodList: [
          {
            src: require('./img/jpm.jpg'),
            name: '金瓶梅2',
            point: '6.0'
          },
          {
            src: require('./img/xyrj.jpg'),
            name: '性瘾日记',
            point: '7.0'
          },
          {
            src: require('./img/cqsl.jpg'),
            name: '重庆深林',
            point: '8.7'
          },
          {
            src: require('./img/hynh.jpg'),
            name: '花样年华',
            point: '8.5'
          },
          {
            src: require('./img/ds2.jpg'),
            name: '赌神2',
            point: '7.5'
          },
        ],
        movieData: {
          cityName: '',
          cinemaName: '',
          movieName: '',
          loginName: '',
          seeTime: '',
          seeTimeInterval: '',
          mobile: '',
        },
        isShowMovieState: false
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'isLogin'])
    },
    created() {
    },
    methods: {
      _bannerImage(src) {
        return {
          background: `url(${src}) center`,
          backgroundSize: 'cover'
        }
      },
      getMoneyTime(name) {
        api.getMoneyTime().then((res) => {
          if (this.ERR_OK === res.code) {
            if (res.data >= 500) {
              //打开弹框
              this.isShowMovieState = true
              this.movieData.movieName = name
            } else {
              this.$message({
                type: 'info',
                message: '您今日的存款额未达到'
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      },
      // 申请电影
      addUserMovie() {
        if (!this.isLogin) {
          this.$message({
            type: 'warning',
            message: '请先登录游戏'
          })
          return
        }
        let {cityName, cinemaName, seeTime, seeTimeInterval, mobile} = this.movieData

        if (!cityName) {
          this.$message({
            type: 'warning',
            message: '请输入城市地区'
          })
          return
        }
        if (!cinemaName) {
          this.$message({
            type: 'warning',
            message: '请输入电影院名称'
          })
          return
        }
        if (!seeTime) {
          this.$message({
            type: 'warning',
            message: '请选择观影日期'
          })
          return
        }

        if (!seeTimeInterval) {
          this.$message({
            type: 'warning',
            message: '请选择放映时段'
          })
          return
        }

        if (!validtorReg.phoneReg.test(mobile)) {
          this.$message({
            type: 'warning',
            message: '手机号输入有误'
          })
          return
        }

        this.movieData.loginName = this.userInfo.loginname
        if(seeTime.format){
          this.movieData.seeTime = seeTime.format()
        }

        api.addUserMovie(this.movieData).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      closeDialog(attr) {
        this[attr] = false
      }
    },
    watch: {},
    components: {VDialog,commonNav,commonFooter}

  }
</script>

<style src="./movie.styl" lang="stylus" scoped></style>