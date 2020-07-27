/**
 * Created by _BOB_ on 25.07.2020.
 */

import Vue from 'vue';

const base = 'https://dog.ceo/api/';

const restApi = {

  getAllBreeds () {
    return Vue.axios.get(base + 'breeds/list/all');
  },

  getAllBreedsImages (count) {
    return Vue.axios.get(base + `breeds/image/random/${count}`);
  },

  getImagesByBreed ({ breed, sub, count }) {
    const url = base + `breed/${breed}/` + (sub ? `${sub}/` : '') + `images/random/${count}`;
    return Vue.axios.get(url);
  },

  // getImagesBySubBreed (breed, sub) {
  //  return Vue.axios.get(base + `breed/${breed}/${sub}/images/random/50`);
  // },

};

export { restApi };
