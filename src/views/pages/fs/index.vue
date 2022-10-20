<template>
  <Layout style="background: white;">
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card headerFs">
          <div class="row">
            <div class="col-lg-2 flexCustom">
              <b-dropdown dropright variant="success" class="m-2">
                <template slot="button-content">
                  {{ arrayCryptos[cryptoSelected].name }}
                  <i class="mdi mdi-chevron-right"></i>
                </template>
                <b-dropdown-item-button
                  v-for="(item, index) in arrayCryptos"
                  :key="index"
                  @click="changeCrypto(index)"
                  >{{ item.name }}</b-dropdown-item-button
                >
              </b-dropdown>
            </div>
            <div class="col-lg-6 flexCustom">
              <div
                class="btn-group btn-group-toggle flexCustom"
                data-toggle="buttons"
              >
                <label
                  class="btn btn-success"
                  :class="{ active: item.id == derivativeCheck }"
                  v-for="(item, index) in derivative"
                  :key="index"
                >
                  <input type="checkbox" @click="checkDerivative(item.id)" />
                  {{ item.name }}
                </label>
              </div>
            </div>
            <div class="col-lg-4"></div>
          </div>
        </div>
      </div>
    </div>
      <gridTasa :key="keyGrid"
        :currency="arrayCryptos[cryptoSelected].name"
        :derivative="derivative[derivativeCheck]"
        @datosCargados="datosCargados"
        @ordenEjecutada="ordenEjecutada"
        ></gridTasa>
     <tabs-history v-if="dataCargada" :key="keyTabsHistory" style="min-height: 300px; margin-bottom: 20px"></tabs-history>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import gridTasa from "../../../components/fs/grid/gridTasa.vue";
import TabsHistory from '../../../components/fs/history/tabsHistory.vue';
/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    gridTasa,
    TabsHistory
},
  data() {
    return {
      keyTabsHistory: 1000,
      dataCargada:false,
      keyGrid: 0,
      cryptoSelected: 0,
      arrayCryptos: [
        {
          id: 1,
          name: "BTC",
        },
        {
          id: 2,
          name: "XRP",
        },
        {
          id: 3,
          name: "SOL",
        },
        {
          id: 4,
          name: "ADA",
        },
        {
          id: 5,
          name: "EOS",
        },
        {
          id: 6,
          name: "LINK",
        },
        {
          id: 7,
          name: "LINK",
        },
        { id: 8, name: "DOT" },{ id: 9, name: "BNB" },{ id: 10, name: "ATOM" },{ id: 11, name: "AVAX" },
        { id: 12, name: "TRX" },{ id: 13, name: "MATIC" },
      ],
      derivativeCheck: 1,
      derivative: [
        {
          id: 0,
          name: "Binance",
        },
        {
          id: 1,
          name: "FTX",
        },
        {
          id: 2,
          name: "BYB",
        },
      ],
      items: [
        {
          text: "Home",
        },
        {
          text: "FS",
          active: true,
        },
      ],
     
    };
  },
  validations: {},
  methods: {
    ordenEjecutada(){
      this.keyTabsHistory++
    },
    changeCrypto(index) {
      this.cryptoSelected = index;
      this.keyGrid++
    },
    checkDerivative(id) {
      this.derivativeCheck = id;
    },
    datosCargados(){
      this.dataCargada=true
    }
  },
  mounted() {},
};
</script>
<style>
.page-content {
  padding-bottom: 0;
  padding-left: 0;
    padding-right: 0;
}
</style>