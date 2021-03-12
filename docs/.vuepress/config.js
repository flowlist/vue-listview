const pkg = require('./../../package')
const isProd = process.env.NODE_ENV === 'production'

const getLocalIP = () => {
  const os = require('os')
  const ifaces = os.networkInterfaces()
  for (const dev in ifaces) {
    for (const item of ifaces[dev]) {
      if (item.address !== '127.0.0.1' && item.family === 'IPv4') {
        return item.address
      }
    }
  }
  return ''
}

module.exports = {
  title: pkg.name,
  base: isProd ? pkg.project_base_url : '/',
  evergreen: true,
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    }
  },
  define: {
    'process.env.LOCAL_IP': getLocalIP(),
  },
  alias: {
    '~/': '../../'
  },
  plugins: [
    [
      'vuepress-plugin-dehydrate',
      {
        noSSR: '*.html'
      }
    ]
  ],
  themeConfig: {
    repo: 'flowlist/vue-listview',
    repoLabel: 'Github',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Help us improve this page!',
        lastUpdated: 'Last Updated',
        sidebar: [
          {
            title: 'Usage',
            collapsable: false,
            children: [
              '/guide/install',
              '/guide/api'
            ]
          },
          {
            title: 'ListType',
            collapsable: false,
            children: [
              'scene/jump',
              'scene/page',
              'scene/since_id',
              'scene/seen_ids'
            ]
          },
          {
            title: 'Component',
            collapsable: false,
            children: [
              '/loader/props',
              '/loader/slots',
              '/loader/ssr',
              '/loader/getters'
            ]
          },
          '/loader/methods'
        ]
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: [
          {
            title: '开始',
            collapsable: false,
            children: [
              '/zh/guide/install',
              '/zh/guide/api'
            ]
          },
          {
            title: '场景',
            collapsable: false,
            children: [
              '/zh/scene/jump',
              '/zh/scene/page',
              '/zh/scene/since_id',
              '/zh/scene/seen_ids'
            ]
          },
          {
            title: '组件',
            collapsable: false,
            children: [
              '/zh/loader/props',
              '/zh/loader/slots',
              '/zh/loader/ssr',
              '/zh/loader/getters'
            ]
          },
          '/zh/loader/methods'
        ]
      }
    }
  }
}
