let webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');
const frontendServerPort = 8080;

webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:${frontendServerPort}`);
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const frontendCompiler = webpack(webpackConfig);
const frontendServerHost = '192.168.1.242';

const frontendServer = new WebpackDevServer(frontendCompiler, {
    contentBase: webpackConfig.output.path,
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true },
    https: true
});

frontendServer.listen(frontendServerPort, frontendServerHost, () => {
    console.log(`Frontend server running at http://localhost:${frontendServerPort}...`);
});
