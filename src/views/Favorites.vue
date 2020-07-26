<template>
    <div class="Favorites">

      <PageLayout>
        <div class="container">

          <div class="row" v-if="favorites">

            <div class="col-4" v-for="item in favorites" :key="item.img.slice(-20)">
              <ImgCard :image="item.img" />
            </div>

          </div>

        </div>
      </PageLayout>

    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Favorites',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapState(['favorites']),
  },
  methods: {},
  mounted () {
  },
}
</script>

<style lang="scss">
  .Favorites {
    width: 100%;
    height: auto;
  }
</style>
