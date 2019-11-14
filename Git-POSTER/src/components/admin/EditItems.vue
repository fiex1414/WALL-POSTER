
<template>
  <v-container class="container-padding">
    <v-row row wrap>
      <v-col sm="8" style="padding-left:10px;line-height:25px;">
        <h1>EDIT POSTER</h1>
      </v-col>
      <v-row row wrap style="max-width:100%;margin:0;">
        <v-col cols="12" sm="5">
          <v-row row wrap justify="start">
            <v-col cols="12">
              <v-text-field
                style="border-radius:0!important;box-shadow:none;border:2px solid black;margin-bottom:20px;"
                label="NAME OF POSTER"
                solo
                required
                v-model="poster.name"
              ></v-text-field>
              <v-text-field
                style="border-radius:0!important;box-shadow:none;border:2px solid black;margin-bottom:20px;"
                label="PRICE"
                required
                solo
                v-model="poster.price"
              ></v-text-field>
              <v-textarea
                style="border-radius:0!important;box-shadow:none;border:2px solid black;margin-bottom:20px;"
                label="DESCRIPTION"
                required
                solo
                v-model="poster.description"
              ></v-textarea>
              <v-row row wrap>
                <v-col cols="6" class="pt-0">
                  <v-btn
                    class="btn-text-color"
                    :ripple="false"
                    block
                    tile
                    depressed
                    color="blacktransparent"
                    style="height: 48px;"
                    @click="updateItem()"
                  >EDIT</v-btn>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-btn
                    class="btn-text-color"
                    :ripple="false"
                    block
                    tile
                    depressed
                    color="blacktransparent"
                    style="height: 48px;"
                    to="/admin"
                  >CANCEL</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col offset-lg="3" offset-md="2" offset-sm="1" cols="12" sm="6" md="4">
          <v-row row wrap>
            <v-col cols="12" id="product-padding">
              <div id="pink-product">
                <v-row class="align-center fill-height">
                  <v-img height="40vh" style="overflow:visible;" contain v-bind:src="poster.image">
                    <v-img height="40vh" style="overflow:visible;" contain v-bind:src="image">
                      <v-row
                        id="opacity-overlaybox"
                        class="align-end fill-height"
                        style="margin:0 12px;  "
                      >
                        <v-col id="overlaybox-pink">
                          <v-row row wrap>
                            <v-col sm="8" style="padding:0 20px;">
                              <span id="product-size">50x70 CM</span>
                              <br />
                              <span id="product-name">{{poster.name}}</span>
                              <br />
                              <span id="product-type">POSTER</span>
                            </v-col>
                            <v-col
                              sm="4"
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
                  </v-img>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { dbPosterAdd } from "../../../firebase";

export default {
  data() {
    var poster = this.$route.params;
    return {
      item: [],
      activeEditItem: null,
      updatedSuccess: false,
      poster: {
        id: poster.id,
        name: poster.name,
        price: poster.price,
        description: poster.description,
        image: poster.image,
      }
    };
  },
  methods: {
    updateItem() {
      dbPosterAdd
        .doc(this.poster.id)
        .update(this.poster)
        .then(() => {
          this.updatedSuccess = true;
          console.log("Document successfully updated!");
          this.$router.replace("/admin");
        })
        .catch(error => {
          alert(error);
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-padding {
  padding-left: 100px;
  padding-right: 100px;
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
.imageupload {
  cursor: pointer;
}
@media only screen and (max-width: 900px) {
  .container-padding {
    padding-left: 80px;
    padding-right: 80px;
  }
}
@media only screen and (max-width: 800px) {
  .container-padding {
    padding-left: 50px;
    padding-right: 50px;
  }
}
@media only screen and (max-width: 600px) {
  #product-padding {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 500px) {
  #product-padding {
    padding: 0 60px;
  }
}
@media only screen and (max-width: 400px) {
  #product-padding {
    padding: 0 20px;
  }
  h1{
    font-size:25px;
  }
}
</style>
<style lang="scss">
.imageupload.v-text-field.v-text-field--solo .v-input__control:last-of-type {
  border: 2px solid black;
}
.imageupload .v-icon.v-icon {
  font-size: 40px !important;
}
.imageupload.v-text-field.v-text-field--enclosed .v-input__prepend-outer,
.v-text-field.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field.v-text-field--enclosed .v-input__append-inner,
.v-text-field.v-text-field--enclosed .v-input__append-outer {
  margin-top: 12px !important;
}
.imageupload .v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  cursor: pointer;
}
.btn-text-color .v-btn__content {
  color: white;
}
</style>