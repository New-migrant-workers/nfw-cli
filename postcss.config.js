module.exports = {
    plugins: [
        // 将css编译为适应于多版本浏览器
        require('autoprefixer')({
            // 覆盖浏览器版本
            // last 2 versions: 兼容各个浏览器最新的两个版本
            // > 1%: 浏览器全球使用占有率大于1%
            overrideBrowserslist: ['last 2 versions', '> 1%']
        }),
        // 压缩css代码
        require('cssnano')
    ]
}
