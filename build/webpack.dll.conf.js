const path = require('path')
const webpack = require('webpack')
var FastUglifyJsPlugin = require('fast-uglifyjs-plugin');



module.exports = {
    entry: {
        vendor: [
            //将不改变的包都引入进来  拆分 以防止 vendor包过大，如果此处变化就必须执行  npm run build:dll
            /*'element-ui',*/
            'vue/dist/vue.common.js',
            'vue-router',
            'vuex',
            'axios',
            'localforage',
            'vue-moment',
            'tz-vue-ui',
            'echarts'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../static/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            libraryTarget: 'commonjs2',
            name: '[name]_library'
        }),
        /*new webpack.optimize.UglifyJsPlugin({
            comments: true, //去掉注释
            compress: {
                warnings: false
            },
        })*/
        new FastUglifyJsPlugin({
            comments: false, //去掉注释
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            // debug设为true可输出详细缓存使用信息:
            debug: true,
            // 默认开启缓存，提高uglify效率，关闭请使用:
            cache: true,
            // 默认缓存路径为项目根目录，手动配置请使用:
            cacheFolder: path.resolve(__dirname, '../.otherFolder'),
            // 工作进程数，默认os.cpus().length
            //workerNum: 2
        }),
    ]
}
