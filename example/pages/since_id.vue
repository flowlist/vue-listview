<style lang="scss">
</style>

<template>
  <div id="since_id">
    <ListView
      ref="loader"
      func="getListBySinceId"
      :query="query"
      unique-key="data.number_id"
    >
      <template #header>
        <br>
        <button @click="fetchUp">
          向上获取
        </button>
        <button @click="refresh">
          刷新页面
        </button>
      </template>

      <ul
        slot-scope="{ list }"
        class="demo-list"
      >
        <li
          v-for="item in list"
          :key="item.id"
          :style="{ backgroundColor: item.style.color }"
          class="demo-item"
        >
          <span>order：{{ item.id }}，id：{{ item.data.number_id }}</span>
        </li>
      </ul>
    </ListView>
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
