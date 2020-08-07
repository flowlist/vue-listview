<style>
body {
  margin: 0;
}

ul {
  list-style-type: none;
}

#app > section {
  width: 600px;
  margin: 0 auto;
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
