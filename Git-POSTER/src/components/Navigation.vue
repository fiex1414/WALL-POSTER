<template>
  <div>
    <v-navigation-drawer
      v-if="currentUser"
      color="green"
      v-model="drawer"
      fixed
      temporary
      right
      app
    >
      <div>
        <v-row class="pa-3">
          <v-col cols="2">
            <font-awesome-icon id="icon-header" icon="user"></font-awesome-icon>
          </v-col>
          <v-col cols="10">
            <h4>{{currentUser.email}}</h4>
          </v-col>
        </v-row>
      </div>
      <ul>
        <router-link tag="li" to="/admin">
          <font-awesome-icon id="icon-header" icon="user-cog"></font-awesome-icon>ADMIN
        </router-link>
        <router-link tag="li" to="/admin">
          <font-awesome-icon
            id="icon-header"
            style="margin-right:15px;margin-left:13px;"
            icon="file-alt"
          ></font-awesome-icon>ORDERS
        </router-link>
        <li @click.prevent="signOut()">
          <font-awesome-icon id="icon-header" icon="sign-out-alt"></font-awesome-icon>SIGN OUT
        </li>
      </ul>
    </v-navigation-drawer>

    <v-app-bar app flat hide-on-scroll scroll-threshold="1" color="green">
      <v-toolbar-title class="headline">
        <router-link to="/">
          <v-img contain width="60px" :src="require('../assets/logo-wall.svg')"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <ul id="icons_menu">
        <span class="hidden-xs-only" v-if="currentUser">Hello, {{currentUser.email}}</span>
        <router-link to="/favourite">
          <v-icon>favorite</v-icon>
          <!-- favorite_border -->
        </router-link>
        <router-link to="/bag">
          <v-badge overlap color="white">
            <template v-slot:badge>
              <p style="color:black;font-size:15px;">{{basket.length}}</p>
            </template>
            <font-awesome-icon id="icon-header" icon="shopping-bag"></font-awesome-icon>
          </v-badge>
        </router-link>
        <router-link to="/login" v-if="!currentUser">
          <font-awesome-icon
            style="margin:0 0px -5px 10px!important;"
            id="icon-header"
            icon="user-cog"
          ></font-awesome-icon>
        </router-link>
      </ul>
      <v-app-bar-nav-icon
        v-if="currentUser"
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <template v-if="currentUser" v-slot:extension style="padding:0 !important">
        <ul class="fill-height" id="nav_menu" style="width:50%;padding-left:16px;">
          <router-link tag="li" to="/posters">
            <span>POSTERS</span>
          </router-link>
          <li class="hidden-xs-only">
            <span>OUTLET</span>
          </li>
          <li class="hidden-xs-only">
            <span>GALLERY WALLS</span>
          </li>
        </ul>
        <ul class="fill-height text-end" id="nav_menu" style="width:50%;padding-right:10px;">
          <router-link tag="li" to="/admin">
            <span>ADMIN</span>
          </router-link>
          <router-link tag="li" to="/orders">
            <span>ORDERS</span>
          </router-link>
          <li class="hidden-xs-only" @click.prevent="signOut()">
            SIGN OUT
            <font-awesome-icon style="margin:0 !important;" icon="sign-out-alt"></font-awesome-icon>
          </li>
        </ul>
      </template>
      <template v-else v-slot:extension style="padding:0 !important">
        <ul class="fill-height small-width" id="nav_menu">
          <router-link tag="li" to="/posters">
            <span>POSTERS</span>
          </router-link>
          <li class="hidden-xs-only">
            <span>OUTLET</span>
          </li>
          <li class="hidden-xs-only">
            <span>GALLERY WALLS</span>
          </li>
        </ul>
        <ul class="fill-height" id="nav_menu_search">
          <v-text-field label="SEARCH" single-line append-icon="search"></v-text-field>
        </ul>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { dbPosterAdd } from "../../firebase";

import firebase from "firebase";
import "firebase/firestore";
import store from "../store.js";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data() {
    return {
      drawer: null
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logged out");
          this.$router.replace("/");
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    basket() {
      //  return this.$store.state.basketItems
      return this.$store.getters.getBasketItems;
    }
  }
};
</script>

<style lang="scss" scoped>
#icons_menu i {
  padding: 10px;
  color: map-get($colorz, black);
  font-size: 30px;
}
.icons_menu i {
  padding: 0 2px;
  color: map-get($colorz, black);
  font-size: 30px;
}
#icon-header {
  margin: 0 8px -5px 8px;
  color: map-get($colorz, black);
  font-size: 25px;
}
#nav_menu {
  background-color: map-get($colorz, back);
  display: inline;
  padding-top: 10px !important;
}
#nav_menu.small-width {
  width: 80%;
}
#nav_menu_search {
  background-color: map-get($colorz, back);
  padding-right: 16px;
  width: 20%;
}
#nav_menu li {
  display: inline;
  cursor: pointer;
  padding: 0 10px;
  font-family: map-get($fontz, mainfont);
  font-weight: bold;
  color: map-get($colorz, grey);
}
#nav_menu li:first-child {
  padding-left: 0;
}
nav ul {
  text-decoration: none;
}
nav li {
  color: map-get($colorz, black);
  list-style-type: none;
  cursor: pointer;
  padding-top: 20px;
}
nav li i {
  margin-right: 10px;
}
nav li:last-child {
  position: absolute;
  bottom: 20px;
  color: map-get($colorz, inprogress);
}
a {
  text-decoration: none;
  font-family: map-get($fontz, mainfont);
}
.v-tabs {
  background-color: map-get($colorz, back);
  border-bottom: 4px solid white;
}
.router-link-exact-active span {
  color: map-get($colorz, black);
}
span {
  font-family: map-get($fontz, mainfont);
}
@media only screen and (max-width: 600px) {
  #nav_menu.small-width {
    width: 50%;
  }
  #nav_menu_search {
    width: 50%;
  }
}
</style>

<style lang="scss">
.v-toolbar__extension {
  padding: 0 !important;
  border-bottom: 4px solid white;
}
label {
  font-family: map-get($fontz, mainfont);
  font-weight: bold;
  color: map-get($colorz, grey) !important;
}
</style>