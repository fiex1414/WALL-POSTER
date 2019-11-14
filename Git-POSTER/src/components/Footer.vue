<template>
  <div id="footer-background" class="overflow-hidden">
    <div class="text-center hidden-xs-only mb-2 mt-2">
      <ul id="nav_menu">
        <router-link tag="li" to="/posters">
          <span>POSTERS</span>
        </router-link>
        <li>
          <span>OUTLET</span>
        </li>
        <li>
          <span>GALLERY WALLS</span>
        </li>
        <router-link v-if="currentUser" tag="li" to="/admin">
          <span>ADMIN</span>
        </router-link>
      </ul>
    </div>

    <v-bottom-navigation class="pb-2" background-color="green">
      <v-btn style="width:20px;">
        <v-img :src="require('../assets/facebook.svg')" contain></v-img>
      </v-btn>

      <v-btn style="width:20px;">
        <v-img :src="require('../assets/instagram.svg')" contain></v-img>
      </v-btn>

      <v-btn style="width:20px;">
        <v-img :src="require('../assets/twitter.svg')" contain></v-img>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style lang="scss" scoped>
#footer-background {
  background-color: map-get($colorz, back);
  border-top: 5px solid white;
}
.v-image {
  max-height: 30px !important;
}
#nav_menu {
  background-color: map-get($colorz, back);
  display: inline;
}
#nav_menu li {
  display: inline;
  cursor: pointer;
  padding: 0 10px;
  font-family: map-get($fontz, mainfont);
  font-weight: bold;
  color: map-get($colorz, darkgrey);
}
</style>