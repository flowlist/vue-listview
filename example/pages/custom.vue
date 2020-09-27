<template>
  <div id="custom-api">
    <ListView
      :func="getListByPage"
      :query="query"
      @success="handlePageLoaded"
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

      <template #loading>
        custom loading text
      </template>

      <template #load>
        click load next page
      </template>
    </ListView>
  </div>
</template>

<script>
import { getListByPage } from '../api'

export default {
  data() {
    return {
      query: {
        count: 10
      }
    }
  },
  methods: {
    getListByPage,
    handlePageLoaded(res) {
      console.log('callback', res)
    }
  }
}
</script>
