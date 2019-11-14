import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light:{
        primary: '#000000',
        black: '#000000',
        blacktransparent: '#393939',
        white: '#ffffff',
        whitetransparent: '#ffffffd2',
        darkgrey: '#393939',
        grey: '#858585',
        back: '#F1EFEE',
        green: '#879387',
        rose: '#F6DECB',
        blue: '#B7D5D2',
        incomplete: '#CC453B',
        inprogress: '#FFC94B',
        complete: '#6DAB6D'
}
    }
  }
});
