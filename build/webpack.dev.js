const path = require('path')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'inline-source-map', // 为了更容易地追踪 error 和 warning，JavaScript 提供了 source maps 功能，可以将编译后的代码映射回原始源代码
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        hot: true, //热更新
        open: true,
        port: 8080, // 自定义端口号，默认8080
        // 跨域代理
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 代理地址
                pathRewrite: { '^/api': '' }, // 重写路径
                secure: false, // 使用https
                changeOrigin: true // 覆盖主机源
            }
        }
    }
})
