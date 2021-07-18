<template>
  <suspense>
    <list-view :func="handler">
      <template #default="{ result }">
        {{ result }}
      </template>
    </list-view>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListView from './list-view.vue'

export default defineComponent({
  name: 'App',
  components: {
    ListView
  },
  setup() {
    const handler = () =>
      new Promise((resolve) => {
        console.log('call')
        setTimeout(() => {
          resolve({
            result: [1, 2, 3],
            no_more: true
          })
        }, 2000)
      })

    return {
      handler
    }
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
