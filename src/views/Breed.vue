<template>
    <div class="Breed">
      <PageLayout>

        <div  slot="pgHeader" class="row pa-0 pg-head">
          <div class="col-12 py-0">
            <BreedSelect />
          </div>
        </div>

        <div class="container  img-list"  v-swap-hadler="{handler: swap, margin: ()=> swapMargin}">
          <div class="row">
            <div class="col-4" v-for="(img, idx) in sortedImgs" :key="img.slice(-20)+idx">
              <ImgCard :image="img" />
            </div>
          </div>

          <div class="row justify-center" v-show="swapMargin === -1">
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
const SWAP_LIMIT = 18; // В требованиях 20. Но 20 не делится на 3 :)

export default {
  name: 'Breed',
  components: {},
  props: [],
  data () {
    return {
      swapMargin: -1,
    }
  },
  computed: {
    ...mapGetters(['sortedImgs']),
  },
  methods: {
    initState () {
      this.$store.commit('currentBreed', {
        type: this.$route.params.sub ? 'sub' : 'breed',
        title: this.$route.params.sub || this.$route.params.breed,
        parent: this.$route.params.sub ? this.$route.params.breed : 'all',
      });
      this.$store.commit('images', null);
      this.swap();
    },
    swap () {
      this.swapMargin = -1;
      console.log('swap !!!!');
      this.$store.dispatch('getImagesByBreed', {
        breed: this.$route.params.breed,
        sub: this.$route.params.sub,
        count: SWAP_LIMIT
      }).then(() => {
        this.swapMargin = SWAP_DELTA
      });
    }
  },
  mounted () {
    this.initState();
  },
  beforeRouteUpdate (to, from, next) {
    setTimeout(this.initState, 200);
    next();
  },
}
</script>

<style lang="scss">
    .Breed {
      width: 100%;
      height: 100%;
      max-height: 100%;

      .pg-head {
        flex: 0 0 auto;
      }
      .img-list {
        flex: 1 1 100%;
        overflow-y: scroll;
        padding-bottom: 120px;
      }
    }
</style>
