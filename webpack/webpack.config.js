const path = require('path')
const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    entry: [
        'react-hot-loader/patch', // 开启react代码的模块热替换(HMR)
        'webpack-hot-middleware/client', // 当发生热更新时控制台会有提示
        path.join(__dirname, '../src/index.js')// 入口文件
    ],
    output: {
        filename: 'bundle.js', // 打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.join(__dirname, '/'), // 打包后的文件存储位置
        publicPath: '/'
    },

    resolve: {
        modules: [path.join(__dirname, '../node_modules')], // 优化webpack文件搜索范围
        extensions: ['.web.js', '.jsx', '.js', '.json']
    },

    devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'], // 开启编译缓存
                exclude: /node_modules/ // exclude表示排除不满足条件的文件夹  include表示需要被loader处理的文件或者文件夹
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[local]-[hash:base64:5]', // 编译css文件的loader并开启css-modules功能
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader?&modules&localIdentName=[local]-[hash:base64:5]', // 编译less文件的loader并开启css-modules功能
                    'less-loader'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
                use: ['url-loader?limit=10240']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            }
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
        new webpack.HotModuleReplacementPlugin(), // 代码热替换
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'//用于区分开发和生产环境
        }),
        new webpack.DllReferencePlugin({ // 引入预打包好的第三方库的映射文件
            context: __dirname,
            manifest: require('../dist/vendor-manifest.json')
        }),
        new OpenBrowserPlugin({url: 'http://localhost:3000', browser: 'chrome', ignoreErrors: true}), // 设置自动打开设置的浏览器
        new FriendlyErrorsWebpackPlugin({ // 设置清除编译时清除控制台没用信息
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: function (severity, errors) {
                console.log(errors)
            },
            clearConsole: true
        })
    ],
    mode: 'development',
    performance: {
        hints: false,
    }
}