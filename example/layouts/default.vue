<style lang="scss">
#__layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: -15px;
  overflow-x: hidden;
  overflow-y: auto;
}

* {
  box-sizing: border-box;
  user-select: none;
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

.demo-item {
  display: block;
  height: 100px;
  line-height: 100px;
  padding-left: 50px;
  margin: 15px 0;
  border-radius: 5px;
}

.flow-loader {
  &__state--load,
  &__state--loading {
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 14px;
    background-color: rgba(lightslategray, 0.5);
    color: #fff;
    border-radius: 5px;
  }
}
</style>

<template>
  <nuxt />
</template>

<script>
export default {
  name: 'Layout'
}
</script>
