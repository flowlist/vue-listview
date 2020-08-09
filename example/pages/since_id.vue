<style lang="scss">
</style>

<template>
  <div id="since_id">
    <div>
      <button @click="fetchUp">
        向上获取
      </button>
      <button @click="refresh">
        刷新页面
      </button>
    </div>
    <FlowLoader
      ref="loader"
      func="getListBySinceId"
      type="sinceId"
      :query="query"
      unique-key="data.number_id"
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
          count：{{ index + 1 }}，id：{{ item.data.number_id }}
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
  },
  methods: {
    fetchUp() {
      this.$refs.loader.loadBefore()
    },
    refresh() {
      this.$refs.loader.refresh()
    }
  }
}
</script>
