<template>
    <div class="Home Breed">

      <PageLayout>

        <div slot="pgHeader" class="row pa-0 pg-head">
            <div class="col-12 py-0">
              <BreedSelect />
            </div>
        </div>

        <div class="container img-list" v-swap-hadler="{handler: swap, margin: ()=> swapMargin}">
          <div class="row" v-if="imgs">
            <div class="col-12">
              <ImgCard class="top-card" :image="imgs.car" />
            </div>

            <div class="col-4" v-for="(img, idx) in imgs.cdr" :key="img.slice(-20)+idx">
              <ImgCard :image="img" />
            </div>
          </div>

          <div class="row justify-center mt-12">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </div>

      </PageLayout>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

const SWAP_DELTA = 150; // подкачка начинается когда до каонца страницы остаётся 150px
const SWAP_LIMIT = 21; // В требованиях 20. Но 20 не делится на 3 :)

export default {
  name: 'Home',
  components: {},
  props: [],
  data () {
    return {
      swapMargin: SWAP_DELTA,
    }
  },
  computed: {

    ...mapGetters(['sortedImgs']),

    imgs () {
      if (!this.sortedImgs) { return null; }
      return {
        car: this.sortedImgs[0],
        cdr: this.sortedImgs.slice(1),
      };
    },
  },
  methods: {
    swap (start = false) {
      this.swapMargin = -1;
      console.log('swap !!!!');
      this.$store.dispatch('getAllBreedsImages', SWAP_LIMIT + start).then(() => {
        this.swapMargin = SWAP_DELTA
      });
    }
  },
  mounted () {
    this.$store.commit('images', null);
    this.swap(true);
    this.$store.commit('currentBreed', {
      type: 'all',
      title: 'Все пёсели',
      parent: null,
    });
  },
}
</script>

<style lang="scss">
  .Home {

  }
</style>
