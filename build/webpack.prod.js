const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackBaseConfig = require('./webpack.common')

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    // 避免在生产中使用 inline-***，因为它们可以增加 bundle 大小，并降低整体性能
    devtool: 'source-map',
    output: {
        // 其中[name]代表entry设置中对应的键名main,[id]代表webpack打包中自动给各个模块所设置的模块id（内部 chunk id）；
        // [name]如果设置，则为此 chunk 的名称，否则使用 chunk 的 ID
        filename: 'js/[name].[contenthash].js',
        chunkFilename: (pathData) => {
            return (
                pathData.chunk.name !== 'main' &&
                'js/[id]/[id].[contenthash].js'
            )
        },
        path: path.resolve(__dirname, '../dist'),
        clean: true // 在每次构建前清理 /dist 文件夹，这样只会生成用到的文件
        // publicPath: '/', // 我们将会在 server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:3000 下
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（
            // 即`terser-webpack-plugin`压缩代码 -》webpack v5 开箱即带，不用下载）
            `...`,
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // 推荐 production 环境的构建将 CSS 从你的 bundle 中分离出来，
                    // 这样可以使用 CSS / JS 文件的并行加载。 创建单独的 CSS 文件。
                    // 对于 development 模式（包括 webpack - dev - server），
                    // 你可以使用 style - loader，因为它可以使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快。
                    MiniCssExtractPlugin.loader,
                    // source map 的生成依赖于 devtool选项， devtool开启了，就不用设置sourceMap: true了
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        // 每次打包先删除之前打包生成的文件
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // [contenthash] 启动长期缓存
            filename: 'css/[name].[contenthash].css', // 设置导出css名称，[name]占位符对应chunkName
            chunkFilename: (pathData) => {
                // 此选项决定了非入口的 chunk 文件名称
                return (
                    pathData.chunk.name !== 'main' &&
                    'css/[id]/[id].[contenthash].css'
                )
            },
            ignoreOrder: true // 对于通过使用 scoping 或命名约定来解决 css order 的项目，可以通过将插件的 ignoreOrder 选项设置为 true 来禁用 css order 警告。
        }),
        new webpack.DefinePlugin({
            'process.env.TEST': JSON.stringify('test111')
        })
    ]
})
