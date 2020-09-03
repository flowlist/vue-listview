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
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'flowlist/vue-listview',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Github',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
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
          '/loader/ssr'
        ]
      },
      '/loader/methods'
    ]
  }
}
