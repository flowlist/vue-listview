<style lang="scss">
</style>

<template>
  <div id="last_id">
    <FlowLoader
      func="getListByLastId"
      type="lastId"
      :query="query"
    >
      <ul
        slot-scope="{ flow }"
        class="demo-list"
      >
        <li
          v-for="item in flow"
          :key="item.id"
          :style="{ backgroundColor: item.style.color }"
          class="demo-item"
        >
          <span>order：{{ item.id }}，id：{{ item.data.number_id }}</span>
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
        changing: 'data.uuid'
      }
    }
  }
}
</script>
