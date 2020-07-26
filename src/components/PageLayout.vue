<template>
    <div class="PageLayout">
        <div class="container -page">

          <div class="row">
            <div class="col-12">
              <slot name="pgHeader"></slot>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <slot name="default"></slot>
            </div>
          </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'PageLayout',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  methods: {},
  mounted () {
  },
}
</script>

<style lang="scss">
  .PageLayout {
    width: 100%;
    height: auto;
    min-height: calc(100vh - 100px);
    /*padding-top: 100px;*/
    background: linear-gradient(180deg, hsl(252, 8%, 11%) 0%, hsl(260, 8%, 6%) 99.09%);

    .container.-page {
      /*max-width: 800px;*/
      max-width: 1280px;
      color: white;
    }
  }
</style>
