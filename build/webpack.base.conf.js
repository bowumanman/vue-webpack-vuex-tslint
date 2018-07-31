var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var chalk = require('chalk')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
//var HappyPack = require('happypack')
require("babel-polyfill");
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var publicPath = "";
if (process.env.NODE_ENV === 'production') {
    publicPath = config.build.assetsPublicPath;
} else if (process.env.NODE_ENV === 'test') {
    publicPath = config.test.assetsPublicPath;
} else {
    publicPath = config.dev.assetsPublicPath;
}
module.exports = {
    cache: true,
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '__assets': resolve('src/assets'),
            '__components': resolve('src/components'),
            '__views': resolve('src/views'),
            //'__static': resolve('static/views'),
            '__libs': resolve('src/libs'),
            '__api': resolve('src/api'),
            '__mixins': resolve('src/mixins'),
            '__service': resolve('src/service'),

        }
    },
    module: {
        noParse: /node_modules\/(element-ui\.js)/,
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
                //exclude: /(node_modules|vendor\.dll\.js)/
                //include: [resolve('src')]
            },
            {
                test: /\.js$/,
                use: [{
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('.cache')
                        }
                    },
                    'babel-loader'
                ],
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
        ]
    },
    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: require('./vendor-manifest.json')
        }),
        /*new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            verbose: true
        }),
        new HappyPack({
            loaders: [{
                path: 'vue-loader',
                query: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        js: 'happypack/loader?id=happybabel'
                    }
                }
            }]
        })*/
    ]
}
