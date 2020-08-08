<style lang="scss">
body {
  margin: 0;
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

li {
  display: block;
  height: 100px;
  line-height: 100px;
  padding-left: 50px;
  margin: 15px 0;
  border-radius: 5px;
}

#app {
  > section {
    width: 600px;
    margin: 0 auto;
    max-width: 100%;
  }
}
</style>

<template>
  <div id="app">
    <header />
    <section>
      <RouterView />
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
