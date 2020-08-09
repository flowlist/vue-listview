<template>
  <FlowLoader
    func="getListByPage"
    type="page"
    :query="query"
    :callback="handlePageLoaded"
    :auto="3"
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
</template>

<script>
export default {
  name: 'Auto',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    query() {
      return {
        count: 10
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handlePageLoaded(res) {
      console.log('callback', res)
    }
  }
}
</script>
