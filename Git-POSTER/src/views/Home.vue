<template>
  <v-container class="pa-0 ma-0" style="max-width:100%;">
    <v-container text-center class="pa-0 ma-0" style="max-width:100%;">
      <v-row row wrap class="pa-0 ma-0">
        <v-col sm="12" class="pa-0 ma-0">
          <v-img class="bg-size" :src="require('../assets/background-home.png')">
            <v-row row wrap class="py-5 px-0">
              <v-col cols="12" lg="4" class="hidden-md-only">
                <v-img class="logo-placing" contain :src="require('../assets/logo-wall.svg')"></v-img>
              </v-col>
              <v-col cols="12" lg="8" class="hidden-sm-and-down px-0">
                <v-img contain height="100vh" :src="require('../assets/frontpage-img.jpg')">
                  <v-row align="end" class="pa-2 fill-height">
                    <v-col justify="center">
                      <v-btn
                        :ripple="false"
                        color="black"
                        to="/posters"
                        text
                        tile
                        depressed
                      >SHOP NOW</v-btn>
                    </v-col>
                  </v-row>
                </v-img>
              </v-col>
            </v-row>
          </v-img>
        </v-col>
      </v-row>
      <v-row id="blue-section" class="hidden-md-and-down">
        <v-container>
          <h1 style="font-size:50px;">NEWS</h1>
        </v-container>
        <v-container class="slider-container">
          <md-card>
            <md-card-media>
              <!-- swiper -->
              <swiper :options="swiperOption">
                <swiper-slide
                  class="swiper-inside-container"
                  v-for="poster in posterItems.slice(0, 6)"
                  :key="poster.name"
                >
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
                    <v-img class="swiper-image-size" contain v-bind:src="poster.image"></v-img>
                  </router-link>
                  <div class="swiper-padding-textt" style="display:flex;">
                    <div style="width:50%;">
                      <p class="text-start">
                        {{poster.name}}
                        <br />POSTER
                      </p>
                    </div>
                    <div style="width:50%;">
                      <p class="text-end">{{poster.price}}</p>
                    </div>
                  </div>
                </swiper-slide>

                <div
                  style="height:30px!important;"
                  class="swiper-button-prev swiper-button-black"
                  slot="button-prev"
                ></div>
                <div
                  style="height:30px!important;"
                  class="swiper-button-next swiper-button-black"
                  slot="button-next"
                ></div>
              </swiper>
            </md-card-media>
          </md-card>
        </v-container>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { dbPosterAdd } from "../../firebase";

export default {
  components: {},
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  beforeCreate() {
    this.$store.dispatch("setPosterItems");
  },
  computed: {
    posterItems() {
      return this.$store.getters.getPosterItems;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  @include buttons_mixin(
    1px,
    map-get($colorz, black),
    map-get($colorz, whitetransparent),
    map-get($fontz, mainfont)
  );
}
.bg-size {
  height: 110vh;
}
.logo-placing {
  position: relative;
  top: 40%;
  left: 20%;
  height: 20vh;
}
#blue-section {
  background-color: map-get($colorz, back);
}
.slider-container {
  padding: 30px 175px;
}
.swiper-image-size {
  height: 40vh;
}
.swiper-padding-textt {
  padding: 0 52px;
}
p {
  font-family: map-get($fontz, mainfont) !important;
  font-weight: bold;
}
.text-start {
  color: map-get($colorz, grey);
  line-height: 15px;
  font-size: 13px;
  padding-top: 5px;
}
.text-end {
  color: map-get($colorz, black);
  font-size: 30px;
  line-height: 40px;
}
@media only screen and (max-width: 959px) {
  .logo-placing {
    top: 45%;
    left: 0%;
    height: 40vh;
  }
  .bg-size {
    height: 90vh;
  }
}

@media only screen and (max-width: 620px) {
  .logo-placing {
    top: 70%;
    height: 30vh;
  }
}
@media only screen and (max-width: 550px) {
  .logo-placing {
    top: 120%;
    height: 20vh;
  }
}
@media only screen and (max-width: 400px) {
  .logo-placing {
    top: 180%;
    height: 15vh;
  }
}
</style>
<style lang="scss">
</style>