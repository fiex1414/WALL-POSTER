<template>
  <div class="ma-0 pa-0">
    <v-row>
      <v-col cols="12" md="8">
        <v-container class="min-height-basket" v-if="basket.length > 0" style="padding-top:0;">
          <v-row class="mx-5">
            <v-col cols="12">
              <h1>SHOPPING BAG</h1>
              <span id="total-posters">{{basket.length}} ITEMS</span>
            </v-col>
          </v-row>
          <v-row v-for="poster in basket" :key="poster.name" class="full">
            <v-col class="image_area" cols="6" sm="3">
              <router-link
              style="text-decoration:none;"
              v-bind:to="{
            name: 'details', params: {
            id: poster.id,
            name: poster.name,
            price: poster.price,
            description: poster.description,
            image:poster.image,
          }}
          "
            >
              <v-img v-bind:src="poster.image" contain></v-img>
              </router-link>
            </v-col>
            <v-col class="detailed_area" cols="6" style="padding-top:0;">
              <v-row style="padding:0;margin:0;" :class="{'fill-height': $vuetify.breakpoint.xs}">
                <v-col class="no_bottom_padding" cols="12">
                  <h2 id="grey-text">POSTER</h2>
                  <h4 id="poster-name">{{ poster.name }}</h4>
                  <h2 id="grey-text" class="hidden-sm-and-up price">{{ poster.price }} DKK</h2>
                </v-col>
                <v-col id="dropdown-example" cols="8" sm="6">
                  <v-overflow-btn
                    class="bag-size"
                    style="border-radius:0!important;"
                    :items="dropdown_size"
                    label="50X70 CM"
                    target="#dropdown-example"
                    outlined
                    depressed
                    tile
                    background-color="white"
                  ></v-overflow-btn>
                </v-col>

                <v-col cols="3" sm="2">
                  <v-row row wrap align="center" class="quantity-box fill-height">
                    <v-col sm="6" style="padding:0;">
                      <p class="pa-0 ma-0 text-end">{{poster.quantity}}</p>
                    </v-col>
                    <v-col sm="6" class="py-0 my-0" align="end" style="line-height:1px;padding:0;">
                      <v-icon
                        @click="increaseQtn(poster)"
                        style="line-height:15px;cursor:pointer;"
                        class="pa-0 ma-0"
                      >keyboard_arrow_up</v-icon>
                      <v-icon
                        @click="decreaseQtn(poster)"
                        style="line-height:15px;cursor:pointer;"
                        class="pa-0 ma-0"
                      >keyboard_arrow_down</v-icon>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  align="end"
                  cols="12"
                  class="hidden-sm-and-up mt-auto pb-0"
                  style="display:inline;"
                >
                  <v-icon
                    @click="addToFavourites(poster)"
                    style="font-size:30px;display:inline;"
                    color="black"
                  >favorite_border</v-icon>
                  <v-icon
                    @click="deleteItem(poster)"
                    style="font-size:30px;display:inline;"
                    color="black"
                  >delete</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="hidden-xs-only">
              <v-row style="padding:0;margin:0;" class="fill-height">
                <v-col align="end" cols="12">
                  <v-icon
                    @click="addToFavourites(poster)"
                    style="font-size:30px;"
                    color="black"
                  >favorite_border</v-icon>
                  <v-icon @click="deleteItem(poster)" style="font-size:30px;" color="black">delete</v-icon>
                </v-col>

                <v-col cols="12" align="end" class="mt-auto pb-0">
                  <h2 id="grey-text" class="price">{{ poster.price }} DKK</h2>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="min-height-basket" v-else style="padding-top:0;">
          <v-row class="mx-5">
            <v-col cols="12">
              <h1>SHOPPING BAG</h1>
            </v-col>
          </v-row>
          <v-row class="mx-5 mb-5">
            <p class="mx-3">Your shopping bag is empty.</p>
          </v-row>
        </v-container>
      </v-col>

      <v-col id="black_area" cols="12" md="4" style="padding: 0 30px;" class="fill-height;">
        <v-container>
          <v-row id="black_area_position">
            <v-col cols="12">
              <h1>TOTAL</h1>
            </v-col>
            <v-col cols="6">
              <h4>SUB-TOTAL</h4>
            </v-col>
            <v-col cols="6" align="end">
              <h4>{{subTotal}} DKK</h4>
            </v-col>
            <v-col cols="6" style="border-bottom:2px solid white;">
              <h4>DELIVERY</h4>
            </v-col>
            <v-col cols="6" align="end" style=";border-bottom:2px solid white;">
              <h4>{{delivery}} DKK</h4>
            </v-col>
            <v-col cols="6">
              <h4>TO PAY</h4>
            </v-col>
            <v-col cols="6" align="end">
              <h4>{{ total }} DKK</h4>
            </v-col>
            <v-col cols="12">
              <v-btn
              @click="addCheckoutItem()"
                :ripple="false"
                block
                tile
                depressed
                color="#E4E4E3 "
                style="border:2px solid black !important;color:black;height:50px;"
                
              >CHECKOUT</v-btn>
            </v-col>
            <v-col cols="12" v-if="delivery > 0">
              <v-icon color="white">info_outline</v-icon>
              <span>Free delivery when you spend over 200 DKK</span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { dbPosterAdd } from "../../firebase";

export default {
  data() {
    return {
      dropdown_size: ["50X70 CM", "30X40 CM", "70X100 CM"],
      basketDump: [],
      favouritesDump: [],
      posterItems: []
    };
  },
  methods: {
    increaseQtn(poster) {
      poster.quantity++;
    },
    decreaseQtn(poster) {
      poster.quantity--;
      if (poster.quantity === 0) {
        this.basket.splice(this.basket.indexOf(poster), 1);
      }
    },
    addToFavourites(poster) {
      this.favouritesDump.push({
        name: poster.name,
        price: poster.price,
        quantity: 1,
        image: poster.image
      });
      this.$store.commit("addFavouritesItems", this.favouritesDump);
      this.favouritesDump = [];
      this.basket.splice(this.basket.indexOf(poster), 1);
    },
    deleteItem(poster) {
      this.basket.splice(this.basket.indexOf(poster), 1);
    },
    addCheckoutItem() {
      this.$store.dispatch("setCheckoutItem");
      this.basket.splice(this.basket);
      alert("Thank you for your purchase");
    },
  },
  computed: {
    basket() {
      //  return this.$store.state.basketItems
      return this.$store.getters.getBasketItems;
    },
    subTotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    delivery() {
      var deliveryPrice = 39.95;
      if (this.subTotal >= 200) {
        deliveryPrice = 0;
      } else {
        deliveryPrice = 39.95;
      }
      return deliveryPrice;
    },
    total() {
      var totalCost = this.subTotal;
      return totalCost + this.delivery;
    }
  }
};
</script>

<style lang="scss" scoped>
.full {
  margin: 0 20px 20px 20px;
}
#grey-text {
  color: map-get($colorz, grey);
}
.quantity-box {
  border: 2px solid black;
  background-color: white;
  height: 39px;
}
.min-height-basket {
  min-height: 62vh;
}
#black_area_position {
  position: fixed;
  padding-right: 40px;
}
#total-posters {
  font-weight: bold;
  color: map-get($colorz, grey);
  font-size: 14px;
}

@media only screen and (max-width: 959px) {
  #black_area_position {
    position: static;
    padding-right: 15px;
    padding-left: 15px;
  }
  .min-height-basket {
    min-height: unset;
  }
}
@media only screen and (max-width: 890px) {
  .no_bottom_padding {
    padding-bottom: 0;
  }
}
@media only screen and (max-width: 680px) {
  #grey-text.price {
    font-size: 20px;
  }
  #poster-name {
    font-size: 12px;
  }
}
@media only screen and (max-width: 600px) {
  #grey-text {
    font-size: 15px;
  }
  .quantity-box {
    height: 39px;
  }
}
@media only screen and (max-width: 500px) {
  .detailed_area {
    padding-left: 0;
    padding-right: 0;
  }
  .image_area {
    padding-right: 0;
  }
  .full {
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
#black_area {
  background-color: map-get($colorz, grey);
  background-size: auto;
  margin: 0 !important;
  color: map-get($colorz, white);
}
.bag-size.v-text-field.v-text-field--enclosed .v-text-field__details,
.bag-size.v-text-field.v-text-field--enclosed
  > .v-input__control
  > .v-input__slot {
  padding: 0 12px !important;
}
</style>