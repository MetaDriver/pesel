<template>
    <div class="Home">

      <PageLayout>

        <div class="container">

          <div class="row" v-if="images">

            <div class="col-12">
              <ImgCard class="top-card" :image="images.car" />
            </div>

            <div class="col-4" v-for="img in images.cdr" :key="img.slice(-20)">
              <ImgCard :image="img" />
            </div>

          </div>

        </div>

      </PageLayout>

    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {},
  props: [],
  data () {
    return {
      sorted: false,
    }
  },
  computed: {
    ...mapState(['allBreeds', 'imgAllDogs']),
    filteredImgs () {
      if (!this.imgAllDogs) { return null; }
      const imgs = [...this.imgAllDogs];
      return imgs;
    },
    images () {
      if (!this.filteredImgs) { return null; }
      return {
        car: this.filteredImgs[0],
        cdr: this.filteredImgs.slice(1),
      };
    },
  },
  methods: {},
  mounted () {
    this.$store.dispatch('getAllBreedsImages');
  },
}
</script>

<style lang="scss">
    .Home {
        width: 100%;
        height: auto;
    }
</style>
