<template>
    <div class="BreedSelect container py-0">
      <div class="row">

        <div class="col-12 py-0">
          <div class="top">
            <div class="select-button" :class="{opened: opened && !!breeds}"
                @click="opened = !opened">
              Породы
              <div class="arrow" />
            </div>
            <v-chip class="ma-2 ml-4 current" v-if="!!breedList && !!breedList.current.parent"
                    outlined
                    close
                    close-icon="$close"
                    color="#3C59F0"
                    small
                    @click:close="e=>navigateTop(true)"
                    @click="e=>navigateTop(true)"
            >{{$route.params.breed}}</v-chip>
            <v-chip class="ma-2 ml-4 current" v-if="!!breedList && !!$route.params.sub"
                    outlined
                    close
                    close-icon="$close"
                    color="#3C59F0"
                    small
                    @click:close="e=>navigateTop(false)"
                    @click="e=>navigateTop(false)"
            >{{$route.params.sub}}</v-chip>

            <v-spacer />

            <div class="sort" :class="{active: sortByNameProxy}"
                 @click="sortByNameProxy = !sortByNameProxy">
              <span class="mr-2">Сортировка по алфавиту</span>
              <v-switch v-model="sortByNameProxy"
                        :color="sortByNameProxy ? 'white' : 'hsl(0, 0%, 38%)'"
                        dense
                        light
                        inset
                        small
                        readonly/>
            </div>
          </div>

          <div class="bottom" :class="{opened: opened && !!breeds}">
            <div class="back-links">
              <v-chip class="ma-2 mr-4 current"
                      outlined
                      color="#3C59F0"
                      small
                      @click="e=>navigateTop(true)"
              >{{'Все пёсели'}}</v-chip>
              <v-chip class="ma-2 mr-4 current" v-if="!!breedList && !!breedList.current.type==='sub'"
                      outlined
                      color="#3C59F0"
                      small
                      @click="navigateTop"
              >{{breedList.current.parent}}</v-chip>
            </div>
            <div class="details-links" v-if="!!breeds">
              <template v-for="group in breeds">
                <div class="ch" :key="group.ch">{{group.ch}}</div>
                <v-chip class="ma-2" v-for="link in group.links"
                  outlined
                  small
                  :key="link"
                  @click="navigateDeep(link)"
                >{{link}}</v-chip>
              </template>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'BreedSelect',
  components: {},
  props: [],
  data () {
    return {
      opened: false,
    }
  },
  computed: {
    ...mapState(['allBreeds', 'sortByName']),
    ...mapGetters(['breedList']),

    breeds () {
      if (!this.breedList) { return null; }
      const groups = this.breedList.groups;
      const keys = Object.keys(groups);
      if (!keys.length) { return null; }
      return keys.map(v => ({
        ch: v.toUpperCase(),
        links: this.breedList.groups[v],
      }));
    },
    sortByNameProxy: {
      get () { return this.sortByName; },
      set (v) { this.$store.commit('sortByName', v); }
    },
  },
  methods: {
    navigateDeep (link) {
      switch (this.breedList.current.type) {
        case 'all': this.$router.push({ name: 'Breed', params: { breed: link } });
          break;
        case 'breed': this.$router.push({ name: 'Breed', params: { breed: this.breedList.current.title, sub: link } });
          break;
      }
    },
    navigateTop (toHome = false) {
      if (this.$route.name === 'Home') { return; }
      if (toHome || this.breedList.current.type === 'breed') {
        this.$router.push({ name: 'Home' });
      } else {
        this.$router.push({ name: 'Breed', params: { breed: this.breedList.current.parent } });
      }
    },
  },
  mounted () {
  },
}
</script>

<style lang="scss">
  .BreedSelect {
    width: 100%;
    height: auto;
    box-shadow: 0 10px 10px 0 hsla(0, 0%, 0%, .5);

    .v-chip {
      text-transform: capitalize;
    }
    .top {
      width: 100%;
      height: 80px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .select-button {
        width: 81px;
        height: 21px;
        border-bottom: 0.5px dashed hsl(0, 0%, 100%);
        padding: 0 1px 2px 0;
        font-size: 16px;
        line-height: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          background-color: hsla(0, 0%, 100%, .1);
        }
        .arrow {
          width: 9px;
          height: 9px;
          background-image: url("~@/assets/img/select-arrow.png");
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center 4px;
          transform-origin: center 6px;
          transform: rotate(0deg);
          transition: transform ease .4s;
        }
        &.opened .arrow {
           transform: rotate(180deg);
         }
      }
      .sort {
        width: auto;
        height: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
        color: hsl(0, 0%, 38%);
        .v-input--switch {
          transform: scale3d(.8, .8, 1);
          .v-input--switch__track.theme--light {
            border: 1.3px solid white;
            box-shadow: 0 0 0 1px grey;
          }
          .v-input--switch__thumb.theme--light {
            color: hsl(0, 0%, 38%) !important;
          }
        }
        &.active {
           color: hsl(0, 0%, 100%);
          .v-input--switch {
            .v-input--switch__track.theme--light {
              border: 1px solid white;
            }
            .v-input--switch__thumb.theme--light {
              color: hsl(0, 0%, 100%) !important;
            }
          }
        }
      }
    }

    .bottom {
      width: 100%;
      height: 0.001px;
      /*padding: 10px 0;*/
      overflow: hidden;
      /*background-color: hsl(0, 0%, 5%);*/
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
      transform-origin: top;
      transform: scaleY(0);
      transition: all ease .5s;

      .ch {
        height: 20px;
        font-size: 20px;
        line-height: 28px;
        display: flex;
        align-items: center;
        margin: 8px 4px;
        color: hsl(0, 0%, 38%);
      }
      .v-chip {
        height: 20px;
        cursor: pointer;
        font-size: 12px;
        line-height: 16px;
        color: hsl(0, 0%, 38%);
        background-color: hsla(0, 0%, 0%, 0) !important;
        border: 1px solid currentColor !important;
        box-shadow: 0 0 0 0.4px currentColor !important;
        &:hover {
           color: hsl(0, 0%, 60%) !important;
         }
      }
      .back-links {
        width: 100%;
        height: 32px;
        display: flex;
        flex-flow: row nowrap;
        z-index: 5;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .5);
      }
      .details-links {
        height: 75px;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        overflow-y: scroll;
        justify-content: flex-start;
      }
      &.opened {
         height: 108px;
         transform: scaleY(1);
       }
    }
  }
</style>
