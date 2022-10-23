<template>
  <div class="wraperGrid">
    <div
      v-if="loader == false"
      class="gridStyle"
      :style="{
        'grid-template-columns': dataGrid.gridColumns,
        'grid-template-rows': dataGrid.gridRows,
      }"
    >
      <!--Columna 1 Estatica izquierda -->
      <row-header
        :gridArea="'header/header/auto/auto'"
        :placeSelf="'center start'"
        :title="currency + 'USD SPOT / ' + currency + ' Future'"
        :position="'sticky'"
      ></row-header>

      <row-header
        v-for="(item, index) in dataGrid.arraySidebar"
        :key="index"
        :gridArea="item.name + '/header/auto/auto'"
        :placeSelf="'center start'"
        :title="item.name"
      ></row-header>
      <!--Fin Columna 1 Estatica izquierda -->

      <!--Header arriba Estatico -->
      <col-header
        v-for="(item, index) in dataGrid.arrayHeader"
        :key="index + 1000"
        :gridArea="'header/' + item.name + '/auto/auto'"
        :placeSelf="'start center'"
        :title="item.name"
      ></col-header>

      <!--Fin Header arriba Estatico -->

      <!--1 Fila de datos  -->
      <!--Spot Crypto USD - PERP -->
      <data-cell
        v-for="(item, index) in dataGrid.gridCells"
        :key="index + 2000"
        :dataRow="item.dataRow"
        :dataCol="item.dataCol"
        :gridArea="item.dataRow + '/' + item.dataCol + '/auto/auto'"
        :title="item.dataRow + ' - ' + item.dataCol"
        :bid="item.bid"
        :ask="item.ask"
        :markSidebar="item.markSidebar"
        :markHeader="item.markHeader"
        :itemCell="item"
        :indexCell="index"
        @showModal="showModal"
      ></data-cell>
      <!--Fin Spot Crypto USD - PERP -->

      <div class="lineaHorizontalEspVacio"></div>
      <div class="lineaHorizontalEspVacio"></div>
      <div class="lineaHorizontalEspVacio"></div>
      <div class="lineaHorizontalEspVacio"></div>
      <div class="lineaHorizontalEspVacio"></div>
      <div class="lineaHorizontalEspVacio"></div>
      <div class="fmufYj lineaVerticalBorderIzq"></div>
      <div class="wdNVf lineaVerticalBorderIzq"></div>
      <div class="fiOEEj lineaVerticalBorderIzq"></div>
      <div class="symBf lineaVerticalBorderIzq"></div>
      <div class="eitOlM LineaHorizontalColumnasHeader"></div>
      <div class="ecvKIB LineaHorizontalColumnasHeader"></div>
      <div class="eNknau LineaHorizontalColumnasHeader"></div>
      <div class="eHmjxj LineaHorizontalColumnasHeader"></div>
    </div>
    <b-spinner
      type="grow"
      class="m-2"
      variant="dark"
      role="status"
      v-else
    ></b-spinner>

    <!-- Modal -->
    <b-modal
      v-model="showModalStrategy"
      size="lg"
      body-class="bodyClassModal"
      footer-class="FooterModalReset"
      header-class="headerModalReset"
    >
      <template #modal-header>
        <div
          class="w-100"
          style="
            display: flex;
            justify-content: space-around;
            text-align: center;
            padding-top: 20px;
          "
        >
          <div>
            <h6>{{titleSpotFuture}}</h6>
            <p>({{derivative.name}})</p>
          </div>
          <div>
            <h6>{{titleSpotFuture}}</h6>
            <p>Mark: 10</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            class="close closeManual"
            @click="showModalStrategy = false"
          >
            ×
          </button>
        </div>
      </template>

      <template #modal-footer>
        <b-container fluid>
          <div class="card">
            <div class="card-body">
              <b-container class="bv-example-row">
                <b-row class="justify-content-md-center">
                  <b-col col lg="8">
                    <b-container class="bv-example-row">
                      <b-row class="justify-content-md-center">
                        <b-col col lg="3">
                          <p style="margin: 0; ">Account</p>
                          <a href="#">Edit</a>
                        </b-col>
                        <b-col col lg="9">
                          <b-form-select
                            v-model="selected"
                            :options="options"
                          ></b-form-select>
                        </b-col>
                      </b-row>
                    </b-container>
                    <b-container fluid style="margin-top: 20px">
                      <div class="card" style="background: #ebebeb9c">
                        <div
                          class="card-body"
                          style="padding: 0; margin-top: 20px"
                        >
                          <h4
                            class="card-title"
                            style="margin-bottom: 20px; padding-left: 10px"
                          >
                            <span>Strategy Details (
                              <b v-if="buyerSeller==0">BUYER</b>
                              <b v-if="buyerSeller==1">SELLER</b>
                              )</span>
                          </h4>
                          <div class="table-responsive">
                            <table class="table table-hover mb-0">
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Action</th>
                                  <th>Instrument</th>
                                  <th>Expiry</th>
                                  <th>Mark</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>{{strategyProductoRow1}}</th>
                                  <td>
                                    <span v-if="buyerSeller==0" >BUY</span>
                                    <span v-if="buyerSeller==1" >SELL</span>
                                  </td>
                                  <td>
                                    <span v-if="strategyProductoRow1==(currency+'-USD')">Spot</span>
                                    <span v-else>Future</span>
                                  </td>
                                  <td>{{expiryRow1}}</td>
                                  <td>{{markPriceRow1}} *</td>
                                </tr>
                                <tr>
                                  <th>{{strategyProductoRow2}}</th>
                                  <td><span v-if="buyerSeller==0" >SELL</span>
                                    <span v-if="buyerSeller==1" >BUY</span></td>
                                  <td>Future</td>
                                  <td>{{expiryRow2}}</td>
                                  <td>{{markPriceRow2}} *</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </b-container>
                    <b-container class="bv-example-row mt-3">
                      <b-row class="justify-content-md-center">
                        <b-col col lg="6">
                          <h6 style="margin-top: 10px">Best Bid</h6>
                          <div class="bestBidScreen">
                            <span>{{numHigh(dataGrid.gridCells[indexGridCell].rowAskSize, dataGrid.gridCells[indexGridCell].colBidSize)}}</span>
                            <span>{{ dividirBidAsk(dataGrid.gridCells[indexGridCell].rowAsk, dataGrid.gridCells[indexGridCell].colBid )   }}</span>
                          </div>
                        </b-col>
                        <b-col col lg="6">
                          <h6 style="margin-top: 10px">Best Ask</h6>
                          <div class="bestBidScreen">
                            <span>{{numHigh(dataGrid.gridCells[indexGridCell].rowBidSize, dataGrid.gridCells[indexGridCell].colAskSize)}}</span>
                            <span>{{dividirBidAsk(dataGrid.gridCells[indexGridCell].rowBid, dataGrid.gridCells[indexGridCell].colAsk)}}</span>
                          </div>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                  <b-col col lg="4">
                    <div
                      class="btn-group btn-group-toggle flexCustom"
                      data-toggle="buttons"
                    >
                      <label
                        class="btn btn-success"
                        :class="{ active: item.id == limitMarketSelected }"
                        v-for="(item, index) in limitMarket"
                        :key="index"
                      >
                        <input
                          type="checkbox"
                          @click="checkLimitMarket(item.id)"
                        />
                        {{ item.name }}
                      </label>
                    </div>
                    <div
                      style="   display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                      "
                    >
                      <b-form-checkbox
                        @change="checkIoc"
                        switch
                        size="sm"
                        v-model="checkedIoc"
                        name="check-button"
                      >
                        Ioc
                      </b-form-checkbox>
                      <b-form-checkbox
                        @change="checkPostOnly"
                        switch
                        size="sm"
                        v-model="checkedPostOnly"
                        name="check-button"
                      >
                        Post Only
                      </b-form-checkbox>
                    </div>
                    <div style="margin-top: 10px">
                      <h6>Quantity</h6>
                      <div class="form-control inputGroupModal">
                        <input type="text" v-model="quantityBtc"  />
                        <span>{{currency}}</span>
                      </div>
                      <p>{{ priceUsdBtc }} USD</p>
                    </div>
                    <div>
                      <h6>Price</h6>
                      <div class="form-control inputGroupModal">
                        <input type="text" v-model="exePrice" />
                      </div>
                    </div>
                    <div class="modalFsLimitBuy">
                      <div class="limitPrice">
                        <span v-if="buyerSeller==0"  >Limit Buy</span>
                        <span v-if="buyerSeller==1"  >Limit Sell</span>
                        <span class="priceBuy">{{exePrice}}</span>
                      </div>
                      <div class="limitPrice">
                        <span>Offset</span>
                        <span class="priceOffset">-5</span>
                      </div>
                    </div>
                    <div class="buttonsBuy">
                      <b-button variant="primary">
                        <i class="ri-arrow-left-right-line align-middle"></i
                      ></b-button>
                      <b-button pill variant="primary" @click="makeOrder" >Confirm</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </b-container>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ColHeader from "../../grid/ColHeader.vue";
import DataCell from "../../grid/DataCell.vue";
import RowHeader from "../../grid/RowHeader.vue";
import Cookies from "js-cookie";
import { isWsTradesEvent }  from "ftx-api";
import { WebsocketClient } from "ftx-api";
export default {
  components: { RowHeader, ColHeader, DataCell },
  props: ["currency" , "derivative"],
  data() {
    return {
      expiryRow1: "", 
      expiryRow2: "",
      strategyProductoRow1: "", 
      strategyProductoRow2: "",
      markPriceRow1: "", 
      markPriceRow2: "",
      buyerSeller: "",
      titleSpotFuture: "",
      limitMarketSelected: 1,
      rowBid: "", 
      rowAsk: "",
      colBid: "",
      colAsk: "",
      limitMarket: [
        {
          id: 1,
          name: "Limit S",
        },
        {
          id: 2,
          name: "Limit F",
        },
        {
          id: 3,
          name: "Market",
        },
      ],
      checkedIoc: false,
      checkedPostOnly: false,
      quantityBtc: 0,
      priceUsdBtc: 0,
      exePriceViejo: 0,
      exePrice: 0,
      showModalStrategy: false,
      loader: true,
      dataGrid: [],
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],

      selectLimitMarket: [], // Must be an array reference!
      optionLimitMarket: [
        { text: "Limit", value: "limit" },
        { text: "Market", value: "market" },
      ],
      indexGridCell: 0, 
      selectedCell: []
    
    };
  },
  watch:{
    quantityBtc(){
      this.priceUsdBtc = this.quantityBtc * this.markPriceRow1
    }, 
    limitMarketSelected(){
      if(this.limitMarketSelected == 3){
        this.exePriceViejo = this.exePrice
        this.exePrice = 0
      }else{
        this.exePrice = this.exePriceViejo
      }
    }
  },
  methods: {
   async makeOrder(){
    if(this.quantityBtc == 0){
      this.makeToast("danger", "error", "quantity must be greater than 0 ");
      return false
    }
    this.addTokenBearer()
      console.log(this.selectedCell)
      console.log(this.dataGrid)
      //pasar distancia actual 
      var distanciaActual;
      if(this.buyerSeller==1){
        //es tasa clasica 
        distanciaActual = this.dividirBidAsk(this.dataGrid.gridCells[this.indexGridCell].rowBid, this.dataGrid.gridCells[this.indexGridCell].colAsk)
      }else{
        distanciaActual = this.dividirBidAsk(this.dataGrid.gridCells[this.indexGridCell].rowAsk, this.dataGrid.gridCells[this.indexGridCell].colBid )
      }
      this.$isLoading(true) // show loading screen
      await this.axios
        .post(this.$store.state.back.urlBack +  "/make_order", {
          "nameRow": this.selectedCell.rowNameOriginal,
          "currency": this.currency, 
          "limitMarket": this.limitMarketSelected,
          "future": this.selectedCell.colNameOriginal, 
          "type": this.buyerSeller, 
          "size": this.quantityBtc,
          "price": this.exePrice, //distancia requerida
          "distanciaActual": distanciaActual, 
          "bidFuture": this.dataGrid.gridCells[this.indexGridCell].colBid,
          "askFuture": this.dataGrid.gridCells[this.indexGridCell].colAsk,
          "bidSpot": this.dataGrid.gridCells[this.indexGridCell].rowBid,
          "askSpot": this.dataGrid.gridCells[this.indexGridCell].rowAsk,
        } )
        .then((response) => {
          console.log(response);
          this.showModalStrategy = false
          this.$emit("ordenEjecutada")
          this.$isLoading(false) // show loading screen
        })
        .catch((error) => {
          console.log(error);
          this.makeToast("danger", "error", error);
          this.$isLoading(false) // show loading screen
        });
    }, 
    numHigh(num1, num2){
      if(num1>num2){
        return num1
      }else{
        return num2
      }
    },
   
    checkIoc() {
      this.checkedIoc = true;
      this.checkedPostOnly = false;
    },
    checkPostOnly() {
      this.checkedIoc = false;
      this.checkedPostOnly = true;
    },
    checkLimitMarket(id) {
      this.limitMarketSelected = id;
    },
    dividirBidAsk(num1, num2){
          var num3 = num2 / num1
          return num3.toFixed(5)
        },
    showModal(items) {
      this.limitMarketSelected = 1
      this.selectedCell = items.itemCell
      console.log(items);
      this.titleSpotFuture = items.title;
        this.buyerSeller = items.type
      this.showModalStrategy = true;
      this.strategyProductoRow1 = items.dataRow
      this.strategyProductoRow2 = items.dataCol
      this.expiryRow1 = items.itemCell.expirySidebar
      this.expiryRow2 = items.itemCell.expiryHeader
      this.markPriceRow1 = items.itemCell.markSidebar
      this.markPriceRow2 = items.itemCell.markHeader
      this.rowBid = items.itemCell.rowBid
      this.rowAsk = items.itemCell.rowAsk
      this.colBid = items.itemCell.colBid
      this.colAsk = items.itemCell.colAsk
      if(items.type ==0){
        this.exePrice = items.bidask
        this.exePriceViejo = items.bidask
      }else{
        this.exePrice = items.bidask
        this.exePriceViejo = items.bidask
      }
      this.indexGridCell = items.indexCell
    },
    makeToast(variant = null, title, content) {
      this.$bvToast.toast(content, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
    addTokenBearer() {
      var token = Cookies.get("fintCurrenUser");
      token = JSON.parse(token);
      this.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.token}`;
    },
    async getData() {
      await this.axios
        .get(
          this.$store.state.back.urlBack +
            "/fs_estrategies?derivative=2&currency=" +
            this.currency
        )
        .then((response) => {
          console.log(response);
          this.dataGrid = response.data;
          this.loader = false;
          this.$emit("datosCargados")
          this.openSockets()
        })
        .catch((error) => {
          console.log(error);
          this.makeToast("danger", "error", error);
        });
    },
    openSockets(){
      
    
    try {
        const params = {
      key: "wCwAFYoRVc6RX8TnkleJz7f4p_fBQachaM1EmPNL",
      secret: "nn8ad37ZNzP79GF9EEYG7gkT9rGV9",
      // subAccountName: 'sub1',
    };
      // Prepare a ws connection (connection init is automatic once ws client is instanced)
      const ws = new WebsocketClient(params);

      // append event listeners
      ws.on('update', msg => {
    // use a type guard to narrow down types
    if (isWsTradesEvent(msg)) {
      // msg now is WsEventTrades
      console.log('trades event: ', msg);
    } else {
  //    console.log('update: ', msg);
      if(msg.data){
      
        for(var i=0; i<this.dataGrid.gridCells.length; i++){
            if(this.dataGrid.gridCells[i].colNameOriginal == msg.market){
              this.dataGrid.gridCells[i].colAsk = msg.data.ask
              this.dataGrid.gridCells[i].colBid =  msg.data.bid
              this.dataGrid.gridCells[i].colAskSize =  msg.data.askSize
              this.dataGrid.gridCells[i].colBidSize =  msg.data.bidSize
            }
            if(this.dataGrid.gridCells[i].rowNameOriginal == msg.market){
              this.dataGrid.gridCells[i].rowAsk = msg.data.ask
              this.dataGrid.gridCells[i].rowBid =  msg.data.bid
              this.dataGrid.gridCells[i].rowAskSize =  msg.data.askSize
              this.dataGrid.gridCells[i].rowBidSize =  msg.data.bidSize
              
            }
        }
      
      }
      
      
    }
  });
      ws.on("error", (msg) => console.log("err ws on: ", msg));

     var arraySuscrip = []
     for(var i=0; i<this.dataGrid.arrayCurrency.length; i++){
      arraySuscrip.push({
          channel: "ticker",
          market: this.dataGrid.arrayCurrency[i].name,
      })
        }

      ws.subscribe(
        arraySuscrip
      );
    } catch (e) {
      console.error("err conexion: ", e.body);
    }
    }
  },
  mounted() {
    this.getData();
  }
};

</script>


<style>
.iOIHTs {
  position: relative;
  overflow: auto;
  flex: 1 1 0%;
}

.nYTgJ {
  position: absolute;
  min-width: 100%;
}

.knEinJ {
  display: grid;
  place-items: center;
  padding: 1rem;
}

.eyrKlN {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
}

.beovqD {
  position: relative;
  flex: var(--flex);
  box-shadow: rgba(0, 0, 0, 0.5) 0px -4px 20px 0px;
  display: flex;
  flex-direction: column;
}

.hKaykh {
  position: absolute;
  top: -14px;
  right: 16px;
  color: rgb(86, 137, 195);
  background: rgb(4, 29, 57);
  border: 0px;
  padding: 5px 10px;
  height: 14px;
  width: 32px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: ns-resize !important;
}

.kfBtaS {
  text-transform: capitalize;
  color: rgb(126, 211, 33);
  font-size: 0.75rem;
  line-height: 0.938rem;
  transition: color 0.18s ease 0s;
  grid-area: label/label/label/label;
}

.dsLqFG {
  text-transform: capitalize;
  color: rgb(234, 19, 94);
  font-size: 0.75rem;
  line-height: 0.938rem;
  transition: color 0.18s ease 0s;
  grid-area: label/label/label/label;
}

.jCHJGm {
  background-color: rgb(24, 35, 50);
  border: none;
  border-radius: 3px;
  text-align: left;
  padding: 0px 8px;
  transition: background-color 0.18s ease 0s, opacity 0.1s ease 0s,
    box-shadow 0.12s ease 0s;
}

.jCHJGm:hover {
  background-color: rgb(126, 211, 33);
}

.jCHJGm:active {
  opacity: 0.7;
}

.lnucAV {
  background-color: rgb(24, 35, 50);
  border: none;
  border-radius: 3px;
  text-align: right;
  padding: 0px 8px;
  transition: background-color 0.18s ease 0s, opacity 0.1s ease 0s,
    box-shadow 0.12s ease 0s;
}

.lnucAV:hover {
  background-color: rgb(234, 19, 94);
}

.lnucAV:active {
  opacity: 0.7;
}

.jOICzA {
  background-color: rgb(24, 35, 50);
  border: 1px solid rgb(127, 171, 236);
  border-radius: 3px;
  text-align: right;
  padding: 0px 8px;
  transition: background-color 0.18s ease 0s, opacity 0.1s ease 0s,
    box-shadow 0.12s ease 0s;
}

.jOICzA:hover {
  background-color: rgb(234, 19, 94);
}

.jOICzA:active {
  opacity: 0.7;
}

.doQiNa {
  line-height: 1.5rem;
}

.fZjIzB {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
}

.bLXsEZ {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 500;
}

.PiefF {
  opacity: 0.5;
  color: white;
  font-size: 11px;
  line-height: 12px;
  grid-area: qty/qty/qty/qty;
}

.fRmeSw {
  display: grid;
  grid-template-areas: "label . qty";
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
}

.bZNGw {
  display: grid;
  grid-template-areas: "qty . label";
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
}

/* widget bid ask */
.widgetBidAsk {
  box-shadow: rgb(171 180 191) 0px 0px 0px 2px;
  border-radius: 7px;
  display: grid;
  gap: 7px;
  margin-left: 1.5rem;
  padding: 9px 12px;
  flex: 1 1 0%;
}
.titleWidget {
  text-align: center;
  font-weight: 600;
  line-height: 1rem;
}

.wraperBidAsk {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 54px;
  margin: 0px auto;
  width: 100%;
}

.btnBidWidget {
  background-color: rgb(24, 35, 50);
  border: none;
  border-radius: 3px;
  text-align: left;
  padding: 0px 8px;
  transition: background-color 0.18s ease 0s, opacity 0.1s ease 0s,
    box-shadow 0.12s ease 0s;
}

.btnBidWidget:hover {
  background-color: rgb(126, 211, 33);
}

.btnBidWidget:active {
  opacity: 0.7;
}

.wraperBestBidQuanty {
  display: grid;
  grid-template-areas: "label . qty";
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
}
.labelBidQuantyWidget {
  text-transform: capitalize;
  color: rgb(126, 211, 33);
  font-size: 0.75rem;
  line-height: 0.938rem;
  transition: color 0.18s ease 0s;
  grid-area: label/label/label/label;
}
.labelPriceQuantyWidget {
  opacity: 0.5;
  color: white;
  font-size: 11px;
  line-height: 12px;
  grid-area: qty/qty/qty/qty;
}
.labelBidPriceWidget {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
}

.btnAskWidget {
  background-color: rgb(24, 35, 50);
  border: none;
  border-radius: 3px;
  text-align: right;
  padding: 0px 8px;
  transition: background-color 0.18s ease 0s, opacity 0.1s ease 0s,
    box-shadow 0.12s ease 0s;
}

.btnAskWidget:hover {
  background-color: rgb(234, 19, 94);
}

.btnAskWidget:active {
  opacity: 0.7;
}

.wraperBestAskQuanty {
  display: grid;
  grid-template-areas: "qty . label";
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
}
.labelAskQuantyWidget {
  text-transform: capitalize;
  color: rgb(234, 19, 94);
  font-size: 0.75rem;
  line-height: 0.938rem;
  transition: color 0.18s ease 0s;
  grid-area: label/label/label/label;
}

.wraperBestAskPrice {
  line-height: 1.5rem;
}
.labelAskPriceWidget {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
}

.cYZfHn {
  box-shadow: rgb(171 180 191) 0px 0px 0px 2px;
  border-radius: 7px;
  display: grid;
  gap: 7px;
  margin-left: 1.5rem;
  padding: 9px 12px;
  flex: 1 1 0%;
}

.cUrESk {
  text-align: center;
  font-weight: 600;
  line-height: 1rem;
}

.gqyFaB {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 54px;
  margin: 0px auto;
  width: 100%;
}

.eEsajR {
  display: flex;
  grid-area: FUTURE/header/auto/auto;
  place-self: center start;
}

.bTozGg {
  display: flex;
  grid-area: d2022-09-30/header/auto/auto;
  place-self: center start;
}

.jZQoQu {
  display: flex;
  grid-area: d2022-12-30/header/auto/auto;
  place-self: center start;
}

.kWKTUx {
  display: flex;
  grid-area: header/FUTURE/auto/auto;
  place-self: start center;
}

.ldrAHI {
  display: flex;
  grid-area: header/d2022-09-30/auto/auto;
  place-self: start center;
}

.cprPiS {
  display: flex;
  grid-area: header/d2022-12-30/auto/auto;
  place-self: start center;
}

.jDutnO {
  display: flex;
  grid-area: header/d2023-03-31/auto/auto;
  place-self: start center;
}

.dataCellStyle {
  display: flex;
  place-self: auto;
}

.FiXJq {
  display: flex;
  grid-area: SPOT/FUTURE/auto/auto;
  place-self: auto;
}

.iyCzsD {
  display: flex;
  grid-area: SPOT/d2022-09-30/auto/auto;
  place-self: auto;
}

.fdgfUG {
  display: flex;
  grid-area: FUTURE/d2022-09-30/auto/auto;
  place-self: auto;
}

.dNMxIN {
  display: flex;
  grid-area: SPOT/d2022-12-30/auto/auto;
  place-self: auto;
}

.hzQUCs {
  display: flex;
  grid-area: FUTURE/d2022-12-30/auto/auto;
  place-self: auto;
}

.iXultt {
  display: flex;
  grid-area: SPOT/d2023-03-31/auto/auto;
  place-self: auto;
}

.fwPcwQ {
  display: flex;
  grid-area: FUTURE/d2023-03-31/auto/auto;
  place-self: auto;
}

.bPaWuB {
  display: flex;
  grid-area: d2022-09-30/d2022-12-30/auto/auto;
  place-self: auto;
}

.gZWjHh {
  display: flex;
  grid-area: d2022-09-30/d2023-03-31/auto/auto;
  place-self: auto;
}

.fOwYIz {
  display: flex;
  grid-area: d2022-12-30/d2023-03-31/auto/auto;
  place-self: auto;
}

.fmufYj {
  display: flex;
  grid-area: 2/2 / auto/auto;
}

.wdNVf {
  display: flex;
  grid-area: 3/3 / auto/auto;
}

.fiOEEj {
  display: flex;
  grid-area: 4/4 / auto/auto;
}

.symBf {
  display: flex;
  grid-area: 5/5 / auto/auto;
}

.eitOlM {
  display: flex;
  grid-area: 1/2 / auto/auto;
}

.ecvKIB {
  display: flex;
  grid-area: 1/3 / auto/auto;
}

.eNknau {
  display: flex;
  grid-area: 1/4 / auto/auto;
}

.eHmjxj {
  display: flex;
  grid-area: 1/5 / auto/auto;
}

.rowHeaderGridStyle {
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: black;
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
  white-space: pre-line;

  top: 0px;
  left: 0px;
  z-index: 2;
  padding-left: 1rem;
  width: 100%;
}
.rowHeaderGridStyle > * {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
  color: black;
}

.rowHeaderGridStyle small {
  display: block;
  font-size: 12px;
  line-height: 13px;

  font-weight: bold;
}

.colHeaderGridStyle {
  color: black;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
  padding-top: 5px;
  text-align: center;
  position: sticky;
  width: 100%;
  height: 48px;
  z-index: 1;
  padding-left: 1rem;
  top: 0px;
  background: white;
  display: flex;
}

.colHeaderGridStyle > * {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
}

.colHeaderGridStyle small {
  display: block;
  font-size: 12px;
  line-height: 13px;

  font-weight: bold;
}

.fYmith {
  color: black;
  background: white;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
  padding-top: 0px;
  text-align: left;

  position: sticky;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding-left: 1rem;
  left: 0px;
}

.fYmith > * {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
  color: black;
}

.fYmith small {
  display: block;
  font-size: 12px;
  line-height: 13px;

  font-weight: bold;
}

.bDRWCE {
  color: black;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
  padding-top: 5px;
  text-align: center;
  position: sticky;
  width: 100%;
  height: 48px;
  z-index: 1;
  padding-left: 1rem;
  top: 0px;
  background: white;
}

.bDRWCE > * {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
}

.bDRWCE small {
  display: block;
  font-size: 12px;
  line-height: 13px;

  font-weight: bold;
}

.lineaHorizontalEspVacio {
  place-self: center stretch;
  height: 1px;
  background-color: rgb(171 180 191);
}

.LineaHorizontalColumnasHeader {
  place-self: end stretch;
  height: 1px;
  background: rgb(171 180 191);
}

.lineaVerticalBorderIzq {
  place-self: stretch start;
  width: 1px;
  background: rgb(171 180 191);
  left: -2px;
}

.wraperGrid {
  flex: 1 1 0%;
  position: relative;
  background: white;
  display: block;
    width: 100%;
    overflow-x: auto;
    margin-bottom: 40px;
}

.gridStyle {
  position: relative;
  display: grid;
  gap: 1rem 0px;
  min-height: 100%;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px;
}

.gridRowsColumns {
  grid-template-columns: [header]168px[FUTURE]280px[d2022-09-30]280px[d2022-12-30]280px[d2023-03-31]280px;
  grid-template-rows: [header]50px[SPOT]107px[FUTURE]107px[d2022-09-30]107px[d2022-12-30]107px;
}

.UupLu {
  padding: 8.75px 20.51px;
  border-radius: 3px;
  background-color: rgb(4, 29, 57);
  opacity: 0.7;
  color: rgb(255, 255, 255);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 14px;
  position: sticky;
  bottom: 14px;
  left: 14px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  white-space: nowrap;
  width: 154px;
  height: 36px;
  z-index: 2;
}

.UupLu::before {
  content: "";
  margin-right: 8px;
  margin-left: -8.02px;
  box-sizing: border-box;
  height: 4px;
  width: 14px;
  border: 2px solid rgb(127, 171, 236);
  border-radius: 3px;
  background-color: rgb(9, 33, 58);
}

.llUhJv {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 16px;
}

.btIEPI {
  display: grid;
  grid-template-columns: 13px auto;
  gap: 4px;
  -webkit-box-align: center;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  color: white;
  cursor: pointer;
  padding: 3px 5px;
  border: 0px;
  border-radius: 4px;
  background: none;
  transition: color 0.16s ease 0s, box-shadow 0.16s ease 0s;
}

.btIEPI:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btIEPI:hover {
  color: rgb(204, 204, 204);
}

.btIEPI:active {
  color: rgb(170, 170, 170);
}

.btIEPI:focus {
  box-shadow: rgb(204, 204, 204) 0px 0px 0px 1px;
}

.fcMuPJ {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
}

.fcMuPJ > * {
  display: block;
  margin: auto;
}

.iHBNil {
  display: grid;
  grid-template-columns: 50px 50px 80px 300px 78px 64px 100px 52px 80px 80px 300px 230px 68px;
  grid-template-areas: "time venue product desc action qty price side compl remain oid account date";
  gap: 16px;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 22px;
  border-bottom: 1px solid rgb(39, 54, 76);
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  height: 42px;
  transition: opacity 0.2s ease 0s;
}

.bbxcoO {
  position: sticky;
  top: 0px;
  z-index: 1;
  color: rgb(127, 171, 236);
  background: rgb(9, 21, 35);
}

.czsYfr {
  text-align: center;
}

.bbtXwP {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}

.deTmIc {
  height: 42px;
  display: grid;
  grid-template-columns: 1fr auto;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 16px;
  background: rgb(4, 29, 57);
}

.eKCMFt {
  align-self: stretch;
  display: flex;
  padding: 8px 0px 0px;
  -webkit-box-align: stretch;
  align-items: stretch;
  gap: 8px;
}

.gzBxlU {
  border: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(4, 25, 46);
  color: rgba(255, 255, 255, 0.698);
  padding: 0px 29px;
  border-radius: 3px 3px 0px 0px;
  font-weight: 600;
}

.gzBxlU:hover {
  background: rgba(9, 21, 35, 0.6);
  color: rgba(255, 255, 255, 0.847);
  cursor: pointer;
}

.gzBxlU.active {
  color: white;
  background: rgb(9, 21, 35);
}

.gKdgyB {
  background-color: rgb(39, 54, 76);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 3.15rem;
  padding: 0px;
  text-align: center;
}

.gKdgyB:disabled {
  cursor: default;
  opacity: 0.6;
}

.hcRWXs {
  background-color: rgb(127, 171, 236);
  border: none;
  color: rgb(14, 105, 238);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 3.15rem;
  padding: 0px;
  text-align: center;
}

.hcRWXs:disabled {
  cursor: default;
  opacity: 0.6;
}

.fjHRwJ {
  border-radius: 0px;
  margin-right: 0px;
}

.fjHRwJ:first-child {
  border-radius: 3px 0px 0px 3px;
}

.fjHRwJ:last-child {
  border-radius: 0px 3px 3px 0px;
}

.gdLnaW {
  border-radius: 3px;
  margin-right: 0px;
}

.gdLnaW:first-child {
  border-radius: 3px;
}

.gdLnaW:last-child {
  border-radius: 3px;
}

.enUOFX {
  display: flex;
}

.kVNvFy {
  margin-bottom: 1rem;
}

.dxRiyP {
  border-radius: 5px;
}

.cjYWhY div > ::-webkit-scrollbar {
  width: 10px;
}

.cjYWhY div > ::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: rgb(9, 33, 58);
}

.bPKzAX {
  padding: 0px 11px;
  text-transform: capitalize;
}

.fFyHQq {
  -webkit-box-align: center;
  align-items: center;
  display: grid;
  padding: 24px 15px;
}

.dxhVcm {
  height: 56px;
  display: flex;
  background: rgb(9, 33, 58);
}

.DCpBX {
  display: flex;
}

.DCpBX > label {
  margin-bottom: 0px;
}

.grgUSM {
  grid-template-columns: repeat(5, min-content) auto;
  gap: 0px;
}

.hmdMrF {
  background: rgb(9, 33, 58);
  height: 100%;
  width: 2px;
}

.hmdMrF::after {
  content: "";
  display: block;
  height: 30px;
  margin-top: 12px;
  background: linear-gradient(
    transparent 0%,
    rgb(39, 44, 49) 50%,
    transparent 100%
  );
}

.jekmot {
  padding: 12px 15px;
  border-radius: 0px;
}

.jekmot:first-child {
  border-radius: 3px 0px 0px 3px;
}

.jekmot:last-child {
  border-radius: 0px 3px 3px 0px;
}

.iRpvXH {
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.cZhqJf {
  min-width: 130px;
}

.cZhqJf > * {
  flex: 1 1 0%;
}

.ckNFf {
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(127, 171, 236, 0.2);
  flex: 1 1 0%;
}

.lmOJyV {
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(127, 171, 236, 0.2);
  flex: 1 1 0%;
}

.fjmXAJ {
  background-color: transparent;
}

.hhQaUQ {
  background-color: transparent;
}
</style>
