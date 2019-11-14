<template>
  <div class="ma-0 pa-0">
    <v-row>
      <v-col cols="12" md="8">
        <v-container
          class="min-height-basket"
          v-if="orderItems.length > 0"
          fluid
          style="padding-top:0;"
        >
          <v-row class="mx-5">
            <v-col cols="12">
              <h1>ORDERS</h1>
              <span id="total-orders">{{orderItems.length}} NEW ORDERS</span>
            </v-col>
          </v-row>
          <v-row
            class="mb-5"
            :class="{'mx-0': $vuetify.breakpoint.smAndDown, 'mx-5': $vuetify.breakpoint.mdAndUp}"
          >
            <v-simple-table id="menu-table">
              <thead>
                <tr>
                  <th class="text-left" style="width:10%;">NR</th>
                  <th class="text-left" style="width:10%;">QNT</th>
                  <th class="text-left" style="width:30%;">POSTER(S)</th>
                  <th class="text-left" style="width:20%;">PRICE</th>
                  <th class="text-left" style="width:10%;">STATUS</th>
                  <th class="text-left" style="width:100px;">ARCHIVE</th>
                  <th class="text-left" style="width:100px;">REMOVE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderItems" :key="item.name">
                  <td>{{ item.orderNumber }}</td>
                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >{{ subitem.quantity }}</p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >{{ subitem.name }}</p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >{{ subitem.price }} DKK</p>
                  </td>
                  <td>
                    <v-tooltip bottom color="blacktransparent">
                      <template v-slot:activator="{ on }">
                        <div
                          v-on="on"
                          id="status_box"
                          @click="switchStage(item.id)"
                          v-bind:class="item.status"
                        >{{item.status}}</div>
                      </template>
                      <span>
                        <b>Click</b> to switch status
                      </span>
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip bottom color="blacktransparent">
                      <template v-slot:activator="{ on }">
                        <v-btn small text @click="addToBasket(item)">
                          <v-icon v-on="on" color="grey">archive</v-icon>
                        </v-btn>
                      </template>
                      <span>Archive to "hide" it from orders list</span>
                    </v-tooltip>
                  </td>
                  <td>
                    <v-btn small text @click="deleteOrderItem(item.id)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-row>
        </v-container>
        <v-container class="min-height-basket" v-else style="padding-top:0;">
          <v-row class="mx-5">
            <v-col cols="12">
              <h1>ORDERS</h1>
            </v-col>
          </v-row>
          <v-row class="mx-5 mb-5">
            <p class="mx-3">You have no new orders waiting.</p>
          </v-row>
        </v-container>
      </v-col>
      <v-col id="black_area" cols="12" md="4" style="padding: 0 30px;" class="fill-height;">
        <v-container>
          <v-col cols="12">
            <h1>REVENUE</h1>
          </v-col>
          <v-row style="padding-right:40px;"></v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { dbOrders } from "../../firebase";

export default {
  data() {
    return {
 
    };
  },
  beforeCreate() {
    this.$store.dispatch("setOrderItems");
  },

  methods: {
    switchStage(id) {
      /*
      dbOrders.doc(id).update({status:"incomplete"})
        .then(() => {

        })*/
      let selectedOrderItem = this.orderItems.filter(item => item.id === id)[0];

      if (selectedOrderItem.status === "inprogress") {
        dbOrders
          .doc(id)
          .update({ status: "complete" })
          .then(() => {});
      } else if (selectedOrderItem.status === "incomplete") {
        dbOrders
          .doc(id)
          .update({ status: "inprogress" })
          .then(() => {});
      } else if (selectedOrderItem.status === "complete") {
        dbOrders
          .doc(id)
          .update({ status: "incomplete" })
          .then(() => {});
      }
    },
    deleteOrderItem(id) {
      dbOrders
        .doc(id)
        .delete()
        .then(() => {
          console.log("Stuff is deleted");
        })
        .catch(error => {});
    },
  },
  computed: {
    orderItems() {
      // return this.$store.state.menuItems
      return this.$store.getters.getOrderItems;
    },
  }
};
</script>

<style lang="scss" scoped>
#status_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 90px;
  font-size: 12px;
  cursor: pointer;
  margin: 5px 0;
  color: map-get($colorz, white);
}
.min-height-basket {
  min-height: 62vh;
}
#total-orders {
  font-weight: bold;
  color: map-get($colorz, grey);
  font-size: 14px;
}
#menu-table {
  max-width: 100%;
  margin: 0 16px;
}
@media only screen and (max-width: 959px) {
  .min-height-basket {
    min-height: unset;
  }
}
@media only screen and (max-width: 765px) {
  p {
    font-size: 10px;
  }
}
@media only screen and (max-width: 680px) {
  p {
    font-size: 8px;
    font-weight: bold;
  }
}
@media only screen and (max-width: 630px) {
  #menu-table {
    margin: 0;
  }
}
@media only screen and (max-width: 400px) {
  h1{
    font-size:25px;
  }
}
</style>
<style lang="scss">
.theme--light.v-data-table {
  background-color: map-get($colorz, back) !important;
}
.theme--light.v-data-table thead tr th {
  color: map-get($colorz, black) !important;
}
tr:hover {
  background-color: #ddd !important;
}
table {
  font-family: map-get($fontz, mainfont);
}
</style>