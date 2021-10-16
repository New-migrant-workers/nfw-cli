const HtmlWebpackPlugin = require('html-webpack-plugin')
// 在单独的进程中使用 fork-ts-checker-webpack-plugin 进行类型检查。
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '../src/index.ts')
    },
    devtool: 'inline-source-map', // 为了更容易地追踪 error 和 warning，JavaScript 提供了 source maps 功能，可以将编译后的代码映射回原始源代码
    devServer: {
        static: './dist' // 实时重新加载
    },
    optimization: {
        moduleIds: 'deterministic', // 不论是否添加任何新的本地依赖，对于前后两次构建，vendor hash 都应该保持一致
        splitChunks: {
            chunks: 'all' // 移除了重复的依赖模块,并且将其从 main bundle 中移除，减轻了大小
        },
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
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
            {
                test: /\.less$/,
                use: [
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ]
            },
            // 假如，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？在 webpack 5 中，可以使用内置的 Asset Modules，我们可以轻松地将这些内容混入我们的系统中：
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        // 在单独的进程中使用 fork-ts-checker-webpack-plugin 进行类型检查。
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true // 缩短使用 ts-loader 时的构建时间
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // https://juejin.cn/post/6844903853708541959配置介绍
        new HtmlWebpackPlugin({
            title: '管理输出',
            // 指定html模板
            template: path.resolve(__dirname, '../public/index.html'),
            // 自定义打包的文件名
            filename: 'index.html'
        }),
        // 创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
        new ForkTsCheckerWebpackPlugin(),
        new miniCssExtractPlugin({
            filename: '[name].css' // 设置导出css名称，[name]占位符对应chunkName
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'vue'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    }
}
