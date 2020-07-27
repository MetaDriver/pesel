<template>
    <div class="Favorites Breed">

      <PageLayout>
        <div class="container img-list">

          <div class="row" v-if="favorites">

            <div class="col-4" v-for="img in favorites" :key="img.slice(-20)">
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
  name: 'Favorites',
  components: {},
  props: [],
  computed: {
    ...mapState(['favorites']),
  },
}
</script>

<style lang="scss">
  .Favorites {

  }
</style>
