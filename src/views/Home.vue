<template>
    <div class="Home Breed">

      <PageLayout>

        <div slot="pgHeader" class="row pa-0 pg-head">
            <div class="col-12 py-0">
              <BreedSelect />
            </div>
        </div>

        <div class="container img-list" v-swap-hadler="{handler: swap, margin: ()=> swapMargin}">
          <div class="row" v-if="images">
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
import { mapState } from 'vuex';

const SWAP_DELTA = 150;
const SWAP_LIMIT = 18;

export default {
  name: 'Home',
  components: {},
  props: [],
  data () {
    return {
      //      sorted: false,
      swapMargin: SWAP_DELTA,
    }
  },
  computed: {
    ...mapState(['images', 'sortByName']),

    //    ...mapGetters(['breedList']),

    sortedImgs () {
      function name (v) { return v.split('/')[4]; }
      if (!this.images) { return null; }
      const imgs = [...this.images];
      if (this.sortByName) {
        imgs.sort((a, b) => (name(a) < name(b) ? -1 : 1))
      }
      return imgs;
    },

    imgs () {
      if (!this.sortedImgs) { return null; }
      return {
        car: this.sortedImgs[0],
        cdr: this.sortedImgs.slice(1),
      };
    },
  },
  methods: {
    swap () {
      this.swapMargin = -1;
      console.log('swap !!!!');
      this.$store.dispatch('getAllBreedsImages', SWAP_LIMIT).then(() => {
        this.swapMargin = SWAP_DELTA
      });
    }
  },
  mounted () {
    this.$store.commit('images', null);
    this.$store.dispatch('getAllBreedsImages', SWAP_LIMIT + 1);
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
