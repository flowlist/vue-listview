<style lang="scss">
</style>

<template>
  <div id="first-loading">
    <ListView
      func="getListByFirstLoading"
      type="page"
      :query="query"
      :use-first-loading="true"
    >
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
      <div slot="first-loading">
        第一次加载，可以设置独特的 loading…
      </div>
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
  }
}
</script>
