<style lang="scss">
</style>

<template>
  <div id="page">
    <FlowLoader
      ref="loader"
      func="getObjectByPage"
      type="page"
      :query="query"
      :callback="testPatch"
      :auto="1"
      unique-key="a"
    >
      <ul
        slot-scope="{ flow }"
        class="demo-list"
      >
        <li
          v-for="(item, key) in flow"
          :key="key"
        >
          <p>{{ key }}</p>
          <div
            v-for="(one, index) in flow[key]"
            :key="index"
          >
            {{ one }}
          </div>
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
        query: {
          a: 1,
          b: 2,
          c: 3
        }
      }
    }
  },
  methods: {
    testPatch() {
      this.$refs.loader.patch({
        key: 'pgc',
        value: [{ a: 1, val: 'changed' }]
      })
      // this.$refs.loader.push({
      //   key: 'pgc',
      //   value: { a: 6, val: 'gg' }
      // })
      // this.$refs.loader.push({
      //   key: 'bangumi',
      //   value: [{ a: 6, val: 'kami' }]
      // })
      // this.$refs.loader.update({
      //   id: 6,
      //   key: 'pgc.val',
      //   value: 'haha'
      // })
    }
  }
}
</script>
