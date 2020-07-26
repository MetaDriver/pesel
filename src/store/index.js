import Vue from 'vue';
import Vuex from 'vuex';
import { restApi } from '@/restApi.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allBreeds: null,
    imgAllDogs: null,
    favorites: [],
  },
  mutations: {
    allBreeds (state, v) {
      state.allBreeds = v;
    },
    imgAllDogs (state, v) {
      state.imgAllDogs = v;
    },
    addFavorite (state, v) {
      state.favorites.push(v);
    },
    removeFavorite (state, v) {
      const pos = state.favorites.findIndex(vv => vv.name === v.name);
      if (pos !== -1) state.favorites.splice(pos, 1);
    },
  },
  actions: {
    getAllBreeds ({ commit }) {
      return restApi.getAllBreeds().then(resp => {
        console.log('getAllBreeds:: resp >>', resp);
        commit('allBreeds', resp.data.message)
      }).catch(err => {
        console.log('getAllBreeds:: ERROR >>', err);
      });
    },
    getAllBreedsImages ({ commit }) {
      return restApi.getAllBreedsImages().then(resp => {
        console.log('getAllBreedsImages:: resp >>', resp);
        commit('imgAllDogs', resp.data.message)
      }).catch(err => {
        console.log('getAllBreedsImages:: ERROR >>', err);
      });
    },
  },
  modules: {
  }
})
