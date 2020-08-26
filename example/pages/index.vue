<style lang="scss">
#homepage {
  padding: 20px;

  li {
    margin: 12px 0;
  }

  a {
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #f7f8fa;
    color: #323233;
    transition: background-color 0.3s;
    font-size: 14px;
    border-radius: 20px;

    &:hover {
      background-color: #eef0f4;
    }
  }
}
</style>

<template>
  <ul id="homepage">
    <li
      v-for="(item, index) in headers"
      :key="index"
    >
      <NLink
        :to="item.route"
        v-text="item.name"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Homepage',
  data() {
    return {}
  },
  computed: {
    headers() {
      return [
        {
          name: '页码翻页',
          route: '/page'
        },
        {
          name: '跳转翻页',
          route: '/jump'
        },
        {
          name: 'seenIds翻页',
          route: '/seen_ids'
        },
        {
          name: 'sinceId翻页',
          route: '/since_id'
        },
        {
          name: '模拟异常',
          route: '/error'
        },
        {
          name: '首屏异常',
          route: '/first-error'
        },
        {
          name: '首屏加载',
          route: '/first-loading'
        },
        {
          name: '首屏为空',
          route: '/nothing'
        },
        {
          name: '方法列表',
          route: '/method'
        }
      ]
    }
  }
}
</script>
