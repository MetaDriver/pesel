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
          <div class="nav" style="color: white">
            <router-link :to="{ name: 'Home' }">Home</router-link>
            &nbsp;
            <router-link :to="{ name: 'Favorites' }">Favorites</router-link>
          </div>
      <v-spacer/>

      <v-icon medium
              @click="inFavorite = !inFavorite"
      >{{inFavorite? 'mdi-heart': 'mdi-heart-outline'}}
      </v-icon>

      <!--<v-spacer></v-spacer>-->

      <!--<v-btn-->
      <!--href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
      <!--target="_blank"-->
      <!--text-->
      <!--&gt;-->
      <!--<span class="mr-2">Latest Release</span>-->
      <!--<v-icon>mdi-open-in-new</v-icon>-->
      <!--</v-btn>-->
    </v-app-bar>

    <v-main>
      <router-view> Loading... </router-view>
    </v-main>
  </v-app>
</template>

<script>
//  import HelloWorld from './components/HelloWorld';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
  //    HelloWorld
  },

  data () {
    return {
      inFavorite: false,
    };
  },
  computed: {
    ...mapState(['allBreeds', 'imgAllDogs']),
  },
  mounted () {
    this.$store.dispatch('getAllBreeds').then(() => {
      this.$nextTick(() => console.log('$store.dispatch(\'getAllBreeds\')>>', this.allBreeds));
    });
  }
}
</script>

<style lang="scss">

  .app-header.v-sheet.v-app-bar:not(.v-sheet--outlined) {
    background: hsl(252, 11%, 8%);
    box-shadow: 0px 8px 16px hsla(0, 0%, 0%, 0.55);
  }

  .v-application .nav {
    a {
      color: white;
      margin: 0 10px;
    }
  }
</style>
