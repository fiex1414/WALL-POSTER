<template>
  <v-container class="page_container" v-if="favourites.length > 0">
    <v-row row wrap>
      <v-col id="headline-padding" cols="12" style="line-height:25px;">
        <h1>FAVOURITES</h1>
        <span id="total-posters">{{favourites.length}} ITEMS</span>
      </v-col>
    </v-row>
    <v-row row wrap class="pb-5">
      <v-col
        cols="12"
        sm="6"
        md="4"
        id="product-padding"
        v-for="poster in favourites"
        :key="poster.name"
      >
        <v-row row wrap>
          <v-col cols="12" class="pb-0">
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
              <div id="pink-product">
                <v-row class="align-center fill-height">
                  <v-img class="product-image" contain v-bind:src="poster.image"></v-img>
                </v-row>
              </div>
            </router-link>
          </v-col>
          <v-col cols="7" class="pb-0">
            <span id="product-name">{{poster.name}}</span>
          </v-col>
          <v-col cols="5" align="end" class="pb-0">
            <span id="product-price">{{poster.price}} DKK</span>
          </v-col>
          <v-col
            id="dropdown-example"
            cols="7"
            class="pt-0"
            style="padding-left:12px;padding-right:13px;"
          >
            <v-overflow-btn
              style="border-radius:0!important;"
              class="my-2"
              :items="dropdown_size"
              label="50X70 CM"
              target="#dropdown-example"
              outlined
              depressed
              tile
              background-color="white"
            ></v-overflow-btn>
          </v-col>
          <v-col cols="3" class="px-5 pb-0 pt-2">
            <v-row
              row
              wrap
              align="center"
              class="fill-height"
              style="border:2px solid black;background-color:white;height:38px;"
            >
              <v-col cols="6" style="padding:0;">
                <p class="pa-0 ma-0 text-end">{{poster.quantity}}</p>
              </v-col>
              <v-col cols="6" class="py-0 my-0" align="end" style="line-height:1px;padding:0;">
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
          <v-col id="delete-padding" cols="2" class="pl-1 pb-0">
            <v-icon
              @click="deleteItem(poster)"
              style="font-size:45px;cursor:pointer;"
              color="black"
            >delete</v-icon>
          </v-col>
          <v-col cols="12" class="pb-0 pt-2">
            <v-btn
              style="border:2px solid black!important;"
              dark
              tile
              large
              depressed
              color="blacktransparent"
              block
              @click="addToBasket(poster)"
            >MOVE TO BAG</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="page_container">
    <v-row row wrap>
      <v-col id="headline-padding" cols="12" style="line-height:25px;">
        <h1>FAVOURITES</h1>
      </v-col>
    </v-row>
    <v-row row wrap id="headline-padding">
      <p>You have no favourites yet.</p>
    </v-row>
  </v-container>
</template>

<script>
import { dbPosterAdd } from "../../firebase";

export default {
  data() {
    return {
      dropdown_size: ["50X70 CM", "30X40 CM", "70X100 CM"],
      favouritesDump: [],
      basketDump: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("setPosterItems");
  },
  methods: {
    addToBasket(poster) {
      this.basketDump.push({
        name: poster.name,
        price: poster.price,
        quantity: poster.quantity,
        image: poster.image
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
      this.favourites.splice(this.favourites.indexOf(poster), 1);
    },
    increaseQtn(poster) {
      poster.quantity++;
    },
    decreaseQtn(poster) {
      poster.quantity--;

      if (poster.quantity === 0) {
        this.favourites.splice(this.favourites.indexOf(poster), 1);
      }
    },
    deleteItem(poster) {
      this.favourites.splice(this.favourites.indexOf(poster), 1);
    }
  },
  computed: {
    posterItems() {
      return this.$store.getters.getPosterItems;
    },
    favourites() {
      //  return this.$store.state.FavouritesItems
      return this.$store.getters.getFavouritesItems;
    }
  }
};
</script>

<style lang="scss" scoped>
.page_container {
  padding-left: 100px;
  padding-right: 100px;
}
#headline-padding {
  padding-left: 30px;
}
#pink-product {
  background-color: map-get($colorz, rose);
  height: 50vh;
  cursor: pointer;
}
#product-padding {
  padding: 0 30px;
  margin-bottom: 20px;
}
#product-size {
  font-weight: bold;
  color: map-get($colorz, darkgrey);
  font-size: 14px;
}
#product-name {
  font-weight: bold;
  color: map-get($colorz, black);
  font-size: 18px;
}
#product-price {
  font-weight: bold;
  color: map-get($colorz, black);
  font-size: 18px;
}
#total-posters {
  font-weight: bold;
  color: map-get($colorz, grey);
  font-size: 14px;
}
.product-image {
  height: 45vh;
  overflow: visible;
}
#delete-padding {
  padding-top: 6px;
}
@media only screen and (max-width: 1200px) {
  .page_container {
    padding-left: 10px;
    padding-right: 10px;
  }
  #product-name {
    font-size: 16px;
  }
  #product-type {
    font-size: 16px;
  }
  #product-price {
    font-size: 16px;
  }
}
@media only screen and (max-width: 1100px) {
  .page_container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media only screen and (max-width: 950px) {
  .page_container {
    padding-left: 90px;
    padding-right: 90px;
  }
  #product-padding {
    padding: 0 40px;
  }
  .product-image {
    height: 35vh;
  }
  #pink-product {
    height: 40vh;
  }
  #product-name {
    font-size: 14px;
  }
  #product-type {
    font-size: 14px;
  }
  #product-price {
    font-size: 14px;
  }
  #product-lineheight {
    line-height: 18px;
  }
}
@media only screen and (max-width: 850px) {
  .page_container {
    padding-left: 70px;
    padding-right: 70px;
  }
  #headline-padding {
    padding-left: 20px;
  }
  #product-padding {
    padding: 0 20px;
  }
  #filter-padding {
    padding-left: 20px;
  }
  #sort-padding {
    padding-right: 20px;
  }
}

@media only screen and (max-width: 750px) {
  .page_container {
    padding-left: 40px;
    padding-right: 40px;
  }
  #headline-padding {
    padding-left: 10px;
  }
}
@media only screen and (max-width: 670px) {
  .page_container {
    padding-left: 15px;
    padding-right: 15px;
  }
}
@media only screen and (max-width: 600px) {
  .page_container {
    padding-left: 30px;
    padding-right: 30px;
  }
  #headline-padding {
    padding-left: 30px;
  }
  #product-padding {
    padding: 0 100px;
    margin-bottom: 30px;
  }
}
@media only screen and (max-width: 530px) {
  .page_container {
    padding-left: 20px;
    padding-right: 20px;
  }
  #headline-padding {
    padding-left: 10px;
  }
  #product-padding {
    padding: 0 80px;
    margin-bottom: 20px;
  }
  #filter-padding {
    padding-left: 10px;
    padding-right: 10px;
  }
  #sort-padding {
    padding-right: 10px;
    padding-left: 10px;
  }
}
@media only screen and (max-width: 470px) {
  #product-padding {
    padding: 0 60px;
    margin-bottom: 20px;
  }
}
@media only screen and (max-width: 430px) {
  #product-padding {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 400px) {
  h1{
    font-size:25px;
  }
}
@media only screen and (max-width: 380px) {
  #product-padding {
    padding: 0 30px;
  }
}
</style>
<style lang="scss">
.v-text-field--filled > .v-input__control > .v-input__slot,
.v-text-field--full-width > .v-input__control > .v-input__slot,
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: unset;
}
.v-overflow-btn .v-select__slot {
  height: 38.5px !important;
  cursor: pointer !important;
}
.v-text-field.v-text-field--enclosed .v-input__prepend-outer,
.v-text-field.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field.v-text-field--enclosed .v-input__append-inner,
.v-text-field.v-text-field--enclosed .v-input__append-outer {
  margin-top: 0 !important;
}
.v-overflow-btn .v-select__selection--comma {
  margin-left: 0 !important;
}
.v-overflow-btn .v-label {
  margin-left: 0 !important;
  font-weight: normal;
}
.v-overflow-btn .v-input__append-inner {
  width: unset !important;
}
.mdi-menu-down::before {
  content: "\f140" !important;
}
#dropdown-example {
  height: 38.5px !important;
}
</style>