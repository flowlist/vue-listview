<style lang="scss">
</style>

<template>
  <FlowLoader
    ref="loader"
    func="getListByPage"
    type="page"
    :query="query"
    :auto="1"
    unique-key="data.number_id"
  >
    <template #header>
      <button @click="unshift(1)">
        unshift一个object
      </button>
      <button @click="unshift(2)">
        unshift一个array
      </button>
    </template>
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
        <div>
          <button @click="insertBefore(item)">
            insertBefore
          </button>
          <button @click="insertAfter(item)">
            insertAfter
          </button>
          <button @click="deleteItem(item)">
            delete
          </button>
          <button @click="updateItem(item)">
            update
          </button>
        </div>
      </li>
    </ul>
    <template #footer>
      <button @click="push(1)">
        push一个object
      </button>
      <button @click="push(2)">
        push一个array
      </button>
    </template>
  </FlowLoader>
</template>

<script>
import ItemFactory from '../api/item-factory'

export default {
  computed: {
    query() {
      return {
        count: 10
      }
    }
  },
  methods: {
    insertBefore(item) {
      this.$refs.loader.insertBefore(item.data.number_id, ItemFactory.get(1))
    },
    insertAfter(item) {
      this.$refs.loader.insertAfter(item.data.number_id, ItemFactory.get(1))
    },
    deleteItem(item) {
      this.$refs.loader.delete(item.data.number_id)
    },
    updateItem(item) {
      this.$refs.loader.update(item.data.number_id, 'style.color', ItemFactory.getRandomColor())
    },
    unshift(count) {
      this.$refs.loader.unshift(ItemFactory.get(count))
    },
    push(count) {
      this.$refs.loader.push(ItemFactory.get(count))
    }
  }
}
</script>
