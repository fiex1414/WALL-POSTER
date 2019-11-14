import Vue from 'vue'
import Vuex from 'vuex'
import { dbPosterAdd, dbOrders } from '../firebase'

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketItems: [],
    favouritesItems: [],
    posterItems: [],
    orderItems: [],
    currentUser: null
  },
  mutations: {
    addCheckoutItem: (state, basketItems) => {
      dbOrders.add({
        orderNumber: 2,
        status: "incomplete",
        orderLines: state.basketItems
      })
    },
    addBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach(item => {
          if (state.basketItems.find(itemInArray => item.name === itemInArray.name)) {
            item = state.basketItems.find(itemInArray => item.name === itemInArray.name);
            item.quantity++
          }
          else {
            state.basketItems.push({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })
          }
        })
      }
    },
    addFavouritesItems: (state, favouritesItems) => {
      if (favouritesItems instanceof Array) {
        favouritesItems.forEach(item => {
          if (state.favouritesItems.find(itemInArray => item.name === itemInArray.name)) {
            item = state.favouritesItems.find(itemInArray => item.name === itemInArray.name);
          }
          else {
            state.favouritesItems.push({
              name: item.name,
              price: item.price,
              quantity: 1,
              image: item.image,
            })
          }
        })
      }
    },
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
      }
      else {
        state.currentUser = null
      }
    },

    setPosterItems: state => {
      let posterItems = []
      dbPosterAdd.onSnapshot((snapshopItems) => {
        posterItems = []
        snapshopItems.forEach((doc) => {
          var posterItemsData = doc.data();
          posterItems.push({
            ...posterItemsData,
            id: doc.id
          })
        })
        state.posterItems = posterItems
      })
    },
    setOrderItems: state => {
      let orderItems = []

      dbOrders.onSnapshot((snapshotItems) => {
        orderItems = []
        snapshotItems.forEach((doc) => {
          var orderItemData = doc.data();
          orderItems.push({
            ...orderItemData,
            id: doc.id
          })
        })
        state.orderItems = orderItems
      })
    },
  },
  actions: {
    setCheckoutItem(context) {
      context.commit('addCheckoutItem')
    },
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    setPosterItems: context => {
      context.commit('setPosterItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    }
  },
  getters: {
    getBasketItems: state => state.basketItems,
    getFavouritesItems: state => state.favouritesItems,
    currentUser: state => state.currentUser,
    getPosterItems: state => state.posterItems,
    getOrderItems: state => state.orderItems
  }
})
