<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      class="app-header"
      height="100px"
      dark
    >
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Home' }">
          <img class="pesel-logo my-3" src="@/assets/img/pesel-logo.svg"/>
        </router-link>
      </div>

      <v-spacer/>

      <div class="favorites-link" :class="{active : inFavorite}"
           @click="inFavorite = !inFavorite">
        <span class="mr-2">Избранные пёсели</span>
        <v-icon medium :color="inFavorite ? '#ffffff' : '#626262'"
             >mdi-heart-outline</v-icon>
      </div>

    </v-app-bar>

    <v-main>
      <router-view> Loading... </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  computed: {
    ...mapState(['allBreeds', 'images']),
    inFavorite: {
      get () {
        return this.$route.name === 'Favorites';
      },
      set (v) {
        this.$router.push({ name: v ? 'Favorites' : 'Home' });
      }
    },
  },

  mounted () {
    this.$store.dispatch('getAllBreeds');
  }
}
</script>

<style lang="scss">

  .app-header.v-sheet.v-app-bar:not(.v-sheet--outlined) {
    background: hsl(252, 11%, 8%);
    box-shadow: 0px 8px 16px hsla(0, 0%, 0%, 0.55);
    padding: 0 40px;
    @media screen and (max-width: 960px) {
      padding: 0;
    }
  }

  .v-application .nav {
    a {
      color: white;
      margin: 0 10px;
    }
  }
  .favorites-link {
    width: auto;
    height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: hsl(0, 0%, 38%);
    .v-icon {
      color: hsl(0, 0%, 38%);
    }
    &.active {
      color: hsl(0, 0%, 100%);
      .v-icon {
        color: hsl(0, 0%, 100%);
      }
    }
  }
</style>
