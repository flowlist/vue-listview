<style lang="scss">
</style>

<template>
  <ListView
    ref="loader"
    func="getListByPage"
    type="page"
    :query="query"
    :auto="1"
    :success-callback="handleSuccess"
    unique-key="data.number_id"
  >
    <template #header>
      <br>
      <button @click="unshift(1)">
        unshift - object
      </button>
      <button @click="unshift(2)">
        unshift - array
      </button>
      <button @click="search">
        search
      </button>
    </template>
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
    <template #footer="{ source }">
      <button @click="push(1)">
        push - object
      </button>
      <button @click="push(2)">
        push - array
      </button>
      <button @click="patch(1)">
        patch - object
      </button>
      <button @click="patch(2)">
        patch - array
      </button>
      <button @click="reset">
        reset - {{ source.total }}
      </button>
    </template>
  </ListView>
</template>

<script>
import ItemFactory from '../api/item-factory'

export default {
  computed: {
    query() {
      return {
        count: 10,
        loadedIds: []
      }
    }
  },
  methods: {
    handleSuccess({ data }) {
      this.loadedIds = data.result.map(_ => _.data.number_id)
    },
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
    },
    patch(type) {
      let data
      if (type === 1) {
        data = {}
        this.loadedIds.forEach(id => {
          data[id] = {
            style: {
              color: ItemFactory.getRandomColor()
            }
          }
        })
      } else {
        data = this.loadedIds.map(id => {
          return {
            data: {
              number_id: id
            },
            style: {
              color: ItemFactory.getRandomColor()
            }
          }
        })
      }
      this.$refs.loader.patch(data)
    },
    reset() {
      this.$refs.loader.reset('total', Math.random())
    },
    search() {
      const id = window.prompt('请输入要搜索的 id')
      const result = this.$refs.loader.search(id)
      alert(JSON.stringify(result))
    }
  }
}
</script>
