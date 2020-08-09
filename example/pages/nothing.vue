<style lang="scss">
</style>

<template>
  <div id="nothing">
    <FlowLoader
      func="getListByNothing"
      type="page"
      :query="query"
    >
      <ul
        slot-scope="{ flow }"
        class="demo-list"
      >
        <li
          v-for="(item, index) in flow"
          :key="item.id"
          :style="{ backgroundColor: item.style.color }"
          class="demo-item"
        >
          count：{{ index + 1 }}，id：{{ item.id }}
        </li>
      </ul>
    </FlowLoader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        count: 10
      }
    }
  }
}
</script>
