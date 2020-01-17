<template>
  <div class="common-deposit">
    <tab-title @selectItem="selectItem" :tabTitleList="tabTitleList" :currentIdx="currentId"></tab-title>
    <div class="border-content pay-content">

      <div v-show="currentId === obj.forTitle.id" v-for="(obj,key) in depositTypes">
        <!--存款方式-->
        <div class="input-group">
          <span class="label">存款方式</span>
          <div class="deposit-btn-group">
            <pay-way-type-tab
                @selectPayWayType="payWayTypeSelect"
                :type="key"
                :currentType="obj.currentType"
                :list="obj.list">
            </pay-way-type-tab>
          </div>
        </div>

        <third-party-payment
            v-if="item.payWayType===obj.currentType"
            v-for="item in obj.list"
            :obj="item.payWayItem">
        </third-party-payment>

      </div>


    </div>
  </div>
</template>
<script src="./deposit.js"></script>
<style src="./deposit.styl" lang="stylus"></style>