<template>
  <div>
    <h2>dato {{ time }}</h2>
  </div>
</template>

<script>
import { isWsTradesEvent }  from "ftx-api";
import { WebsocketClient } from "ftx-api";
export default {
  data() {
    return {
      time: null,
    };
  },
  mounted() {
    
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
      console.log('update: ', msg);
    }
  });
      ws.on("error", (msg) => console.log("err ws on: ", msg));

     
      ws.subscribe([
        {
          channel: "ticker",
          market: "BTC/USD",
        },
        {
          channel: "ticker",
          market: "BTC-PERP",
        },
      ]);
    } catch (e) {
      console.error("err conexion: ", e.body);
    }
  },
};
</script>
