<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="items" style="padding-top:0!important;padding-left:17px!important;">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-container>
      <v-row row wrap>
        <v-col class="img-left" cols="6" lg="5" offset-lg="1" style="margin-bottom:200px;">
          <v-img
            v-bind:src="poster.image"
            class="px-5"
            contain
            :class="{'mx-5': $vuetify.breakpoint.smAndUp, 'mx-0': $vuetify.breakpoint.xs}"
          ></v-img>
        </v-col>
        <v-col class="info-padding" cols="6" lg="5">
          <v-row>
            <v-col cols="12">
              <h2>{{poster.name}}</h2>
              <h3>POSTER</h3>
            </v-col>
            <v-col class="remove-top-padding" cols="12">
              <h2 id="price">{{poster.price}} DKK</h2>
            </v-col>
            <v-col
              class="remove-top-padding"
              id="dropdown-example"
              cols="12"
              style="padding-bottom:70px;"
            >
              <v-overflow-btn
                style="border-radius:0!important;"
                class="prosize my-2"
                :items="dropdown_size"
                label="50X70 CM"
                target="#dropdown-example"
                outlined
                depressed
                tile
                background-color="white"
              ></v-overflow-btn>
            </v-col>
            <v-col cols="10" style="padding-top:0;">
              <v-btn
                id="buy-btn"
                :ripple="false"
                block
                tile
                depressed
                dark
                color="blacktransparent"
                @click="addToBasket(poster)"
              >ADD TO BAG</v-btn>
            </v-col>
            <v-col class="favourite-btn" cols="2" style="padding-top:5px;">
              <v-icon
                @click="addToFavourites(poster)"
                style="font-size:40px;"
                color="black"
              >{{favouriteIcon}}</v-icon>
            </v-col>
            <v-col cols="12" class="pt-5 mt-3">
              <h4>PRODUCT DESCRIPTION</h4>

              <span style="font-size:12px;">{{poster.description}}</span>
            </v-col>
            <v-col cols="12">
              <span style="font-style:italic;font-size:13px;">FRAME NOT INCLUDED</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { dbPosterAdd } from "../../firebase";

export default {
  data() {
    var poster = this.$route.params;
    return {
      poster: {
        id: poster.id,
        name: poster.name,
        price: poster.price,
        description: poster.description,
        image: poster.image,
      },
      basketDump: [],
      favouritesDump: [],
      favouriteIcon: "favorite_border",
      items: [
        {
          text: "POSTERS",
          disabled: false,
          to: "/posters"
        },
        {
          text: poster.name,
          disabled: true
        }
      ],
      dropdown_size: ["50X70 CM", "30X40 CM", "70X100 CM"]
    };
  },
  methods: {
    addToBasket(poster) {
      this.basketDump.push({
        name: poster.name,
        price: poster.price,
        quantity: 1,
        image: poster.image
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
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
      this.favouriteIcon = "favorite";
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
.info-padding {
  padding: 0 40px 0 100px;
}
#buy-btn {
  height: 50px;
}
@media only screen and (max-width: 890px) {
  .info-padding {
    padding: 0 40px 0 20px;
  }
  .remove-top-padding {
    padding-top: 0;
  }
}

@media only screen and (max-width: 650px) {
  h2 {
    font-size: 17px;
  }
  h3 {
    font-size: 13px;
  }
}
@media only screen and (max-width: 750px) {
  #buy-btn {
    height: 42.5px;
  }
  #dropdown-example {
    padding-bottom: 60px !important;
  }
  .favourite-btn {
    padding-left: 0;
  }
}
@media only screen and (max-width: 550px) {
  .info-padding {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100%;
    padding: 0 35px;
  }
  .img-left {
    width: 100% !important;
    max-width: 100% !important;
    margin-bottom: 0 !important;
  }
}
</style>
<style lang="scss">
.theme--light.v-text-field--outlined fieldset {
  border: 2px solid black;
}
.theme--light.v-input--is-disabled .v-label,
.theme--light.v-input--is-disabled input,
.theme--light.v-input--is-disabled textarea {
  color: black;
}
.v-input__slot {
  margin-bottom: 0;
}
.v-application a {
  color: black !important;
}
#price {
  color: map-get($colorz, grey);
}
.prosize.v-text-field.v-text-field--enclosed .v-text-field__details,
.prosize.v-text-field.v-text-field--enclosed
  > .v-input__control
  > .v-input__slot {
  padding: 5.75px 12px !important;
}
@media only screen and (max-width: 750px) {
  .prosize.v-text-field.v-text-field--enclosed .v-text-field__details,
  .prosize.v-text-field.v-text-field--enclosed
    > .v-input__control
    > .v-input__slot {
    padding: 2px 12px !important;
  }
}
</style>