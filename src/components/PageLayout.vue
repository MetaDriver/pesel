<template>
    <div class="PageLayout">
        <div class="container -page pa-0">

              <slot name="pgHeader"></slot>

              <slot name="default"></slot>

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
    height: calc(100vh - 100px);

    background: linear-gradient(180deg, hsl(252, 8%, 11%) 0%, hsl(260, 8%, 6%) 99.09%);

    .container.-page {
      max-width: 1280px;
      height: 100%;
      color: white;
      display: flex;
      flex-flow: column nowrap;
    }
  }
</style>
