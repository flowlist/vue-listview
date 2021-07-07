<style lang="scss"></style>

<template>
  <div id="seen_ids">
    <ListView
      func="getListBySeenIds"
      :query="query"
      display-no-more
      unique-key="data.number_id"
    >
      <ul slot-scope="{ list }" class="demo-list">
        <li
          v-for="item in list"
          :key="item.id"
          :style="{ backgroundColor: item.style.color }"
          class="demo-item"
        >
          <span>order：{{ item.id }}，id：{{ item.data.number_id }}</span>
        </li>
      </ul>

      <template #no-more>
        <p style="text-align: center">
          custom no more text
        </p>
        <br />
      </template>
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
