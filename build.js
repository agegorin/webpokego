const fs = require('fs');
const webpack = require('webpack');
const rimraf = require('rimraf');

const webpackConfig = require('./webpack.config.js');

const frontendCompiler = webpack(webpackConfig);

if (fs.existsSync(webpackConfig.output.path)) {
    rimraf.sync(webpackConfig.output.path);
}

const STATS_OPTIONS = {
    assets: false,
    colors: true,
    version: false,
    modules: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    reasons: true,
    cached: true,
    chunkOrigins: true
};

frontendCompiler.plugin('compile', () => console.log('Building frontend...'));

frontendCompiler.run(function(error, stats) {
    if (error) {
        console.error(error.stack || error);
        if (error.details) {
            console.error(error.details);
        }
        process.exit(1);
    }

    process.stdout.write(stats.toString(STATS_OPTIONS) + '\n');
});
