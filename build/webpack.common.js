const HtmlWebpackPlugin = require('html-webpack-plugin')
// 在单独的进程中使用 fork-ts-checker-webpack-plugin 进行类型检查。
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
    entry: {
        // __dirname(当前文件所在目录) : /Users/admin/xwq/study/shop/build
        main: path.resolve(__dirname, '../src/index.ts')
    },
    optimization: {
        // 不论是否添加任何新的本地依赖（本地创建文件，不是引外面的文件，比如lodash）
        // 对于前后两次构建，vendor hash 都应该保持一致
        moduleIds: 'deterministic',
        // Webpack在浏览器端运行时需要的代码单独抽离到一个文件
        // 将 runtime 代码拆分为一个单独的 chunk。
        // 将其设置为 single 来为所有 chunk 创建一个 runtime bundle：
        runtimeChunk: 'single',
        splitChunks: {
            // 我们可以看到 main 不再含有来自 node_modules 目录的 vendor 代码
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
                use: 'vue-loader',
                exclude: /node_modules/
            },
            // 假如，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？
            // 在 webpack 5 中，可以使用内置的 Asset Modules
            // 由于 test.png 大于 8kb，asset 选择用 asset/resource 处理它。
            // 由于 test.svg 小于 8kb，asset 选择用 asset/inline 处理它。
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                // 将某些资源发送到指定目录：
                // [hash: 16]（默认为20）
                // [ext]资源扩展名[query]模块的
                // query，例如，文件名? 后面的字符串
                generator: {
                    filename: 'assets/images/[hash:16][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/inline',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            // 在单独的进程中使用 fork-ts-checker-webpack-plugin 进行类型检查。
                            // 缩短使用 ts-loader 时的构建时间
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    // 打包优化、资源管理、注入环境变量等任务。
    plugins: [
        // https://juejin.cn/post/6844903853708541959配置介绍
        // 手动引入无法监测到hash值的变化，需要这个插件
        new HtmlWebpackPlugin({
            title: '管理输出',
            // 指定html模板
            template: path.resolve(__dirname, '../public/index.html'),
            // 自定义打包的文件名
            filename: 'index.html'
        }),
        // 创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
        new ForkTsCheckerWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    resolve: {
        // 当我们引用模块时，如果出现import ‘lodash’ 这样的依赖引入方式，
        // webpack会默认从当前目录往上逐层查找是否有 node_modules，
        // 然后在 node_modules下查找是否存在指定依赖。
        // 为了减少搜索范围，我们可以通过设置
        // resolve.modules来告诉 webpack 解析这类依赖时应该搜索的目录
        modules: [path.resolve(__dirname, '../node_modules')],
        // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，
        // webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        extensions: ['.vue', '.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, '../src/'),
            '@less': path.resolve(__dirname, '../src/assets/less/')
        }
    }
}
