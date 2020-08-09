<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

#app {
  > header {
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

    li {
      margin-left: 15px;
    }
  }

  > section {
    width: 600px;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 15px;

    li {
      display: block;
      height: 100px;
      line-height: 100px;
      padding-left: 50px;
      margin: 15px 0;
      border-radius: 5px;
    }
  }
}

.flow-loader {
  &__state--load,
  &__state--loading {
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 14px;
    background-color: rgba(lightslategray, 0.5);
    color: #fff;
    border-radius: 5px;
  }
}
</style>

<template>
  <div id="app">
    <header>
      <VSwitcher
        :headers="headers"
        :routable="true"
        align="start"
      >
        <NLink
          v-for="(item, index) in headers"
          :key="index"
          :slot="`tab-${index}`"
          :to="item.route"
          v-text="item.name"
        />
      </VSwitcher>
    </header>
    <section>
      <Nuxt />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    headers() {
      return [
        {
          name: '首页',
          route: '/'
        },
        {
          name: '页码翻页',
          route: '/page'
        },
        {
          name: '对象数组',
          route: '/object'
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
          name: 'last_id翻页',
          route: '/last_id'
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
          name: '动态列表',
          route: '/comment'
        }
      ]
    }
  }
}
</script>
