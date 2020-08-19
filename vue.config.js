const webpack = require('webpack')
const npmCfg = require('./package.json')

const banner = [
  `${npmCfg.name} v${npmCfg.version}`,
  `(c) ${new Date().getFullYear()} ${npmCfg.author}`,
  npmCfg.homepage
].join('\n')

module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'example/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [new webpack.BannerPlugin(banner)]
  }
}
