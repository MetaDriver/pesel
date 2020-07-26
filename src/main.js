import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@/assets/css/vuetify-fix.scss';

import PageLayout from '@/components/PageLayout.vue';
import ImgCard from '@/components/ImgCard.vue';

Vue.component('PageLayout', PageLayout);
Vue.component('ImgCard', ImgCard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
