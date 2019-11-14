<template>
  <v-app id="App">
    <Navigation />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navigation,
    Footer
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
main {
  background-color: map-get($colorz, back);
  font-family: map-get($fontz, mainfont);
}
label {
  font-family: map-get($fontz, mainfont) !important;
}
</style>
