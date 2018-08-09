const Koa = require('koa')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config')
const devMiddleware = require('./middleware/devMiddleware')
const hotMiddleware = require('./middleware/hotMiddleware')

const path = require('path')
const Router = require('koa-router')
const fs = require('fs')
const serve = require('koa-static')

const app = new Koa();
const router = new Router();
const compiler = webpack(webpackConfig);

app.use(devMiddleware(compiler, {
    watchOption: {
        aggregateTimeout: 3000,
        ignored: /node_modules/,
        poll: false
    },
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}))

app.use(hotMiddleware(compiler, {
    noInfo: true, // Set to true to disable informational console logging
    // quite: true, // Set to true to disable all console logging
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}))

app.use(serve(path.join(__dirname, '../dist'))) // 设置静态文件访问路径

router.get('/favicon.ico', (ctx, next) => {
    ctx.body =null;
})

router.get('*', async (ctx, next) => {
    const htmlFile = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../src/assets/index.html'), (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
    ctx.type = 'html'
    ctx.body = htmlFile
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)