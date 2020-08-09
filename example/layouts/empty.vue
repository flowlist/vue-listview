<style lang="scss">
.layout-empty {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>

<template>
  <div class="layout-empty">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'Empty'
}
</script>
