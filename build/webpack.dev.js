const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.common')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    // 会生成sourceMap，但不会生成map文件，而是将sourceMap放在打包文件中。
    devtool: 'inline-source-map',
    // 缓存生成的 webpack 模块和 chunk，来改善构建速度。
    cache: {
        // 将 cache 类型设置为内存或者文件系统。
        type: 'memory'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // Webpack 会在输出的 bundle 中生成路径信息。
        // 然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。
        pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader', // translates CSS into CommonJS
                    'postcss-loader',
                    'less-loader' // compiles Less to CSS
                ]
            }
        ]
    },
    optimization: {
        moduleIds: 'deterministic',
        // 确保在生成 entry chunk 时，尽量减少其体积以提高性能。
        // 下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低：
        runtimeChunk: true
    },
    devServer: {
        static: './dist', // 告诉开发服务器(dev server)，在哪里查找文件：
        hot: true, // 热更新(启用 HMR。)
        open: true, // 打开浏览器
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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.TEST': JSON.stringify('test222')
        })
    ]
})
