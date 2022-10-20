<template>
    <Layout>
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
  
      <vue-split-view
        direction="vertical"
        a-init="380px"
        a-min="50px"
        a-max="380px"
        b-init="50px"
        b-min="50px"
        b-max="500px"
        
      >
        <template #A >
            <div class="containerGrid">
                    <div class="item">1</div>
                    <div class="item">2</div>
                    <div class="item">3</div>
                    <div class="item">4</div>
                    <div class="item">5</div>
                    <div class="item">6</div>
                    <div class="item">7</div>
                    <div class="item">8</div>
</div>
        </template>
  
        <template #B >
        
        </template>
      </vue-split-view>
    </Layout>
  </template>
  
  <script>
  import Layout from "../../layouts/main";
  import VueSplitView from "vue-split-view/dist/vue2";
  import 'vue-split-view/dist/style.css'
  /**
   * Dashboard component
   */
  export default {
    components: {
      Layout,
      VueSplitView,
    },
    data() {
      return {
        title: "caca",
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
        ],
        derivativeCheck: 2,
        derivative: [
          {
            id: 1,
            name: "Binance",
          },
          {
            id: 2,
            name: "FTX",
          },
          {
            id: 3,
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
        text: `
         Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
        `,
      content: `Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus.`
      };
    },
    validations: {},
    methods: {
      changeCrypto(index) {
        this.cryptoSelected = index;
      },
      checkDerivative(id) {
        this.derivativeCheck = id;
      },
    },
    mounted() {},
  };
  </script>
<style >
.containerGrid {
  display: grid;
  grid-template-columns: 100px 500px;
  background-color: #3e2723;
  padding: 10px;
  border-radius: 10px;
}
.item {
  background-color: #80cbc4;
  border: 1px solid #fff;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>