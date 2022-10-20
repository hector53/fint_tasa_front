<template>
     <div
        data-testid="strategy-cell"
        :data-row="dataRow"
        class=" dataCellStyle"
        :style="{'grid-area': gridArea}"
      >
        <div class="widgetBidAsk">
          <div
            aria-label="legs expiration dates"
            class=" titleWidget"
          >
            {{title}}
          </div>
          <div class="wraperBidAsk">
            <button
              data-testid="strategy-action"
              aria-label=""
              class=" btnBidWidget"
              @click="showModal(1,dividirBidAsk(itemCell.rowAsk,itemCell.colBid) )"
            >
              <div class=" wraperBestBidQuanty">
                <span class=" labelBidQuantyWidget">CCT</span
                ><span
                  data-testid="best-bid-quantity"
                  class="labelPriceQuantyWidget"
                  ></span
                >
              </div>
              <div
                data-testid="best-bid-price"
                class=" wraperBestBidPrice"
              >
                <span class="labelBidPriceWidget"
                  >{{dividirBidAsk(itemCell.rowAsk,itemCell.colBid)}}</span
                ><span
                  class=" labelPriceEmpty"
                ></span>
              </div></button
            ><button
              data-testid="strategy-action"
              aria-label=""
              class=" btnAskWidget"
              @click="showModal(0,dividirBidAsk(itemCell.rowBid,itemCell.colAsk))"
            >
              <div class=" wraperBestAskQuanty">
                <span class=" labelAskQuantyWidget">ICT</span
                ><span
                  data-testid="best-ask-quantity"
                  class=" labelPriceQuantyWidget"
                  ></span
                >
              </div>
              <div
                data-testid="best-ask-price"
                class=" wraperBestBidPrice"
              >
                <span class=" labelBidPriceWidget"
                  >{{dividirBidAsk(itemCell.rowBid,itemCell.colAsk)}}</span
                ><span
                  class=" labelPriceEmpty"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
      props:["dataRow","dataCol", "gridArea", "title", "bid", "ask", "markSidebar", "markHeader", "itemCell", "indexCell"],
      data() {
      return {
         
      }
      },
      methods: {
        dividirBidAsk(num1, num2){
          var num3 = num2 / num1
          return num3.toFixed(5)
        },
        showModal(type, bidask){
          this.$emit("showModal", {"title": this.title,
           "type": type, "bidask": bidask, "markSidebar":this.markSidebar,
          "markHeader": this.markHeader, "dataRow":this.dataRow,"dataCol":this.dataCol, 
          "itemCell": this.itemCell, "indexCell": this.indexCell
          })
        }
      },
  };
  </script>
  
  <style></style>
  