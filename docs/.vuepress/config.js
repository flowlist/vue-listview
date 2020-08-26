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
  title: pkg.name + ' ' + pkg.version,
  base: isProd ? pkg.project_base_url : '/',
  evergreen: true,
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
    sidebar: [
      '/guide/start',
      {
        title: '安装',
        collapsable: false,
        children: [
          '/guide/install',
          '/guide/api'
        ]
      },
      {
        title: '场景',
        collapsable: false,
        children: [
          'scene/jump',
          'scene/page',
          'scene/since_id',
          'scene/seen_ids'
        ]
      },
      '/guide/store',
      {
        title: '容器',
        collapsable: false,
        children: [
          '/loader/props',
          '/loader/slots',
          '/loader/ssr'
        ]
      },
      '/loader/methods'
    ]
  }
}
