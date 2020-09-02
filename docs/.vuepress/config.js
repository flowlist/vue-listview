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
    nav: [
      { text: 'Github', link: 'https://github.com/flowlist/vue-listview' },
    ],
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
          '/loader/ssr'
        ]
      },
      '/loader/methods'
    ]
  }
}
