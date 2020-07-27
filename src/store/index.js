import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { restApi } from '@/restApi.js';

const persistedState = createPersistedState({
  key: 'peselApp',
  paths: ['favorites'],
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: null,
    sortByName: true,
    allBreeds: null,
    currentBreed: {
      type: 'all',
      title: 'Все пёсели',
      parent: null,
    },
    favorites: [],
  },

  mutations: {
    images (state, v) {
      state.images = v === null ? null : (state.images || []).concat(v);
    },
    sortByName (state, v) {
      state.sortByName = v;
    },
    allBreeds (state, v) {
      state.allBreeds = v;
    },
    currentBreed (state, v) {
      state.currentBreed = v;
    },
    addFavorite (state, v) {
      state.favorites.push(v);
    },
    removeFavorite (state, v) {
      const pos = state.favorites.findIndex(vv => vv === v);
      if (pos !== -1) state.favorites.splice(pos, 1);
    },
  },

  actions: {
    getAllBreeds ({ commit }) {
      return restApi.getAllBreeds().then(resp => {
        commit('allBreeds', resp.data.message)
      }).catch(err => {
        console.log('getAllBreeds:: ERROR >>', err);
      });
    },
    getAllBreedsImages ({ commit }, count) {
      return restApi.getAllBreedsImages(count).then(resp => {
        commit('images', resp.data.message)
      }).catch(err => {
        console.log('getAllBreedsImages:: ERROR >>', err);
      });
    },
    getImagesByBreed ({ commit }, params) {
      return restApi.getImagesByBreed(params).then(resp => {
        commit('images', resp.data.message);
      }).catch(err => {
        console.log('getImagesByBreed:: ERROR >>', err);
      });
    },
  },

  getters: {
    breedList (state) {
      if (!state.allBreeds) { return null; }
      const { type, title, parent } = state.currentBreed;
      const src = type === 'all' ? state.allBreeds : type === 'breed' ? state.allBreeds[title] : {};
      const names = type === 'breed' ? state.allBreeds[title] : Object.keys(src);
      const groups = names.reduce((s, v) => {
        if (!s[v[0]]) { s[v[0]] = []; }
        s[v[0]].push(v);
        return s;
      }, {});
      return { current: { type, title, parent }, groups };
    },
  },

  plugins: [persistedState],
});
