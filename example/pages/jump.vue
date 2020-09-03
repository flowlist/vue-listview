<style lang="scss">
</style>

<template>
  <div id="jump">
    <ListView
      ref="loader"
      func="getListByJump"
      type="jump"
      :query="query"
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
      <div slot="footer">
        <button @click="load(1)">
          page-1
        </button>
        <button @click="load(2)">
          page-2
        </button>
        <button @click="load(4)">
          page-4
        </button>
        <button @click="load(9)">
          page-9
        </button>
        <br>
        <br>
      </div>
    </ListView>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        count: 10,
        page: 1
      }
    }
  },
  methods: {
    load(page) {
      this.$refs.loader.jump(page)
    }
  }
}
</script>
