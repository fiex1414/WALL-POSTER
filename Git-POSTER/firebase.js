import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCouZZji856kMpwqKvjoTcCUAkZL-3w0tg",
  authDomain: "poster-shop-90da3.firebaseapp.com",
  databaseURL: "https://poster-shop-90da3.firebaseio.com",
  projectId: "poster-shop-90da3",
  storageBucket: "poster-shop-90da3.appspot.com",
  messagingSenderId: "36540141988",
  appId: "1:36540141988:web:bf8a32facd7698154ff131"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbPosterAdd = db.collection('posterItems');
export const dbOrders = db.collection('orderItems')

