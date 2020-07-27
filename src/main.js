import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@/assets/css/vuetify-fix.scss';

import PageLayout from '@/components/PageLayout.vue';
import ImgCard from '@/components/ImgCard.vue';
import BreedSelect from '@/components/BreedSelect.vue';

Vue.component('PageLayout', PageLayout);
Vue.component('ImgCard', ImgCard);
Vue.component('BreedSelect', BreedSelect);

Vue.directive('swap-hadler', {
  bind (el, config) {
    console.log('swap-hadler =', config);
    el.swapHandler = function (e) {
      const t = e.target;
      const margin = config.value.margin() || 0;
      const offset = t.scrollHeight - t.scrollTop - t.clientHeight;
      if (offset < margin) {
        console.log(e);
        config.value.handler()
      }

      // console.log(e);
      // config.value()
    };
    if (config.value.handler) {
      el.addEventListener('scroll', el.swapHandler);
    }
  },
  unbind (el) {
    el.removeEventListener('scroll', el.swapHandler);
  },
  update () {
    // console.log('digits-only update');
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
