<template>
  <v-container class="pa-0 ma-0" style="max-width:100%;">
    <v-container text-center class="pa-0 ma-0" style="max-width:100%;">
      <v-row row wrap class="pa-0 ma-0">
        <v-col sm="12" class="pa-0 ma-0">
          <v-img class="bg-img-size" :src="require('../../assets/background-home.png')">
            <v-row row wrap class="py-5 px-0">
              <v-col md="4" class="hidden-sm-and-down">
                <v-img
                  style="position:relative; top:25vh;left:20%;"
                  contain
                  height="20vh"
                  :src="require('../../assets/logo-wall.svg')"
                ></v-img>
              </v-col>
              <v-col class="login-padding" cols="12" sm="6" offset-sm="3" offset-md="0" md="8">
                <div class="login-position">
                  <h1>ADMIN LOGIN</h1>
                  <v-text-field
                    style="border-radius:0!important;box-shadow:none;border:2px solid black;margin-bottom:10px;margin-top:10px;"
                    v-model="email"
                    label="E-MAIL"
                    solo
                    required
                  ></v-text-field>
                  <v-text-field
                    style="border-radius:0!important;box-shadow:none;border:2px solid black;margin-bottom:20px;"
                    v-model="password"
                    label="PASSWORD"
                    solo
                    required
                  ></v-text-field>
                  <v-row row wrap>
                    <v-col cols="6" class="pt-0">
                      <v-btn
                        :ripple="false"
                        block
                        tile
                        depressed
                        dark
                        color="blacktransparent"
                        style="height: 48px;"
                        @click.prevent="signIn()"
                      >LOGIN</v-btn>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                      <v-btn
                        :ripple="false"
                        block
                        tile
                        depressed
                        dark
                        color="blacktransparent"
                        style="height: 48px;"
                        @click.prevent="signOut()"
                      >SIGN OUT</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/admin");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.Message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
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
  }
};
</script>

<style lang="scss" scoped>
.bg-img-size {
  height: 85vh;
}
.v-btn {
  @include buttons_mixin(
    1px,
    map-get($colorz, black),
    map-get($colorz, whitetransparent),
    map-get($fontz, mainfont)
  );
}
#blue-section {
  background-color: map-get($colorz, back);
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
.login-padding {
  padding: 0 230px;
}
.login-position {
  position: relative;
  top: 20vh;
  left: 0;
}
@media only screen and (max-width: 1100px) {
  .login-padding {
    padding: 0 200px;
  }
}
@media only screen and (max-width: 959px) {
  .login-padding {
    padding: 0 40px;
  }
}
@media only screen and (max-width: 770px) {
  .login-padding {
    padding: 0 20px;
  }
}
@media only screen and (max-width: 600px) {
  .login-padding {
    padding: 0 80px;
  }
  .bg-img-size {
    height: 70vh;
  }
  .login-position {
    top: 10vh;
  }
}
@media only screen and (max-width: 470px) {
  .login-padding {
    padding: 0 40px;
  }
}
</style>
<style lang="scss">
.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none;
}
</style>