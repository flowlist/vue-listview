<template>
  <list-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListView from './index.vue'

export default defineComponent({
  name: 'App',
  components: {
    ListView
  }
})
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
