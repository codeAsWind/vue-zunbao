import tabTitle from '@/components/tab-title/tab-title'
import backwater from './backwater/backwater.vue'
import birthday from './birthday/birthday.vue'
import coupon from './coupon/coupon.vue'
import freeChip from './free-chip/free-chip.vue'
import promoted from './promoted/promoted.vue'
import depositSend from './deposit-send/deposit-send.vue'
import rescueMoney from './rescue-money/rescue-money.vue'

import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      tabTitleList: [
        {
          text: '自助存送'
        },
        {
          text: '自助返水'
        },
        {
          text: '救援金'
        },
        {
          text: '优惠券'
        },
        {
          text: '免费筹码'
        },
        {
          text: '自助晋级'
        },
        {
          text: '生日礼金'
        },
      ],
      currentIdx: 0,
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
  },
  methods: {
    selectItem(idx) {
      this.currentIdx = idx
    }

  },
  watch: {},
  components: {
    tabTitle,birthday,freeChip,coupon,promoted,depositSend,rescueMoney,backwater
  }

}