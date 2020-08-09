const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

const config = require('../../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  const nuxt = new Nuxt(config)

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(9090, '0.0.0.0')
}

start()
