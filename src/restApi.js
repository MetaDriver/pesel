/**
 * Created by _BOB_ on 25.07.2020.
 */

import Vue from 'vue';

const base = 'https://dog.ceo/api/';

const restApi = {

  getAllBreeds () {
    return Vue.axios.get(base + 'breeds/list/all');
  },

  getAllBreedsImages () {
    return Vue.axios.get(base + 'breeds/image/random/50');
  },

};

export { restApi };
