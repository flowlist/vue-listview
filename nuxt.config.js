const nodeEnv = process.env.NODE_ENV
const isDev = nodeEnv === 'development'
const pkg = require('./package')

module.exports = {
  mode: 'spa',
  generate: {
    dir: 'docs/.vuepress/dist/code-gen',
  },
  dir: {
    assets: 'example/assets',
    app: 'example/app',
    layouts: 'example/layouts',
    middleware: 'example/middleware',
    pages: 'example/pages',
    static: 'example/static',
    store: 'example/store',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
      },
      {
        name: 'referrer',
        content: 'never',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/example/plugins/prototypes.all.js',
    '~/example/plugins/prototypes.client.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],

  router: {
    base: isDev ? '/' : `${pkg.project_base_url}${pkg.code_gen_prefix}`,
  },
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources'],

  styleResources: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    publicPath: isDev ? '/_nuxt/' : `${pkg.deploy_url}${pkg.project_base_url}${pkg.code_gen_prefix}`,
    babel: {
      presets: [
        [
          '@nuxt/babel-preset-app',
          {
            corejs: { version: 3 },
          },
        ]
      ],
    },
  }
}
