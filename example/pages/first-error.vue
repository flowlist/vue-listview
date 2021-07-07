<style lang="scss"></style>

<template>
  <div id="first-error">
    <ListView
      ref="loader"
      func="getListByFirstError"
      :query="query"
      :use-first-error="true"
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
      <div slot="first-error" slot-scope="{ error }" @click="handleClick">
        {{ error }}
        <p>第一次加载就 error，可以设置独特的 error（点击重试3次）…</p>
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
  },
  methods: {
    handleClick() {
      this.$refs.loader.retry()
    }
  }
}
</script>
