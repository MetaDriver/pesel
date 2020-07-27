<template>
  <div class="ImgCard"
       :style="{backgroundImage}">

    <v-icon medium color="white"
            @click="inFavorite = !inFavorite"
    >{{inFavorite? 'mdi-heart': 'mdi-heart-outline'}}
    </v-icon>

    <div class="breed">
      {{breedName}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ImgCard',
  components: {},
  props: ['image'],
  computed: {
    ...mapState(['favorites']),
    backgroundImage () {
      return `linear-gradient(1.42deg, hsla(0, 0%, 0%, 1) -15.62%, hsla(0, 0%, 0%, 0) 45.69%), url(${this.image})`;
    },
    breedName () {
      const src = this.image.split('/')[4];
      return src.replace('-', ' ');
    },
    inFavorite: {
      get () {
        return this.favorites.findIndex(v => v === this.image) > -1;
      },
      set (v) {
        this.$store.commit(v ? 'addFavorite' : 'removeFavorite', this.image);
      },
    },
  },
}
</script>

<style lang="scss">
  .ImgCard {
    width: 100%;
    height: 290px;
    padding: 25px;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: white;

    .breed {
      align-self: flex-end;
      text-transform: capitalize;
      font-size: 25px;
      line-height: 28px;
      font-weight: 600;
    }

    &.top-card {
      height: 513px;
      padding: 35px 50px 50px 35px;
        .breed {
          font-size: 30px;
          line-height: 28px;
        }
    }

    .v-icon {
      text-shadow: 0 0 8px hsla(0, 0%, 0%, .3);
    }
  }
</style>
