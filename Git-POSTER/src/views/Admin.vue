
<template>
  <v-container class="page_container">
    <v-row row wrap style="max-width:100%;margin:0;">
      <v-col id="headline-padding" cols="12" sm="9" md="10" style="line-height:25px;">
        <h1>EDIT POSTERS</h1>
        <span id="total-posters">11 VARER</span>
      </v-col>
      <v-col id="addbutton-padding" cols="12" sm="3" md="2">
        <v-btn
          to="/addNew"
          style="font-weight:bold;border:2px solid black;"
          block
          tile
          outlined
          color="black"
        >ADD NEW</v-btn>
      </v-col>

      <v-row row wrap style="max-width:100%;margin:0;">
        <v-col
          cols="6"
          sm="4"
          id="product-padding"
          v-for="poster in posterItems"
          :key="poster.name"
        >
          <v-row justify="end" class="pr-2">
            <router-link
              style="text-decoration:none;"
              v-bind:to="{
            name: 'edit', params: {
            id: poster.id,
            name: poster.name,
            price: poster.price,
            description: poster.description,
            image: poster.image,
          }}
          "
            >
              <v-icon style="font-size:30px;" color="black">edit</v-icon>
            </router-link>
            <v-icon @click="deleteItem(poster.id)" style="font-size:30px;" color="black">delete</v-icon>
          </v-row>
          <router-link to="/details" style="text-decoration:none;">
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
                <v-img class="product-image" contain v-bind:src="poster.image">
                  <v-row
                    id="opacity-overlaybox"
                    class="align-end fill-height"
                    style="margin:0 12px;  "
                  >
                    <v-col id="overlaybox-pink">
                      <v-row row wrap>
                        <v-col id="product-lineheight" cols="8" style="padding:0 0 0 20px;">
                          <span id="product-size">50x70 CM</span>
                          <br />
                          <span id="product-name">{{poster.name}}</span>
                          <br />
                          <span id="product-type">POSTER</span>
                        </v-col>
                        <v-col
                          id="product-lineheight"
                          cols="4"
                          align="end"
                          class="mt-auto pb-0"
                          style="padding-right:20px;"
                        >
                          <span id="product-price">{{poster.price}} DKK</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-img>
              </v-row>
            </div>
          </router-link>
          </router-link>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { dbPosterAdd } from "../../firebase";

export default {
  data() {
    return {
      poster: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("setPosterItems");
  },
  methods: {
    deleteItem(id) {
      dbPosterAdd
        .doc(id)
        .delete()
        .then(function() {
          //console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          // console.error("Error removing document: ", error);
        });
    }
  },
  computed: {
    posterItems() {
      return this.$store.getters.getPosterItems;
    }
  }
};
</script>

<style lang="scss" scoped>
.page_container {
  padding-left: 100px;
  padding-right: 100px;
}
#addbutton-padding {
  padding-right: 30px;
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
#opacity-overlaybox:hover {
  opacity: 0;
}
#overlaybox-pink {
  background-color: map-get($colorz, whitetransparent);
  border: 4px solid map-get($colorz, rose);
  position: relative;
  bottom: -31.25px;
  line-height: 20px;
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
#product-type {
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
#img-hover:hover {
  font-size: 20px !important;
  i {
    font-size: 30px !important;
  }
}
.product-image {
  height: 40vh;
  overflow: visible;
}
@media only screen and (max-width: 1200px) {
  .page_container {
    padding-left: 50px;
    padding-right: 50px;
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
  .product-image {
    height: 30vh;
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
  #headline-padding {
    padding-left: 20px;
  }
  #product-padding {
    padding: 0 20px;
  }
  #addbutton-padding {
    padding-right: 20px;
  }
}
@media only screen and (max-width: 790px) {
  #product-name {
    font-size: 12px;
  }
  #product-type {
    font-size: 12px;
  }
  #product-size {
    font-size: 12px;
  }
  #product-price {
    font-size: 12px;
  }
  #product-lineheight {
    line-height: 14px;
  }
}
@media only screen and (max-width: 750px) {
  #headline-padding {
    padding-left: 10px;
  }
  #product-padding {
    padding: 0 10px;
  }
  #addbutton-padding {
    padding-right: 10px;
  }
}
@media only screen and (max-width: 670px) {
  #product-name {
    font-size: 10px;
  }
  #product-type {
    font-size: 10px;
  }
  #product-size {
    font-size: 10px;
  }
  #product-price {
    font-size: 10px;
  }
  #product-lineheight {
    line-height: 10px;
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
  #addbutton-padding {
    padding-right: 30px;
    padding-left: 30px;
  }
  #product-padding {
    padding: 0 30px;
    margin-bottom: 30px;
  }
  #product-name {
    font-size: 11px;
  }
  #product-type {
    font-size: 11px;
  }
  #product-price {
    font-size: 11px;
  }
  #product-lineheight {
    line-height: 12px;
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
    padding: 0 10px;
    margin-bottom: 20px;
  }
  #addbutton-padding {
    padding-right: 10px;
    padding-left: 10px;
  }
}
@media only screen and (max-width: 430px) {
  .product-image {
    height: 20vh;
  }
  #pink-product {
    height: 30vh;
  }
}
@media only screen and (max-width: 400px) {
  h1{
    font-size:25px;
  }
}
@media only screen and (max-width: 380px) {
  #product-name {
    font-size: 9px;
  }
  #product-type {
    font-size: 9px;
  }
  #product-price {
    font-size: 9px;
  }
  #product-lineheight {
    line-height: 10px;
  }
}
</style>