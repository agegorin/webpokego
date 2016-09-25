var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const ASSETS_PATH = './assets/';

const webpackConfig = {
    entry: {
        app: [ path.join(__dirname, 'src', 'index.js')]
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: IS_PRODUCTION ? '' : '/',
        filename: ASSETS_PATH + '[name].js'
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devTool: 'inline-source-map',

    resolve: {
        root: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.jsx', '.web.js', '.webpack.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: IS_PRODUCTION ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') : 'style-loader!css-loader?sourceMap!postcss-loader'
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    postcss: function (webpack) {
        return [
            require('postcss-import')({
                addDependencyTo: webpack
            }),
            require('postcss-nested'),
            require('autoprefixer')({
                browsers: [
                    'last 2 versions',
                    'ie 10',
                    'ff 24',
                    'android 4',
                    'ios >= 5'
                ]
            })
        ];
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            inject: 'body',
            template: 'src/index.html'
        })
    ]
};

if (IS_PRODUCTION) {
    webpackConfig.module.loaders
        .filter(loader => loader.loader === 'url-loader')
        .forEach(loader => {
            if (loader.query && loader.query.name) {
                loader.query.name = ASSETS_PATH + loader.query.name;
            }
        });

    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            beautify: true,
            sourceMap: false,
            warnings: false
        }),
        new ExtractTextPlugin(ASSETS_PATH + '[name].css'),
        new CompressionPlugin({
            asset: '[file].gz',
            algorithm: 'gzip',
            regExp: /\.js$|\.css$|\.ttf$|\.svg$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
}
module.exports = webpackConfig;
