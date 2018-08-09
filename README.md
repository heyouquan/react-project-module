########
手动搭建第一个react项目
########
手动搭建项目：
（1）使用npm init和npm install一些模块和插件
（2）搭建项目结构，分清文件夹和文件的功能
（3）使用koa配置和开启本地服务
（4）配置babel
（5）配置webpack
（6）配置项目启动命令
（7）编写react顶层父级组件
（8）加入react热加载功能:
    使用react-hot-loader
    需要在babel配置文件中加入react-hot-loader/babel的plugins
    同时需要在webpack配置文件中加入react-hot-loader/patch和HotModuleReplacementPlugin
（9）在项目引入redux、react-redux、react-thunk
（10）使用Dll插件优化webpack开发构建速度，这是webpack提供的一个插件，可以让我们预先打包好想打包的第三方库文件，然后以后每次构建的时候我们就可以只打包自己的业务代码了。
需要安装webpack-cli/webpack-command才能配置npm run dll命令中执行webpack --config './webpack/webpack.config.dll.js'
（11）生产环境构建，配置npm run build命令
需要使用到extract-text-webpack-plugin、postcss-loader、html-webpack-plugin、autoprefixer、webpack-visualizer-plugin等插件
详情见webpack的plugin：https://webpack.js.org/plugins/
(12)设置编译项目时自动打开浏览器
使用到open-browser-webpack-plugin插件
(13)webpack设置清除控制台无用信息
使用到Friendly-errors-webpack-plugin

##############
npm run test // 测试
npm run start // 启动项目
npm run dll // 合成静态文件，避免webpack每次都去编译静态文件，导致编译速度很慢
npm run build // 编译项目，产出生产环境的代码
