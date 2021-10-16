const path = require('path')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')
module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true // 在每次构建前清理 /dist 文件夹，这样只会生成用到的文件
        // publicPath: '/', // 我们将会在 server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:3000 下
    }
})
