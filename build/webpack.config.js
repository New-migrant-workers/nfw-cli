const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    devtool: 'inline-source-map', // 为了更容易地追踪 error 和 warning，JavaScript 提供了 source maps 功能，可以将编译后的代码映射回原始源代码
    devServer: {
        static: './dist' // 实时重新加载
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 在每次构建前清理 /dist 文件夹，这样只会生成用到的文件
        publicPath: '/' // 我们将会在 server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:3000 下
    },
    optimization: {
        moduleIds: 'deterministic', // 不论是否添加任何新的本地依赖，对于前后两次构建，vendor hash 都应该保持一致
        splitChunks: {
            chunks: 'all' // 移除了重复的依赖模块,并且将其从 main bundle 中移除，减轻了大小
        },
        // 确保在生成 entry chunk 时，尽量减少其体积以提高性能。下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低
        runtimeChunk: 'single', // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，它们很少像本地的源代码那样频繁修改
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/i,
    //             use: ['style-loader', 'css-loader'],
    //         },
    //         // 假如，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？在 webpack 5 中，可以使用内置的 Asset Modules，我们可以轻松地将这些内容混入我们的系统中：
    //         {
    //             test: /\.(png|svg|jpg|jpeg|gif)$/i,
    //             type: 'asset/resource',
    //         },
    //         {
    //             test: /\.(woff|woff2|eot|ttf|otf)$/i,
    //             type: 'asset/resource',
    //         },
    //     ],
    // },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理输出'
        })
    ]
}
