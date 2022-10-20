<template>
    <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th>Exchange</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Distance</th>
                    <th>Side</th>
                    <th>Time</th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayHistory" :key="index">
                    <td>{{item.exchange}}</td>
                    <td>{{item.description}}</td>
                    <td>
                        <span v-if="item.status == 1" >Filled</span>
                        <span v-if="item.status == 2" >Cancelled</span>
                    </td>
                    <td>{{item.type}}</td>
                    <td>{{item.size}}</td>
                    <td>{{item.distance}}</td>
                    <td>{{item.side}}</td>
                    <td>{{item.time}}</td>
                  </tr>
                
                </tbody>
              </table>
            </div>
</template>

<script>
import Cookies from "js-cookie";
    export default {
      data() {
        return {
            arrayHistory: []
        }
      },
      methods: {
        addTokenBearer() {
      var token = Cookies.get("fintCurrenUser");
      token = JSON.parse(token);
      this.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.token}`;
    },
    makeToast(variant = null, title, content) {
      this.$bvToast.toast(content, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
    async getHistoryOrders(){
        this.addTokenBearer()
        await this.axios
        .get(this.$store.state.back.urlBack +  "/history_orders?type=trade" )
        .then((response) => {
          console.log(response);
            this.arrayHistory = response.data
        })
        .catch((error) => {
          console.log(error);
          this.makeToast("danger", "error", error);
        });
    }
      },
      mounted () {
        this.getHistoryOrders()
      },
        
    }
</script>

