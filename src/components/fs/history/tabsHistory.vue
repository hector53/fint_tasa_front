<template>
  <b-tabs content-class="p-3 text-muted" fill v-model="tabIndex">
              <b-tab active class="border-0" >
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Open Orders</span>
                </template>
                <table-open-orders v-if="tabIndex==0"></table-open-orders>
              </b-tab>
             
              <b-tab  class="border-0" >
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Order History</span>
                </template>
                <table-history-orders v-if="tabIndex==1"></table-history-orders>
              </b-tab>
              <b-tab  class="border-0" >
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Trade history</span>
                </template>
                <table-history-trade v-if="tabIndex==2"></table-history-trade>
              </b-tab>
            
            </b-tabs>
</template>

<script>
import TableOpenOrders from './tableOpenOrders.vue'
import TableHistoryOrders from './tableHistoryOrders.vue';
import TableHistoryTrade from './tableHistoryTrade.vue';
export default {
    components: {
    TableOpenOrders,
    TableHistoryOrders,
    TableHistoryTrade
},
    data() {
        return {
        
          tabIndex: 0
        }
    },
}
</script>
