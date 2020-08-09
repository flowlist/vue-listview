<style lang="scss">
</style>

<template>
  <div id="jump">
    <FlowLoader
      ref="loader"
      func="getListByJump"
      type="jump"
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
      <div slot="footer">
        <button @click="load(1)">
          page-1
        </button>
        <button @click="load(2)">
          page-2
        </button>
        <button @click="load(9)">
          page-9
        </button>
      </div>
    </FlowLoader>
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
