<style lang="scss">
</style>

<template>
  <div id="seen_ids">
    <FlowLoader
      func="getListBySeenIds"
      type="seenIds"
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
        count: 10,
        changing: 'data.number_id'
      }
    }
  }
}
</script>
